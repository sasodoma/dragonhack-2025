#ifndef GPIO_H_INCLUDED
#define GPIO_H_INCLUDED

#include <stdint.h>

/**
 * @brief Initializes all the GPIO pins configured as input or output.
 * 
 * This function sets up the necessary GPIO pins for the application,
 * configuring them as either input or output based on the hardware requirements.
 * It ensures that the pins are properly initialized before use.
 */
void initGPIO();

/**** Functions for moving the dots ****/
/**
 * @brief Sets the state of a specific dot (output pin).
 * 
 * @param dot The dot number (1-6) to set the state for.
 * @param state The desired state (true for raised, false for lowered).
 */
void setDot(int dot, bool state);

/**
 * @brief Gets the state of a specific dot (input pin).
 * 
 * @param dot The dot number (1-6) to get the state for.
 * @return true if the dot is raised, false otherwise.
 */
bool getDot(int dot);

/**
 * @brief Toggles the state of a specific dot (output pin).
 * 
 * This function changes the state of the specified dot to its opposite state.
 * If the dot is currently raised, it will be lowered, and vice versa.
 * 
 * @param dot The dot number (1-6) to toggle the state for.
 */
void toggleDot(int dot);

/**
 * @brief Sets the state of the dots based on the provided bitmask.
 * 
 * This function updates the state of the dots, where each bit in the 
 * `states` parameter corresponds to a specific dot. A bit value of `1` 
 * raises the corresponding dot, while a bit value of `0` lowers it.
 * 
 * @param states A bitmask representing the desired states of the dots. 
 *               Each bit corresponds to a dot, with `1` indicating 
 *               the dot is raised and `0` indicating it is lowered.
 */
void setDots(uint8_t states);

/**
 * @brief Gets the current state of all dots as a bitmask.
 * 
 * This function retrieves the current state of all dots and returns it 
 * as a bitmask. Each bit in the returned value corresponds to a specific 
 * dot, with `1` indicating the dot is raised and `0` indicating it is lowered.
 * 
 * @return A bitmask representing the current states of all dots. 
 *         Each bit corresponds to a dot, with `1` for raised and `0` for lowered.
 */
uint8_t getDots();

/**
 * @brief Toggles the state of all dots based on the provided bitmask.
 * 
 * This function updates the state of the dots, where each bit in the 
 * `dots` parameter corresponds to a specific dot. A bit value of `1` 
 * toggles the corresponding dot, while a bit value of `0` leaves it unchanged.
 * 
 * @param dots A bitmask representing the desired states of the dots. 
 *             Each bit corresponds to a dot, with `1` indicating 
 *             the dot should be toggled and `0` indicating it should remain unchanged.
 */
void toggleDots(uint8_t dots);

/**** Functions for reading the buttons ****/
/**
 * @brief Gets the current state of all buttons as a bitmask.
 * 
 * This function retrieves the current state of all buttons and returns it 
 * as a bitmask. Each bit in the returned value corresponds to a specific button, 
 * with `1` indicating the button is pressed and `0` indicating it is not pressed.
 * 
 * @return A bitmask representing the current states of all buttons. 
 *         Each bit corresponds to a button, with `1` for pressed and `0` for not pressed.
 */
uint8_t getButtonStates();

/**
 * @brief Checks if any buttons have been pressed since the last call.
 * 
 * This function returns a bitmask indicating which buttons have been pressed
 * since the last time it was called. Each bit in the returned value corresponds
 * to a specific button, with `1` indicating the button was pressed and `0` indicating
 * it was not pressed.
 * 
 * @return uint8_t A bitmask representing the buttons pressed since the last call.
 *         Each bit corresponds to a button, with `1` for pressed and `0` for not pressed.
 */
uint8_t getButtonPresses();

#endif // GPIO_H_INCLUDED