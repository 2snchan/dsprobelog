sudo rmmod r8188eu.ko
sudo insmod 8188eu.ko

sudo ifconfig wlx7cc2c6026fb5 down
sudo iwconfig wlx7cc2c6026fb5 mode monitor
sudo ifconfig wlx7cc2c6026fb5 up

sudo python probelogger.py
