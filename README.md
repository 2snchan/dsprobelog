# DSprobelog
## 2021 KSA DataStructure Project
Copyright 19-068 Seungchan Lee, 19-006 Soonho Kwon  

Service Website on ksadensity.com  
8188eu.ko -> monitor mode driver file (C compiled)  
probelogger.py -> logging & updating file  
init.sh -> Driver install code for ubuntu 18.04  
start.sh -> Start code for ubuntu 18.04

## Instructions
First, we use modprobe functions to force reinstall drivers.  
~~~sudo lsmod | grep 8188  
sudo rmmod r8188eu.ko  
sudo rmmod 8188eu.ko  
sudo insmod 8188eu.ko  
~~~
Next, use iwconfig to determine wlan interface name.  
~~~
iwconfig
~~~
Then, restart iface and change mode into monitor mode.  
~~~
sudo ifconfig wlx7cc2c6026fb5 down  
sudo iwconfig wlx7cc2c6026fb5 mode monitor  
sudo ifconfig wlx7cc2c6026fb5 up  
~~~
We can start probelogger.py with start.sh then.  
~~~
sudo ./start.sh  
~~~  
  
## TpLink Archer T4U Driver Install (Ubuntu 18.04)  
First, install dkms using apt.  
~~~
sudo apt-get update  
sudo apt-get install -y dkms git
~~~  
Next, clone repository and run install script.  
~~~
git clone https://github.com/morrownr/88x2bu.git  
cd 88x2bu  
sudo ./install-driver.sh
~~~  
Lastly, reboot device.  
~~~
sudo reboot
~~~
