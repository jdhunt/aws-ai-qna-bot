var fs=require('fs')
var mock=require('./util/mock')

module.exports={
"rootGet": mock({
    auth:'NONE',
    method:"GET",
    template:"info",
    resource:{"Fn::GetAtt": ["API","RootResourceId"]}
})
}
    
