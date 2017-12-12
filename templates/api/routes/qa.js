var resource=require('./util/resource')
var lambda=require('./util/lambda')
var fs=require('fs')

module.exports={
"Questions": resource('questions'),
"QuestionsGet":lambda({
    authorization:"AWS_IAM",
    method:"get",
    lambda:{"Fn::GetAtt":["ESProxyLambda","Arn"]},
    template:fs.readFileSync(__dirname+'/templates/qa.get.vm','utf8'),
    responseTemplate:fs.readFileSync(__dirname+'/templates/qa.get.resp.vm','utf8'),
    resource:{"Ref":"Questions"},
    parameterLocations:{
      "method.request.querystring.query": false,
      "method.request.querystring.topic": false,
      "method.request.querystring.from": false,
      "method.request.querystring.filter":false,
      "method.request.querystring.order":false,
      "method.request.querystring.perpage":false,
    }
}),
"QuestionsPut":lambda({
    authorization:"AWS_IAM",
    method:"put",
    lambda:{"Fn::GetAtt":["ESProxyLambda","Arn"]},
    template:fs.readFileSync(__dirname+'/templates/qas.put.vm','utf8'),
    responseTemplate:fs.readFileSync(__dirname+'/templates/qas.put.resp.vm','utf8'),
    resource:{"Ref":"Questions"}
}),
"Question": resource('{ID}',{"Ref":"Questions"}),
"QuestionHead":lambda({
    authorization:"AWS_IAM",
    method:"head",
    errors:[{   
        "SelectionPattern":"Error:404.*",
        "StatusCode":404
    }],
    lambda:{"Fn::GetAtt":["ESProxyLambda","Arn"]},
    template:fs.readFileSync(__dirname+'/templates/qa.head.vm','utf8'),
    responseTemplate:fs.readFileSync(__dirname+'/templates/qa.head.resp.vm','utf8'),
    resource:{"Ref":"Question"},
    parameterLocations:{
      "method.request.path.Id": true
    }
}),
"QuestionPut":lambda({
    authorization:"AWS_IAM",
    method:"put",
    lambda:{"Fn::GetAtt":["ESProxyLambda","Arn"]},
    template:fs.readFileSync(__dirname+'/templates/qa.put.vm','utf8'),
    responseTemplate:fs.readFileSync(__dirname+'/templates/qa.put.resp.vm','utf8'),
    resource:{"Ref":"Question"},
    parameterLocations:{
      "method.request.path.Id": true
    }
}),
"QuestionDelete":lambda({
    authorization:"AWS_IAM",
    method:"delete",
    lambda:{"Fn::GetAtt":["ESProxyLambda","Arn"]},
    template:fs.readFileSync(__dirname+'/templates/qa.delete.vm','utf8'),
    responseTemplate:fs.readFileSync(__dirname+'/templates/qa.delete.resp.vm','utf8'),
    resource:{"Ref":"Question"},
    parameterLocations:{
      "method.request.path.Id": true
    }
})
}
