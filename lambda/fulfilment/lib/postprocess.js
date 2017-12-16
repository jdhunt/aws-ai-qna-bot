var aws=require('./aws')
var lambda= new aws.lambda()
var _=require('lodash')

module.exports=function(req,res){
    var arn=_.get(res,"result.l.arn")
    //link parsing
    //markdown formating
    //ssml 
    if(arn){
        return lambda.invoke({
            FunctionName:arn,
            InvocationType:"RequestResponse",
            Payload:JSON.stringify({req,res})
        }).promise()
        .then(result=>{
            var parsed=JSON.parse(result.Payload)
            Object.assign(req,parsed.req)
            Object.assign(res,parsed.res)
        })
    }
}
