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

// var params = {
//   TableName: 'Table',
//   Key: { HashKey: 'hashkey' },
//   UpdateExpression: 'set #a = :x + :y',
//   ConditionExpression: '#a < :MAX',
//   ExpressionAttributeNames: { '#a': 'Sum' },
//   ExpressionAttributeValues: {
//     ':x': 20,
//     ':y': 45,
//     ':MAX': 100,
//   }
// };

/**
 * I wanna update an item of the table "hdr" which has the PK = `IOT#${mac}#${serviceType}` and SK= `DATE#${createdAt}`
 * if his "collectorProvId" is greater than 2 (:MAX)
 * and if it is, i want to set its companyId to 10 (:x)
 */
var params = {
  TableName: 'hdr',
  Key: { PK: `IOT#${mac}#${serviceType}`, SK: `DATE#${createdAt}` },
  UpdateExpression: 'set #companyId = :x',
  ConditionExpression: '#collectorProvId > :MAX',
  ExpressionAttributeNames: {
    '#collectorProvId': 'collectorProvId', '#companyId': 'companyId'
  },
  ExpressionAttributeValues: {
    ':x': 10,
    ':MAX': 2,
  }
};

documentClient.update(params, function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});