var Promise=require('bluebird')
var lex=require('./lex')
var alexa=require('./alexa')

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

            try { 
                this._walk(request,response,this.middleware.length-1)
            } catch(e){
                response.send(e)
            }
        } catch(e){
            callback(e)
        }
    }

    add(fnc){
        this.middleware.push(fnc)
    }
    
    _walk(req,res,index){
        if(index>0){
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
                return lex.parse(event)
                break;
            case 'ALEXA':
                return alexa.parse(event)
                break;
        }
    }
    
    _response(type,callback){
        var response={} 
        response.send=function(error){
            if(error){
                response.message=error
            }
            switch(type){
                case 'LEX':
                    callback(null,lex.assemble(response))
                    break;
                case 'ALEXA':
                    callback(null,alexa.assemble(response))
                    break;
            }
        }

        response.redirect=(req,res)=>this._walk(req,res,self.middleware.length-1)
        return response
    }

    _type(event){
        return "LEX"
    }
}



