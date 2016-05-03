import $ from 'jquery'
import includes from 'lodash.includes'
import loop from 'raf-loop'
import Tock from 'tocktimer'
import last from 'lodash.last'

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

  replay (selector) {
    var $element = $(selector)
    this._renderText($element, '')

    var json = this.json.slice(), replayChars = []
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
            this._renderText($element, replayChars.join(''))
          }
        },
        complete: resolve
      })

      timer.start(this.timeElapsed())
    })
  }

  load (json) {
    this.stop()
    this.json = json
    this.startTime = null
  }

  timeElapsed () {
    if (this.recording) {
      return this.startTime ? Date.now() - this.startTime : 0
    } else {
      return last(this.json).ms
    }
  }

  stop () {
    this.recording = false
    $(document).off('keydown')
  }

  // 'private'

  _renderText ($element, text) {
    includes(['INPUT', 'TEXTAREA'], $element[0].tagName) ? $element.val(text) : $element.text(text)
  }

}

export default KeystrokeRecorder
