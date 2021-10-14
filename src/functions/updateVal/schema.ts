export default {
  type: "object",
  properties: {
    email: { type: 'string' },
    ID : { type: 'string' }
  },
  required: ['email','ID']
} as const;
