/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/
var Validator = require('jsonschema').Validator;
var v = new Validator();
var lambda=require('../bin/lambda.js')
var env=require('../../../bin/exports')()
var Promise=require('bluebird')
var lexSchema=require('./lex/schema')
var alexaSchema=require('./alexa/schema')
var _=require('lodash')

var run=function(params,schema,test){
    return lambda(params)
        .tap(msg=>console.log(JSON.stringify(msg)))
        .tapCatch(msg=>console.log(JSON.stringify(msg)))
        .tap(test.ok)
        //.tap(x=>v.validate(x,schema))
        .catch(test.ifError)
        .finally(test.done)
}
var Router=new require('../router')

module.exports={
    router:{
        setUp:function(done){
            this.run=function(router,test){
                Promise.promisify(router.start)
                .bind(router)(_.cloneDeep(require('./lex/lex')))
                .then(test.ok)
                .catch(test.ifError)
                .finally(test.done)
            }
            done()
        },
        empty:function(test){
            var router=new Router()
            this.run(router,test)
        },
        early:function(test){
            var router=new Router()
            this.run(router,test)
        },
        redirect:function(test){
            var router=new Router()
            this.run(router,test)
        },
        handle:function(test){
            var router=new Router()
            this.run(router,test)
        }

    },
    lex:function(test){
        run(require('./lex/lex'),lexSchema,test)
    },
    alex:{
        start:function(test){
            run(require('./alexa/start'),alexaSchema,test)
        },
        intent:function(test){
            run(require('./alexa/intent'),alexaSchema,test)
        },
        cancel:function(test){
            run(require('./alexa/cancel'),alexaSchema,test)
        },
        end:function(test){
            run(require('./alexa/end'),alexaSchema,test)
        }
    }
}
