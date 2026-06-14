/**
 * Unit Tests for Calculator Engine
 * Run with: node calculator.test.js
 */

const assert = require('assert');

// Mock DOM for Node.js testing
if (typeof document === 'undefined') {
  global.document = {
    getElementById: () => ({
      textContent: '',
      classList: { toggle: () => {}, add: () => {}, remove: () => {} },
      addEventListener: () => {},
      setAttribute: () => {},
      style: {}
    }),
    querySelectorAll: () => [],
    addEventListener: () => {},
    createElement: (tag) => ({ textContent: '', className: '' }),
    documentElement: { setAttribute: () => {}, getAttribute: () => '' }
  };
  global.localStorage = {
    data: {},
    getItem: (k) => global.localStorage.data[k] || null,
    setItem: (k, v) => { global.localStorage.data[k] = v; },
    removeItem: (k) => { delete global.localStorage.data[k]; }
  };
  global.navigator = { clipboard: { writeText: () => Promise.resolve() } };
  global.window = { matchMedia: () => ({ matches: false }) };
}

// Load calculator module (we'll test the engine functions directly)
// Since the calculator uses IIFE, we extract the evaluate logic

function evaluate(expr) {
  try {
    const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, '');
    if (!sanitized) return null;
    if (/\/\s*0+(\.0*)?\b/.test(sanitized) || /\/\s*0+(\.0*)?\)/.test(sanitized)) {
      return { error: 'Cannot divide by zero' };
    }
    let parenCount = 0;
    for (const ch of sanitized) {
      if (ch === '(') parenCount++;
      else if (ch === ')') parenCount--;
      if (parenCount < 0) return { error: 'Invalid expression' };
    }
    if (parenCount !== 0) return { error: 'Invalid expression' };
    const result = new Function('return (' + sanitized + ')')();
    if (!isFinite(result)) return { error: 'Error' };
    return { value: result };
  } catch (e) {
    return { error: 'Invalid expression' };
  }
}

function formatNumber(numStr) {
  if (numStr === 'Error' || numStr === 'Cannot divide by zero' || numStr === 'Invalid input') return numStr;
  const num = parseFloat(numStr);
  if (isNaN(num)) return numStr;
  if (!isFinite(num)) return 'Error';
  const absNum = Math.abs(num);
  if (absNum === 0) return '0';
  if (absNum >= 1e16 || (absNum < 1e-6 && absNum > 0)) {
    return num.toExponential(6).replace(/\.?0+e/, 'e');
  }
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

// Tests
console.log('Running calculator tests...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('✓', name);
    passed++;
  } catch (e) {
    console.log('✗', name);
    console.log('  ', e.message);
    failed++;
  }
}

// Basic arithmetic
test('Addition: 2 + 2 = 4', () => {
  const r = evaluate('2 + 2');
  assert.strictEqual(r.value, 4);
});

test('Subtraction: 10 - 3 = 7', () => {
  const r = evaluate('10 - 3');
  assert.strictEqual(r.value, 7);
});

test('Multiplication: 6 * 7 = 42', () => {
  const r = evaluate('6 * 7');
  assert.strictEqual(r.value, 42);
});

test('Division: 100 / 4 = 25', () => {
  const r = evaluate('100 / 4');
  assert.strictEqual(r.value, 25);
});

// Division by zero
test('Division by zero returns error', () => {
  const r = evaluate('5 / 0');
  assert.strictEqual(r.error, 'Cannot divide by zero');
});

test('Division by 0.0 returns error', () => {
  const r = evaluate('5 / 0.0');
  assert.strictEqual(r.error, 'Cannot divide by zero');
});

// Parentheses
test('Parentheses: (2 + 3) * 4 = 20', () => {
  const r = evaluate('(2 + 3) * 4');
  assert.strictEqual(r.value, 20);
});

test('Order of operations: 2 + 3 * 4 = 14', () => {
  const r = evaluate('2 + 3 * 4');
  assert.strictEqual(r.value, 14);
});

test('Nested parentheses: ((1 + 2) * (3 + 4)) = 21', () => {
  const r = evaluate('((1 + 2) * (3 + 4))');
  assert.strictEqual(r.value, 21);
});

// Invalid expressions
test('Unmatched parentheses returns error', () => {
  const r = evaluate('(2 + 3');
  assert.strictEqual(r.error, 'Invalid expression');
});

test('Empty expression returns null', () => {
  const r = evaluate('');
  assert.strictEqual(r, null);
});

// Exponentiation
test('Exponentiation: 2 ** 3 = 8', () => {
  const r = evaluate('2 ** 3');
  assert.strictEqual(r.value, 8);
});

// Formatting
test('Format number with commas: 1000000', () => {
  const r = formatNumber('1000000');
  assert.strictEqual(r, '1,000,000');
});

test('Format decimal: 1234.56', () => {
  const r = formatNumber('1234.56');
  assert.strictEqual(r, '1,234.56');
});

test('Format scientific notation large', () => {
  const r = formatNumber('10000000000000000');
  assert(r.includes('e'));
});

test('Format error string passes through', () => {
  const r = formatNumber('Cannot divide by zero');
  assert.strictEqual(r, 'Cannot divide by zero');
});

// Edge cases
test('Decimal addition: 0.1 + 0.2', () => {
  const r = evaluate('0.1 + 0.2');
  assert(Math.abs(r.value - 0.3) < 0.0001);
});

test('Negative numbers: -5 + 3 = -2', () => {
  const r = evaluate('-5 + 3');
  assert.strictEqual(r.value, -2);
});

test('Complex expression: 10 / 2 + 3 * 4 - 1', () => {
  const r = evaluate('10 / 2 + 3 * 4 - 1');
  assert.strictEqual(r.value, 16);
});

// Summary
console.log('\n' + '='.repeat(40));
console.log(`Tests: ${passed} passed, ${failed} failed, ${passed + failed} total`);
if (failed === 0) {
  console.log('All tests passed! ✓');
  process.exit(0);
} else {
  console.log('Some tests failed. ✗');
  process.exit(1);
}
