import type { SignupValues } from './validate'

// Mock submission: replace with a real API call before production use.
export async function signup(values: SignupValues, delayMs = 800): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, delayMs))
  if (values.email.trim().toLowerCase().endsWith('@taken.com')) {
    throw new Error('Email already registered')
  }
}
