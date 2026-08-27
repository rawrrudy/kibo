/*
This is the current firmware for the first version (v1) of Kibo.
 */

#include <Arduino.h>
#include <WiFi.h>
#include <esp_system.h>
#include <esp_chip_info.h>

// Kibo config

#define KIBO_NAME       "Kibo"
#define KIBO_VERSION    "0.1.0"

#define SERIAL_BAUD     115200

// Serial commd buffer

String commandBuffer = "";

// Function declarations

void printBanner();
void printHelp();
void printStatus();
void printInfo();
void printResetReason();

void scanWiFi();
void connectWiFi(String ssid, String password);
void disconnectWiFi();

void processCommand(String command);

// Setup

void setup()
{
    // Start USB serial comm

    Serial.begin(SERIAL_BAUD);

    delay(500);

    // Wifi 

    WiFi.mode(WIFI_STA);

    WiFi.disconnect(true, true);

    delay(100);

    // Startup info

    printBanner();

    Serial.println("[BOOT] Initializing Kibo...");

    Serial.println("[BOOT] ESP32 initialization OK");

    Serial.print("[BOOT] Firmware: ");
    Serial.print(KIBO_NAME);
    Serial.print(" ");
    Serial.println(KIBO_VERSION);

    Serial.print("[BOOT] CPU frequency: ");
    Serial.print(ESP.getCpuFreqMHz());
    Serial.println(" MHz");

    Serial.print("[BOOT] Flash size: ");
    Serial.print(ESP.getFlashChipSize());
    Serial.println(" bytes");

    Serial.print("[BOOT] Free heap: ");
    Serial.print(ESP.getFreeHeap());
    Serial.println(" bytes");

    printResetReason();

    Serial.println("[BOOT] Kibo V1 ready.");
    Serial.println("[BOOT] Type 'help' for available commands.");
    Serial.println();
}


// Main loop

void loop()
{
    /*
     * Read commands from the USB serial interface.
     *
     * The CP2102N converts USB communication from the computer
     * into UART communication for the ESP32.
     */

    while (Serial.available())
    {
        char incoming = Serial.read();

        // Command complete

        if (incoming == '\n' || incoming == '\r')
        {
            if (commandBuffer.length() > 0)
            {
                processCommand(commandBuffer);

                commandBuffer = "";
            }
        }


        // Add character to commd buffer

        else
        {
            if (commandBuffer.length() < 160)
            {
                commandBuffer += incoming;
            }
        }
    }



    delay(2);
}


// Start banner

void printBanner()
{
    Serial.println();
    Serial.println("========================================");
    Serial.println("              KIBO V1");
    Serial.println("        ESP32-WROOM-32 Firmware");
    Serial.println("========================================");
    Serial.println();
}

// Helpp

void printHelp()
{
    Serial.println();
    Serial.println("Kibo Commands");
    Serial.println("----------------------------------------");

    Serial.println("help");
    Serial.println("  Show available commands.");

    Serial.println();

    Serial.println("status");
    Serial.println("  Show Kibo runtime status.");

    Serial.println();

    Serial.println("info");
    Serial.println("  Show ESP32 hardware information.");

    Serial.println();

    Serial.println("version");
    Serial.println("  Show Kibo firmware version.");

    Serial.println();

    Serial.println("reset");
    Serial.println("  Restart Kibo.");

    Serial.println();

    Serial.println("wifi scan");
    Serial.println("  Scan for nearby Wi-Fi networks.");

    Serial.println();

    Serial.println("wifi status");
    Serial.println("  Show Wi-Fi connection status.");

    Serial.println();

    Serial.println("wifi connect SSID PASSWORD");
    Serial.println("  Connect to a Wi-Fi network.");

    Serial.println();

    Serial.println("wifi disconnect");
    Serial.println("  Disconnect from Wi-Fi.");

    Serial.println("----------------------------------------");
    Serial.println();
}


// Status

void printStatus()
{
    Serial.println();
    Serial.println("============== KIBO STATUS ==============");

    Serial.print("Device: ");
    Serial.println(KIBO_NAME);

    Serial.print("Firmware: ");
    Serial.println(KIBO_VERSION);

    Serial.print("Uptime: ");
    Serial.print(millis());
    Serial.println(" ms");

    Serial.print("Free heap: ");
    Serial.print(ESP.getFreeHeap());
    Serial.println(" bytes");

    Serial.print("Wi-Fi: ");

    if (WiFi.status() == WL_CONNECTED)
    {
        Serial.println("CONNECTED");

        Serial.print("SSID: ");
        Serial.println(WiFi.SSID());

        Serial.print("IP address: ");
        Serial.println(WiFi.localIP());

        Serial.print("Signal strength: ");
        Serial.print(WiFi.RSSI());
        Serial.println(" dBm");
    }
    else
    {
        Serial.println("DISCONNECTED");
    }

    Serial.println("==========================================");
    Serial.println();
}


// ESP32 info

void printInfo()
{
    esp_chip_info_t chipInfo;

    esp_chip_info(&chipInfo);


    Serial.println();
    Serial.println("=========== ESP32 INFORMATION ===========");

    Serial.print("Chip: ");
    Serial.println(ESP.getChipModel());

    Serial.print("Chip revision: ");
    Serial.println(ESP.getChipRevision());

    Serial.print("CPU cores: ");
    Serial.println(chipInfo.cores);

    Serial.print("CPU frequency: ");
    Serial.print(ESP.getCpuFreqMHz());
    Serial.println(" MHz");

    Serial.print("Flash size: ");
    Serial.print(ESP.getFlashChipSize());
    Serial.println(" bytes");

    Serial.print("SDK version: ");
    Serial.println(ESP.getSdkVersion());

    Serial.print("MAC address: ");
    Serial.println(WiFi.macAddress());

    Serial.println("==========================================");
    Serial.println();
}

// RESET reason 

void printResetReason()
{
    esp_reset_reason_t reason = esp_reset_reason();

    Serial.print("[BOOT] Reset reason: ");

    switch (reason)
    {
        case ESP_RST_POWERON:
            Serial.println("Power-on reset");
            break;

        case ESP_RST_EXT:
            Serial.println("External reset");
            break;

        case ESP_RST_SW:
            Serial.println("Software reset");
            break;

        case ESP_RST_PANIC:
            Serial.println("Panic / exception");
            break;

        case ESP_RST_INT_WDT:
            Serial.println("Interrupt watchdog");
            break;

        case ESP_RST_TASK_WDT:
            Serial.println("Task watchdog");
            break;

        case ESP_RST_WDT:
            Serial.println("Watchdog");
            break;

        case ESP_RST_BROWNOUT:
            Serial.println("Brownout");
            break;

        case ESP_RST_DEEPSLEEP:
            Serial.println("Deep sleep");
            break;

        default:
            Serial.println("Unknown");
            break;
    }
}


// Wifi scan

void scanWiFi()
{
    Serial.println();
    Serial.println("[WIFI] Scanning...");

    int networkCount = WiFi.scanNetworks();


    if (networkCount < 0)
    {
        Serial.println("[WIFI] Scan failed.");
        return;
    }


    if (networkCount == 0)
    {
        Serial.println("[WIFI] No networks found.");
    }

    else
    {
        Serial.print("[WIFI] Networks found: ");
        Serial.println(networkCount);

        Serial.println();

        for (int i = 0; i < networkCount; i++)
        {
            Serial.print(i + 1);
            Serial.print(": ");

            Serial.print(WiFi.SSID(i));

            Serial.print(" | RSSI: ");

            Serial.print(WiFi.RSSI(i));

            Serial.print(" dBm | ");

            if (WiFi.encryptionType(i) == WIFI_AUTH_OPEN)
            {
                Serial.println("OPEN");
            }
            else
            {
                Serial.println("SECURED");
            }
        }
    }


    WiFi.scanDelete();

    Serial.println();
}


// Connect Wifi

void connectWiFi(String ssid, String password)
{
    if (ssid.length() == 0)
    {
        Serial.println("[WIFI] SSID cannot be empty.");
        return;
    }


    Serial.print("[WIFI] Connecting to: ");
    Serial.println(ssid);


    WiFi.mode(WIFI_STA);

    WiFi.begin(ssid.c_str(), password.c_str());


    unsigned long startTime = millis();


    while (
        WiFi.status() != WL_CONNECTED &&
        millis() - startTime < 15000
    )
    {
        delay(250);

        Serial.print(".");
    }


    Serial.println();


    if (WiFi.status() == WL_CONNECTED)
    {
        Serial.println("[WIFI] Connected!");

        Serial.print("[WIFI] IP address: ");
        Serial.println(WiFi.localIP());

        Serial.print("[WIFI] Signal strength: ");
        Serial.print(WiFi.RSSI());
        Serial.println(" dBm");
    }

    else
    {
        Serial.println("[WIFI] Connection failed.");

        WiFi.disconnect();
    }
}


// Disconnect Wifi

void disconnectWiFi()
{
    WiFi.disconnect();

    Serial.println("[WIFI] Disconnected.");
}


// Commmd processing

void processCommand(String command)
{
    command.trim();


    // Help

    if (command.equalsIgnoreCase("help"))
    {
        printHelp();
    }


    // Status

    else if (command.equalsIgnoreCase("status"))
    {
        printStatus();
    }


    // Info

    else if (command.equalsIgnoreCase("info"))
    {
        printInfo();
    }


    // Version

    else if (command.equalsIgnoreCase("version"))
    {
        Serial.print(KIBO_NAME);
        Serial.print(" firmware version ");
        Serial.println(KIBO_VERSION);
    }


    // Reset

    else if (command.equalsIgnoreCase("reset"))
    {
        Serial.println("[SYSTEM] Restarting Kibo...");

        delay(100);

        ESP.restart();
    }


    // Wifi scan

    else if (command.equalsIgnoreCase("wifi scan"))
    {
        scanWiFi();
    }


    // Wifi status

    else if (command.equalsIgnoreCase("wifi status"))
    {
        printStatus();
    }


    // Wifi disconnect

    else if (command.equalsIgnoreCase("wifi disconnect"))
    {
        disconnectWiFi();
    }


    // Wifi connect

    else if (command.startsWith("wifi connect "))
    {
        String arguments = command.substring(13);

        int separator = arguments.indexOf(' ');


        if (separator <= 0)
        {
            Serial.println(
                "[WIFI] Usage: wifi connect SSID PASSWORD"
            );

            return;
        }


        String ssid =
            arguments.substring(0, separator);

        String password =
            arguments.substring(separator + 1);


        connectWiFi(ssid, password);
    }


    // unknown

    else
    {
        Serial.print("[ERROR] Unknown command: ");

        Serial.println(command);

        Serial.println(
            "[INFO] Type 'help' to see available commands."
        );
    }
}
