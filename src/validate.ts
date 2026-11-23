export interface SignupValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export type SignupErrors = Partial<Record<keyof SignupValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validate(v: SignupValues): SignupErrors {
  const errors: SignupErrors = {}
  if (!v.name.trim()) errors.name = 'Name is required'
  if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Enter a valid email'
  if (v.password.length < 8 || !/[A-Za-z]/.test(v.password) || !/\d/.test(v.password))
    errors.password = 'At least 8 characters, with a letter and a number'
  if (v.confirmPassword !== v.password) errors.confirmPassword = 'Passwords do not match'
  if (!v.acceptTerms) errors.acceptTerms = 'You must accept the terms'
  return errors
}
