import calculate from './calculate';

function pressButtons(buttons) {
    const value = {};
    buttons.forEach((button) => {
        return Object.assign(value, calculate(value, button));
    });

    //delete any null or undefined values
    Object.keys(value).forEach((key) => {
        if(value[key] == null) delete value[key];
    });

    return value;
}

describe('What the result should be when given the array of buttons', () => {
    test('should support 6', () => {
        expect(pressButtons(['6'])).toEqual({next: '6'});
    });

    test('should support 66', () => {
        expect(pressButtons(['66'])).toEqual({next: '66'});
    });

    test('should support 6 + 6', () => {
        expect(pressButtons(['6', '+', '6'])).toEqual({
            next: '6',
            total: '6',
            operation: '+'
        });
    });

    test('should support 6 + 6 = ', () => {
        expect(pressButtons(['6', '+', '6', '='])).toEqual({
            total: '12'
        });
    });

    test('should support 00 + 0 = ', () => {
        expect(pressButtons(['0', '0', '+', '0', '='])).toEqual({
            total: '0'
        });
    });

    test('should suppport 6 + 6 = 9', () => {
        expect(pressButtons(['6', '+', '6', '=', '9'])).toEqual({next: '9'});
    });

    test('should support 3 + 6 = + 9', () => {
        expect(pressButtons(['3', '+', '6', '=', '+', '9'])).toEqual({
            total: '9',
            operation: '+',
            next: '9'
        });
    });

    test('should support 3 + 6 = + 9 =', () => {
        expect(pressButtons(['3', '+', '6', '=', '+', '9', '='])).toEqual({
            total: '18'
        });
    });

    test('should support 3 + = 3 =', () => {
        expect(pressButtons(['3', '+', '=', '3', '='])).toEqual({
            total: '6'
        });
    });


});
