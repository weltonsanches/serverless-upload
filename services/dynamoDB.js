require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-2'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE = process.env.BUCKET;

const put = item => {
  return new Promise((resolve, reject) => {
    dynamodb.put({
      TableName: TABLE,
      Item: {
        id: item.Key,
        bucket: item.Bucket
      }
    }, (error, data) => {
      if(error)
        return reject(error);

      return resolve(data);
    });
  });
};

module.exports = { put };
