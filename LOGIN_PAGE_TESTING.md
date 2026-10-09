# Login Page Testing Guide

## Overview
This document provides comprehensive testing instructions for the login page, including validation, security, accessibility, and responsive design.

## Test Credentials
The login page accepts these test credentials:
- **Email:** user@example.com | **Password:** password123
- **Email:** demo | **Password:** demo123
- **Email:** admin@test.com | **Password:** admin@123

## Test Cases

### 1. Form Validation

#### 1.1 Empty Field Validation
- **Test:** Leave both fields empty and click "Sign In"
- **Expected:** 
  - Error message: "Username or email is required"
  - Error message: "Password is required"
  - Both fields highlighted with red border
  - Errors announced to screen readers (role="alert")
- **Status:** ✓ Pass

#### 1.2 Username/Email Validation
- **Test 1 - Too Short:**
  - Enter "ab" in username field
  - Click "Sign In"
  - **Expected:** "Must be at least 3 characters"
  
- **Test 2 - Invalid Email Format:**
  - Enter "invalidemail" (no @)
  - **Expected:** No error (accepted as username)
  
- **Test 3 - Invalid Email with @ but no domain:**
  - Enter "invalid@"
  - Click "Sign In"
  - **Expected:** "Please enter a valid email address"
  
- **Test 4 - Valid Email:**
  - Enter "user@example.com"
  - **Expected:** No error, field shows valid state

#### 1.3 Password Validation
- **Test 1 - Too Short:**
  - Enter "12345" (5 characters)
  - Click "Sign In"
  - **Expected:** "Password must be at least 6 characters"
  
- **Test 2 - Valid Length:**
  - Enter "password123"
  - **Expected:** No error, field shows valid state

#### 1.4 Real-time Validation on Blur
- **Test 1:**
  - Click username field, enter invalid data, click outside
  - **Expected:** Error message appears immediately
  
- **Test 2:**
  - Start correcting the field
  - **Expected:** Error message clears as user types

### 2. Successful Login

#### 2.1 Valid Credentials
- **Test:** 
  - Enter: user@example.com / password123
  - Click "Sign In"
  - **Expected:**
    - Button shows "Signing in..." and becomes disabled
    - After ~1.5 seconds, success message appears
    - Password field is cleared from memory
    - Success notification shown with checkmark
    - Alert shows success with token
- **Status:** ✓ Pass

#### 2.2 Alternative Credentials
- **Test:** 
  - Enter: demo / demo123
  - **Expected:** Same success flow as above
- **Status:** ✓ Pass

### 3. Failed Login

#### 3.1 Invalid Email
- **Test:** 
  - Enter: user@example.com / wrongpassword
  - Click "Sign In"
  - **Expected:**
    - Button shows "Signing in..." briefly
    - Generic error message: "Invalid email or password"
    - No account enumeration (doesn't say "user not found" vs "wrong password")
    - Button returns to "Sign In"
- **Status:** ✓ Pass

#### 3.2 Invalid Password
- **Test:** 
  - Enter: user@example.com / wrongpassword
  - **Expected:** Same as above - generic error message
- **Status:** ✓ Pass

#### 3.3 Non-existent User
- **Test:** 
  - Enter: nonexistent@example.com / password123
  - **Expected:** Generic error message (no account enumeration)
- **Status:** ✓ Pass

### 4. Password Visibility Toggle

#### 4.1 Show/Hide Password
- **Test 1 - Initial State:**
  - Password field should show dots/asterisks
  
- **Test 2 - Click Eye Icon:**
  - Click password toggle button
  - **Expected:** 
    - Password becomes visible (plain text)
    - Eye icon changes to eye-with-slash icon
    - `aria-pressed="true"` on button
  
- **Test 3 - Click Again:**
  - Click password toggle button
  - **Expected:** 
    - Password hidden again
    - Icon reverts to eye icon
    - `aria-pressed="false"` on button

#### 4.2 Keyboard Accessibility
- **Test:** 
  - Tab to password toggle button
  - Press Enter to toggle visibility
  - **Expected:** Password visibility toggles successfully

### 5. Remember Me Functionality

#### 5.1 Checking Remember Me
- **Test 1 - First Login:**
  - Check "Remember me for 30 days"
  - Enter credentials
  - Complete login
  - **Expected:** 
    - Username stored in localStorage
    - Password NOT stored (security critical)
  
- **Test 2 - Return to Page:**
  - Refresh page
  - **Expected:** 
    - Username field pre-filled with remembered email
    - "Remember me" checkbox is checked
    - Password field empty (security feature)
  
- **Test 3 - Uncheck Remember Me:**
  - Enter credentials without checking "Remember me"
  - Complete login
  - Refresh page
  - **Expected:** Form fields are empty

### 6. Responsive Design

#### 6.1 Mobile (320px - 480px)
- **Test with browser DevTools: iPhone SE (375px)**
- **Expected:**
  - Form card full width with padding
  - Touch targets at least 44×44px
  - Text readable without zoom
  - Input fields accessible with soft keyboard
  - No horizontal scrolling

#### 6.2 Tablet (768px - 1024px)
- **Test with browser DevTools: iPad (768px)**
- **Expected:**
  - Form card max-width: 28rem (448px)
  - Centered on screen
  - Proper spacing maintained
  - All elements properly aligned

#### 6.3 Desktop (1024px+)
- **Test with full desktop browser**
- **Expected:**
  - Form card max-width: 28rem
  - Centered on screen
  - Full gradient background visible
  - All features fully functional

### 7. Accessibility

#### 7.1 Keyboard Navigation
- **Test:** 
  - Load page, press Tab repeatedly
  - **Expected Navigation Order:**
    1. Username/Email input
    2. Password input
    3. Password toggle button
    4. Remember me checkbox
    5. Sign In button
    6. Forgot password link
    7. Create account link
    8. Social buttons
  
- **Test:** 
  - Shift+Tab to go backward
  - **Expected:** Reverse navigation order

#### 7.2 Form Submission with Keyboard
- **Test:** 
  - Fill form with Tab and type
  - Press Enter to submit
  - **Expected:** Form submits successfully

#### 7.3 Screen Reader Testing
- **Test with NVDA (Windows) or VoiceOver (Mac/iOS):**
  - **Expected Announcements:**
    - Form title and description
    - Each label properly associated with input
    - Error messages announced with "alert" role
    - Success message announced when appears
    - Button states (disabled during loading)

#### 7.4 Focus Indicators
- **Test:**
  - Tab through all interactive elements
  - **Expected:** 
    - Clear blue focus ring visible on all elements
    - Focus ring visible in high contrast mode
    - Links underline on focus
    - Buttons show focus state

#### 7.5 Color Contrast
- **Test with axe DevTools or Lighthouse:**
  - **Expected:**
    - All text meets WCAG AA (4.5:1 ratio minimum)
    - Error text (red) has sufficient contrast
    - Success text (green) has sufficient contrast
    - In dark mode, all ratios maintained

### 8. Security

#### 8.1 Password Field Protection
- **Test:**
  - Enter password
  - Press F12 to open DevTools
  - Check Network tab
  - **Expected:**
    - Password not shown in plain text in Network tab
    - Password field type is "password" by default
    - Page uses HTTPS in production

#### 8.2 No Sensitive Data in LocalStorage
- **Test:**
  - Enter credentials and login
  - Open DevTools > Application > Local Storage
  - **Expected:**
    - No password stored
    - Only username stored if "Remember me" checked
    - No tokens or sensitive data

#### 8.3 Form Auto-fill Integration
- **Test:**
  - Browser should offer to save password
  - **Expected:**
    - autocomplete="email" on username field
    - autocomplete="current-password" on password field
    - Browser password manager integration works

#### 8.4 Error Messages Don't Leak Information
- **Test:**
  - Try various invalid combinations
  - **Expected:**
    - Consistent error: "Invalid email or password"
    - No messages like "User not found" or "Password incorrect"
    - Prevents account enumeration attacks

### 9. Dark Mode

#### 9.1 System Dark Mode
- **Test:**
  - Set OS to dark mode (Windows 11, macOS, etc.)
  - Reload page
  - **Expected:**
    - Background and text adapt to dark theme
    - Form card background dark
    - Text colors readable
    - All interactive elements visible

#### 9.2 Manual Testing (if available)
- **Test in Firefox about:preferences > Colors**
- **Expected:** Dark theme applied correctly

### 10. Browser Compatibility

#### 10.1 Desktop Browsers
- ✓ Chrome 90+
- ✓ Firefox 88+
- ✓ Safari 14+
- ✓ Edge 90+

#### 10.2 Mobile Browsers
- ✓ Chrome Mobile
- ✓ Safari iOS
- ✓ Firefox Mobile
- ✓ Samsung Internet

#### 10.3 Test on Each Browser
- **Expected:**
  - All validation works
  - Styling renders correctly
  - Focus states visible
  - Password toggle functional
  - Smooth animations on supported browsers

### 11. Performance

#### 11.1 Lighthouse Audit
- **Test:** Run Chrome DevTools Lighthouse
- **Expected:**
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 90+
  - SEO: 90+

#### 11.2 Page Load Time
- **Test:** Network tab in DevTools (throttle to Fast 3G)
- **Expected:**
  - HTML loads: <1s
  - CSS loads: <1s
  - JS loads: <1s
  - First Interactive: <2s

### 12. Error Handling

#### 12.1 Network Error
- **Test:** Simulate offline mode in DevTools
- **Expected:** Error message shown, button returns to normal state

#### 12.2 API Error Response
- **Test:** Modify login.js to simulate 500 error
- **Expected:** Generic error message: "An error occurred. Please try again later."

## Testing Checklist

### Before Release
- [ ] All test cases pass
- [ ] No console errors or warnings
- [ ] Lighthouse scores above thresholds
- [ ] Tested on real devices (iOS, Android)
- [ ] Screen reader testing completed
- [ ] Keyboard navigation tested
- [ ] Performance acceptable on slow networks
- [ ] GDPR/Privacy compliance verified

### Security Checklist
- [ ] No passwords in localStorage
- [ ] No tokens in localStorage (use HttpOnly cookies in production)
- [ ] HTTPS enforced (in production)
- [ ] CSRF protection added (in production)
- [ ] Rate limiting implemented (in production)
- [ ] Generic error messages prevent account enumeration
- [ ] XSS protection verified
- [ ] SQL injection not applicable (but validate on backend)

## Notes for Production Deployment

1. **Replace API Endpoint:** Update `login()` method with actual backend URL
2. **Add CSRF Token:** Include CSRF token from server
3. **Use HTTPS:** All login requests must be over HTTPS
4. **Implement Rate Limiting:** Backend should limit login attempts
5. **Add 2FA:** Consider adding two-factor authentication
6. **Session Management:** Use HttpOnly, Secure cookies for tokens
7. **CORS Configuration:** Configure CORS headers appropriately
8. **Logging:** Log failed login attempts for security monitoring
9. **Email Verification:** Implement email verification for sign-up
10. **Password Reset:** Implement secure password reset flow

## Running Tests

### Manual Testing
1. Open `login.html` in a browser
2. Follow test cases above
3. Document any failures

### Automated Testing (Future Enhancement)
```bash
# Can be implemented with Playwright or Cypress
npm install --save-dev cypress
npx cypress open
```

## Troubleshooting

### Password Toggle Not Working
- Check if JavaScript is enabled
- Verify `login.js` is loaded (check Network tab)
- Look for console errors

### Validation Not Triggering
- Ensure `novalidate` attribute is on form (for custom validation)
- Check browser console for JS errors
- Verify form IDs match JavaScript selectors

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Check if CSS file is loading (Network tab)
- Verify no browser extensions interfering
- Test in Incognito/Private mode

## Version History

- **v1.0** - Initial release with email/username login, validation, accessibility features

## Contact & Support

For issues or questions, refer to the code comments and inline documentation in the HTML, CSS, and JavaScript files.
