#ifndef BRAILLE_H_INCLUDED
#define BRAILLE_H_INCLUDED

#include <stdint.h>

uint8_t charToBraille(char c);
char brailleToChar(uint8_t braille);

#endif // BRAILLE_H_INCLUDED