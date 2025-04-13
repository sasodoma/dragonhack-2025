#include <Arduino.h>
#include "gpio.h"

/**** Pin numbers ****/
uint8_t dotPins[] = {4, 16, 17, 5, 18, 19};
uint8_t dotButtonPins[] = {33, 25, 26, 12, 14, 27};

void initGPIO() {
    // Set all dot pins as output and set them to LOW
    for (int i = 0; i < 6; i++) {
        pinMode(dotPins[i], OUTPUT);
        digitalWrite(dotPins[i], LOW);
    }
    
    // Set all button pins as input with pull-up resistors
    for (int i = 0; i < 6; i++) {
        pinMode(dotButtonPins[i], INPUT_PULLUP);
    }
}

void setDot(int dot, bool state) {
    if (dot < 1 || dot > 6) {
        Serial.println("Invalid dot number. Must be between 1 and 6.");
        return;
    }
    digitalWrite(dotPins[dot - 1], state);
}

bool getDot(int dot) {
    if (dot < 1 || dot > 6) {
        Serial.println("Invalid dot number. Must be between 1 and 6.");
        return false;
    }
    return digitalRead(dotPins[dot - 1]);
}

void toggleDot(int dot) {
    if (dot < 1 || dot > 6) {
        Serial.println("Invalid dot number. Must be between 1 and 6.");
        return;
    }
    bool currentState = digitalRead(dotPins[dot - 1]);
    digitalWrite(dotPins[dot - 1], !currentState);
}

void setDots(uint8_t states) {
    for (int i = 0; i < 6; i++) {
        digitalWrite(dotPins[i], (states & (1 << i)) ? HIGH : LOW);
    }
}

uint8_t getDots() {
    uint8_t states = 0;
    for (int i = 0; i < 6; i++) {
        if (digitalRead(dotPins[i])) {
            states |= (1 << i);
        }
    }
    return states;
}

void toggleDots(uint8_t dots) {
    for (int i = 0; i < 6; i++) {
        if (dots & (1 << i)) {
            toggleDot(i + 1);
        }
    }
}

uint8_t getButtonStates() {
    uint8_t states = 0;
    for (int i = 0; i < 6; i++) {
        if (digitalRead(dotButtonPins[i]) == LOW) { // Button pressed
            states |= (1 << i);
        }
    }
    return states;
}

uint8_t getButtonPresses() {
    static uint8_t lastStates = 0;
    uint8_t currentStates = getButtonStates();
    uint8_t presses = currentStates & ~lastStates; // Detect new presses
    lastStates = currentStates; // Update last states
    return presses;
}