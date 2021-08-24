const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const dynamoDB = new DynamoDB({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
})

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

async function run() {
  try {
    const data = await dynamoDB.updateTable(params);
    console.log("Table created: ", data);
  }
  catch (err) {
    console.log("Error", err);
  }
}
run()