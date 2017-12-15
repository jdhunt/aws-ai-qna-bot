var bodybuilder = require('bodybuilder')
var _=require('lodash')

module.exports=function(request){
    return bodybuilder()
    .query('nested',{
        path:'questions',
        score_mode:'max',
        boost:2},
        q=>q.query('match','question.q',request.question)
    )
    .query('match','a',request.question)
    .query('match','t',_.get(request,'session.topic',''))
    .from(0)
    .size(1)
    .build()
}
