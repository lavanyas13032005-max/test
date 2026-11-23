import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { validate, type SignupErrors, type SignupValues } from './validate'
import { signup as defaultSignup } from './signupService'
import './SignupPage.css'

type Field = keyof SignupValues
const FIELD_ORDER: Field[] = ['name', 'email', 'password', 'confirmPassword', 'acceptTerms']

interface Props {
  signup?: (values: SignupValues) => Promise<void>
}

export default function SignupPage({ signup = defaultSignup }: Props) {
  const [values, setValues] = useState<SignupValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  const [errors, setErrors] = useState<SignupErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [submitError, setSubmitError] = useState('')
  const refs = useRef<Partial<Record<Field, HTMLInputElement | null>>>({})

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const field = e.target.name as Field
    const next = {
      ...values,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }
    setValues(next)
    // Clear errors of fields that became valid (including confirm when password changes).
    if (Object.keys(errors).length) {
      const fresh = validate(next)
      setErrors((prev) => {
        const kept: SignupErrors = {}
        for (const k of Object.keys(prev) as Field[]) if (fresh[k]) kept[k] = fresh[k]
        return kept
      })
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = FIELD_ORDER.find((f) => found[f])
    if (first) {
      refs.current[first]?.focus()
      return
    }
    setStatus('submitting')
    setSubmitError('')
    try {
      await signup(values)
      setStatus('success')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Sign up failed')
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <main className="signup">
        <div className="signup-card" role="status">
          <h1>Welcome!</h1>
          <p>Account created for {values.email.trim()}</p>
        </div>
      </main>
    )
  }

  const textField = (field: Field, label: string, type: string, autoComplete: string) => (
    <div className="field">
      <label htmlFor={field}>{label}</label>
      <input
        id={field}
        name={field}
        type={type}
        autoComplete={autoComplete}
        value={values[field] as string}
        onChange={handleChange}
        ref={(el) => {
          refs.current[field] = el
        }}
        aria-invalid={errors[field] ? true : undefined}
        aria-describedby={errors[field] ? `${field}-error` : undefined}
      />
      {errors[field] && (
        <p id={`${field}-error`} className="error">
          {errors[field]}
        </p>
      )}
    </div>
  )

  const submitting = status === 'submitting'

  return (
    <main className="signup">
      <form className="signup-card" onSubmit={handleSubmit} noValidate>
        <h1>Create your account</h1>
        {textField('name', 'Full name', 'text', 'name')}
        {textField('email', 'Email', 'email', 'email')}
        {textField('password', 'Password', 'password', 'new-password')}
        {textField('confirmPassword', 'Confirm password', 'password', 'new-password')}
        <div className="field checkbox">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={values.acceptTerms}
            onChange={handleChange}
            ref={(el) => {
              refs.current.acceptTerms = el
            }}
            aria-invalid={errors.acceptTerms ? true : undefined}
            aria-describedby={errors.acceptTerms ? 'acceptTerms-error' : undefined}
          />
          <label htmlFor="acceptTerms">I accept the terms</label>
          {errors.acceptTerms && (
            <p id="acceptTerms-error" className="error">
              {errors.acceptTerms}
            </p>
          )}
        </div>
        {submitError && (
          <p className="submit-error" role="alert">
            {submitError}
          </p>
        )}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
    </main>
  )
}
