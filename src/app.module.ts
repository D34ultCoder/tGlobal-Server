import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PatientsModule } from './patients/patients.module';
import { ConsultationNotesModule } from './consultation-notes/consultation-notes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, PatientsModule, ConsultationNotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
