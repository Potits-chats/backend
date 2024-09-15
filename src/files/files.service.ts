import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PrismaService } from '../utils/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(FilesService.name);
  AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
  s3 = new S3Client({
    region: process.env.AWS_REGION, // Ensure you set the AWS_REGION in your environment variables
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const fileName = `chat/${uniqueFileName}`;
    await this.s3_upload(
      file.buffer,
      this.AWS_BUCKET_NAME,
      fileName,
      file.mimetype,
    );
    return fileName;
  }

  async s3_upload(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: `public/${name}`,
      Body: file,
      ACL: ObjectCannedACL.public_read,
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    try {
      const command = new PutObjectCommand(params);
      const s3Response = await this.s3.send(command);
      return s3Response;
    } catch (e) {
      this.logger.error(`Failed to upload file to S3: ${e.message}`);
      throw new Error(`Failed to upload file: ${e.message}`);
    }
  }

  async getFileUrl(fileName: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.AWS_BUCKET_NAME,
      Key: `public/${fileName}`,
    });

    try {
      const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
      return url;
    } catch (e) {
      this.logger.error(`Failed to get file URL: ${e.message}`);
      throw new Error(`Failed to get file URL: ${e.message}`);
    }
  }

  async deleteFile(type: string, fileName: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.AWS_BUCKET_NAME,
      Key: `public/${type}/${fileName}`,
    });

    try {
      await this.s3.send(command);
      await this.prisma.photos.deleteMany({
        where: {
          url: type + '/' + fileName,
        },
      });
    } catch (e) {
      this.logger.error(`Failed to delete file: ${e.message}`);
      throw new Error(`Failed to delete file: ${e.message}`);
    }
  }
}
