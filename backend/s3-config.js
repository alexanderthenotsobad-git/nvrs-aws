// Import required AWS SDK components
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize S3 Client - this stays the same since it's configuration, not an operation
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Refactored upload function using Promise chains
function uploadFile(fileBuffer, fileName, contentType) {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: contentType
    };

    // Create command and return Promise chain
    return Promise.resolve(new PutObjectCommand(params))
        .then(command => s3Client.send(command))
        .then(response => {
            console.log(`Successfully uploaded ${fileName}`);
            return response;
        })
        .catch(error => {
            console.error(`Error uploading ${fileName}:`, error);
            throw error; // Re-throw to maintain error chain
        });
}

// Refactored get function using Promise chains
function getFile(fileName) {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName
    };

    // Create command and return Promise chain
    return Promise.resolve(new GetObjectCommand(params))
        .then(command => s3Client.send(command))
        .then(response => {
            console.log(`Successfully retrieved ${fileName}`);
            return response;
        })
        .catch(error => {
            console.error(`Error retrieving ${fileName}:`, error);
            throw error; // Re-throw to maintain error chain
        });
}

// Example usage in your application would look like:
// uploadFile(myBuffer, 'test.jpg', 'image/jpeg')
//     .then(response => console.log('Upload complete:', response))
//     .catch(error => console.error('Upload failed:', error));

export { uploadFile, getFile };