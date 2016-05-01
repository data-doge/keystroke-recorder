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

### API

#### methods

##### `record()`

starts collecting keystroke data as json

##### `stop()`

stops collecting keystroke data

##### `timeElapsed()`

return milliseconds since recording started

#### properties

##### `json`

returns json data for last keystroke recording

```json
{
    521: {
        keyCode: 65,
        key: "a"
    },
    613: {
        keyCode: 83,
        key: "s"
    },
    669: {
        keyCode: 68,
        key: "d"
    },
    761: {
        keyCode: 70,
        key: "f"
    }
}
```

##### `startTime`

time that last recording started at

##### `recording`

boolean indicating whether `keystrokeRecorder` is recording or not
