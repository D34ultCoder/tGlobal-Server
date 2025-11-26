import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      return await this.prisma.patient.create({
        data: createPatientDto,
        include: {
          consultationNotes: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `A patient with email ${createPatientDto.email} already exists`,
        );
      }
      throw error;
    }
  }

  async findAll(status?: string) {
    const where = status && status !== 'all' ? { status } : {};
    return this.prisma.patient.findMany({
      where,
      include: {
        consultationNotes: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        consultationNotes: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    try {
      return await this.prisma.patient.update({
        where: { id },
        data: updatePatientDto,
        include: {
          consultationNotes: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.patient.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
}
