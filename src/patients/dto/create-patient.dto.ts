import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, Min, Max } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    description: 'Full name of the patient',
    example: 'John Smith',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Gender of the patient',
    example: 'Male',
    enum: ['Male', 'Female'],
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'Age of the patient in years',
    example: 35,
    minimum: 0,
    maximum: 150,
  })
  @IsInt()
  @Min(0)
  @Max(150)
  age: number;

  @ApiProperty({
    description: 'URL to patient avatar image',
    example: 'https://i.pravatar.cc/150?img=12',
  })
  @IsString()
  avatar: string;

  @ApiProperty({
    description: 'Current status of the patient',
    example: 'all',
    enum: ['all', 'pending', 'past'],
  })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+1 (555) 555-0115',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Email address (must be unique)',
    example: 'smith.johnny@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Date of last appointment',
    example: '26-11-2024',
  })
  @IsString()
  lastAppointment: string;

  @ApiProperty({
    description: 'Date of upcoming appointment',
    example: '31-11-2024',
  })
  @IsString()
  upcomingAppointment: string;
}
