const AWS = require('aws-sdk')
AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
})

var ddb = new AWS.DynamoDB()

/**
 * Updating throughput to 5 of the table "hdr"
 */
var params = {  
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  TableName: 'hdr'
};

// Call DynamoDB to create the table
ddb.updateTable(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});