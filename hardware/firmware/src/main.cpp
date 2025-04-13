#include <Arduino.h>

#include <ArduinoBLE.h>
#include "gpio.h"
#include "braille.h"

// BLE UUIDs for services and characteristics
#define DOTS_SERVICE_UUID             "fc2d7374-8a34-4927-88fd-d85d70c3f361"
#define DOTS_CHARACTERISTIC_UUID      "fc2d7374-8a34-4927-88fd-d85d70c3f362"

#define BUTTON_SERVICE_UUID           "fc2d7374-8a34-4927-88fd-d85d70c3f363"
#define BUTTON_CHARACTERISTIC_UUID    "fc2d7374-8a34-4927-88fd-d85d70c3f364"

// BLE service and characteristic definitions
BLEService dotsService(DOTS_SERVICE_UUID);
BLECharacteristic dotsCharacteristic(DOTS_CHARACTERISTIC_UUID, BLEWrite | BLERead | BLEWriteWithoutResponse, 1);

BLEService buttonService(BUTTON_SERVICE_UUID);
BLECharacteristic buttonCharacteristic(BUTTON_CHARACTERISTIC_UUID, BLERead | BLENotify, 1);


// Characteristic callback prototypes
void onDotsCharacteristicWrite(BLEDevice central, BLECharacteristic characteristic);
void onDotsCharacteristicRead(BLEDevice central, BLECharacteristic characteristic);
void onButtonCharacteristicRead(BLEDevice central, BLECharacteristic characteristic);



void setup(){
  // Initialize serial communication for debugging
  Serial.begin(115200);
  Serial.println("Starting Fingertip Braille Display...");
  // Initialize GPIO
  initGPIO();
  Serial.println("GPIO initialized.");
  // Try to initialize BLE
  if (!BLE.begin()){
    Serial.println("Failed to initialized BLE!");
    while (1);
  }
  Serial.println("BLE initialized.");
  // Set the local name and service UUIDs
  BLE.setLocalName("Fingertip");
  BLE.setDeviceName("Fingertip");
  BLE.setAdvertisedService(dotsService);

  // Add the characteristics to the services
  dotsService.addCharacteristic(dotsCharacteristic);
  buttonService.addCharacteristic(buttonCharacteristic);

  // Set event handlers for the characteristics
  dotsCharacteristic.setEventHandler(BLEWritten, onDotsCharacteristicWrite);
  dotsCharacteristic.setEventHandler(BLERead, onDotsCharacteristicRead);
  buttonCharacteristic.setEventHandler(BLERead, onButtonCharacteristicRead);

  // Set the initial values
  dotsCharacteristic.writeValue(0); // Set initial value for dots characteristic
  buttonCharacteristic.writeValue(0); // Set initial value for button characteristic

  // Add the services to BLE
  BLE.addService(dotsService);
  BLE.addService(buttonService);
  

  BLE.advertise();
}

void loop(){
  while (BLE.connected()){
    uint8_t presses = getButtonPresses(); // Get button presses
    if (presses) {
      Serial.print("Button presses detected: ");
      Serial.println(presses, BIN); // Print button presses in binary format
      buttonCharacteristic.writeValue(presses); // Notify the central device about button presses
      toggleDots(presses); // Toggle the corresponding dots
    }
    vTaskDelay(100);
  }
}


void onDotsCharacteristicWrite(BLEDevice central, BLECharacteristic characteristic) {
  // Read the value from the characteristic and set the dots accordingly
  char letter = characteristic.value()[0];
  uint8_t states = charToBraille(letter); // Convert character to braille
  setDots(charToBraille(states)); // Convert character to braille and set the dots
  Serial.print("Dots set to: ");
  Serial.print(letter); // Print the character received
  Serial.print(", ");
  Serial.println(states, BIN); // Print the state of the dots in binary format
}

void onDotsCharacteristicRead(BLEDevice central, BLECharacteristic characteristic) {
  // Read the current state of the dots and send it back to the central device
  uint8_t states = getDots();
  char letter = brailleToChar(states); // Convert braille to character
  characteristic.writeValue(letter);
  Serial.print("Dots read: ");
  Serial.print(letter); // Print the character received
  Serial.print(", ");
  Serial.println(states, BIN); // Print the state of the dots in binary format
}

void onButtonCharacteristicRead(BLEDevice central, BLECharacteristic characteristic) {
  // Read the current state of the buttons and send it back to the central device
  uint8_t states = getButtonPresses();
  characteristic.writeValue(states);
  Serial.print("Buttons read: ");
  Serial.println(states, BIN); // Print the state of the buttons in binary format
}