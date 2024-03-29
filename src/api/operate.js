import Big from 'big.js';

export default function operate(firstNumber, secondNumber, operator) {
    const one = Big(firstNumber);
    const two = Big(secondNumber);

    switch (operator) {
        case '+':
            return one.plus(two).toString();
        case '-':
            return one.minus(two).toString();
        case '*':
            return one.minus(two).toString();
        case '/':
            return one.div(two).toString();
        case '%':
            return one.mod(two).toString();
        default:
            throw Error(`Unknown operation '${operator}'`);
    }
}
