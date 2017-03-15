import _ from 'lodash'
import fetch from 'node-fetch'

export class Slack {
  constructor(cf = {}) {
    let globalConfig = {
      webhook_url: '',
      username: '',
      channel: '',
      isDisable: false
    }

    _.merge(globalConfig, cf)
    this.config = globalConfig
  }

  _getStringifyData(data = {}) {
    let defaultField = {
      username: this.config.username,
      channel: this.config.channel
    }
    _.merge(defaultField, data)
    return JSON.stringify(defaultField)
  }

  _fetch(url, body) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: this._getStringifyData(body)
    })
  }

  send(data = {}) {
    if(this.config.isDisable || this.config.isDisable === 'true') {
      return Promise.resolve({
        "ok": true,
        "note": "mock the send"
      })
    }
    return this._fetch(this.config.webhook_url, data)
  }
}