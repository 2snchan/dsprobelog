sudo apt-get update
sudo apt-get install -y dkms git
mkdir src
cd src
git clone https://github.com/morrownr/88x2bu.git
cd 88x2bu
sudo ./install-driver.sh
