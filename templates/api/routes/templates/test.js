var fs=require('fs')
process.argv.push('--debug')
var Velocity=require('velocity')
var JSONPath = require('JSONPath');

module.exports={
    health:{
        get:test=>run("health",{},test),
        resp:test=>run("health.resp",{},test),
    },
    info:test=>run("info",{},test),
    bot:{   
        alexa:test=>run("alexaschema",{},test),
        get:test=>run("bot.get",{},test),
        getresp:test=>run("bot.get.resp",{
            input:{path:function(){
                return {status:'BUILDING'}
            }}
        },test),
        post:test=>run("bot.post",{},test),
        resp:test=>run("bot.post.resp",{},test),
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
    },
    qa:{
        head:{
            send:test=>run("qa.head",{
                input:{
                    params:()=>'id'
                }
            },test),
            resp:test=>run("qa.head.resp",{
                input:{
                    params:()=>'id'
                }
            },test)
        },
        delete:{
            send:test=>run("qa.delete",{
                input:{
                    params:()=>'id'
                }
            },test),
            resp:function(test){
                var body={
                    "_shards":{
                        successful:2
                    },
                    "_id":2,
                    result:"delete"
                }
                run("qa.delete.resp",{
                    input:{
                        path:(x)=>{
                            return JSONPath({json:body,path:x})[0]
                        },
                        json:(x)=>{
                            return JSON.stringify(JSONPath({json:body,path:x})[0])
                        }
                    }
                },test)
            }
        },
        put:{
            send:test=>run("qa.put",{
                input:{
                    params:()=>'id',
                    json:()=>JSON.stringify({a:1})
                }
            },test),
            resp:function(test){
                var body={
                    "_shards":{
                        successful:2
                    },
                    "_id":2,
                    result:"created"
                }
                run("qa.put.resp",{
                    input:{
                        path:(x)=>{
                            return JSONPath({json:body,path:x})[0]
                        },
                        json:(x)=>{
                            return JSON.stringify(JSONPath({json:body,path:x})[0])
                        }
                    }
                },test)
            }
        },
        puts:{
            resp:function(test){
                var body={
                    took:30,
                    errors:false,
                    items:[{
                        index:{
                            status:200,
                            _id:1
                        }
                    },{
                        index:{
                            status:200,
                            _id:2
                        }
                    }]
                }
                run("qas.put.resp",{
                    input:{
                        path:(x)=>{
                            return JSONPath({json:body,path:x})[0]
                        },
                        json:(x)=>{
                            return JSON.stringify(JSONPath({json:body,path:x})[0])
                        }
                    }
                },test)
            },
            send:function(test){
                var body=[{qid:3,a:1},{qid:2,a:2}]
                run("qas.put",{
                    input:{
                        path:(x)=>{
                            return JSONPath({json:body,path:x})[0]
                        },
                        json:(x)=>{
                            return JSON.stringify(JSONPath({json:body,path:x})[0])
                        }
                    }
                },test)
            }
        }
    },
    root:{
        get:test=>run("qa.get",{
            input:{
                body:'{}',
                params:name=>{return {
                    from:"",
                    filter:"",
                    query:"",
                    perpage:"0"
                }[name]}
            }
        },test),
        list:test=>run("qa.get",{
            input:{
                body:'{}',
                params:name=>{return {
                    from:"",
                    filter:"filter",
                    query:"",
                    perpage:""
                }[name]}
            }
        },test),
        import:test=>run("qa.put",{
            input:{
                body:'{}',
                json:()=>'{}',
                params:()=>'notall'
            }
        },test),
        search:test=>run("qa.get",{
            input:{
                body:'{}',
                params:name=>{return {
                    from:"",
                    filter:"",
                    query:"search",
                    perpage:"",
                    topic:""
                }[name] }
            }
        },test),
        resp:test=>run("qa.get.resp",{
            input:{
            json:function(x){
                return JSON.stringify({ "a":"1"})
            },
            path:function(){
                return {
                    hits:{
                        total:10,
                        hits:[{
                            _score:10,
                            _id:"1"
                        },{
                            _score:9,
                            _id:"2"
                        }]
                    }
                }
            }}
        },test)
    }
}

function run(name,context,test){
    var temp=new Velocity.Engine({
        template:"./"+name+".vm",
        debug:true
    })
    
    var result=temp.render(Object.assign(require("./context.js"),context))
    console.log(result)
    try {
        var json=JSON.parse(result)
        test.ok(true)
        test.done()
    } catch (e){
        console.log(e)
        test.ok(false)
        test.done()
    }
}
