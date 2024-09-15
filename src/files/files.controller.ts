import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { AuthorizationGuard } from '../authorization/authorization.guard';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({
            maxSize: 10 * 1024 * 1024, // 10MB
            message: 'File is too large. Max file size is 10MB',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.uploadFile(file);
  }

  @ApiOperation({ summary: 'Get file URL' })
  @Get(':fileName')
  getFileUrl(@Param('fileName') fileName: string) {
    return this.filesService.getFileUrl(fileName);
  }

  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete file' })
  @Delete(':type/:fileName')
  deleteFile(@Param('type') type: string, @Param('fileName') fileName: string) {
    return this.filesService.deleteFile(type, fileName);
  }
}
