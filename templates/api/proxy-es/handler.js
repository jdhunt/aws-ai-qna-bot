var aws=require('aws-sdk')
aws.config.region=process.env.AWS_REGION

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    var endpoint =  new aws.Endpoint(event.endpoint);
    var req = new aws.HttpRequest(endpoint);

    req.method = event.method 
    req.path = event.path
    req.region =aws.config.region;
    if(event.body){
        req.body = event.body
    }
    req.headers['presigned-expires'] = false;
    req.headers['Host'] = endpoint.host;

    // Sign the request (Sigv4)
    var signer = new aws.Signers.V4(req, 'es');
    signer.addAuthorization(aws.config.credentials, new Date());

    // Post document to ES
    var send = new aws.NodeHttpClient();
    send.handleRequest(req, null, 
        function(httpResp) {
            var body = '';
            httpResp.on('data', function (chunk) {
                body += chunk;
            });
            httpResp.on('end', function (chunk) {
                console.log("Response:" +JSON.stringify(JSON.parse(body),null,2))
                callback(null,body)
            });
        }, 
        function(err) {
            console.log('Error: ' + err);
            callback(err);
        }
    );
}
