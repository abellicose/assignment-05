## Difference Between Var, Let and Const
All three are used to create variables.

Var is from older versions of JavaScript. It creates a global variable that gets hoisted but the default value assigned is undefined until it reaches the assignment operator.

Let and const are similar. They're both used to declare variables but neither of them can be used before their value assignment due to temporal dead zone. The main difference between let and const is that values defined in const cannot be redefined after its value has been set.

---

## Spread Operator
Spread operator expands to the values of the array that it's applied to. 
Example: [...array] would expand to the values of the array.

---

## Map, Filter, ForEach
map(callback) => a new array is returned where each value is the return value of the callback function
filter(callback) => a new array is returned where each value is approved by the callback function. if a value returns false from the callback function th en it is not added to the new array
forEach(callback) => loops through every item of the array and passes it into the callback function, there's no return value. it's similar to for loop

---

## Arrow Function
A shortcut of defining a function.

---

## Template Litearls
A way of creating a string which allows substituting variables directly inside the string with ${} instead of using the + operator.
