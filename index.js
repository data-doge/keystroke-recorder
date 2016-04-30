import $ from 'jquery'

class KeystrokeRecorder {

  constructor () {
    this.json = []
    this.startTime = null
  }

  record () {
    this.startTime = Date.now()
    var self = this
    $(document).keydown(function (e) {
      let data = {
        keyCode: e.which,
        key: e.key,
        time: Date.now() - self.startTime
      }
      self.json.push(data)
    })
  }

  stop () {
    $(document).off('keydown')
  }

}

export default new KeystrokeRecorder
