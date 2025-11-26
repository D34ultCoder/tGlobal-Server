import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new patient',
    description:
      'Creates a new patient record in the system. All fields are required. ' +
      'The email must be unique across all patients. Returns the created patient with an auto-generated UUID.',
  })
  @ApiResponse({
    status: 201,
    description: 'Patient successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists',
  })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all patients',
    description:
      'Retrieves a list of all patients in the system. ' +
      'Optionally filter by status (all, pending, past). ' +
      'Each patient includes their consultation notes ordered by date. ' +
      'Results are ordered by creation date (newest first).',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter patients by status',
    enum: ['all', 'pending', 'past'],
  })
  @ApiResponse({
    status: 200,
    description: 'List of patients retrieved successfully',
  })
  findAll(@Query('status') status?: string) {
    return this.patientsService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a patient by ID',
    description:
      'Retrieves detailed information about a specific patient including all their consultation notes. ' +
      'Consultation notes are ordered by date (newest first).',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the patient',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Patient found and returned successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
  })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a patient',
    description:
      'Updates an existing patient record. All fields are optional. ' +
      'Only the provided fields will be updated. ' +
      'Returns the updated patient with their consultation notes.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the patient to update',
  })
  @ApiResponse({
    status: 200,
    description: 'Patient updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a patient',
    description:
      'Permanently deletes a patient and all their associated consultation notes. ' +
      'This action cannot be undone. Returns the deleted patient data.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the patient to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Patient deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
  })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
