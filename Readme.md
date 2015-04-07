# arg-deps

Statically inspect a function to get the properties of its arguments. Works with minified code.

## Example

```js
var deps = require('arg-deps');

var out = deps(function(props, arr) {
  props.width = 700;
  props.height = 900;
  arr[0] = 20;
  arr[1] = 40;
});

// {
//   props: ['width', 'height'],
//   arr: [0, 1]
// }
```

## Installation

```
npm install arg-deps
```

## Test

```
npm install
make test
```

## License

MIT
