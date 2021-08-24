# DynamoDBAndNodejs
Simple POC to use DynamoDB with Node.js

## Step-By-Step
- First install AWS CLI
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```
> Note that you must have unzip installed. If you don't, install it by running ``` sudo apt-get install unzip ```

- Now you must have DynamoDB on the run (AWS) or locally. To install locally, you will need <i>Docker</i>. The image used to run DynamoDB locally is ```amazon/dynamodb-local```. You can run it on your computer by typing on a terminal:
```bash
docker run --rm -p 8000:8000 -d amazon/dynamodb-local
```

- You`ll need AWS SDK For Javascript in order to run this examples. There are two versions: v2 and v3. The primary changes between them is that v3 is modularized (so you won't need to download every single package out there just to run one service from AWS) and have a middleware stack to control the lifecycle of an operation call. To install v2, do:
```bash
yarn add aws-sdk
```
To install v3 for DynamoDB, do:
```bash
yarn add @aws-sdk/client-dynamodb
```

- To run locally, you need to AWS configure. To do that, follow this:
```bash
$ aws configure
AWS Access Key ID []: local
AWS Secret Access Key []: local
Default region name []: us-east-1
Default output format [None]:

```

# Referencies
- [AWS Docs - Class DocumentClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)
- [AWS Docs - Using DocumentClient](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html)
- [AWS Docs - Getting Started With DynamoDB](https://docs.amazonaws.cn/en_us/amazondynamodb/latest/developerguide/GettingStartedDynamoDB.html)