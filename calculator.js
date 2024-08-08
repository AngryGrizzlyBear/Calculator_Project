// calculator.js

// Define initial variables
let firstNumber = null;
let operator = null;
let displayValue = '0';
let isDecimalAdded = false;

// Get display element and buttons
const display = document.getElementById('display');
const decimalButton = document.getElementById('decimal');
const backspaceButton = document.getElementById('backspace');

// Arithmetic functions
function add(num1, num2) { return num1 + num2; }
function subtract(num1, num2) { return num1 - num2; }
function multiply(num1, num2) { return num1 * num2; }
function divide(num1, num2) {
    if (num2 === 0) return 'Error: Divide by 0'; // Handle divide by zero
    return num1 / num2;
}

// Function to update the display
function updateDisplay() {
    display.textContent = displayValue;
}

// Function to format result
function formatResult(result) {
    // Format result to remove unnecessary trailing zeros
    if (Number.isInteger(result)) {
        return result.toString(); // Return as integer if there's no decimal part
    } else {
        return result.toFixed(10).replace(/\.?0+$/, ''); // Remove trailing zeros
    }
}

// Function to perform calculation
function performCalculation() {
    if (firstNumber !== null && operator !== null) {
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(displayValue);
        let result;

        switch (operator) {
            case '+':
                result = add(num1, num2);
                break;
            case '-':
                result = subtract(num1, num2);
                break;
            case '*':
                result = multiply(num1, num2);
                break;
            case '/':
                result = divide(num1, num2);
                break;
            default:
                result = 'Error';
                break;
        }

        // Handle result if division by zero
        if (result === 'Error: Divide by 0') {
            displayValue = result;
        } else {
            // Format result to remove unnecessary decimal places
            displayValue = formatResult(result);
        }

        // Reset for the next operation
        firstNumber = null;
        operator = null;
        isDecimalAdded = false; // Reset decimal flag after calculation
    }
}

// Function to handle button clicks
function handleButtonClick(buttonText) {
    if (buttonText === 'C') {
        // Clear display and reset variables
        displayValue = '0';
        firstNumber = null;
        operator = null;
        isDecimalAdded = false;
        decimalButton.disabled = false; // Enable decimal button
    } else if (buttonText === '=') {
        // Perform calculation if necessary
        if (firstNumber !== null && operator !== null) {
            performCalculation();
        }
    } else if (['+', '-', '*', '/'].includes(buttonText)) {
        // Handle operator input
        if (firstNumber !== null && operator !== null) {
            performCalculation(); // Evaluate the previous calculation
        }
        firstNumber = displayValue;
        operator = buttonText;
        displayValue = '0'; // Reset display for second number input
        isDecimalAdded = false; // Reset decimal flag
        decimalButton.disabled = false; // Enable decimal button
    } else if (buttonText === '.') {
        // Handle decimal button
        if (!isDecimalAdded) {
            displayValue += buttonText;
            isDecimalAdded = true;
            decimalButton.disabled = true; // Disable decimal button
        }
    } else if (buttonText === '←') {
        // Handle backspace
        if (displayValue.length > 1) {
            displayValue = displayValue.slice(0, -1);
        } else {
            displayValue = '0';
        }
        if (!displayValue.includes('.')) {
            decimalButton.disabled = false; // Enable decimal button if no decimal point
        }
    } else {
        // Append number to display value
        displayValue = (displayValue === '0') ? buttonText : displayValue + buttonText;
    }

    updateDisplay(); // Update the display with the new value
}

// Event listeners for buttons
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', function() {
        handleButtonClick(this.textContent);
    });
});

// Handle keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key === 'Escape') {
        // Clear
        handleButtonClick('C');
    } else if (key === 'Enter') {
        // Equals
        handleButtonClick('=');
    } else if (['+', '-', '*', '/'].includes(key)) {
        // Operator
        handleButtonClick(key);
    } else if (key === '.') {
        // Decimal
        handleButtonClick('.');
    } else if (key === 'Backspace') {
        // Backspace
        handleButtonClick('←');
    } else if (!isNaN(key) && key >= 0 && key <= 9) {
        // Number
        handleButtonClick(key);
    }
});

// Initial display update
updateDisplay();
