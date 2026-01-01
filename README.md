# Arka Plan Renk Değiştirici - C# Windows Forms Uygulaması

Bu uygulama, Windows bilgisayarlarda çalışan bir masaüstü uygulamasıdır. 6 farklı renk butonu ile formun arka plan rengini değiştirebilirsiniz.

## Özellikler

- 6 renk butonu: Kırmızı, Mavi, Yeşil, Mor, Siyah, Gri
- Her butona tıklandığında formun arka plan rengi değişir
- Windows Forms ile geliştirilmiştir
- .NET 6.0 framework kullanılmıştır

## Gereksinimler

- Windows işletim sistemi
- .NET 6.0 SDK veya üzeri
- Visual Studio 2022 veya Visual Studio Code (isteğe bağlı)

## Derleme ve Çalıştırma

### Visual Studio ile:

1. `ColorChanger.csproj` dosyasını Visual Studio'da açın
2. F5 tuşuna basarak çalıştırın veya Build > Build Solution ile derleyin

### Komut satırı ile:

1. Proje klasörüne gidin
2. Aşağıdaki komutları çalıştırın:

```bash
dotnet restore
dotnet build
dotnet run
```

### Çalıştırılabilir Dosya (.exe) Oluşturma:

```bash
dotnet publish -c Release -r win-x64 --self-contained false
```

Derlenmiş dosya `bin/Release/net6.0-windows/win-x64/publish/` klasöründe bulunacaktır.

## Kullanım

Uygulamayı başlattığınızda, ekranda 6 renk butonu görünecektir. Herhangi bir butona tıkladığınızda, formun arka plan rengi seçtiğiniz renge değişecektir.


