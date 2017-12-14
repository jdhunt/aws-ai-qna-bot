exports.parse=function(event){
    return {
        _type:"ALEXA",
        original:event,
        question:"",
        sessionAttributes:{}

    }
}
exports.assemble=function(request){
    return {}
}
