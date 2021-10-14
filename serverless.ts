import type { AWS } from "@serverless/typescript";

import hello from "@functions/createVal";
import getVal from "@functions/getVal";
import deleteVal from "@functions/deleteVal";
import getalldata from "@functions/getalldata";
import updateVal from "@functions/updateVal";

const serverlessConfiguration: AWS = {
  service: "serverless",
  frameworkVersion: "2",
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        inMemory: true,
        heapInitial: "200m",
        heapMax: "1g",
        migrate: true,
        seed: true,
        convertEmptyValues: true,
      },
    },

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
    },
  },
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: "*",
      },
    ],
  },
  // import the function via paths
  functions: { hello, getVal, deleteVal, getalldata, updateVal },

  resources: {
    Resources: {
      usersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
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
      },
    },
  },
};

module.exports = serverlessConfiguration;
