## keystroke-recorder

records keystrokes -- key, keyCode, and relative timestamp as json. please use this tool ethically, ok?

### install

`npm i --save keystroke-recorder`

### usage

```js
import $ from 'jquery'
import keystrokeRecorder from 'keystroke-recorder'

$('#record').click(() => {
  keystrokeRecorder.record()
})

$('#stop').click(() => {
  keystrokeRecorder.stop()
  console.log(keystrokeRecorder.json)
})

```
