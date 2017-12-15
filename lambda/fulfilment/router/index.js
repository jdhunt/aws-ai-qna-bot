var Promise=require('bluebird')
var lex=require('./lex')
var alexa=require('./alexa')
var es=require('./es')

module.exports=class router {
    constructor(){
        this.middleware=[] 
    }

    start(event,callback){
        console.log("Request:"+JSON.stringify(event,null,2))
        var self=this
        try {
            var request=this._request(event)
            var response=this._response(request._type,callback)
        } catch(e){
            if( e.action==='END'){
                callback(null,"END") 
                return 
            } else if(e.action==='RESPOND'){
                callback(null,e.message) 
                return 
            } else {
                callback(e)
                return
            }
        } 
        
        try { 
            this._walk(request,response,this.middleware.length-1)
        } catch(e){
            response.send(e)
        }
    }

    add(fnc){
        this.middleware.push(fnc)
    }
    
    _walk(req,res,index){
        if(index>-1){
            Promise.resolve(this.middleware[index](req,res))
            .then(()=>_walk(req,res,index--))
        }else{
            res.send()
        }
    }
    
    _request(event){
        var type=this._type(event)
         
        switch(type){
            case 'LEX':
                var out=lex.parse(event)
                break;
            case 'ALEXA':
                var out=alexa.parse(event)
                break;
        }
        out._original=event
        out._query=es(out)
        return out
    }
    
    _response(type,callback){
        var response={
            type:"plaintext",
            message:"",
            card:{
                send:false,
                title:"",
                text:"",
                url:""
            }
        } 
        response.send=function(error){
            if(error){
                response.message=error
            }
            
            switch(type){
                case 'LEX':
                    var out=lex.assemble(response)
                    break;
                case 'ALEXA':
                    var out=alexa.assemble(response)
                    break;
            }
            if(process.env.LAMBDA_RESPONSE){
                //call response lambda here
            }
            if(process.env.LAMBDA_LOG){
                //async call log lambda
            }
            callback(null,out)
        }

        response.redirect=(req,res)=>this._walk(req,res,self.middleware.length-1)
        return response
    }

    _type(event){
        return event.version ? "ALEXA" : "LEX"
    }
}



