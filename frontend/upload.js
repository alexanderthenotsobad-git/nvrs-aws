import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';
import mime from 'mime-types';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Map file extensions to content types
const contentTypeMap = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

async function* getFiles(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) {
            yield* getFiles(path);
        } else {
            yield path;
        }
    }
}

async function uploadFile(filePath, bucketName, baseDir) {
    try {
        const fileContent = await readFile(filePath);
        const key = filePath.replace(baseDir, '').replace(/^\//, '');
        const ext = extname(filePath).toLowerCase();
        const contentType = contentTypeMap[ext] || mime.lookup(filePath) || 'application/octet-stream';

        const uploadParams = {
            Bucket: bucketName,
            Key: key,
            Body: fileContent,
            ContentType: contentType
        };

        await s3Client.send(new PutObjectCommand(uploadParams));
        console.log(`Successfully uploaded ${key}`);
    } catch (error) {
        console.error(`Error uploading ${filePath}:`, error);
        throw error;
    }
}

async function uploadDirectory(sourceDir, bucketName) {
    try {
        for await (const filePath of getFiles(sourceDir)) {
            await uploadFile(filePath, bucketName, sourceDir);
        }
        console.log('Upload completed successfully');
    } catch (error) {
        console.error('Upload failed:', error);
        process.exit(1);
    }
}

// Usage
const outDir = '/var/www/html/nvrs-aws/frontend/out';
const bucketName = process.env.BUCKET_NAME || 'nvrs-frontend';

uploadDirectory(outDir, bucketName);