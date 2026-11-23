// Mock authentication — replace with a real API call when a backend exists.
function signIn(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password123') {
        resolve({ email });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800);
  });
}

const form = document.getElementById('signin-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const toggle = document.getElementById('toggle-password');
const submit = document.getElementById('submit');
const message = document.getElementById('form-message');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(input, text) {
  document.getElementById(`${input.id}-error`).textContent = text;
  input.setAttribute('aria-invalid', text ? 'true' : 'false');
}

function validate() {
  const value = email.value.trim();
  setError(email, !value ? 'Email is required.' : EMAIL_PATTERN.test(value) ? '' : 'Enter a valid email address.');
  setError(password, password.value ? '' : 'Password is required.');
  const firstInvalid = form.querySelector('[aria-invalid="true"]');
  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

toggle.addEventListener('click', () => {
  const show = password.type === 'password';
  password.type = show ? 'text' : 'password';
  toggle.textContent = show ? 'Hide' : 'Show';
  toggle.setAttribute('aria-pressed', String(show));
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = '';
  message.className = 'message';
  if (!validate()) return;

  submit.disabled = true;
  submit.textContent = 'Signing in…';
  try {
    const user = await signIn(email.value.trim(), password.value);
    message.textContent = `Signed in as ${user.email}.`;
    message.classList.add('success');
  } catch {
    message.textContent = 'Invalid email or password.';
    message.classList.add('failure');
  } finally {
    submit.disabled = false;
    submit.textContent = 'Sign in';
  }
});
