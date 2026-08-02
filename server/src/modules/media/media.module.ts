import { Module } from '@nestjs/common';
import { AssetsModule } from './assets/assets.module';
import { DocumentsModule } from './documents/documents.module';
import { FoldersModule } from './folders/folders.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [FoldersModule, AssetsModule, GalleryModule, DocumentsModule],
  exports: [FoldersModule, AssetsModule, GalleryModule, DocumentsModule],
})
export class MediaModule {}
