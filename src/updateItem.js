const AWS = require("aws-sdk");

module.exports.handler = async(event) => {
  const { itemStatus } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  await dynamodb.update({
    TableName: "Store",
    Key: { id },
    UpdateExpression: "set itemStatus = :itemStatus",
    ExpressionAttributeValues: {
      ":itemStatus": itemStatus
    },
    ReturnValues: "ALL_NEW"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "OK",
      message: "Item updated successfully"
    })
  }

}