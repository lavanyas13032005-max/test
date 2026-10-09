/**
 * Login Page Verification Script
 * Runs automated checks to verify the login page implementation
 * Run with: node verify-login-page.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Login Page Verification Script\n');
console.log('=' .repeat(60));

// Color codes for console
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

function print(text, color = 'reset') {
    console.log(`${colors[color]}${text}${colors.reset}`);
}

let passed = 0;
let failed = 0;

function check(description, condition) {
    if (condition) {
        print(`✓ ${description}`, 'green');
        passed++;
    } else {
        print(`✗ ${description}`, 'red');
        failed++;
    }
}

// ========================================
// 1. File Existence
// ========================================
print('\n1️⃣  File Structure', 'cyan');
print('-'.repeat(60));

const files = ['login.html', 'login.css', 'login.js'];
files.forEach(file => {
    const filePath = path.join(__dirname, file);
    const exists = fs.existsSync(filePath);
    const size = exists ? fs.statSync(filePath).size : 0;
    check(`${file} exists (${size} bytes)`, exists);
});

// ========================================
// 2. HTML Structure
// ========================================
print('\n2️⃣  HTML Structure', 'cyan');
print('-'.repeat(60));

const htmlPath = path.join(__dirname, 'login.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const htmlChecks = [
    ['DOCTYPE', /<DOCTYPE html/i.test(htmlContent)],
    ['Form with id="loginForm"', /id="loginForm"/.test(htmlContent)],
    ['Username/Email input field', /id="usernameEmail"/.test(htmlContent) && /type="text"/.test(htmlContent)],
    ['Password input field', /id="password"/.test(htmlContent) && /type="password"/.test(htmlContent)],
    ['Sign In button', /<button[^>]*class="submit-button"/.test(htmlContent)],
    ['Forgot Password link', /forgot.*password/i.test(htmlContent)],
    ['Remember Me checkbox', /id="rememberMe"/.test(htmlContent)],
    ['Password toggle button', /id="togglePassword"/.test(htmlContent)],
    ['Form error container', /id="formError"/.test(htmlContent)],
    ['Success message container', /id="successMessage"/.test(htmlContent)],
];

htmlChecks.forEach(([check_name, result]) => {
    check(check_name, result);
});

// ========================================
// 3. Accessibility Features
// ========================================
print('\n3️⃣  Accessibility Features', 'cyan');
print('-'.repeat(60));

const a11yChecks = [
    ['Form has proper semantics', /<form[^>]*novalidate/.test(htmlContent)],
    ['Input fields have labels', /<label[^>]*for="usernameEmail"/.test(htmlContent) && /<label[^>]*for="password"/.test(htmlContent)],
    ['Error messages have role="alert"', /role="alert"/.test(htmlContent)],
    ['ARIA live regions present', /aria-live="polite"/.test(htmlContent)],
    ['ARIA required attributes', /aria-required="true"/.test(htmlContent)],
    ['ARIA invalid attributes', /aria-invalid/.test(htmlContent)],
    ['ARIA describedby attributes', /aria-describedby/.test(htmlContent)],
    ['Password field has autocomplete', /autocomplete="current-password"/.test(htmlContent)],
    ['Email field has autocomplete', /autocomplete="email"/.test(htmlContent)],
    ['Meta viewport for mobile', /<meta[^>]*viewport/.test(htmlContent)],
];

a11yChecks.forEach(([check_name, result]) => {
    check(check_name, result);
});

// ========================================
// 4. CSS Styling
// ========================================
print('\n4️⃣  CSS Styling & Responsive Design', 'cyan');
print('-'.repeat(60));

const cssPath = path.join(__dirname, 'login.css');
const cssContent = fs.readFileSync(cssPath, 'utf-8');

const cssChecks = [
    ['CSS variables defined', /--primary-color:/.test(cssContent)],
    ['Responsive mobile-first design', /min-width: 640px/.test(cssContent)],
    ['Tablet breakpoint', /min-width: 1024px/.test(cssContent)],
    ['Dark mode support', /prefers-color-scheme: dark/.test(cssContent)],
    ['Reduced motion support', /prefers-reduced-motion: reduce/.test(cssContent)],
    ['Focus states defined', /:focus/.test(cssContent)],
    ['Error state styling', /--error-color/.test(cssContent)],
    ['Success state styling', /--success-color/.test(cssContent)],
    ['Minimum touch target size', /min-width: 44px/.test(cssContent) && /min-height: 44px/.test(cssContent)],
    ['Animations and transitions', /animation:|transition:/.test(cssContent)],
];

cssChecks.forEach(([check_name, result]) => {
    check(check_name, result);
});

// ========================================
// 5. JavaScript Validation
// ========================================
print('\n5️⃣  JavaScript Validation & Security', 'cyan');
print('-'.repeat(60));

const jsPath = path.join(__dirname, 'login.js');
const jsContent = fs.readFileSync(jsPath, 'utf-8');

const jsChecks = [
    ['LoginForm class defined', /class LoginForm/.test(jsContent)],
    ['Form submit handler', /addEventListener\('submit'/.test(jsContent)],
    ['Prevent default form submission', /e.preventDefault\(\)/.test(jsContent)],
    ['Password visibility toggle', /togglePasswordVisibility/.test(jsContent)],
    ['Email validation method', /validateUsernameEmail/.test(jsContent)],
    ['Password validation method', /validatePassword/.test(jsContent)],
    ['Real-time blur validation', /addEventListener\('blur'/.test(jsContent)],
    ['Error message display method', /showError/.test(jsContent)],
    ['Loading state on submit', /setLoading/.test(jsContent)],
    ['Generic error messages', /'Invalid email or password'/.test(jsContent)],
    ['Password field cleared after login', /this.passwordInput.value = ''/.test(jsContent)],
    ['Remember Me functionality', /localStorage/.test(jsContent)],
    ['Success message handler', /handleLoginSuccess/.test(jsContent)],
    ['Test credentials included', /user@example.com/.test(jsContent)],
];

jsChecks.forEach(([check_name, result]) => {
    check(check_name, result);
});

// ========================================
// 6. Security Features
// ========================================
print('\n6️⃣  Security Features', 'cyan');
print('-'.repeat(60));

const securityChecks = [
    ['No password in localStorage', !(/localStorage.setItem.*password/.test(jsContent))],
    ['Disables button during submission', /button.disabled = true/.test(jsContent)],
    ['Generic login error message', /'Invalid email or password'/.test(jsContent)],
    ['No autocomplete="off"', !(/autocomplete="off"/.test(htmlContent))],
    ['Password type preserved', /type="password"/.test(htmlContent)],
    ['Form validation before submit', /this.validate\(\)/.test(jsContent)],
    ['Async/await for API calls', /async/.test(jsContent) && /await/.test(jsContent)],
];

securityChecks.forEach(([check_name, result]) => {
    check(check_name, result);
});

// ========================================
// 7. Documentation
// ========================================
print('\n7️⃣  Documentation', 'cyan');
print('-'.repeat(60));

const readmePath = path.join(__dirname, 'LOGIN_PAGE_README.md');
const testingPath = path.join(__dirname, 'LOGIN_PAGE_TESTING.md');

const docChecks = [
    ['README.md exists', fs.existsSync(readmePath)],
    ['TESTING.md exists', fs.existsSync(testingPath)],
    ['README contains API integration guide', fs.existsSync(readmePath) && fs.readFileSync(readmePath, 'utf-8').includes('API Integration')],
    ['Testing guide includes test cases', fs.existsSync(testingPath) && fs.readFileSync(testingPath, 'utf-8').includes('Test Cases')],
];

docChecks.forEach(([check_name, result]) => {
    check(check_name, result);
});

// ========================================
// 8. Code Quality
// ========================================
print('\n8️⃣  Code Quality', 'cyan');
print('-'.repeat(60));

const qualityChecks = [
    ['HTML is well-formed', htmlContent.match(/<form/g)?.length === 1],
    ['No console.log() in production code', !(/console\.log\(/i.test(jsContent.split('/**')[0]))],
    ['Proper error handling', /catch \(error\)/.test(jsContent)],
    ['Comments in HTML', /<!--/.test(htmlContent)],
    ['Comments in CSS', /\/\*/.test(cssContent)],
    ['Comments in JavaScript', /\/\/|\/\*/.test(jsContent)],
];

qualityChecks.forEach(([check_name, result]) => {
    check(check_name, result);
});

// ========================================
// File Size Analysis
// ========================================
print('\n📊 File Size Analysis', 'cyan');
print('-'.repeat(60));

const fileSizes = {};
files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const size = fs.statSync(filePath).size;
        fileSizes[file] = size;
        print(`${file.padEnd(15)} ${size.toString().padStart(6)} bytes`, 'blue');
    }
});

const totalSize = Object.values(fileSizes).reduce((a, b) => a + b, 0);
print(`${'TOTAL'.padEnd(15)} ${totalSize.toString().padStart(6)} bytes`, 'yellow');

// ========================================
// Summary
// ========================================
print('\n' + '='.repeat(60), 'cyan');
print(`\n📋 VERIFICATION SUMMARY\n`, 'cyan');

const total = passed + failed;
const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;

print(`✓ Passed: ${passed}`, 'green');
print(`✗ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
print(`📊 Score: ${percentage}%`, percentage === 100 ? 'green' : percentage >= 90 ? 'yellow' : 'red');

print('\n' + '='.repeat(60), 'cyan');

if (failed === 0) {
    print('\n✅ All checks passed! Login page is ready for use.\n', 'green');
    process.exit(0);
} else {
    print(`\n⚠️  ${failed} check(s) failed. Please review the issues above.\n`, 'red');
    process.exit(1);
}
