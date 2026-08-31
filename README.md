# Kibo
Say hi to Kibo! Kibo is a desktop companion robot that recognizes human emotions and responds through movement, sounds and visual feedback! 

This project was created for [Horizons | Hack Club](https://horizons.hackclub.com)!

---

<p align="center">
  <img src="images/cad%20images/KIBO_1.png" width="700">
</p>

---

## What is Kibo?

So the primary idea behind Kibo is for it to be a desktop companion that emotionally connects to people (especially teenagers) and keeps a track of their moods and emotions and to sort of create a register of behavioral patterns. It is designed to understand human emotions and respond through sound and visual feedback.

It has a lot of sensors and a custom designed PCB that pieces together Kibo!

<p align="center">
  <img src="images/journal images/logo.png" width="300">
</p>

---

## AI Usage
I only used AI in some parts of the frontend to make it look more user friendly and to add the mechanism of log in streaks. The entire rest of the project was made by me!

---

## Schematic and PCB Images

<details>
<summary><b>1. PCB Images</b></summary>

<br>
<p align="center">
  <img src="images/Kibo_PCB.png" width="500">
</p>
<p align="center">
 Image of the PCB used in Kibo!
</p>

<br>

<p align="center">
  <img src="images/Kibo_PCB3D.png" width="500">
</p>
<p align="center">
 3D view of the PCB used in Kibo!
</p>

<br>
</details>

<details>
<summary><b>2. Schematic Images</b></summary>

<br>

<p align="center">
  <img src="images/Kibo_Schematic.png" width="500">
</p>

<br>

<p align="center">
  <img src="images/Kibo_PWRMGMGT.png" width="500">
</p>

<br>

<p align="center">
 Schematic diagram of Kibo!
</p>

<br>
</details>

---

## How to Build/Run?
> Note: At the time of writing, this is the first version/prototype of Kibo. After getting my project reviewed and accepted, I plan on adding much more features and the firmware will change based on those factors!

Please check the [BOM](BOM.csv) before building this project!

<details>

<summary><b> Hardware </b></summary> 

<br>

1. Fabricate the PCB using the [Gerber](hardware/gerbers) files provided.
2. Solder the ESP32-WROOM-32 and supporting components onto the PCB.
3. Solder the USB-C connector, CP2102N, transistors, resistors, capacitors, and other components according to the PCB schematic.
4. Connect Kibo's external electronic components to their designated connections according to the final wiring diagram.
5. Mount the PCB and electronics inside the Kibo enclosure.
6. Position the speaker flat underneath the top lid, aligned with the integrated speaker grille.
7. Route all necessary wires through the enclosure openings and secure the components.
8. Close the enclosure and verify that no wires or components interfere with the lid.

</details>

<details>
<summary><b> Firmware Installation </b></summary> 
  
<br>

1. Install [Arduino IDE](https://www.arduino.cc/en/software/)
2. Install ESP32 board support through the Arduino IDE Board Manager.
3. Connect Kibo to your computer using the USB-C port.
4. Select the appropriate ESP32 board in Arduino IDE.
5. Select the COM port corresponding to Kibo's CP2102N USB interface.
6. Open the [firmware](hardware/firmware/kibo_v1.ino) files.
7. Compile the firmware to verify that there are no errors.
8. Upload the firmware to the ESP32.
9. Open the Serial Monitor at 115200 baud.
10. Confirm that Kibo prints its startup information and reports that the system is ready.

</details>

<details>
<summary><b> Wiring </b></summary> 
  
<br>

Connect all the electronic components of Kibo according to the schematic.

| Component | Connection / Function |
|------------|----------------|
| ESP32 WROOM 32 | Main controller |
| CP2102N | USB to UART communication|
| USB-C | Power + programming |
| SS8050 ×2 | Automatic boot |
| RESET button | ESP32 reset |
| BOOT button | ESP32 bootloader mode |
| Speaker | Audio Output |
| Sensors/peripherals | Connected according to the final Kibo wiring|

<p align="center">
  <img src="images/Kibo_Schematic.png" width="800">
</p>

Refer to the PCB schematic and hardware documentation in the [hardware](hardware) directory for detailed connections and pin assignments.

</details>

<details> 
<summary><b> Backend Setup </b></summary>
  
<br>

1. Navigate to the backend directory.
```bash
cd backend
```

2. Create and activate a Python virtual environment.
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- Linux / macOS:
```bash
source venv/bin/activate
```

4. Install dependencies.
```bash
pip install -r requirements.txt
```
5. Start the backend server using the project's configured entry point.
```bash
uvicorn app.main:app --reload
```
</details>

<details> 
<summary><b> Frontend Setup </b></summary> 
  
<br>

1. Navigate to the frontend directory.
```bash
cd frontend
```
2. Install dependencies.
```bash
npm install
```
3. Start the development server.
```bash
npm run dev
```
6. Open the URL displayed in the terminal.
7. Ensure the backend server is running and connected to the database.
8. Verify that the Kibo interface loads correctly.

</details>

<details>
<summary><b> Operation </b></summary>
  
<br>

1. Power on Kibo through USB-C.
2. Wait for the ESP32 to complete its startup sequence.
3. Open the Serial Monitor at 115200 baud.
4. Type:
```bash
help
```
5. Test the available commands:
```bash
status
info
version
```
6. Test Wi Fi discovery:
```bash
wifi scan
```
7. Verify that the ESP32 reports a successful connection and provides an IP address.
8. Verify communication between the hardware and software components.
9. Voila! Your very own version of the Kibo is ready!

</details>

---

## Images

<table>
  <tr>
    <td align="center">
      <img src="images/cad%20images/KIBO_1.png" width="400">
    </td>
    <td align="center">
      <img src="images/cad%20images/KIBO_2.png" width="400">
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="images/cad%20images/KIBO_3.png" width="400">
    </td>
    <td align="center">
      <img src="images/cad%20images/KIBO_4.png" width="400">
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="images/cad%20images/KIBO_5.png" width="400">
    </td>
    <td align="center">
      <img src="images/cad%20images/KIBO_6.png" width="400">
    </td>
  </tr>
</table>

## Acknowledgements
I would like to thank-

[KiCad](https://www.kicad.org/)

[Arduino](https://www.arduino.cc/)

and the entire team at [Horizons | Hack Club](https://horizons.hackclub.com) to conduct such an awesome experience!

## License 

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.










