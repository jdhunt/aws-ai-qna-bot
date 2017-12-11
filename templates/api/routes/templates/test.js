var fs=require('fs')
process.argv.push('--debug')
var Velocity=require('velocity')

module.exports={
    health:{
        get:test=>run("health",{},test),
        resp:test=>run("health.resp",{},test),
    },
    info:test=>run("info",{},test),
    bot:{
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
                        {value:"thin"},
                        {value:"thick"}
                    ]}
                }}
            },test)
        }
    },
    qa:{
        head:test=>run("qa.head",{
            input:{
                params:()=>'id'
            }
        },test),
        delete:test=>run("qa.delete",{
            input:{
                params:()=>'id'
            }
        },test),
        put:test=>run("qa.put",{
            input:{
                body:'{}'
            }
        },test)
    },
    root:{
        get:test=>run("qa.get",{
            input:{
                body:'{}',
                params:name=>{return {
                    from:"",
                    filter:"",
                    query:"",
                    perpage:"all"
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
