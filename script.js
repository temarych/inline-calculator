function Operator(symbol, priority) {
    Object.assign(this, { symbol, priority });
}

function Calculator() {
    this.operations = new Map();

    this.calculate = function calculate(string) {
        string = string.replace(/\s/g, '');

        let tokens = string.split('(')
            .map(substring => substring.split(')'))
            .flat()
            .filter(token => !!token);

        tokens = tokens.map(token => {
            let subtokens = token.match(/(\D+|\d+)/g);
            let operators = token.match(/\D+/g);

            operators = operators.map(
                operator => Array.from(this.operations.keys())
                    .find(({ symbol }) => operator === symbol)
            )

            operators.sort((operator1, operator2) => {
                return operator2.priority - operator1.priority;
            })

            operators.forEach(operator => {

                if (subtokens.join('') === operator.symbol) return;

                let index = subtokens.indexOf(operator.symbol);
                let operands = subtokens.splice(index - 1, 3)
                  .filter(subtoken => isFinite(subtoken));
                  
                let operation = this.operations.get(operator);

                subtokens.splice(index - 1, 0, operation(
                    ...operands.map(operand => +operand)
                ));
            })

            return subtokens.join('');
        })

        let result = tokens.join('');

        if (isFinite(result)) return +result;

        return this.calculate(result);
    };
}
