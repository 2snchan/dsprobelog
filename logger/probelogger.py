import time
import datetime
import subprocess
import netaddr
import sys
import logging
from scapy.all import *
from pprint import pprint
from logging.handlers import RotatingFileHandler
import requests
from keys.py import codekey

last_update = time.time()

def update(value):
	code = 2
	baseURL = "https://ksadensity.com/inbound.php?id="
	valueParam = "&data="
	URL = baseURL+str(codekey(code))+valueParam+str(value)
	response = requests.get(URL)
	return response.status_code

class device():
	def __init__(self,interval):
		self.data = dict()
		self.number = 0
		self.interval = interval
	def __str__(self):
		return self.number

	def insert(self,time,macaddr,target,name,rssi_value):
		#if target == 'KSA'.encode() or target == 'KSA_SUB'.encode:	

		#if abs(rssi_value) < 200 :
		#	return
		
		if macaddr in self.data:
			self.data[macaddr][0] = time
		else:
			self.data[macaddr] = [time,target,name,rssi_value]
		return
	
	def update(self):
		L = []
		interval = self.interval
		for key in self.data:
			if time.time() - int(self.data[key][0]) > interval :
				print("Device  " + str(key) +"  Depeted")
				L.append(key)
		for i in L:
			del self.data[i]
		return
	
	def calculate(self):
		self.number = len(self.data)
		return self.number

	def printlist(self):
		for key in self.data:
			print("Device Name : " + str(self.data[key][2][0:10]) + " Rssi_Value : "+str(self.data[key][3]))
		return

def build_packet_callback(device,option):
	def packet_callback(packet):
		global last_update
		if not packet.haslayer(Dot11):
			return

		if packet.type != 0 or packet.subtype != 0x04:
			return
		
		logtime = (int(time.time()))
		addr = packet.addr2
		
		try:
			parsed_mac = netaddr.EUI(packet.addr2)
			name = parsed_mac.oui.registration().org
		except netaddr.core.NotRegisteredError:
			name = 'UNKNOWN'

		target = packet.info
		rssi_value = packet.dBm_AntSignal
		device.insert(logtime,addr,target,name,rssi_value)
		device.update()
		number = device.calculate()

		print("number of devices at "+str(time.time())+" is "+str(number))
		
		if time.time() - last_update >= 30 :
			print(update(number))
			last_update = time.time()
			print("logged")

		if option:
			device.printlist()

	return packet_callback

def main():
	interface = "wlx7cc2c6026fb5"
	
	#subprocess.call('sudo rmmod r8188eu.ko',shell=True)
	#subprocess.call('sudo ifconfig wlx7cc2c6026fb5 down',shell=True)
	#subprocess.call('sudo iwconfig wlx7cc2c6026fb5 mode monitor',shell=True)
	#subprocess.call('sudo ifconfig wlx7cc2c6026fb5 up',shell=True)

	option, interval = False, 60
	data = device(int(interval))
	built_packet_cb = build_packet_callback(data,option)
	
	print("Logging start")
	sniff(iface=interface, prn=built_packet_cb, store=0)

if __name__ == '__main__':
	main()
