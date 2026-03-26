import { z } from 'zod';

export const emailSchema = z.email('Must be a valid email address');

export const displayNameSchema = z
  .string()
  .trim()
  .min(3, 'Name must contain at least 3 characters')
  .regex(/^[a-zA-Z]+$/, {
    message:
      'Name must contain only Latin characters and no special characters or numbers',
  });

export const passwordSchema = z
  .string()
  .nonempty({ message: 'Password is required' })
  .min(6, { message: 'Password must contain at least 6 characters' })
  .refine((value: string) => !value.includes(' '), {
    message: 'Password must not contain any spaces',
  })
  .refine((value: string) => /\d/.test(value), {
    message: 'Must contain at least one digit',
  })
  .refine((value: string) => /[!@#$%^&*]/.test(value), {
    message: 'Must contain at least one special character (!@#$%^&*)',
  })
  .refine((value: string) => /[a-zA-Z]/.test(value), {
    message: 'Password must contain at least one Latin character',
  });

const baseAuthSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const logInSchema = baseAuthSchema;

export const signUpSchema = baseAuthSchema
  .extend({
    displayName: displayNameSchema,
    repeatPassword: passwordSchema,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords must match',
    path: ['repeatPassword'],
  });

export const profileSchema = baseAuthSchema.extend({
  displayName: displayNameSchema,
});

export type LogInFields = z.infer<typeof logInSchema>;
export type SignUpFields = z.infer<typeof signUpSchema>;
export type ProfileFields = z.infer<typeof profileSchema>;
