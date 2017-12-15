var aws=require('./aws')
var lambda= new aws.lambda()
var _=require('lodash')

module.exports=function(req,res){
    if(process.env.LAMBDA_PREPROCESS){
        return lambda.invoke({
            FunctionName:process.env.LAMBDA_PREPROCESS,
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
