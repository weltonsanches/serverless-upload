require('dotenv').config()
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

AWS.config.update({
  region: 'us-east-1'
});

const S3 = new AWS.S3();
const Bucket = process.env.BUCKET;

const upload = body => {
  const Key = `${uuid()}.jpg`;
  return new Promise((resolve, reject) => {
    S3.putObject({
      Bucket,
      Key,
      Body: new Buffer(body.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
    }, (error) => {
      if (error)
        return reject(error);

      return resolve({ Bucket, Key });
    });
  });
};

module.exports = { upload };
