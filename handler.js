'use strict';

const s3Service = require('./services/s3');
const dynamoDbService = require('./services/dynamoDB');

module.exports.upload = async event => {
  const result = await s3Service.upload(event.body);
  await dynamoDbService.put(result);

  return {
    statusCode: 201,
    body: JSON.stringify(result),
  };

};
