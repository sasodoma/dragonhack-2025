#include "braille.h"

// Braille patterns for letters A-Z
static const uint8_t brailleTable[36] = {
    0b000001, // A
    0b000011, // B
    0b001001, // C
    0b011001, // D
    0b010001, // E
    0b001011, // F
    0b011011, // G
    0b010011, // H
    0b001010, // I
    0b011010, // J
    0b000101, // K
    0b000111, // L
    0b001101, // M
    0b011101, // N
    0b010101, // O
    0b001111, // P
    0b011111, // Q
    0b010111, // R
    0b001110, // S
    0b011110, // T
    0b100101, // U
    0b100111, // V
    0b111010, // W
    0b101101, // X
    0b111101, // Y
    0b110101, // Z
};

uint8_t charToBraille(char c) {
    // Make sure the char is A-Z or a-z
    // Return empty braille if not
    if ((c < 'A') || (c > 'Z' && c < 'a') || (c > 'z')) {
        return 0;
    }

    // Calculate the index in the braille table
    // lowercase and uppercase letters have the same index
    int index = c < 'a' ? c - 'A' : c - 'a';

    // Return the corresponding braille pattern
    return brailleTable[index];
}

char brailleToChar(uint8_t braille) {
    // Iterate through the braille table to find the matching pattern
    for (int i = 0; i < 26; i++) {
        if (brailleTable[i] == braille) {
            // Return the corresponding character (A-Z)
            return 'A' + i;
        }
    }
    // Return '*' if no match is found
    return '*';
}