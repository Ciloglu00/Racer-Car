// Oyun Değişkenleri
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas boyutlandırma
function resizeCanvas() {
    const oldWidth = canvas.width;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Oyuncu pozisyonunu orantılı olarak güncelle
    if (oldWidth > 0) {
        player.x = (player.x / oldWidth) * canvas.width;
        player.y = canvas.height - 100;
    }
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Oyun Durumu
let gameState = {
    screen: 'mainMenu',
    isPlaying: false,
    isPaused: false,
    score: 0,
    gold: 100,
    level: 1,
    speed: 2,
    soundEnabled: true
};

// Oyun Ayarları
let settings = {
    season: 'spring',
    roadType: 'highway',
    carType: 'red'
};

// Mevsim Renkleri
const seasonColors = {
    spring: { road: '#4a5568', grass: '#48bb78', sky: '#90cdf4', trees: '#68d391' },
    summer: { road: '#2d3748', grass: '#38a169', sky: '#63b3ed', trees: '#48bb78' },
    autumn: { road: '#4a5568', grass: '#d69e2e', sky: '#f6ad55', trees: '#f56565' },
    winter: { road: '#718096', grass: '#e2e8f0', sky: '#cbd5e0', trees: '#a0aec0' }
};

// Yol Yapıları
const roadConfigs = {
    highway: { lanes: 4, width: 0.8 },
    city: { lanes: 3, width: 0.7 },
    country: { lanes: 2, width: 0.6 }
};

// Oyuncu Arabası
const player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 50,
    height: 90,
    speed: 5,
    color: '#e53e3e'
};

// Düşman Arabalar
let enemyCars = [];
const carColors = ['#e53e3e', '#3182ce', '#38a169', '#d69e2e', '#805ad5', '#dd6b20'];

// Altınlar
let coins = [];

// Kontrol Değişkenleri
const keys = {};
let touchLeft = false;
let touchRight = false;

// Menü Yönetimi
document.getElementById('startBtn').addEventListener('click', () => {
    showScreen('gameScreen');
    startGame();
});

document.getElementById('settingsBtn').addEventListener('click', () => {
    showScreen('settingsMenu');
});

document.getElementById('backToMenuBtn').addEventListener('click', () => {
    showScreen('mainMenu');
});

document.getElementById('exitBtn').addEventListener('click', () => {
    if (confirm('Oyundan çıkmak istediğinize emin misiniz?')) {
        window.close();
    }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    togglePause();
});

document.getElementById('menuFromGameBtn').addEventListener('click', () => {
    if (confirm('Ana menüye dönmek istediğinize emin misiniz? İlerleme kaydedilmeyecek.')) {
        showScreen('mainMenu');
        gameState.isPlaying = false;
    }
});

document.getElementById('resumeBtn').addEventListener('click', () => {
    togglePause();
});

document.getElementById('menuFromPauseBtn').addEventListener('click', () => {
    showScreen('mainMenu');
    gameState.isPlaying = false;
});

// Ayarlar
document.getElementById('seasonSelect').addEventListener('change', (e) => {
    settings.season = e.target.value;
});

document.getElementById('roadSelect').addEventListener('change', (e) => {
    settings.roadType = e.target.value;
});

document.getElementById('carSelect').addEventListener('change', (e) => {
    settings.carType = e.target.value;
    updatePlayerColor();
});

document.getElementById('soundToggle').addEventListener('change', (e) => {
    gameState.soundEnabled = e.target.checked;
});

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    gameState.screen = screenId;
}

function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    document.getElementById('pauseMenu').classList.toggle('hidden');
}

// Oyuncu Renk Güncelleme
function updatePlayerColor() {
    const colorMap = {
        red: '#e53e3e',
        blue: '#3182ce',
        green: '#38a169',
        yellow: '#d69e2e',
        purple: '#805ad5'
    };
    player.color = colorMap[settings.carType] || '#e53e3e';
}

updatePlayerColor();

// Klavye Kontrolleri
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        movePlayer(-1);
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        movePlayer(1);
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Touch Kontrolleri
let touchControls = document.createElement('div');
touchControls.className = 'touch-controls';
touchControls.innerHTML = `
    <button class="touch-btn" id="leftBtn">◀</button>
    <button class="touch-btn" id="rightBtn">▶</button>
`;
document.getElementById('gameScreen').appendChild(touchControls);

// Touch ve Mouse kontrolleri
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

[leftBtn, rightBtn].forEach((btn, index) => {
    const isLeft = index === 0;
    
    // Touch events
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (isLeft) touchLeft = true;
        else touchRight = true;
    });
    
    btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (isLeft) touchLeft = false;
        else touchRight = false;
    });
    
    // Mouse events (mobil için de çalışır)
    btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (isLeft) touchLeft = true;
        else touchRight = true;
    });
    
    btn.addEventListener('mouseup', (e) => {
        e.preventDefault();
        if (isLeft) touchLeft = false;
        else touchRight = false;
    });
    
    btn.addEventListener('mouseleave', () => {
        if (isLeft) touchLeft = false;
        else touchRight = false;
    });
});

// Oyuncu Hareketi
function movePlayer(direction) {
    const roadWidth = canvas.width * roadConfigs[settings.roadType].width;
    const roadX = (canvas.width - roadWidth) / 2;
    const minX = roadX + player.width / 2;
    const maxX = roadX + roadWidth - player.width / 2;
    
    player.x += player.speed * direction;
    player.x = Math.max(minX, Math.min(maxX, player.x));
}

// Oyun Başlatma
function startGame() {
    gameState.isPlaying = true;
    gameState.isPaused = false;
    gameState.score = 0;
    gameState.gold = 0;
    gameState.level = 1;
    gameState.speed = 2;
    enemyCars = [];
    coins = [];
    player.x = canvas.width / 2;
    
    updateUI();
    gameLoop();
}

// Düşman Araba Oluşturma
function createEnemyCar() {
    const roadWidth = canvas.width * roadConfigs[settings.roadType].width;
    const roadX = (canvas.width - roadWidth) / 2;
    const lanes = roadConfigs[settings.roadType].lanes;
    const laneWidth = roadWidth / lanes;
    
    const lane = Math.floor(Math.random() * lanes);
    const x = roadX + (lane + 0.5) * laneWidth;
    
    enemyCars.push({
        x: x,
        y: -100,
        width: 50,
        height: 90,
        speed: gameState.speed + Math.random() * 2,
        color: carColors[Math.floor(Math.random() * carColors.length)]
    });
}

// Altın Oluşturma
function createCoin() {
    const roadWidth = canvas.width * roadConfigs[settings.roadType].width;
    const roadX = (canvas.width - roadWidth) / 2;
    
    coins.push({
        x: roadX + Math.random() * roadWidth,
        y: -30,
        radius: 15,
        speed: gameState.speed + 1,
        collected: false
    });
}

// Çarpışma Tespiti
function checkCollision(playerObj, carObj) {
    const pLeft = playerObj.x - playerObj.width / 2;
    const pRight = playerObj.x + playerObj.width / 2;
    const pTop = playerObj.y;
    const pBottom = playerObj.y + playerObj.height;
    
    const cLeft = carObj.x - carObj.width / 2;
    const cRight = carObj.x + carObj.width / 2;
    const cTop = carObj.y;
    const cBottom = carObj.y + carObj.height;
    
    return pLeft < cRight && pRight > cLeft && pTop < cBottom && pBottom > cTop;
}

// Altın Toplama Tespiti
function checkCoinCollection(coin, player) {
    const dx = coin.x - player.x;
    const dy = coin.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < coin.radius + player.width / 2;
}

// Oyun Güncelleme
function updateGame() {
    if (!gameState.isPlaying || gameState.isPaused) return;
    
    // Kontroller
    if (keys['ArrowLeft'] || keys['a'] || keys['A'] || touchLeft) {
        movePlayer(-1);
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D'] || touchRight) {
        movePlayer(1);
    }
    
    // Düşman araba oluşturma
    if (Math.random() < 0.02) {
        createEnemyCar();
    }
    
    // Altın oluşturma
    if (Math.random() < 0.01) {
        createCoin();
    }
    
    // Düşman arabaları güncelle
    for (let i = enemyCars.length - 1; i >= 0; i--) {
        const car = enemyCars[i];
        car.y += car.speed;
        
        // Çarpışma kontrolü
        if (checkCollision(player, car)) {
            gameState.gold = Math.max(0, gameState.gold - 3);
            enemyCars.splice(i, 1);
            updateUI();
            continue;
        }
        
        // Araba geçme kontrolü (düşman araba player'ın arkasına geçtiğinde)
        if (!car.passed && car.y > player.y + player.height) {
            car.passed = true;
            gameState.score += 10;
            updateUI();
        }
        
        // Ekrandan çıkan arabaları kaldır
        if (car.y > canvas.height) {
            enemyCars.splice(i, 1);
        }
    }
    
    // Altınları güncelle
    for (let i = coins.length - 1; i >= 0; i--) {
        const coin = coins[i];
        if (coin.collected) {
            coins.splice(i, 1);
            continue;
        }
        
        coin.y += coin.speed;
        
        // Altın toplama kontrolü
        if (checkCoinCollection(coin, player)) {
            gameState.gold += 1;
            coin.collected = true;
            coins.splice(i, 1);
            updateUI();
        }
        
        // Ekrandan çıkan altınları kaldır
        if (coin.y > canvas.height) {
            coins.splice(i, 1);
        }
    }
    
    // Bölüm kontrolü
    const newLevel = Math.floor(gameState.score / 1000) + 1;
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        gameState.speed += 0.5;
        updateUI();
    }
}

// Oyun Çizimi
function drawGame() {
    const colors = seasonColors[settings.season];
    const roadWidth = canvas.width * roadConfigs[settings.roadType].width;
    const roadX = (canvas.width - roadWidth) / 2;
    const lanes = roadConfigs[settings.roadType].lanes;
    
    // Gökyüzü
    ctx.fillStyle = colors.sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Çimen
    ctx.fillStyle = colors.grass;
    ctx.fillRect(0, 0, roadX, canvas.height);
    ctx.fillRect(roadX + roadWidth, 0, canvas.width - (roadX + roadWidth), canvas.height);
    
    // Yol
    ctx.fillStyle = colors.road;
    ctx.fillRect(roadX, 0, roadWidth, canvas.height);
    
    // Yol çizgileri
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.setLineDash([20, 20]);
    for (let i = 1; i < lanes; i++) {
        const lineX = roadX + (roadWidth / lanes) * i;
        ctx.beginPath();
        ctx.moveTo(lineX, 0);
        ctx.lineTo(lineX, canvas.height);
        ctx.stroke();
    }
    ctx.setLineDash([]);
    
    // Orta çizgi
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(roadX + roadWidth / 2, 0);
    ctx.lineTo(roadX + roadWidth / 2, canvas.height);
    ctx.stroke();
    
    // Düşman arabalar
    enemyCars.forEach(car => {
        drawCar(car.x, car.y, car.width, car.height, car.color);
    });
    
    // Altınlar
    coins.forEach(coin => {
        if (!coin.collected) {
            drawCoin(coin.x, coin.y, coin.radius);
        }
    });
    
    // Oyuncu arabası
    drawCar(player.x, player.y, player.width, player.height, player.color);
}

// Araba Çizimi
function drawCar(x, y, width, height, color) {
    // Araba gövdesi
    ctx.fillStyle = color;
    ctx.fillRect(x - width/2, y, width, height);
    
    // Araba camı
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(x - width/2 + 5, y + 10, width - 10, height * 0.3);
    
    // Tekerlekler
    ctx.fillStyle = '#1a1a1a';
    const wheelWidth = width * 0.3;
    const wheelHeight = 15;
    
    // Ön tekerlekler
    ctx.fillRect(x - width/2 - 3, y + height * 0.3, wheelWidth, wheelHeight);
    ctx.fillRect(x + width/2 - wheelWidth + 3, y + height * 0.3, wheelWidth, wheelHeight);
    
    // Arka tekerlekler
    ctx.fillRect(x - width/2 - 3, y + height * 0.7, wheelWidth, wheelHeight);
    ctx.fillRect(x + width/2 - wheelWidth + 3, y + height * 0.7, wheelWidth, wheelHeight);
}

// Altın Çizimi
function drawCoin(x, y, radius) {
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#ffaa00';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Altın içi detay
    ctx.fillStyle = '#ffed4e';
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.7, 0, Math.PI * 2);
    ctx.fill();
    
    // $ işareti
    ctx.fillStyle = '#ffaa00';
    ctx.font = `${radius}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', x, y);
}

// UI Güncelleme
function updateUI() {
    document.getElementById('scoreDisplay').textContent = gameState.score;
    document.getElementById('goldDisplay').textContent = gameState.gold;
    document.getElementById('levelDisplay').textContent = gameState.level;
}

// Oyun Döngüsü
function gameLoop() {
    if (!gameState.isPlaying) return;
    
    updateGame();
    drawGame();
    
    requestAnimationFrame(gameLoop);
}

// İlk ekran
showScreen('mainMenu');