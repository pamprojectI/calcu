const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]');

const previousScreenTextElement = document.querySelector('[data-previous-operand]');
const currentScreenTextElement = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previousScreenTextElement, currentScreenTextElement) 
    {
        this.previousScreenTextElement = previousScreenTextElement;
        this.currentScreenTextElement = currentScreenTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;        
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) 
        return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    flushOperator(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(previous) || isNaN(current)) return;
        switch(this.operation) {
            case "+":
                computation = previous + current;
            break;
            case "-":
                computation = previous - current;
            break;
            case "x":
                computation = previous * current;
            break;
            case "÷":
                computation = previous / current;
            break;    

            default:
                return;
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }

    updateDisplay() {
        this.currentScreenTextElement.innerText = this.currentOperand;
        if (this.operation != null) {this.previousScreenTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
    }   
}

const calculator = new Calculator(previousScreenTextElement, currentScreenTextElement);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.flushOperator(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})
/*
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', 
            { maximumFractionDigits: 0 }) 
        }
        if (decimalDigits != null) {
            return '${integerDisplay}.${decimalDigits}'
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                '${this.getDisplayNumber(this.previousOperand)} ${this.operation}'
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

}


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
*/

/*document.addEventListener('keydown', function (event) {
    let patternForNumber = /[0-9]/g;
    let patternForOpertors = /[+\-*\/]/g
    if (event.key.match(patternForNumber)) {
        event.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }

    if (event.key === '.') {
        event.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }

    if (event.key.match(patternForOpertors)) {
        event.preventDefault();
        calculator.chooseOperation(event.key)
        calculator.updateDisplay()
    }

    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.compute()
        calculator.updateDisplay()
    }

    if (event.key === 'Backspace') {
        event.preventDefault();
        calculator.delete()
        calculator.updateDisplay()
    }

    if (event.key === 'Delete') {
        event.preventDefault();
        calculator.clear()
        calculator.updateDisplay()
    }
});*/