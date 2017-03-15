node-slack-es6
==============
a node module for pushing messages to [Slack](https://slack.com) via Webhook api.

Unlike other module, This node module is written all in **ES6** and it return **Promise**!

Moreover, this module is full of TEST!

Usage
----------
This module is written all in **ES6** syntax. Using it will require es6 project compile with [babel](https://babeljs.io/).

to start using slack push just importing it

    import {Slack} from 'node-slack-es6'

then initiate your class with your default setting

    let sl = new Slack({
        webhook_url: 'your webhook get from slack',
        username: 'username for this push message to be shown',
        channel: 'channel to push to',
    })

and then, your class is ready to go!

when it time for you to push the message to Slack, just call this

    sl.send({...})

and push your data object! this will send the request and catch the response

Good News! this module is all in ES6 and it return `Promise` !!
so to grab your response just to the promise chain

    sl.send({..})
      .then(() => {// for success})
      .catch((e) => {// for error exception})
