import operate from './operate';
import isNumber from './isNumber';

/*
    Given a button name and a calculator object, return updated calculator object.

    Calulator object contains:
    total: String       the running total
    next: String        the next number to be operated on with the total
    operation: String   +, -, etc
*/

export default function calulate(obj, buttonName) {
    //clear
    if (buttonName === 'AC') {
        return {
            total: null,
            next: null,
            operation: null
        };
    }

    //button is a number
    if(isNumber(buttonName)) {

        //do not add zero when next is 0
        if(buttonName === '0' && obj.next === '0') return {};

        //if there is an operation, update next
        // TODO: is total: updated? can fix this
        if(obj.operation) {
            return obj.next ? { next: obj.next + buttonName } : { next: buttonName };
        }

        //no operation yet, total is null in this logic compared to last if statement
        if(obj.next) return { next: obj.next + buttonName, total: null };
        return {next: buttonName, total: null}
    }

    //decimal
    if(buttonName === '.') {
        if(obj.next) return obj.next.includes('.') ? {} : { next: obj.next + '.' };

        if(obj.operation) return { next: '0.' };

        //no operation
        if(obj.total) return obj.total.includes('.') ? {} : {total: obj.total + '.'};

        return {total: '0.'};
    }

    if(buttonName === '=') {
        if(obj.next && obj.operation) {
            return {
                total: operate(obj.total, obj.next, obj.operation),
                next: null,
                operation: null
            };
        }
        return {}; //no operation
    }

    if(buttonName === '+/-') {
        if(obj.next) return {next: (-1 * parseFloat(obj.next)).toString() };
        if(obj.total) return {total: (-1 * parseFloat(obj.total)).toString() };
        return {};
    }

    //already an existing operation
    if(obj.operation) {
        return {
            total: operate(obj.total, obj.next, obj.operation),
            next: null,
            operation: buttonName
        };
    }

    if(!obj.next) {
        return {operation: buttonName};
    }

    //save operation and total should be next
    return {
        total: obj.next,
        next: null,
        operation: buttonName
    };
}
