import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateConsultationNoteDto {
  @ApiProperty({
    description: 'Title of the consultation note',
    example: 'Getting better',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the consultation',
    example:
      'Patient reports improved glucose control. A1C decreased from 7.2 to 6.8. Maintaining current medication regimen. Encouraged continued dietary compliance and regular exercise.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Date of the consultation',
    example: '26-11-2024',
  })
  @IsString()
  date: string;

  @ApiProperty({
    description: 'UUID of the patient this note belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  patientId: string;
}
