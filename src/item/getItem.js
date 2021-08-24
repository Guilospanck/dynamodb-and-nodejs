const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");

const dynamoDB = new DynamoDB({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
})

// CRUD table with Document Client (abstraction)
const documentClient = DynamoDBDocument.from(dynamoDB)

const mac = "4548aabb0001"
const serviceType = 4
const createdAt = "2021-08-21T14:11:18.000Z"
const companyId = 1
const collectorProvId = 1
const rssi = -93
const raw = "03EF048DD6018F04"

/**
 * I want to get an item from the table "hdr" which has the PK: `IOT#${mac}#${serviceType}` and SK: `DATE#${createdAt}`
 */
var params = {
  TableName: 'hdr',
  Key: {
    PK: `IOT#${mac}#${serviceType}`,
    SK: `DATE#${createdAt}`
  }
};

async function run() {
  try {
    const data = await documentClient.get(params)
    console.log("Success", data);
  }
  catch (err) {
    console.log("Error", err);
  }
}
run()
// Get expects single result