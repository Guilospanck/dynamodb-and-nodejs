const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const dynamoDB = new DynamoDB({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
})

var params = {
  AttributeDefinitions: [
    {
      AttributeName: 'PK',
      AttributeType: 'S' // S means string
    },
    {
      AttributeName: 'SK',
      AttributeType: 'S'
    },
    {
      AttributeName: 'createdAt',
      AttributeType: 'S'
    },
    {
      AttributeName: 'Type',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'PK', // partition key
      KeyType: 'HASH'
    },
    {
      AttributeName: 'SK', // sort key
      KeyType: 'RANGE'
    }
  ],
  GlobalSecondaryIndexes: [ // GSI
    {
      IndexName: "Type-createdAt-index",
      KeySchema: [
        {
          AttributeName: "Type",
          KeyType: "HASH"
        },
        {
          AttributeName: "createdAt",
          KeyType: "RANGE"
        }
      ],
      Projection: {
        ProjectionType: "ALL"
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    }
  ],
  ProvisionedThroughput: { // Provisioned throughput
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'hdr'
}

async function run (){
  try {
    const data = await dynamoDB.createTable(params);
    console.log("Success", data);
  }
  catch (err) {
    console.log("Error", err);
  }
}
run()
