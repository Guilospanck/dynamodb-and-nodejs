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

// query
const startDate = "2021-08-21T14:11:19.000Z"
const endDate = "2021-08-24T14:11:19.000Z"


/**
 * OBS.: the hashing key (partition key) can only be used with EQUALITY operator.
 * the sorting key can be used with others, as with COMPARISON operators and so on...
 * 
 * I want to query my table "hdr" (using GSI) for items which have hash key (PK "#Type") as "IoT" and 
 * that their createdAt in the sorting key (SK) are between "startDate" and "endDate". 
 * Also, I wanna filter the results by macs and serviceType.
 */
var params = {
  TableName: 'hdr',
  IndexName: 'Type-createdAt-index', // querying from the GSI
  KeyConditionExpression: '#Type = :IOT and #createdAt BETWEEN :startDate and :endDate',
  FilterExpression: `(#mac = :mac1 or #mac = :mac2 or #mac = :mac3) and #serviceType = :serviceType`,
  ExpressionAttributeValues: {
    ':startDate': startDate,
    ':endDate': endDate,
    ':mac1': '4548aabb0001',
    ':mac2': '4548aabb0002',
    ':mac3': '4548aabb0003',
    ':IOT': 'IOT',
    ':serviceType': 3,
  },
  ExpressionAttributeNames: {
    '#createdAt': 'createdAt',
    '#Type': 'IoT',
    "#mac": 'mac',
    "#serviceType": 'serviceType',
  }
};

async function run() {
  try {
    const data = await documentClient.query(params)
    console.log("Success", data);
  }
  catch (err) {
    console.log("Error", err);
  }
}
run()
