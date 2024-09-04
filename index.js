let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            removeLastDigit();
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        case '+/-':
            buffer = (parseFloat(buffer) * -1).toString();
            break;
        case '%':
            buffer = (parseFloat(buffer) / 100).toString();
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") {
        return;
    }

    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }

    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(floatBuffer) {
    if (previousOperator === "+") {
        runningTotal += floatBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= floatBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= floatBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= floatBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function removeLastDigit() {
    if (buffer.length === 1) {
        buffer = "0";
    } else {
        buffer = buffer.substring(0, buffer.length - 1);
    }
    screen.innerText = buffer;
}

function init() {
    document.querySelector(".calculator").addEventListener("click", function(event) {
        if (!event.target.classList.contains('screen')) {
            buttonClick(event.target.innerText);
        }
    });

    screen.addEventListener("click", function() {
        removeLastDigit();
    });
}

init();
