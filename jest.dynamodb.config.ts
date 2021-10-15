module.exports = {
  tables: [
    {
      TableName: "WahabTable",
      AttributeDefinitions: [
        // {
        //   AttributeName: "id",
        //   AttributeType: "S",
        // },
        {
          AttributeName: "ID",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        // {
        //   AttributeName: "id",
        //   KeyType: "HASH",
        // },
        {
          AttributeName: "ID",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  ],
};
