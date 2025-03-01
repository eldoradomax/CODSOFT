const display = document.getElementById('result');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            if (waitingForSecondOperand) {
                currentInput = value;
                waitingForSecondOperand = false;
            } else {
                currentInput = currentInput === '0' ? value : currentInput + value;
            }
            display.value = currentInput;
        }

        if (button.classList.contains('operator')) {
            const inputValue = parseFloat(currentInput);
            
            if (firstOperand === null) {
                firstOperand = inputValue;
            } else if (operator) {
                const result = calculate(firstOperand, inputValue, operator);
                display.value = result;
                firstOperand = result;
            }
            
            waitingForSecondOperand = true;
            operator = value;
        }

        if (button.classList.contains('equals')) {
            const inputValue = parseFloat(currentInput);
            if (operator && firstOperand !== null) {
                display.value = calculate(firstOperand, inputValue, operator);
                firstOperand = null;
                operator = null;
                waitingForSecondOperand = true;
                currentInput = display.value;
            }
        }

        if (button.classList.contains('clear')) {
            currentInput = '0';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            display.value = currentInput;
        }

        if (button.classList.contains('delete')) {
            currentInput = currentInput.toString().slice(0, -1);
            if (currentInput === '') currentInput = '0';
            display.value = currentInput;
        }
    });
});

function calculate(first, second, operator) {
    switch(operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second !== 0 ? first / second : 'Error';
        default:
            return second;
    }
}