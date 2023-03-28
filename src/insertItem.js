const { v4 } = require("uuid");
const AWS = require("aws-sdk");

module.exports.handler = async(event) => {
  const inputData = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4();

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const newItem = {
    id,
    item: inputData.item,
    createdAt,
    itemStatus: false,
  };

  await dynamodb.put({
    TableName: "Store",
    Item: newItem
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newItem)
  };
}