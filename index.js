import $ from 'jquery'
import includes from 'lodash.includes'
import loop from 'raf-loop'
import Tock from 'tocktimer'

class KeystrokeRecorder {

  constructor (opts = {}) {
    this.omittedKeys = opts.omittedKeys || []
    this.json = []
    this.startTime = null
    this.recording = false
  }

  record () {
    this.stop()
    this.json = []
    this.startTime = Date.now()
    this.recording = true
    var self = this
    $(document).keydown(function (e) {
      if (!includes(self.omittedKeys, e.key)) {
        var ms = self.timeElapsed()
        self.json.push({ keyCode: e.which, key: e.key, ms: ms })
      }
    })
  }

  play (selector, json) {
    var $element = $(selector)
    $element.isInput = includes(['INPUT', 'TEXTAREA'], $element[0].tagName)
    $element.isInput ? $element.val('') : $element.text('')
    var replayChars = []
    return new Promise((resolve, reject) => {
      var timer = new Tock({
        countdown: true,
        interval: 10,
        callback: () => {
          var currentMs = this.timeElapsed() - timer.lap()
          if (json[0] && currentMs > json[0].ms) {
            let obj = json.shift()
            switch(obj.key) {
              case 'Backspace': replayChars.pop(); break
              case 'Enter': replayChars.push('\n'); break
              default: replayChars.push(obj.key); break
            }
            $element.isInput ? $element.val(replayChars.join('')) : $element.text(replayChars.join(''))
          }
        },
        complete: resolve
      })

      timer.start(this.timeElapsed())
    })
  }

  replay (selector) {
    var json = this.json.slice()
    return this.play(selector, json)
  }

  timeElapsed () {
    return this.startTime ? Date.now() - this.startTime : 0
  }

  stop () {
    this.recording = false
    $(document).off('keydown')
  }

}

export default KeystrokeRecorder
