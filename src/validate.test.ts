import { describe, expect, it } from 'vitest'
import { validate, type SignupValues } from './validate'

const ok: SignupValues = { name: 'Ann', email: 'ann@example.com', password: 'abcd1234', confirmPassword: 'abcd1234', acceptTerms: true }

describe('validate', () => {
  it('accepts valid values', () => expect(validate(ok)).toEqual({}))
  it('requires name', () => expect(validate({ ...ok, name: '  ' }).name).toBe('Name is required'))
  it('checks email', () => expect(validate({ ...ok, email: 'ann@' }).email).toBe('Enter a valid email'))
  it.each(['short1', 'abcdefgh', '12345678'])('rejects weak password %s', (p) =>
    expect(validate({ ...ok, password: p, confirmPassword: p }).password).toBe('At least 8 characters, with a letter and a number'))
  it('checks confirm', () => expect(validate({ ...ok, confirmPassword: 'x' }).confirmPassword).toBe('Passwords do not match'))
  it('requires terms', () => expect(validate({ ...ok, acceptTerms: false }).acceptTerms).toBe('You must accept the terms'))
})
