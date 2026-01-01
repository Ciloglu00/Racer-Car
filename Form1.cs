using System;
using System.Drawing;
using System.Windows.Forms;

namespace ColorChanger
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnRed_Click(object sender, EventArgs e)
        {
            this.BackColor = Color.Red;
        }

        private void btnBlue_Click(object sender, EventArgs e)
        {
            this.BackColor = Color.Blue;
        }

        private void btnGreen_Click(object sender, EventArgs e)
        {
            this.BackColor = Color.Green;
        }

        private void btnPurple_Click(object sender, EventArgs e)
        {
            this.BackColor = Color.Purple;
        }

        private void btnBlack_Click(object sender, EventArgs e)
        {
            this.BackColor = Color.Black;
        }

        private void btnGray_Click(object sender, EventArgs e)
        {
            this.BackColor = Color.Gray;
        }
    }
}


