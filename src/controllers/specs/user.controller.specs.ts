export const credentialsSchema = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
};
export const credentialsRequestBody = {
  description: 'request body of login',
  content: {
    'application/json': {
      schema: credentialsSchema,
    },
  },
};
export const passwordChangeBody = {
  description: 'request body of change password',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['old', 'new'],
        properties: {
          old: {
            type: 'string',
          },
          new: {
            type: 'string',
          },
        },
      },
    },
  },
};
