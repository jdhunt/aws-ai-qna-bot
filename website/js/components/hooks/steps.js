var stringify=require('json-stringify-pretty-compact')
var example=stringify(require('./example'))
module.exports=[{
    title:"Create Lambda Function",
    text:`
Create a lambda function with a name that starts with "qna"
for example:
qna-extra-special
qna-secret-sauce
...
    `
},{
    title:"Write Code",
    text:`
code must return its event object

A minimal function would look like this

~~~js
exports.handler=function(event,context,callback){
    console.log("Input:",JSON.stringify(event,null,2))
    callback(null,event)
}
~~~

The Event context has three properties
1. \`req\` the normalized request object
1. \`res\` the normalized response object (edit this to change the response)

~~~json 
${example}
~~~
`
},{
    title:"Add/Edit Question",
    text:`
For a new or existing question edit the Lambda field to contain the arn of your created lambda function
`
},{
    title:"Test Question",
    text:`
Ask question in QnAClient to see your new response
`
}
]
