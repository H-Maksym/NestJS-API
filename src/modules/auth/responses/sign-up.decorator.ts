import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UserResponse } from '@modules/user/responses';

export const ApiSignUpCreatedResponse = () =>
  ApiCreatedResponse({
    status: 201,
    description: 'Created user',
    type: UserResponse,
    // content: {
    //   'application/json': {
    //     example: {
    //       id: '45d4f70b-75d5-4524-a2af-c893e63e5c84',
    //       email: 'test@test.com',
    //       roles: ['USER'],
    //     },
    //   },
    // },
  });

export const ApiSignUpBadRequestResponse = () =>
  ApiBadRequestResponse({
    status: 400,
    description: 'Invalid input',
    content: {
      'application/json': {
        example: {
          errors: [
            'Invalid email format. Please enter a valid email address',
            'password must be a string',
            'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
            'Password is too long. Max length is $constraint1 characters, but actual is $value',
            'repeatPassword must be a string',
            'Passwords do not match',
            'Unable to sign up with data ${JSON.stringify(signUpDto)',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  });

export const ApiSignUpConflictResponse = () =>
  ApiConflictResponse({
    status: 409,
    description: 'Already registered user',
    content: {
      'application/json': {
        example: {
          message: 'User with this email is already registered',
          error: 'Conflict',
          statusCode: 409,
        },
      },
    },
  });
