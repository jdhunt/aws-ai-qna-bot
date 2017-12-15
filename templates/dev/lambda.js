module.exports={
   "Description": "This template creates dev ElasticSearch Cluster",
   "Resources":{
    "Lambda": {
      "Type": "AWS::Lambda::Function",
      "Properties": {
        "Code": {
            "ZipFile":{"Fn::Join":["\n",[
                "module.exports=function(event,context,callback){",
                "   console.log(JSON.stringify(event,null,2))",
                "   callback(null,event)",
                "}"
            ]]}
        },
        "Handler": "index.handler",
        "MemorySize": "128",
        "Role": {"Fn::GetAtt": ["LambdaRole","Arn"]},
        "Runtime": "nodejs6.10",
        "Timeout": 300
      }
    },
    "LambdaRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": "lambda.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
            }
          ]
        },
        "Path": "/",
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
        ]
      }
    }
  },
   "Outputs": {
        "lambda":{
            "Value":{"Fn::GetAtt":["Lambda","Arn"]},
            "Export":{
                "Name":"QNA-DEV-LAMBDA"
            }
        }
   }
}
