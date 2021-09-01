const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");

const dynamoDB = new DynamoDB({
  region: 'us-east-1',
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
  credentials: {
    accessKeyId: 'local',
    secretAccessKey: 'local'
  }
})

// CRUD table with Document Client (abstraction)
const documentClient = DynamoDBDocument.from(dynamoDB)

const mac = "454815000029"
const serviceType = 3

// query
const startDate = "2021-08-31T14:11:18.000Z"
const endDate = "2021-09-01T14:11:18.000Z"

/**
 * OBS.: the hashing key (partition key) can only be used with EQUALITY operator.
 * the sorting key can be used with others, as with COMPARISON operators and so on... 
 * 
 * A query operation will read a maximum of 1MB of data. More than that, you'll need to paginate.
 */
var params = {
  TableName: 'iot',
  KeyConditionExpression: '#PK = :PK',
  ExpressionAttributeValues: {
    ':PK': `IOT#${mac}#${serviceType}`
  },
  ExpressionAttributeNames: {
    '#PK': 'PK',
  },
  ScanIndexForward: false,
  Limit: 1,
};

let dataToReturn = []
async function queryRecursively() {
  const data = await documentClient.query(params)
  for (item of data.Items) dataToReturn.push(item)

  if (params.Limit) { // if I want just the last value, I won't do any recursive operation
    return
  }

  if (data.LastEvaluatedKey) { // there are more than 1 MB of data to be retrieved
    params = {
      ...params,
      ExclusiveStartKey: data.LastEvaluatedKey
    }

    await queryRecursively()
  }
}

async function run() {
  try {
    await queryRecursively()
    console.log("Success", dataToReturn);
  }
  catch (err) {
    console.log("Error", err);
  }
}
run()
