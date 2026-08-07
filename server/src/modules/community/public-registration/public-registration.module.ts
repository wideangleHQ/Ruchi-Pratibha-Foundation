import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_CONSTANTS } from '../../../common/constants';
import { PublicRegistrationController } from './public-registration.controller';
import { PublicRegistrationService } from './public-registration.service';

@Module({
  imports: [
    MulterModule.register({
      limits: { fileSize: FILE_CONSTANTS.MAX_FILE_SIZE },
    }),
  ],
  controllers: [PublicRegistrationController],
  providers: [PublicRegistrationService],
})
export class PublicRegistrationModule {}
