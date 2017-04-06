# hello-visitors

This is a prototype implementing a digital visitor book for the visitor to sign in and sign out.

[Demo](http://k-hello-visitors.s3-website-ap-southeast-2.amazonaws.com)

## Architecture

```
 ___________________     _____________     _________________     __________    
| S3 Static Website |-->| API Gateway |-->| Lambda Function |-->| DynamoDB |
|___________________|   |_____________|   |_________________|   |__________|
```

1. A DynamoDB Table for storing signin/signout records.
1. A Lambda function acts as the DynamoDB client for the API Gateway.
1. A API Gateway invoking the Lambda function.
1. S3 static web site(s) as the frontend for calling the API Gateway. 


## Deployment

1. Create a Lambda function with `hello-visitors.js`.
1. Use `cloudformation\HelloVisitors-Infrastructure.template` to create the DynamoDB, S3 bucket, Lambda permission.
1. Use `cloudformation\HelloVisitors-ApiGateway.template` to create the ApiGateway.
1. Select `Enable CORS` at AWS Console.
1. Select `Deploy API` at AWS Console.
1. Re-generate the JavaScript SDK from API Gateway and push to `site`.
1. Copy `site` to the S3 bucket.

#### References

1. [Passing caller IP to Lambda through API Gateway](https://forums.aws.amazon.com/thread.jspa?messageID=648053)
