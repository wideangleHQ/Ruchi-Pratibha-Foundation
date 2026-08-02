import { Module } from '@nestjs/common';
import { PublicationCategoriesController } from './publication-categories.controller';
import { PublicationCategoriesRepository } from './publication-categories.repository';
import { PublicationCategoriesService } from './publication-categories.service';

@Module({
  controllers: [PublicationCategoriesController],
  providers: [PublicationCategoriesService, PublicationCategoriesRepository],
  exports: [PublicationCategoriesService, PublicationCategoriesRepository],
})
export class PublicationCategoriesModule {}
