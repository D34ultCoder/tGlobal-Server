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
import { ConsultationNotesService } from './consultation-notes.service';
import { CreateConsultationNoteDto } from './dto/create-consultation-note.dto';
import { UpdateConsultationNoteDto } from './dto/update-consultation-note.dto';

@ApiTags('consultation-notes')
@Controller('consultation-notes')
export class ConsultationNotesController {
  constructor(
    private readonly consultationNotesService: ConsultationNotesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new consultation note',
    description:
      'Creates a new consultation note for a patient. ' +
      'The patient must exist in the system. ' +
      'All fields are required. Returns the created note with patient details.',
  })
  @ApiResponse({
    status: 201,
    description: 'Consultation note successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
  })
  create(@Body() createConsultationNoteDto: CreateConsultationNoteDto) {
    return this.consultationNotesService.create(createConsultationNoteDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all consultation notes',
    description:
      'Retrieves all consultation notes in the system. ' +
      'Optionally filter by patient ID to get notes for a specific patient. ' +
      'Results are ordered by creation date (newest first) and include patient details.',
  })
  @ApiQuery({
    name: 'patientId',
    required: false,
    description: 'Filter notes by patient UUID',
  })
  @ApiResponse({
    status: 200,
    description: 'List of consultation notes retrieved successfully',
  })
  findAll(@Query('patientId') patientId?: string) {
    return this.consultationNotesService.findAll(patientId);
  }

  @Get('patient/:patientId')
  @ApiOperation({
    summary: 'Get all consultation notes for a specific patient',
    description:
      'Retrieves all consultation notes for a specific patient. ' +
      'The patient must exist in the system. ' +
      'Results are ordered by creation date (newest first).',
  })
  @ApiParam({
    name: 'patientId',
    description: 'UUID of the patient',
  })
  @ApiResponse({
    status: 200,
    description: 'Patient consultation notes retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
  })
  findByPatient(@Param('patientId') patientId: string) {
    return this.consultationNotesService.findByPatient(patientId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a consultation note by ID',
    description:
      'Retrieves detailed information about a specific consultation note including patient details.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the consultation note',
  })
  @ApiResponse({
    status: 200,
    description: 'Consultation note found and returned successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Consultation note not found',
  })
  findOne(@Param('id') id: string) {
    return this.consultationNotesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a consultation note',
    description:
      'Updates an existing consultation note. All fields are optional. ' +
      'Only the provided fields will be updated. ' +
      'Returns the updated note with patient details.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the consultation note to update',
  })
  @ApiResponse({
    status: 200,
    description: 'Consultation note updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Consultation note not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  update(
    @Param('id') id: string,
    @Body() updateConsultationNoteDto: UpdateConsultationNoteDto,
  ) {
    return this.consultationNotesService.update(id, updateConsultationNoteDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a consultation note',
    description:
      'Permanently deletes a consultation note. ' +
      'This action cannot be undone. Returns the deleted note data.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the consultation note to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Consultation note deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Consultation note not found',
  })
  remove(@Param('id') id: string) {
    return this.consultationNotesService.remove(id);
  }
}
