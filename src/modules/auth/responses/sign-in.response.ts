import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty({
    description: "User's access-token",
    example:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM4N2U4MjQ1LWJhNzAtNDlhYS04NzM3LWIwOGMzNjY0MWViZSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNzAyODk4MzgzLCJleHAiOjE3MDI4OTg0NDN9.1J6DHmnr8DxpIvG5NjygucBeV1qynaajljTLF0Dlbyg',
  })
  'access-token': string;
}

export const ApiSignInCreatedResponse = () =>
  ApiCreatedResponse({
    status: 201,
    description: 'Successful operation',
    type: SignInResponse,
  });

export const ApiSignInBadRequestResponse = () =>
  ApiBadRequestResponse({
    status: 400,
    description: 'Bad request',
    content: {
      'application/json': {
        example: {
          message: [
            'Unable to sign in with data ${JSON.stringify(signInDto)}',
            'Field "email" is required',
            'Invalid email format. Please enter a valid email address',
            'Field "password" is required',
            'password must be a string',
            'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
            'Password is too long. Max length is $constraint1 characters, but actual is $value',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  });

export const ApiSignInUnauthorizedResponse = () =>
  ApiUnauthorizedResponse({
    status: 401,
    description: "Email doesn't exist / Password is wrong",
    content: {
      'application/json': {
        example: {
          message: 'Email or password are invalid',
          error: 'Unauthorized',
          statusCode: 401,
        },
      },
    },
  });
