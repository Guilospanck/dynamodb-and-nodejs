const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");

const dynamoDB = new DynamoDB({
  region: 'us-east-1',
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
  credentials: {
    accessKeyId: 'local',
    secretAccessKey: 'local'
  },
})

// CRUD table with Document Client (abstraction)
const documentClient = DynamoDBDocument.from(dynamoDB)

const serviceType = 3
const macs = ['454806000001','454806000002','454806000004','454806000006']

// query
const startDate = "2021-09-14T19:46:50.818Z"
const endDate = "2021-09-21T19:46:50.818Z"

/**
 * OBS.: the hashing key (partition key) can only be used with EQUALITY operator.
 * the sorting key can be used with others, as with COMPARISON operators and so on... 
 * 
 * A query operation will read a maximum of 1MB of data. More than that, you'll need to paginate.
 */

async function getItemsFromMacs() {
  for (const mac of macs) {
    let params = {
      TableName: 'iot',
      KeyConditionExpression: '#macAndServiceType = :macAndServiceType and #createdAt BETWEEN :startDate and :endDate',
      ExpressionAttributeValues: {
        ':macAndServiceType': `${mac}#${serviceType}`,
        ':startDate': startDate,
        ':endDate': endDate,
      },
      ExpressionAttributeNames: {
        '#macAndServiceType': 'macAndServiceType',
        '#createdAt': 'createdAt'
      },
      IndexName: 'macAndServiceType-createdAt-index'
    }

    await queryRecursively(params)

  }
}

let dataToReturn = []
async function queryRecursively(params) {
  const data = await documentClient.query(params)
  for (item of data.Items) dataToReturn.push(item)

  if (data.LastEvaluatedKey) { // there are more than 1 MB of data to be retrieved
    params = {
      ...params,
      ExclusiveStartKey: data.LastEvaluatedKey
    }

    await queryRecursively(params)
  }
}

async function run() {
  try {
    console.time('dynamodb')
    await getItemsFromMacs()
    console.timeEnd('dynamodb')
    console.log("Success", dataToReturn.length);
  }
  catch (err) {
    console.log("Error", err);
  }
}
run()
