import $ from 'jquery'

class KeystrokeRecorder {

  constructor () {
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
      var ms = self.timeElapsed()
      self.json.push({ keyCode: e.which, key: e.key, ms: ms })
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

export default new KeystrokeRecorder
