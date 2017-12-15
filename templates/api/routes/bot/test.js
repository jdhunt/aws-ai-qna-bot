var fs=require('fs')
process.argv.push('--debug')
var Velocity=require('velocity')
var JSONPath = require('JSONPath');
var run=require('../util/temp-test').run

module.exports={
    bot:{   
        alexa:test=>run("alexa",{},test),
        get:test=>run("get",{},test),
        getresp:test=>run("get.resp",{
            input:{path:function(){
                return {status:'BUILDING'}
            }}
        },test),
        post:test=>run("post",{},test),
        resp:test=>run("post.resp",{},test),
        utterance:{
            get:test=>run("utterance.get",{},test),
            resp:test=>run("utterance.get.resp",{
                input:{path:function(){
                    return { enumerationValues:[
                        {value:"thin, or thin"},
                        {value:"thick"}
                    ]}
                }}
            },test)
        }
    }
}

