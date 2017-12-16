var aws=require('aws-sdk')
aws.config.region=process.env.AWS_REGION

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    try {
    var out=event._meta.schema
        Object.keys(event)
            .filter(x=>!['_meta','a','questions','a','q'].includes(x))
            .forEach(x=>out.properties[x]={type:"string"}) 
        callback(null,out)
    } catch(e){
        callback(e)
    }
}


