namespace ColorChanger
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnRed = new System.Windows.Forms.Button();
            this.btnBlue = new System.Windows.Forms.Button();
            this.btnGreen = new System.Windows.Forms.Button();
            this.btnPurple = new System.Windows.Forms.Button();
            this.btnBlack = new System.Windows.Forms.Button();
            this.btnGray = new System.Windows.Forms.Button();
            this.lblTitle = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // btnRed
            // 
            this.btnRed.BackColor = System.Drawing.Color.Red;
            this.btnRed.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnRed.ForeColor = System.Drawing.Color.White;
            this.btnRed.Location = new System.Drawing.Point(50, 100);
            this.btnRed.Name = "btnRed";
            this.btnRed.Size = new System.Drawing.Size(150, 60);
            this.btnRed.TabIndex = 0;
            this.btnRed.Text = "Kırmızı";
            this.btnRed.UseVisualStyleBackColor = false;
            this.btnRed.Click += new System.EventHandler(this.btnRed_Click);
            // 
            // btnBlue
            // 
            this.btnBlue.BackColor = System.Drawing.Color.Blue;
            this.btnBlue.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnBlue.ForeColor = System.Drawing.Color.White;
            this.btnBlue.Location = new System.Drawing.Point(250, 100);
            this.btnBlue.Name = "btnBlue";
            this.btnBlue.Size = new System.Drawing.Size(150, 60);
            this.btnBlue.TabIndex = 1;
            this.btnBlue.Text = "Mavi";
            this.btnBlue.UseVisualStyleBackColor = false;
            this.btnBlue.Click += new System.EventHandler(this.btnBlue_Click);
            // 
            // btnGreen
            // 
            this.btnGreen.BackColor = System.Drawing.Color.Green;
            this.btnGreen.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnGreen.ForeColor = System.Drawing.Color.White;
            this.btnGreen.Location = new System.Drawing.Point(450, 100);
            this.btnGreen.Name = "btnGreen";
            this.btnGreen.Size = new System.Drawing.Size(150, 60);
            this.btnGreen.TabIndex = 2;
            this.btnGreen.Text = "Yeşil";
            this.btnGreen.UseVisualStyleBackColor = false;
            this.btnGreen.Click += new System.EventHandler(this.btnGreen_Click);
            // 
            // btnPurple
            // 
            this.btnPurple.BackColor = System.Drawing.Color.Purple;
            this.btnPurple.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnPurple.ForeColor = System.Drawing.Color.White;
            this.btnPurple.Location = new System.Drawing.Point(50, 200);
            this.btnPurple.Name = "btnPurple";
            this.btnPurple.Size = new System.Drawing.Size(150, 60);
            this.btnPurple.TabIndex = 3;
            this.btnPurple.Text = "Mor";
            this.btnPurple.UseVisualStyleBackColor = false;
            this.btnPurple.Click += new System.EventHandler(this.btnPurple_Click);
            // 
            // btnBlack
            // 
            this.btnBlack.BackColor = System.Drawing.Color.Black;
            this.btnBlack.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnBlack.ForeColor = System.Drawing.Color.White;
            this.btnBlack.Location = new System.Drawing.Point(250, 200);
            this.btnBlack.Name = "btnBlack";
            this.btnBlack.Size = new System.Drawing.Size(150, 60);
            this.btnBlack.TabIndex = 4;
            this.btnBlack.Text = "Siyah";
            this.btnBlack.UseVisualStyleBackColor = false;
            this.btnBlack.Click += new System.EventHandler(this.btnBlack_Click);
            // 
            // btnGray
            // 
            this.btnGray.BackColor = System.Drawing.Color.Gray;
            this.btnGray.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnGray.ForeColor = System.Drawing.Color.White;
            this.btnGray.Location = new System.Drawing.Point(450, 200);
            this.btnGray.Name = "btnGray";
            this.btnGray.Size = new System.Drawing.Size(150, 60);
            this.btnGray.TabIndex = 5;
            this.btnGray.Text = "Gri";
            this.btnGray.UseVisualStyleBackColor = false;
            this.btnGray.Click += new System.EventHandler(this.btnGray_Click);
            // 
            // lblTitle
            // 
            this.lblTitle.AutoSize = true;
            this.lblTitle.Font = new System.Drawing.Font("Microsoft Sans Serif", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblTitle.ForeColor = System.Drawing.Color.Black;
            this.lblTitle.Location = new System.Drawing.Point(200, 30);
            this.lblTitle.Name = "lblTitle";
            this.lblTitle.Size = new System.Drawing.Size(300, 29);
            this.lblTitle.TabIndex = 6;
            this.lblTitle.Text = "Arka Plan Renk Değiştirici";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(650, 320);
            this.Controls.Add(this.lblTitle);
            this.Controls.Add(this.btnGray);
            this.Controls.Add(this.btnBlack);
            this.Controls.Add(this.btnPurple);
            this.Controls.Add(this.btnGreen);
            this.Controls.Add(this.btnBlue);
            this.Controls.Add(this.btnRed);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Arka Plan Renk Değiştirici";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnRed;
        private System.Windows.Forms.Button btnBlue;
        private System.Windows.Forms.Button btnGreen;
        private System.Windows.Forms.Button btnPurple;
        private System.Windows.Forms.Button btnBlack;
        private System.Windows.Forms.Button btnGray;
        private System.Windows.Forms.Label lblTitle;
    }
}


