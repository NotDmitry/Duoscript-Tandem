import { z } from 'zod';

export const nicknameSchema = z
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
    message: 'Name must contain only Latin characters',
  });

const baseAuthSchema = z.object({
  nickname: nicknameSchema,
  password: passwordSchema,
});
export const profileSchema = baseAuthSchema;
export const logInSchema = baseAuthSchema;
export const signUpSchema = baseAuthSchema
  .extend({
    repeatPassword: passwordSchema,
  })
  .refine(
    (data) => {
      return data.password === data.repeatPassword;
    },
    { message: 'Passwords must match', path: ['repeatPassword'] }
  );

export const userStorageSchema = z.object({
  nickname: nicknameSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type UserStorage = z.infer<typeof userStorageSchema>;

export type LogInProfileFields = z.infer<typeof baseAuthSchema>;
export type SingUpFields = z.infer<typeof signUpSchema>;
