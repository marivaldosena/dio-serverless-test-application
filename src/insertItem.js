const { v4 } = require("uuid");
const AWS = require("aws-sdk");

module.exports.handler = async(event) => {
  const inputData = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4();

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  
  let jsonResponse;
  let statusCode;

  try {
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

    jsonResponse = {
      data: newItem,
      status: "CREATED"
    };
    statusCode = 200;
  } catch(error) {
    jsonResponse = {
      status: "UNPROCESSABLE_ENTITY",
      message: "Could not create resource."
    }
    statusCode = 422;
  }


  return {
    statusCode,
    body: JSON.stringify(jsonResponse)
  };
}