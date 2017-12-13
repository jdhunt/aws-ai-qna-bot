var stack=require('../util').stacktest
var config=require('../../config')

module.exports={
  "Resources": {
    "api":stack('api',{
        "Botname":"bot",
        "SlotType":"slot",
        "Intent":"intent",
        "Email":config.devEmail,
        "PublicOrPrivate":"PRIVATE",
        "ApprovedDomain":"amazon.com",
        "ESAddress":{"Fn::ImportValue":"QNA-DEV-ES-ADDRESS"},
        "ESDomainArn":{"Fn::ImportValue":"QNA-DEV-ES-ARN"},
        "ESType":"test-type",
        "ESIndex":"test-index"
    })
  },
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "Test of the QnABot API template"
}
