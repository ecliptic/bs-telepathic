// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict'

var Block = require('bs-platform/lib/js/block.js')
var Curry = require('bs-platform/lib/js/curry.js')
var Js_json = require('bs-platform/lib/js/js_json.js')
var Js_option = require('bs-platform/lib/js/js_option.js')
var Json_encode = require('bs-json/src/Json_encode.js')
var Js_primitive = require('bs-platform/lib/js/js_primitive.js')
var Option$Rationale = require('rationale/src/Option.js')
var Function$Rationale = require('rationale/src/Function.js')

var match_000 = Option$Rationale.Infix[/* >>= */ 0]

var match_001 = Option$Rationale.Infix[/* <*> */ 2]

var $less$star$great = match_001

var $great$great$eq = match_000

function get (param, param$1) {
  return Function$Rationale.flip(
    function (prim, prim$1) {
      return Js_primitive.undefined_to_opt(prim[prim$1])
    },
    param,
    param$1
  )
}

function key (action) {
  switch (action.tag | 0) {
    case 0:
      return 'MESSAGE_SEND'
    case 1:
      return 'MESSAGE_RECEIVE'
    case 2:
      return 'CLIENT_REGISTER'
  }
}

function payload (action) {
  switch (action.tag | 0) {
    case 0:
      return Json_encode.object_(
        /* :: */ [
          /* tuple */ ['linkId', action[0]],
          /* :: */ [
            /* tuple */ ['userName', action[1]],
            /* :: */ [/* tuple */ ['text', action[2]], /* [] */ 0],
          ],
        ]
      )
    case 1:
      return Json_encode.object_(
        /* :: */ [
          /* tuple */ ['userName', action[0]],
          /* :: */ [/* tuple */ ['text', action[1]], /* [] */ 0],
        ]
      )
    case 2:
      return Json_encode.object_(
        /* :: */ [/* tuple */ ['linkId', action[0]], /* [] */ 0]
      )
  }
}

function action (action$1) {
  return Json_encode.object_(
    /* :: */ [
      /* tuple */ ['key', key(action$1)],
      /* :: */ [/* tuple */ ['payload', payload(action$1)], /* [] */ 0],
    ]
  )
}

var Encode = /* module */ [/* payload */ payload, /* action */ action]

function payload$1 (payload$2, key) {
  switch (key) {
    case 'CLIENT_REGISTER':
      return Curry._2(
        $less$star$great,
        /* Some */ [
          function (linkId) {
            return /* ClientRegister */ Block.__(2, [linkId])
          },
        ],
        Curry._2(
          $great$great$eq,
          get('linkId', payload$2),
          Js_json.decodeString
        )
      )
    case 'MESSAGE_RECEIVE':
      return Curry._2(
        $less$star$great,
        Curry._2(
          $less$star$great,
          /* Some */ [
            function (userName, text) {
              return /* MessageReceive */ Block.__(1, [userName, text])
            },
          ],
          Curry._2(
            $great$great$eq,
            get('userName', payload$2),
            Js_json.decodeString
          )
        ),
        Curry._2($great$great$eq, get('text', payload$2), Js_json.decodeString)
      )
    case 'MESSAGE_SEND':
      return Curry._2(
        $less$star$great,
        Curry._2(
          $less$star$great,
          Curry._2(
            $less$star$great,
            /* Some */ [
              function (linkId, userName, text) {
                return /* MessageSend */ Block.__(0, [linkId, userName, text])
              },
            ],
            Curry._2(
              $great$great$eq,
              get('linkId', payload$2),
              Js_json.decodeString
            )
          ),
          Curry._2(
            $great$great$eq,
            get('userName', payload$2),
            Js_json.decodeString
          )
        ),
        Curry._2($great$great$eq, get('text', payload$2), Js_json.decodeString)
      )
    default:
      return /* None */ 0
  }
}

function action$1 (json) {
  var action$2 = Js_json.decodeObject(json)
  var partial_arg = Js_option.getWithDefault(
    {},
    Curry._2(
      $great$great$eq,
      Curry._2($great$great$eq, action$2, function (param) {
        return get('payload', param)
      }),
      Js_json.decodeObject
    )
  )
  return Curry._2(
    $great$great$eq,
    Curry._2(
      $great$great$eq,
      Curry._2($great$great$eq, action$2, function (param) {
        return get('key', param)
      }),
      Js_json.decodeString
    ),
    function (param) {
      return payload$1(partial_arg, param)
    }
  )
}

var Decode = /* module */ [/* payload */ payload$1, /* action */ action$1]

exports.$great$great$eq = $great$great$eq
exports.$less$star$great = $less$star$great
exports.get = get
exports.key = key
exports.Encode = Encode
exports.Decode = Decode
/* Json_encode Not a pure module */
