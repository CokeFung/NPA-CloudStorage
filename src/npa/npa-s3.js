import { message } from 'antd';
import { S3Client, ListObjectsCommand, DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import  { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from 'axios';

const S3_BUCKET = process.env.S3_BUCKET;
const REGION = process.env.S3_REGION;
const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3Client({ 
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY
    }
});

export const getPresignedURL = async (file) => {
    const presignedParams = {
        Bucket: S3_BUCKET,
        Key: file.name,
    };
    try{
        const signedURL = await getSignedUrl(s3, new PutObjectCommand(presignedParams), { expiresIn: 3600 });
        // console.log('Signed URL:', signedURL);
        return signedURL;
    } catch(err){
        // console.log('sign err:', err)
        return ''
    }
}

export const handleUpload = async (info) => {
    const config = { headers: { 'Content-Type': info.file.type } };
    axios.put(info.action, info.file, config)
        .then(r => {info.onSuccess(null, info.file)})
        .catch(e => {info.onError(e, info.file)})
}

export const handleDelete = async (key) => {
    const params = { Bucket: S3_BUCKET, Key: key };
    try{
        await s3.send(new DeleteObjectCommand(params))
        message.success(`Success. Object deleted.`)
    } catch(err) {
        message.error(`Object delete failed.`)
    }
}

export const getObjectfromS3 = async () => {
    const bucketParams = { Bucket: S3_BUCKET };
    try {
        const data = await s3.send(new ListObjectsCommand(bucketParams));
        const contents = {...data}.Contents;
        if (typeof contents === 'undefined') return [];
        return contents
    } catch (err) {
        return [];
    }
}
