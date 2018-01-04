// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict'

import * as Block from 'bs-platform/lib/es6/block.js'
import * as Curry from 'bs-platform/lib/es6/curry.js'
import * as WebSockets from 'bs-websockets/src/webSockets.js'
import * as TitleCase from 'title-case'
import * as Js_primitive from 'bs-platform/lib/es6/js_primitive.js'
import * as Actions$BsTelepathic from './Actions.bs.js'
import * as ProjectNameGenerator from 'project-name-generator'

var Config = /* module */ [
  /* keys : record */ [/* userName */ 'telepathic:userName'],
]

function chooseName () {
  return TitleCase(
    ProjectNameGenerator({
      alliterative: /* true */ 1,
    }).spaced
  )
}

function getName () {
  return Js_primitive.null_to_opt(localStorage.getItem('telepathic:userName'))
}

function updateName (name) {
  localStorage.setItem('telepathic:userName', name)
  return /* () */ 0
}

function makeName () {
  var name = chooseName(/* () */ 0)
  updateName(name)
  return name
}

function getOrCreateUserName () {
  var name = getName(/* () */ 0)
  if (name) {
    return name[0]
  } else {
    return makeName(/* () */ 0)
  }
}

function sendMessage (linkId, text, client) {
  var userName = getOrCreateUserName(/* () */ 0)
  var message = /* MessageSend */ Block.__(0, [linkId, userName, text])
  client[/* ws */ 0].send(
    JSON.stringify(Actions$BsTelepathic.Encode[/* action */ 1](message))
  )
  return /* () */ 0
}

function receiveMessage (onMessage, $$event) {
  var json = JSON.parse($$event.data)
  var match = Actions$BsTelepathic.Decode[/* action */ 1](json)
  if (match) {
    var match$1 = match[0]
    switch (match$1.tag | 0) {
      case 1:
        return Curry._1(onMessage, {
          userName: match$1[0],
          text: match$1[1],
        })
      case 0:
      case 2:
        return /* () */ 0
    }
  } else {
    return /* () */ 0
  }
}

function register (client) {
  var message = /* ClientRegister */ Block.__(2, [client[/* linkId */ 1]])
  client[/* ws */ 0].send(
    JSON.stringify(Actions$BsTelepathic.Encode[/* action */ 1](message))
  )
  return /* () */ 0
}

function make ($staropt$star, linkId, onMessage, url) {
  var socket = $staropt$star ? $staropt$star[0] : /* None */ 0
  var ws = socket
    ? socket[0]
    : Curry._1(WebSockets.WebSocket[/* make */ 0], url)
  var client = /* record */ [/* ws */ ws, /* linkId */ linkId]
  WebSockets.WebSocket[/* on */ 5](
    /* Close */ Block.__(0, [
      function ($$event) {
        console.log('WebSocket closed: ' + $$event.reason)
        return /* () */ 0
      },
    ]),
    WebSockets.WebSocket[/* on */ 5](
      /* Error */ Block.__(1, [
        function (error) {
          console.log('WebSocket error: ' + error)
          return /* () */ 0
        },
      ]),
      WebSockets.WebSocket[/* on */ 5](
        /* Message */ Block.__(2, [
          function (param) {
            return receiveMessage(onMessage, param)
          },
        ]),
        WebSockets.WebSocket[/* on */ 5](
          /* Open */ Block.__(3, [
            function () {
              return register(client)
            },
          ]),
          ws
        )
      )
    )
  )
  return client
}

export {
  Config,
  chooseName,
  getName,
  updateName,
  makeName,
  getOrCreateUserName,
  sendMessage,
  receiveMessage,
  register,
  make,
}
/* title-case Not a pure module */