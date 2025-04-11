import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageDto } from 'src/dto/image.dto';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private readonly allservice: ImageService) { }

  @Get()
  get() {
    return this.allservice.getAll();
  }

  @Get(':id')
  getFindOne(@Param('id') id: string) {
    return this.allservice.getFind({
      id,
    });
  }

  @Get('description/:id')
  getFindDescription(@Param('id') id: string) {
    return this.allservice.getFindDescription({
      id,
    });
  }

  @Get('demande/:id')
  getFindDemade(@Param('id') id: string) { 
    return this.allservice.getFindDemade({
      id,
    });
  }

  @Put('description/update/:id')
  updateDescription(
    @Param('id') id: string,       
    @Body() body: { message: string } 
  ) {
    return this.allservice.updateDescription({ id, message: body.message });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() agentUpdate: ImageDto) {
    return this.allservice.update({ id, ...agentUpdate });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.allservice.delete({ id });
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtName}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async createAgenda(
    @Body() pieceJointDto: ImageDto,
    @UploadedFiles() files: Express.Multer.File[], // Assure-toi que le type est correct ici
  ) {
    console.log('📝 Données reçues:', pieceJointDto);
    console.log('📸 Fichiers reçus:', files);

    // Vérification du tableau de fichiers
    if (!Array.isArray(files)) {
      console.error('❌ files n\'est pas un tableau:', files);
      throw new Error('Le champ files doit être un tableau de fichiers.');
    }
    console.log('data', pieceJointDto);
    return await this.allservice.create(pieceJointDto, files);
  }


  @Post('one')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtName}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async createImageOne(
    @Body('iduser') iduser: string,
    @Body('status') status: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log('Fichiers reçus :', files);

    if (!files || files.length === 0) {
      throw new BadRequestException('Aucun fichier reçu');
    }

    const file = files[0]; // Prend le premier fichier uniquement

    return await this.allservice.createImageOne(iduser, status, file);
  }


}

