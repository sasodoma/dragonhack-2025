/* Firmware for the Fingertip Braille Display
 * Authors: Piškotki
 */

#include <Arduino.h>
#include "gpio.h"

void setup() {
  Serial.begin(115200);
  Serial.println("Starting Fingertip Braille Display...");
  initGPIO(); // Initialize GPIO pins
  Serial.println("GPIO initialized.");
}

void loop() {
  uint8_t presses = getButtonPresses(); // Get button presses
  if (presses) {
    Serial.print("Button presses detected: ");
    Serial.println(presses, BIN); // Print button presses in binary format
  }
  delay(100); // Delay for a short period to avoid flooding the serial output
}