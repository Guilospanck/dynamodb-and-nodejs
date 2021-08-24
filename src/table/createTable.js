const AWS = require('aws-sdk')
AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
})

var ddb = new AWS.DynamoDB()

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
      IndexName: "pk-createdAt-index",
      KeySchema: [
        {
          AttributeName: "PK",
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
};

// Call DynamoDB to create the table
ddb.createTable(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});