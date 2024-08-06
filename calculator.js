let firstNumber = null
let operator = null
let secondNumber = null


function add(num1, num2) {
    return (num1 + num2)
}

function subtract(num1, num2) {
    return (num1 - num2)
}


function multiply(num1, num2) {
    return (num1 * num2)
}

function divide(num1, num2) {
    return (num1 / num2)
}

function calculator(num1, op, num2) {
    firstNumber = num1;
    operator = op;
    secondNumber = num2;

    if (firstNumber !== null && secondNumber !== null) {
        let result;

        switch (operator) {
            case '+':
                result = add(firstNumber, secondNumber);
                break;
            case '-':
                result = subtract(firstNumber, secondNumber);
                break;
            case '*':
                result = multiply(firstNumber, secondNumber);
                break;
            case '/':
                result = divide(firstNumber, secondNumber);
                break;
            default:
                console.log('Error: Invalid operator');
                break;
        }
        console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
    } else {
        console.error("Error: One or more variables are not set");
    }
}

calculator(3, '/', 5)