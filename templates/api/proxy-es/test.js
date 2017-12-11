process.env.AWS_REGION=require('../../../config').region
var handler=require('./handler').handler
var env=require('../../../bin/exports')()

env.then(function(envs){
    
handler({
    endpoint:envs["QNA-DEV-ES-ADDRESS"],
    method:'GET',
    path:"/_cluster/health"
},{done:console.log},console.log)
})
