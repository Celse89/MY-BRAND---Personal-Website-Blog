import { validateEmail } from '../views/static/signup.js';

describe('validateEmail', () => {
  test('valid email address', () => {
    const email = 'test@test.com';
    const result = validateEmail(email);
    expect(result).toBe('');
  });

  test('invalid email address', () => {
    const email = 'invalid_email';
    const result = validateEmail(email);
    expect(result).toBe('Please enter a valid email address.');
  });

  test('empty email address', () => {
    const email = '';
    const result = validateEmail(email);
    expect(result).toBe('Please enter a valid email address.');
  });

  test('email address without domain', () => {
    const email = 'test@';
    const result = validateEmail(email);
    expect(result).toBe('Please enter a valid email address.');
  });

  test('email address without username', () => {
    const email = '@test.com';
    const result = validateEmail(email);
    expect(result).toBe('Please enter a valid email address.');
  });

  test('email address with multiple dots in domain', () => {
    const email = 'test@test..com';
    const result = validateEmail(email);
    expect(result).toBe('Please enter a valid email address.');
  });
});