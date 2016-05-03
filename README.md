# keystroke-recorder

record and playback user keystrokes. use this tool ethically -- never collect user data without their explicit knowledge + consent.

## install

`npm i --save keystroke-recorder`

## usage

```js
import $ from 'jquery'
import KeystrokeRecorder from 'keystroke-recorder'
var keystrokeRecorder = new KeystrokeRecorder({
  omittedKeys: ['Tab', 'Meta', 'Control', 'Alt', 'Shift']
})

$('#record-btn').click(() => {
  keystrokeRecorder.record()
})

$('#stop-btn').click(() => {
  keystrokeRecorder.stop()
  console.log(keystrokeRecorder.json)
})

$('#replay-btn').click(() => {
  keystrokeRecorder.replay('#replay-pad').then(() => {
    console.log('done replaying!')
  })
})


```

## API

### options

- #### `omittedKeys`

  an array of keys to be ignored during recording. _default: []_


### methods

- #### `record()`

  starts collecting keystroke data as json

- #### `stop()`

  stops collecting keystroke data

- #### `replay(selector)`

  replays recorded keystrokes in DOM element with specified selector. returns a promise that resolves on completion.

- #### `load(json)`

  stops recording and loads given json into keystrokeRecorder

- #### `timeElapsed()`

  return milliseconds since recording started


### properties

- #### `json`

  returns json data for last keystroke recording

  ```json
  [
      {
          keyCode: 65,
          key: "a",
          ms: 562
      },
      {
          keyCode: 83,
          key: "s",
          ms: 771
      },
      {
          keyCode: 68,
          key: "d",
          ms: 998
      },
      {
          keyCode: 70,
          key: "f",
          ms: 1642
      }
  ]
  ```

- #### `startTime`

  time that last recording started at

- #### `recording`

  boolean indicating whether `keystrokeRecorder` is recording or not
