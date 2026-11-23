import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignupPage from './SignupPage'

async function fillValid(user: ReturnType<typeof userEvent.setup>, email = 'ann@example.com') {
  await user.type(screen.getByLabelText('Full name'), 'Ann')
  await user.type(screen.getByLabelText('Email'), email)
  await user.type(screen.getByLabelText('Password'), 'abcd1234')
  await user.type(screen.getByLabelText('Confirm password'), 'abcd1234')
  await user.click(screen.getByLabelText('I accept the terms'))
}

describe('SignupPage', () => {
  it('shows all errors and focuses first invalid field', async () => {
    const user = userEvent.setup()
    const signup = vi.fn()
    render(<SignupPage signup={signup} />)
    await user.click(screen.getByRole('button', { name: 'Sign up' }))
    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
    expect(screen.getByText('You must accept the terms')).toBeInTheDocument()
    expect(screen.getByLabelText('Full name')).toHaveFocus()
    expect(signup).not.toHaveBeenCalled()
  })

  it('clears an error when the field becomes valid', async () => {
    const user = userEvent.setup()
    render(<SignupPage signup={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: 'Sign up' }))
    await user.type(screen.getByLabelText('Full name'), 'Ann')
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
  })

  it('submits and shows success', async () => {
    const user = userEvent.setup()
    let resolve!: () => void
    const signup = vi.fn(() => new Promise<void>((r) => (resolve = r)))
    render(<SignupPage signup={signup} />)
    await fillValid(user)
    await user.click(screen.getByRole('button', { name: 'Sign up' }))
    expect(screen.getByRole('button', { name: 'Creating account…' })).toBeDisabled()
    resolve()
    expect(await screen.findByText('Account created for ann@example.com')).toBeInTheDocument()
  })

  it('shows a service error and keeps values', async () => {
    const user = userEvent.setup()
    const signup = vi.fn().mockRejectedValue(new Error('Email already registered'))
    render(<SignupPage signup={signup} />)
    await fillValid(user, 'ann@taken.com')
    await user.click(screen.getByRole('button', { name: 'Sign up' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Email already registered')
    expect(screen.getByLabelText('Email')).toHaveValue('ann@taken.com')
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeEnabled()
  })
})
