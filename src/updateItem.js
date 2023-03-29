const AWS = require("aws-sdk");
const fetchItem = require("./fetchItem");

module.exports.handler = async(event) => {
  const { itemStatus } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  let jsonResponse;
  let statusCode;

  try {
    let foundItem = await fetchItem.handler(event);

    if (foundItem.statusCode !== 200) {
      throw new Error("Item not found");
    }

    await dynamodb.update({
      TableName: "Store",
      Key: { id },
      UpdateExpression: "set itemStatus = :itemStatus",
      ExpressionAttributeValues: {
        ":itemStatus": itemStatus
      },
      ReturnValues: "ALL_NEW"
    }).promise();

    jsonResponse = {
      status: "OK",
      message: "Item updated successfully"
    };
    statusCode = 200;
  } catch(error) {
    jsonResponse = {
      status: "UNPROCESSABLE_ENTITY",
      message: "Could not process request data."
    };
    statusCode = 422;
  }

  return {
    statusCode,
    body: JSON.stringify(jsonResponse)
  }

}