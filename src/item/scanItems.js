const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");

const dynamoDB = new DynamoDB({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
})

// CRUD table with Document Client (abstraction)
const documentClient = DynamoDBDocument.from(dynamoDB)

// query
const startDate = "2021-08-21T14:11:19.000Z"
const endDate = "2021-08-24T14:11:19.000Z"

/**
 * REMEMBER: SCAN IS TOO COSTLY TO USE. USE QUERY INSTEAD, OTHERWISE AWS BILLING WILL GO HIGH.
 * I want to scan my table "hdr" for items that their CreatedAt are between "startDate" and "endDate". 
 */
var params = {
  TableName: "hdr",
  FilterExpression: "#createdAt BETWEEN :startDate and :endDate",
  ExpressionAttributeNames: {
    "#createdAt": "createdAt",
  },
  ExpressionAttributeValues: {
    ':startDate': startDate,
    ':endDate': endDate,
  }
}

async function run() {
  try {
    const data = await documentClient.scan(params)
    console.log("Success", data);
  }
  catch (err) {
    console.log("Error", err);
  }
}
run()
