var _=require('lodash')
exports.parse=function(event){
    return {
        _type:"LEX",
        question:_.get(event,'inputTranscript'),
        session:_.get(event,'sessionAttributes',{}),
        channel:_.get(event,"requestAttributes.'x-amz-lex:channel-type'")
    }
}
exports.assemble=function(response){
    return {
        sessionAttributes:_.get(response,'session',{}),
        dialogAction:_.pickBy({
            type:"Close",
            fulfillmentState:"Fulfilled",
            message:{
                contentType:response.type,
                content:response.message
            },
            responseCard:isCard(response.card) ? {
                version:"1",
                contentType:"application/vnd.amazonaws.card.generic",
                genericAttachments:[{
                    title:response.card.title,
                    subTitle:response.card.text,
                    imageUrl:response.card.url
                }]
            } : null
        })
    }
}

function isCard(card){
    return card.title && card.text && card.url
}
