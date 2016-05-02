import $ from 'jquery'
import includes from 'lodash.includes'

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

  timeElapsed () {
    return Date.now() - this.startTime
  }

  stop () {
    this.recording = false
    $(document).off('keydown')
  }

}

export default KeystrokeRecorder
