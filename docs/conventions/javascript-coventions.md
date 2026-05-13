## [Javascript code conventions](https://docs.fdnd.nl/conventies.html#javascript-conventies)

### General conventions for writing Javascript
- Use one tab indentation
- Use single quote for strings
- Don't end lines in a semi-colon
- Use comments to explain complicated code

### Object destructuring
The destructuring syntax is a JavaScript syntax that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

```javascript
  const { name, age } = person;
```

```html
  <h2>{name}</h2>
  <p>{age}</p>
```

### Using `const`, `var` and `let`
For almost all variables you use the `const` because it's value is almost never changed. If there a variable that will change it's value you need to use `let`. Don't use `var` as it can cause bugs with hoisting. Read about [extra considerations](https://docs.fdnd.nl/conventies.html#extra-considerations) with these guidelines. 

Example of `const`:
```javascript
  const count = 0
```

Example of `let`:
```javascript
  let count = 0;
  count = 1;
```

### [Use Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
Use backticks instead of regular quotes when creating variables or expressions. 

```javascript
 const name = 'Bob'
 const message = `Hello ${name}, welcome!`
```
