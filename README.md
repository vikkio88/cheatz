# cheatz
a small and dependecy free js library to hide easter eggs on your website.
You can use it to hide secret cheatcodes and it also includes a small utility to echo keys.

[Example Website](https://cheatz.surge.sh/)

## How to
```
npm install cheatz
```

then either use the `dist/` files as `cjs` or the `src` files in `type="module"` like so:
```html
<script type="module">
        import Cheatz from './Cheatz.js';
        import Keyecho from './Keyecho.js';

        let keyEcho = null;
        addEventListener("DOMContentLoaded", () => {
            keyEcho = new Keyecho("body");

            new Cheatz("body", "i d d q d", function () {
```

alternatively you can use the statically hosted lib on surge including it like so:
```html
<script src="https://cheatz.surge.sh/cheatz.js"></script>
<script src="https://cheatz.surge.sh/keyecho.js"></script>
```
Then you can set the Cheat Codes like so:
**Cheatz**
```js
addEventListener("DOMContentLoaded", () => {
    // Konami code
new Cheatz("body", "UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT A B", function () { /* DO SOMETHING */});
});

```

You can customise also other key codes passing it as 4th parameter of `new Cheatz()`.

```js
constructor(mountPoint, sequence, callback, additionalMap = {})
```

the default ones are those, I am using the `event.key` value, defined in [here](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values).

```js
const keyMaps = {
    "UP": "ArrowUp",
    "DOWN": "ArrowDown",
    "LEFT": "ArrowLeft",
    "RIGHT": "ArrowRight",
    "ENTER": "Enter",
    "TAB": "Tab",
    "CTRL": "Control",
    "ALT": "Alt",
    "SUPER": "Meta"
};
```

**Keyecho**
```js
        let keyEcho = null;
        addEventListener("DOMContentLoaded", () => {
            keyEcho = new Keyecho("body");
        });
```

This will listen to every key press and echo them at the bottom right of the page.

<img src="https://github.com/vikkio88/kiffari/assets/248805/74deb376-c1ba-4009-846f-89326bd147ae" />
