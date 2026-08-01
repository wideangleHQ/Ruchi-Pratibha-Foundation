import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { VolunteersController } from './volunteers.controller';
import { VolunteersService } from './volunteers.service';
import { VolunteersRepository } from './volunteers.repository';
import { FILE_CONSTANTS } from '../../../common/constants';

@Module({
  imports: [
    MulterModule.register({
      limits: { fileSize: FILE_CONSTANTS.MAX_FILE_SIZE },
    }),
  ],
  controllers: [VolunteersController],
  providers: [VolunteersService, VolunteersRepository],
  exports: [VolunteersService],
})
export class VolunteersModule {}
