const TOKEN = /[(){}[\]]|\d+\.\d+|[\d]+|[\w\d$_]+|[;]|[^(){}[\]\d\w\s;]+/g;
const BRACKETS = /[()]/g
const GROUP = /\([^()]+\)/g;
const SPACE = /\s+/g;

const isNumber = isFinite;

function removeSpaces(string) {
    return string.replace(SPACE, '');
}

function getTokens(string) {
    return string.match(TOKEN);
}

function getGroups(string) {
    let result = string.match(GROUP);
    return result && result.map(group => group.slice(1, -1));
}

function hasBrackets(string) {
    return !!string.match(BRACKETS);
}

function afterEach(array1, array2) {
    let array = [];

    array1.forEach((element, index) => {
        array.push(element);

        if (index !== array1.length - 1) {
            array.push(array2[index]);
        }

    });

    return array;
}

function replaceGroups(string, callback) {
    let groups = getGroups(string);
    
    if (!groups) return string;

    let result = afterEach(
        string.split(GROUP),
        groups.map(callback)
    );

    return result.join('');
}

function Operator(priority, symbol, operation) {
    Object.assign(this, {
        priority, symbol, operation
    });
}

function Calculator() {
    this.operators = new Set();
    let calculator = this;

    this.normalize = function (expression) {
        let tokens = getTokens(expression);
        let operators = Array.from(this.operators.values());

        return tokens.map(token => {
            let operator = operators.find(
                operator => token === operator.symbol
            );

            return operator || (isNumber(token) ? +token : token);
        });
    }

    this.calculate = function (expression) {
        function calculate(expression) {
            let operation = calculator.normalize(expression);

            let isNumber = isFinite;
            let isOperator = (operator) => !isNumber(operator);

            let operators = operation.filter(isOperator);

            operators.sort((operator1, operator2) => {
                return operator2.priority - operator1.priority;
            })

            operators.forEach(operator => {
                let position = operation.indexOf(operator);
                let operands = operation
                    .splice(position - 1, 3)
                    .filter(isNumber);

                operation.splice(position - 1, 0, operator.operation(...operands));
            })

            return operation.join('');
        }

        function calculateGroups(expression) {
            let result = replaceGroups(expression, group => {
                return calculate(group);
            });

            if (getGroups(result)) {
                result = calculateGroups(result);
            }

            return calculate(result);
        }

        return +calculateGroups(expression);
    }
}