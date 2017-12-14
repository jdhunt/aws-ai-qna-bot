var _=require('lodash')
exports.parse=function(event){
    var out={
        _type:"LEX",
        original:event,
        session:_.get(event,'session.attributes',{})
    }

    switch(_.get(event,"request.type")){
        case "LaunchRequest":
            throw new Respond({
                version:'1.0',
                response:{
                    outputSpeech:{
                        type:"PlainText",
                        text:"Hello, Please ask a question"
                    },
                    shouldEndSession:false
                }
            })
            break;
        case "IntentRequest":
            out.question=_.get(event,'intents.slots.QnA_slot.value')
            break;
        case "SessionEndedRequest":
            throw new End() 
            break;
    }
    
    switch(_.get(event,"request.intent.name")){
        case "AMAZON.CancelIntent":
            throw new Respond({
                version:'1.0',
                response:{
                    outputSpeech:{
                        type:"PlainText",
                        text:"GoodBye"
                    },
                    shouldEndSession:true
                }
            })
            break;
        case "AMAZON.HelpIntent":
            out.question="help"
            break;
        case "AMAZON.RepeatIntent":
            throw new Respond({
                version:'1.0',
                response:{
                    outputSpeech:{
                        type:"PlainText",
                        text:_.get(out,"session.previous.answer","Sorry, i do not remober")
                    },
                    shouldEndSession:true
                }
            })
            break;
        case "AMAZON.StopIntent":
            throw new Respond({
                version:'1.0',
                response:{
                    outputSpeech:{
                        type:"PlainText",
                        text:"GoodBye"
                    },
                    shouldEndSession:true
                }
            })
            break;
    }
    return out
}
exports.assemble=function(request){
    return {
        version:'1.0',
        response:_.pickBy({
            outputSpeech:{
                type:request.type,
                text:request.message
            },
            shouldEndSession:false,
            card:isCard(response.card) ? _.pickBy({
                type:request.card.url ? "Simple" : "Standard",
                title:request.card.title,
                content:request.card.url ? request.card.text : null,
                text:request.card.url ? request.card.text : null,
                image:request.card.url ? {
                    smallImageUrl:request.card.url,
                    largeImageUrl:request.card.url
                } : null
            }) : null
        }),
        sessionAttributes:_.get(request,'session',{})
    }
}

function End(){
    this.action="END"
}

function Respond(message){
    this.action="RESPOND"
    this.message=message
}

function isCard(card){
    return card.title && card.text && card.url
}

