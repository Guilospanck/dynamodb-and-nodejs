const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const dynamoDB = new DynamoDB({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
})

var params = {
  TableName: process.argv[2]
};

async function run() {
  try {
    const data = await dynamoDB.describeTable(params);
    console.log("Success", data);
  }
  catch (err) {
    console.log("Error", err);
  }
}
run()

// USE: node src/table/describeTable.js TABLE_NAME