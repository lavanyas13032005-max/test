/**
 * Login Form Handler
 * Provides client-side validation, password visibility toggle, and form submission
 */

class LoginForm {
    constructor() {
        // Form elements
        this.form = document.getElementById('loginForm');
        this.usernameEmailInput = document.getElementById('usernameEmail');
        this.passwordInput = document.getElementById('password');
        this.togglePasswordBtn = document.getElementById('togglePassword');
        this.rememberMeCheckbox = document.getElementById('rememberMe');
        this.submitButton = document.querySelector('.submit-button');

        // Error message elements
        this.usernameEmailError = document.getElementById('usernameEmailError');
        this.passwordError = document.getElementById('passwordError');
        this.formError = document.getElementById('formError');
        this.successMessage = document.getElementById('successMessage');

        // Validation rules
        this.rules = {
            usernameEmail: {
                minLength: 3,
                maxLength: 255,
            },
            password: {
                minLength: 6,
                maxLength: 128,
            },
        };

        this.init();
    }

    init() {
        // Attach event listeners
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.togglePasswordBtn.addEventListener('click', (e) => this.togglePasswordVisibility(e));

        // Real-time validation on blur and input
        this.usernameEmailInput.addEventListener('blur', () => this.validateUsernameEmail());
        this.usernameEmailInput.addEventListener('input', () => this.clearError(this.usernameEmailError));

        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        this.passwordInput.addEventListener('input', () => this.clearError(this.passwordError));

        // Prevent autocomplete warnings on page load
        this.clearFormError();
    }

    /**
     * Validate username/email format
     * Accepts: username (3+ chars), email format, or phone-like
     */
    validateUsernameEmail() {
        const value = this.usernameEmailInput.value.trim();
        let error = '';

        if (!value) {
            error = 'Username or email is required';
        } else if (value.length < this.rules.usernameEmail.minLength) {
            error = `Must be at least ${this.rules.usernameEmail.minLength} characters`;
        } else if (value.length > this.rules.usernameEmail.maxLength) {
            error = `Must not exceed ${this.rules.usernameEmail.maxLength} characters`;
        } else if (this.isEmailFormat(value) && !this.isValidEmail(value)) {
            error = 'Please enter a valid email address';
        }

        if (error) {
            this.showError(this.usernameEmailError, error);
            this.usernameEmailInput.setAttribute('aria-invalid', 'true');
            return false;
        } else {
            this.clearError(this.usernameEmailError);
            this.usernameEmailInput.setAttribute('aria-invalid', 'false');
            return true;
        }
    }

    /**
     * Validate password
     */
    validatePassword() {
        const value = this.passwordInput.value;
        let error = '';

        if (!value) {
            error = 'Password is required';
        } else if (value.length < this.rules.password.minLength) {
            error = `Password must be at least ${this.rules.password.minLength} characters`;
        } else if (value.length > this.rules.password.maxLength) {
            error = `Password must not exceed ${this.rules.password.maxLength} characters`;
        }

        if (error) {
            this.showError(this.passwordError, error);
            this.passwordInput.setAttribute('aria-invalid', 'true');
            return false;
        } else {
            this.clearError(this.passwordError);
            this.passwordInput.setAttribute('aria-invalid', 'false');
            return true;
        }
    }

    /**
     * Check if a string looks like an email format
     */
    isEmailFormat(value) {
        return value.includes('@');
    }

    /**
     * Validate email format using HTML5 standard
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Toggle password visibility
     */
    togglePasswordVisibility(e) {
        e.preventDefault();

        const isPassword = this.passwordInput.type === 'password';
        this.passwordInput.type = isPassword ? 'text' : 'password';

        // Update aria-pressed for accessibility
        const isPressed = this.togglePasswordBtn.getAttribute('aria-pressed') === 'true';
        this.togglePasswordBtn.setAttribute('aria-pressed', !isPressed);
    }

    /**
     * Show error message
     */
    showError(element, message) {
        element.textContent = message;
        element.classList.add('show');
        element.setAttribute('aria-hidden', 'false');
    }

    /**
     * Clear error message
     */
    clearError(element) {
        element.textContent = '';
        element.classList.remove('show');
        element.setAttribute('aria-hidden', 'true');
    }

    /**
     * Clear form-level error
     */
    clearFormError() {
        this.formError.textContent = '';
        this.formError.classList.remove('show');
        this.formError.setAttribute('aria-hidden', 'true');
    }

    /**
     * Show form-level error
     */
    showFormError(message) {
        this.formError.textContent = message;
        this.formError.classList.add('show');
        this.formError.setAttribute('aria-hidden', 'false');
    }

    /**
     * Validate entire form before submission
     */
    validate() {
        const isUsernameEmailValid = this.validateUsernameEmail();
        const isPasswordValid = this.validatePassword();

        return isUsernameEmailValid && isPasswordValid;
    }

    /**
     * Set loading state on button
     */
    setLoading(isLoading) {
        if (isLoading) {
            this.submitButton.disabled = true;
            this.submitButton.textContent = 'Signing in...';
        } else {
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Sign In';
        }
    }

    /**
     * Handle form submission
     */
    async handleSubmit(e) {
        e.preventDefault();
        this.clearFormError();

        // Validate form
        if (!this.validate()) {
            return;
        }

        // Prevent double submission
        if (this.submitButton.disabled) {
            return;
        }

        this.setLoading(true);

        try {
            const usernameEmail = this.usernameEmailInput.value.trim();
            const password = this.passwordInput.value;
            const rememberMe = this.rememberMeCheckbox.checked;

            // Simulate API call (replace with actual endpoint)
            const response = await this.login(usernameEmail, password, rememberMe);

            if (response.success) {
                this.handleLoginSuccess(response);
            } else {
                this.showFormError(response.message || 'Invalid email or password');
                this.setLoading(false);
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showFormError('An error occurred. Please try again later.');
            this.setLoading(false);
        }
    }

    /**
     * Simulate login API call
     * In production, replace this with actual API endpoint
     */
    async login(usernameEmail, password, rememberMe) {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock validation: accept specific credentials for demo
                const validCredentials = [
                    { email: 'user@example.com', password: 'password123' },
                    { email: 'demo', password: 'demo123' },
                    { email: 'admin@test.com', password: 'admin@123' },
                ];

                const isValid = validCredentials.some(
                    (cred) =>
                        (cred.email === usernameEmail || cred.email === usernameEmail.toLowerCase()) &&
                        cred.password === password
                );

                if (isValid) {
                    // Store remember-me preference (never store password)
                    if (rememberMe) {
                        localStorage.setItem('rememberMe', usernameEmail);
                    } else {
                        localStorage.removeItem('rememberMe');
                    }

                    resolve({
                        success: true,
                        message: 'Login successful!',
                        token: 'mock-jwt-token-' + Date.now(),
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Invalid email or password',
                    });
                }
            }, 1500); // Simulate 1.5s network delay
        });
    }

    /**
     * Handle successful login
     */
    handleLoginSuccess(response) {
        // Clear sensitive data from memory
        this.passwordInput.value = '';

        // Show success message
        this.showSuccessMessage();

        // Simulate redirect after delay
        setTimeout(() => {
            // In production, redirect to dashboard
            alert('Login successful! Token: ' + response.token + '\n\nIn a real app, you would be redirected to the dashboard.');
            // Example redirect:
            // window.location.href = '/dashboard';
        }, 2000);
    }

    /**
     * Show success message notification
     */
    showSuccessMessage() {
        this.successMessage.classList.add('show');
        this.successMessage.setAttribute('aria-hidden', 'false');
    }

    /**
     * Load remember-me data if available
     */
    loadRememberMe() {
        const remembered = localStorage.getItem('rememberMe');
        if (remembered) {
            this.usernameEmailInput.value = remembered;
            this.rememberMeCheckbox.checked = true;
        }
    }
}

// Initialize form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = new LoginForm();
    loginForm.loadRememberMe();
});
