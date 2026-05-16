# Rodar no windows

1. Conectar divice via usb
2. no powershell, como adb:
   1. usbipd list
   2. usbipd bind --busid <busid do device>
   3. usbipd attach --wsl --busid <busid do device>
3. adb reverse tcp:8081 tcp:8081
