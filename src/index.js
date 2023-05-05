/*'use strict';

const serverless = require('serverless-http');
const strapi = require('strapi');

strapi().start();*/

export const getAllItemsHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  // get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
  // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
  var params = {
    TableName : tableName
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    var items = data.Items;
  } catch (err) {
    console.log("Error", err);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(items)
  };

  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
/*
async function handler(event) {
  // await config()
  // Serve the page if it's an html or the root and we have a template
  const page = await servePage(event)
  if (page) {
    return send({ body: page })
  }

  // Serve a public file otherwhise
  const fileResponse = await serveFile(event)
  if (fileResponse) {
    return send({ body: fileResponse.file, type: fileResponse.fileType })
  }

  // 404
  const notFoundPage = await ejs.renderFile(path.resolve(__dirname, pages['not-found']), { config })
  return send({ status: 404, body: notFoundPage })
}*/


module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
  //handler: handler()
};
