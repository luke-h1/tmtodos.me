import 'dotenv-safe/config';
import { ReadStream } from 'fs';
import { v4 } from 'uuid';

const AWS = require('aws-sdk');

export type S3Object = {
  Etag: string;
  Location: string;
  Key: string;
  Bucket: string;
};

export type UploadedFileResponse = {
  filename: string;
  mimetype: string;
  encoding: string;
  url: string;
};

export const AWSCONFIG = AWS.config.update({
  signatureVersion: 's3v4',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
  Bucket: process.env.AWS_BUCKET_NAME,
});

export const S3 = new AWS.S3({
  signatureVersion: 's3v4',
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const S3DefaultParams = {
  ACL: 'public-read',
  Bucket: process.env.AWS_BUCKET_NAME,
  Conditions: [
    ['content-length-range', 0, 3096000], // 3 Mb
    { acl: 'public-read' },
  ],
};

export const Upload = async (
  createReadStream: () => ReadStream,
  filename: string,
  key: string,
) => new Promise<{ image: string; imageFileName: string }>((res, rej) => {
  S3.upload(
    {
      ...S3DefaultParams,
      Body: createReadStream(),
      Key: `${key}/${filename}-${v4()}`,
      Bucket: process.env.AWS_BUCKET_NAME,
    },
    // eslint-disable-next-line consistent-return
    (e: unknown, data: S3Object) => {
      if (e) {
        rej(e);
        console.log(e);
        return e;
      }
      console.log(
        `Uploaded file to ${process.env.AWS_BUCKET_NAME} s3 bucket: ${data.Location}`,
      );
      res({
        image: data.Location,
        imageFileName: data.Key,
      });
      return {
        image: data.Location,
        imageFileName: data.Key,
      };
    },
  );
});

export const Delete = async (Key: string) => {
  const params = { Bucket: process.env.AWS_BUCKET_NAME, Key };
  console.log('Key', Key);
  return new Promise((res, rej) => {
    S3.deleteObject(params, (e: Error, data: unknown) => {
      if (e) {
        console.log(e, e.stack);
        rej(e);
        return false;
      }
      console.log(
        `Deleted ${Key} from ${process.env.AWS_BUCKET_NAME} s3 bucket`,
      );
      console.log(`DELETE: ${data}`);
      res(data);
      return true;
    });
  });
};
