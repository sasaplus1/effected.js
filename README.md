# effected.js

animation events use as Promises or callback

## Installation

```sh
$ npm install effected
```

## Usage

```html
<script src="effected.min.js"></script>
```

### Example

```js
effected(element).then(function() {
  // end CSS3 animation
  console.log('end of animation');

  element.classList.remove('js-animation-move');
});

// start CSS3 animation
element.classList.add('js-animation-move');
```

## Functions

### effected(element[, eventType][, callback])

- `element`
  - `HTMLElement`
- `eventType`
  - `String`
- `callback`
  - `Function`

for animationend, transitionend or animationstart.

return Promise if not passed callback, but throw error if cannot use Promise.

values for eventType are below:

- animationstart
  - add to animationstart
- animation|animationend
  - add to animationend
- transition|transitionend
  - add to transitionend
- any other
  - add to animationend and transitionend

### effected.iterated(element, callback)

- `element`
  - `HTMLElement`
- `callback`
  - `Function`

for animationiteration.

### effected.effected

alias of effected().

### effected.Promise

effected use native Promise if the browser has it.
if you want to use third party Promises library, set to this property.

## License

The MIT license. Please see LICENSE file.
