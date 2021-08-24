const AWS = require('aws-sdk')
AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
})

// CRUD table with Document Client (abstraction)
const documentClient = new AWS.DynamoDB.DocumentClient();

const mac = "4548aabb0001"
const serviceType = 4
const createdAt = "2021-08-21T14:11:18.000Z"
const companyId = 1
const collectorProvId = 1
const rssi = -93
const raw = "03EF048DD6018F04"

// query
const startDate = "2021-08-20T14:11:18.000Z"
const endDate = "2021-08-22T14:11:18.000Z"


/**
 * OBS.: the hashing key (partition key) can only be used with EQUALITY operator.
 * the sorting key can be used with others, as with COMPARISON operators and so on...
 * 
 * I want to query my table "hdr" (using GSI) for items which have Partition Key (PK) as `IOT#${mac}#${serviceType}` and 
 * that their CreatedAt in the sorting key (SK) are between "startDate" and "endDate". 
 */
var params = {
  TableName: 'hdr',
  IndexName: 'pk-createdAt-index', // querying from the GSI
  KeyConditionExpression: '#PK = :PK and #createdAt BETWEEN :startDate and :endDate',
  ExpressionAttributeValues: {
    ':PK': `IOT#${mac}#${serviceType}`,
    ':startDate': startDate,
    ':endDate': endDate,
  },
  ExpressionAttributeNames: {
    '#PK': 'PK',
    '#createdAt': 'createdAt'
  }
};

documentClient.query(params, function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});