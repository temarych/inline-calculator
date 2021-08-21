# Inline calculator
## Tutorial
### Create a new calculator
```javascript
let calculator = new Calculator();
```
### Create a new operator
```javascript
let operator = (symbol, priority);
```
### Allow the calculator to use the operator
```javascript
calculator.operations.set(operator, operation);
```
### Calculate
```javascript
calculator.calculate(expression);
```
## Example
```javascript
let calculator = new Calculator();
let operator = (symbol, priority);

[
  ['+', (a, b) => a + b],
  ['*', (a, b) => a * b],
  ['^' (a, b) => a ** b],
]
.forEach((
  [ symbol, operation ], 
  priority
) => {
  calculator.operations.set(
    new Operator(symbol, priority),
    operation
  )
})

calculator.calculate('4 * 3'); // 12
calculator.calculate('(3 + 7) * (6 + 2 ^ 2)'); // 100
```
