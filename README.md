# hello-visitor

This is a prototype implementing a digital visitor book for the visitor to sign in and sign out.

## Plan

1. A DynamoDB Table for storing signin/signout records
1. A Lambda function for interaction between the API Gateway and the DynamoDB
1. A API Gateway invoking the Lambda function
1. S3 static web site(s) as the frontend for calling the API Gateway
