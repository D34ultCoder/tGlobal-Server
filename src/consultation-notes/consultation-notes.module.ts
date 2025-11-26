import { Module } from '@nestjs/common';
import { ConsultationNotesService } from './consultation-notes.service';
import { ConsultationNotesController } from './consultation-notes.controller';

@Module({
  controllers: [ConsultationNotesController],
  providers: [ConsultationNotesService],
})
export class ConsultationNotesModule {}
