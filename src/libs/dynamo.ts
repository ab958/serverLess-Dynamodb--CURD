//import { MessagePort } from "worker_threads";

const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient({
  // region: 'localhost',
  // endpoint: 'http://localhost:8000',
});

const Dynamo = {
  async get(ID, TableName) {
    console.log(ID, "wqe");
    const params = {
      TableName,
      Key: {
        ID,
      },
    };
    console.log(params, "w23e");
    const data = await documentClient.get(params).promise();
    console.log(data, "w23e");
    if (!data || !data.Item) {
      throw Error(
        `There was an error fetching the data for ID of ${ID} from ${TableName}`
      );
    }
    console.log(data);

    return data.Item;
  },
  async write(data, TableName) {
    if (!data.ID) {
      throw Error("no ID on the data");
    }

    const params = {
      TableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();
    console.log(res, "wahab");
    if (!res) {
      throw Error(
        `There was an error inserting ID of ${data.ID} in table ${TableName}`
      );
    }

    return data;
  },
  async delete(ID, TableName) {
    // if (!data.ID) {
    //     throw Error('no ID on the data');
    // }

    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const res = await documentClient.delete(params).promise();

    if (!res) {
      throw Error(
        `There was an error inserting ID of ${ID} in table ${TableName}`
      );
    }

    return JSON.stringify({
      Message: " Value daleted",
    });
  },
  async getalldata(TableName) {
    // if (!data.ID) {
    //     throw Error('no ID on the data');
    // }

    const params = {
      TableName,
    };

    const res = await documentClient.scan(params).promise();

    if (!res) {
      throw Error(`There was in table ${TableName}`);
    }

    return res;
  },
};
export default Dynamo;
