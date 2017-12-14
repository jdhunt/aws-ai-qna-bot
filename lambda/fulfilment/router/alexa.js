exports.parse=function(event){
    return {
        _type:"LEX",
        original:event,
        question:"",
        sessionAttributes:{}
    }
}
exports.assemble=function(request){
    return {}
}
