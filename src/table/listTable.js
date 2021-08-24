const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const dynamoDB = new DynamoDB({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
})

var params = {
  Limit: 10
}

async function run() {
  try {
    const data = await dynamoDB.listTables(params);
    console.log("Table names are: ", data.TableNames);
  }
  catch (err) {
    console.log("Error", err);
  }
}
run()