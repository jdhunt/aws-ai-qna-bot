process.env.AWS_REGION=require('../../../config').region
var handler=require('./handler').handler
var env=require('../../../bin/exports')()

env.then(function(envs){
    
handler({
    endpoint:envs["QNA-DEV-ES-ADDRESS"],
    method:'POST',
    path:"/_cluster/health",
    body:{
        "query" : {
            "term" : { "qid" : "zombie" }
        }
    }
},{done:console.log},console.log)
})
