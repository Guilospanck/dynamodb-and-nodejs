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

/**
 * I want to delete an item from the table "hdr" which has the PK: `IOT#${mac}#${serviceType}` and SK: `DATE#${createdAt}`
 */
var params = {
  TableName: 'hdr',
  Key: {
    PK: `IOT#${mac}#${serviceType}`,
    SK: `DATE#${createdAt}`
  }
};

documentClient.delete(params, function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});