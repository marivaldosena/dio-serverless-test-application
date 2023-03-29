const AWS = require("aws-sdk");

module.exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let jsonResponse;
  let statusCode;

  let item;

  try {
    const result = await dynamodb.get({
      TableName: "Store",
      Key: { id }
    }).promise();
    
    item = result.Item;

    if (!item) {
      throw new Error("Item not found");
    };

    jsonResponse = {
      data: item,
      status: "OK"
    };
    statusCode = 200;
  } catch(error) {
    jsonResponse = {
      status: "NOT_FOUND",
      message: "Item not found"
    };
    statusCode = 404;
  }

  return {
    statusCode,
    body: JSON.stringify(jsonResponse)
  }
}