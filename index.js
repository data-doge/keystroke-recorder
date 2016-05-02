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

  replay (selector) {
    var $element = $(selector)
    $element.val('')
    var replayChars = []
    return new Promise((resolve, reject) => {
      var timer = new Tock({
        countdown: true,
        interval: 10,
        callback: () => {
          var currentMs = this.timeElapsed() - timer.lap()
          if (this.json[0] && currentMs > this.json[0].ms) {
            let obj = this.json.shift()
            switch(obj.key) {
              case 'Backspace': replayChars.pop(); break
              case 'Enter': replayChars.push('\n'); break
              default: replayChars.push(obj.key); break
            }
            $element.val(replayChars.join(''))
          }
        },
        complete: resolve
      })

      timer.start(this.timeElapsed())
    })
  }

  timeElapsed () {
    return Date.now() - this.startTime
  }

  stop () {
    this.recording = false
    $(document).off('keydown')
  }

}

export default KeystrokeRecorder
