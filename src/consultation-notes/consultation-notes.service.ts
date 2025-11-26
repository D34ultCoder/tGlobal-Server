import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConsultationNoteDto } from './dto/create-consultation-note.dto';
import { UpdateConsultationNoteDto } from './dto/update-consultation-note.dto';

@Injectable()
export class ConsultationNotesService {
  constructor(private prisma: PrismaService) {}

  async create(createConsultationNoteDto: CreateConsultationNoteDto) {
    // Verify patient exists
    const patient = await this.prisma.patient.findUnique({
      where: { id: createConsultationNoteDto.patientId },
    });

    if (!patient) {
      throw new NotFoundException(
        `Patient with ID ${createConsultationNoteDto.patientId} not found`,
      );
    }

    return this.prisma.consultationNote.create({
      data: createConsultationNoteDto,
      include: {
        patient: true,
      },
    });
  }

  async findAll(patientId?: string) {
    const where = patientId ? { patientId } : {};
    return this.prisma.consultationNote.findMany({
      where,
      include: {
        patient: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const note = await this.prisma.consultationNote.findUnique({
      where: { id },
      include: {
        patient: true,
      },
    });

    if (!note) {
      throw new NotFoundException(`Consultation note with ID ${id} not found`);
    }

    return note;
  }

  async findByPatient(patientId: string) {
    // Verify patient exists
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    return this.prisma.consultationNote.findMany({
      where: { patientId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, updateConsultationNoteDto: UpdateConsultationNoteDto) {
    try {
      return await this.prisma.consultationNote.update({
        where: { id },
        data: updateConsultationNoteDto,
        include: {
          patient: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Consultation note with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.consultationNote.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Consultation note with ID ${id} not found`);
    }
  }
}
