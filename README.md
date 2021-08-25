# Inline calculator
## Tutorial
### Create a new calculator
```javascript
let calculator = new Calculator();
```
### Create a new operator
```javascript
let operator = new Operator(priority, symbol, operation);
```
### Allow the calculator to use the operator
```javascript
calculator.operators.add(operator);
```
### Calculate
```javascript
calculator.calculate(expression);
```
## Example
```javascript
let calculator = new Calculator();

[
  ['+', (a, b) => a + b],
  ['-', (a, b) => a - b],
  
  ['*', (a, b) => a * b],
  ['/', (a, b) => a / b],
  
  ['^', (a, b) => a ** b],
]
.forEach((
  [ symbol, operation ], 
  priority
) => {
  calculator.operators.add(
    new Operator(
      priority, 
      symbol, 
      operation
    ),
    operation
  )
})

let expressions = [
  '4 * 3',
  '(3 + 7) * (6 + 2 ^ 2)'
];

expressions.forEach(expression => {
  console.log(`${
    expression
  } = ${
    calculator.calculate(expression)
  }`);
})
```
