import chai from 'chai';
import chaiAsPromised from 'chai-as-promised'
const expect = chai.expect
chai.use(chaiAsPromised).should();

import {Slack} from '../src/slack'

describe('Node Slack Test', function () {
  context('class property', () => {
    it('a new class should be an instance of Slack class', () => {
      let sl = new Slack()
      sl.should.be.an.instanceOf(Slack)
    })

    context('#constructor', () => {
      it('should be able to merge the config', () => {
        let sl = new Slack({
          webhook_url: 'http://test.hook',
          username: 'john_doe'
        })
        sl.config.should.be.deep.equal({
          webhook_url: 'http://test.hook',
          username: 'john_doe',
          channel: '',
          isDisable: false
        })
      })
    })

    context('#_getStringifyData', () => {
      let sl = new Slack({
        webhook_url: 'http://test.hook',
        username: 'john_doe',
        channel: 'test_channel'
      })
      it('should be able to parse json data to string', () => {
        sl._getStringifyData({
          key: "value",
          key2: "value2"
        }).should.be.a('string')
      })
      
      it('should include the default data (username and channel) if not specify so', () => {
        sl._getStringifyData().should.equals(JSON.stringify({
          username: 'john_doe', channel: 'test_channel'
        }))
      })

      it('should overwrite username and channel if specify in the data', () => {
        sl._getStringifyData({username: 'should_be_this', channel: 'this_too'})
          .should.equals(JSON.stringify({
            username: 'should_be_this', channel: 'this_too'
        }))
      })
    })
    context('#_fetch', () => {
      let sl = new Slack({
        webhook_url: 'http://test.hook',
        username: 'john_doe',
        channel: 'test_channel'
      })
      it('should be able to fetch something', () => {
        return sl._fetch('https://slack.com/api/api.test', {})
          .should.be.fulfilled
      })
    })
    
    context('#send', () => {

      it('should not execute fetch if `isDisable` is set to true', () => {
        let sl = new Slack({
          webhook_url: 'http://test.hook',
          username: 'john_doe',
          channel: 'test_channel',
          isDisable: true
        })
        return sl.send({"test": "data"})
          .should.eventually.deep.equal({
            "ok": true,
            "note": "mock the send"
          })
      })

      it('should not execute fetch if `isDisable` is set to true (as a string "true")', () => {
        let sl = new Slack({
          webhook_url: 'http://test.hook',
          username: 'john_doe',
          channel: 'test_channel',
          isDisable: "true"
        })
        return sl.send({"test": "data"})
          .should.eventually.deep.equal({
            "ok": true,
            "note": "mock the send"
          })
      })

      it('should be able to send to slack', () => {
        let sl = new Slack({
          webhook_url: 'https://slack.com/api/api.test',
          username: 'john_doe',
          channel: 'test_channel',
        })
        return sl.send({"test": "data"})
          .should.be.fulfilled
      })
    })

    context('#mongooseOnError', function() {
      this.timeout(3000)
      it('should be able to send to slack', (done) => {
        let sl = new Slack({
          webhook_url: 'https://slack.com/api/api.test',
          username: 'john_doe',
          channel: 'test',
        })
        const error = new Error('MongoDB connection error')
        const service  = 'APPLICATION_SERVICE'
        sl.mongooseOnError(service, error, function(res){
          expect(res.status).to.equal(200)
          expect(res.statusText).to.equal('OK')
          done()      
        })
      })

      it('should be able to not send to slack when fetch slack error', (done) => {
        
        let sl = new Slack({
          webhook_url: 'http://test.hook',
          username: 'john_doe',
          channel: 'test',
        })
        const error = new Error('MongoDB connection error')
        const service  = 'APPLICATION_SERVICE'
        sl.mongooseOnError(service, error, function(res){
          expect(res.name).to.equal('FetchError')
          done()      
        })
      })
    })
  })
})