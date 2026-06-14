/**
 * Modern Calculator — Calculation Engine & UI Controller
 * Pure vanilla JS, no dependencies
 */

(function() {
  'use strict';

  // ── State ──
  let current = '0';
  let expression = '';
  let history = [];
  let errorState = false;
  let lastWasEquals = false;
  let openParens = 0;

  const MAX_HISTORY = 50;
  const MAX_DIGITS = 16;

  // ── DOM refs ──
  const display = document.getElementById('result');
  const exprDisplay = document.getElementById('expression');
  const historyList = document.getElementById('historyList');
  const historyPanel = document.getElementById('historyPanel');
  const historyBackdrop = document.getElementById('historyBackdrop');
  const toast = document.getElementById('toast');
  const themeToggle = document.getElementById('themeToggle');
  const historyToggle = document.getElementById('historyToggle');
  const historyClear = document.getElementById('historyClear');
  const calcDisplay = document.getElementById('calcDisplay');

  // ── Theme ──
  function initTheme() {
    const saved = localStorage.getItem('calc-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('calc-theme', newTheme);
  });

  // ── History ──
  function loadHistory() {
    try {
      const saved = localStorage.getItem('calc-history');
      if (saved) history = JSON.parse(saved);
    } catch (e) { history = []; }
    renderHistory();
  }

  function saveHistory() {
    try {
      localStorage.setItem('calc-history', JSON.stringify(history.slice(0, MAX_HISTORY)));
    } catch (e) { /* ignore */ }
  }

  function addHistory(expr, result) {
    history.unshift({ expr, result, time: new Date().toISOString() });
    if (history.length > MAX_HISTORY) history.pop();
    saveHistory();
    renderHistory();
  }

  function renderHistory() {
    if (history.length === 0) {
      historyList.innerHTML = '<div class="history-empty">No calculations yet</div>';
      return;
    }
    historyList.innerHTML = history.map((h, i) =>
      `<div class="history-item" data-index="${i}" tabindex="0" role="button" aria-label="Restore result ${h.result} from ${h.expr}">
        <div class="expr">${escapeHtml(h.expr)}</div>
        <div class="result">${escapeHtml(h.result)}</div>
      </div>`
    ).join('');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  historyList.addEventListener('click', (e) => {
    const item = e.target.closest('.history-item');
    if (!item) return;
    const idx = parseInt(item.dataset.index, 10);
    if (history[idx]) {
      current = history[idx].result;
      expression = '';
      errorState = false;
      lastWasEquals = false;
      openParens = 0;
      updateDisplay();
      closeHistory();
    }
  });

  historyClear.addEventListener('click', () => {
    history = [];
    saveHistory();
    renderHistory();
  });

  function openHistory() {
    historyPanel.classList.add('open');
    historyBackdrop.classList.add('show');
    historyPanel.setAttribute('aria-hidden', 'false');
    historyToggle.setAttribute('aria-expanded', 'true');
  }

  function closeHistory() {
    historyPanel.classList.remove('open');
    historyBackdrop.classList.remove('show');
    historyPanel.setAttribute('aria-hidden', 'true');
    historyToggle.setAttribute('aria-expanded', 'false');
  }

  historyToggle.addEventListener('click', () => {
    if (historyPanel.classList.contains('open')) closeHistory();
    else openHistory();
  });

  historyBackdrop.addEventListener('click', closeHistory);

  // ── Toast ──
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1500);
  }

  // ── Copy to clipboard ──
  calcDisplay.addEventListener('click', () => {
    navigator.clipboard.writeText(display.textContent).then(() => {
      showToast('Copied to clipboard');
    }).catch(() => {
      showToast('Failed to copy');
    });
  });

  // ── Display ──
  function formatNumber(numStr) {
    if (numStr === 'Error' || numStr === 'Cannot divide by zero' || numStr === 'Invalid input') return numStr;
    const num = parseFloat(numStr);
    if (isNaN(num)) return numStr;
    if (!isFinite(num)) return 'Error';

    const absNum = Math.abs(num);
    if (absNum === 0) return '0';

    // Scientific notation for very large/small
    if (absNum >= 1e16 || (absNum < 1e-6 && absNum > 0)) {
      return num.toExponential(6).replace(/\.?0+e/, 'e');
    }

    // Format with thousand separators
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  function updateDisplay() {
    display.textContent = formatNumber(current);
    exprDisplay.textContent = expression;
    calcDisplay.classList.toggle('error', errorState);
  }

  // ── Calculation Engine ──
  function evaluate(expr) {
    try {
      // Sanitize: only allow numbers, operators, parentheses, decimal
      const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, '');
      if (!sanitized) return null;

      // Check for division by zero
      if (/\/\s*0+(\.0*)?\b/.test(sanitized) || /\/\s*0+(\.0*)?\)/.test(sanitized)) {
        return { error: 'Cannot divide by zero' };
      }

      // Check parentheses balance
      let parenCount = 0;
      for (const ch of sanitized) {
        if (ch === '(') parenCount++;
        else if (ch === ')') parenCount--;
        if (parenCount < 0) return { error: 'Invalid expression' };
      }
      if (parenCount !== 0) return { error: 'Invalid expression' };

      // Use Function constructor for safe-ish eval (still sandboxed by same-origin)
      const result = new Function('return (' + sanitized + ')')();

      if (!isFinite(result)) return { error: 'Error' };
      return { value: result };
    } catch (e) {
      return { error: 'Invalid expression' };
    }
  }

  function compute() {
    if (!expression) return;
    let expr = expression;
    // Auto-close parentheses
    while (openParens > 0) { expr += ')'; openParens--; }

    const res = evaluate(expr);
    if (res.error) {
      current = res.error;
      errorState = true;
    } else {
      current = String(res.value);
      addHistory(expr, current);
    }
    expression = '';
    lastWasEquals = true;
    updateDisplay();
  }

  // ── Input Handlers ──
  function inputNumber(num) {
    if (errorState) { current = num; errorState = false; }
    else if (lastWasEquals) { current = num; expression = ''; lastWasEquals = false; }
    else if (current === '0') current = num;
    else if (current.length < MAX_DIGITS) current += num;
    updateDisplay();
  }

  function inputDecimal() {
    if (errorState) { current = '0.'; errorState = false; }
    else if (lastWasEquals) { current = '0.'; expression = ''; lastWasEquals = false; }
    else if (!current.includes('.')) current += '.';
    updateDisplay();
  }

  function inputOperator(op) {
    if (errorState) { errorState = false; }
    if (lastWasEquals) { expression = current; lastWasEquals = false; }
    else if (expression && !lastWasEquals) {
      expression = expression.trim();
      const lastChar = expression.slice(-1);
      if ('+-*/'.includes(lastChar)) {
        expression = expression.slice(0, -1) + ' ' + op + ' ';
      } else {
        expression += ' ' + op + ' ';
      }
    } else {
      expression = current + ' ' + op + ' ';
    }
    current = '0';
    updateDisplay();
  }

  function inputPercent() {
    if (errorState) return;
    const val = parseFloat(current);
    if (isNaN(val)) return;
    current = String(val / 100);
    updateDisplay();
  }

  function inputSqrt() {
    if (errorState) return;
    const val = parseFloat(current);
    if (isNaN(val)) return;
    if (val < 0) {
      current = 'Invalid input';
      errorState = true;
    } else {
      current = String(Math.sqrt(val));
    }
    updateDisplay();
  }

  function inputPower() {
    if (errorState) { errorState = false; }
    if (lastWasEquals) { expression = current; lastWasEquals = false; }
    else if (expression) {
      expression += ' ' + current + ' ';
    } else {
      expression = current + ' ';
    }
    expression += '** ';
    current = '0';
    updateDisplay();
  }

  function inputSign() {
    if (errorState) { current = '0'; errorState = false; }
    else if (current === '0') return;
    else if (current.startsWith('-')) current = current.slice(1);
    else current = '-' + current;
    updateDisplay();
  }

  function inputBackspace() {
    if (errorState) { current = '0'; errorState = false; }
    else if (current.length > 1) current = current.slice(0, -1);
    else current = '0';
    updateDisplay();
  }

  function inputClear() {
    current = '0';
    expression = '';
    errorState = false;
    lastWasEquals = false;
    openParens = 0;
    updateDisplay();
  }

  function inputClearEntry() {
    current = '0';
    errorState = false;
    updateDisplay();
  }

  function inputParen(paren) {
    if (errorState) { errorState = false; }
    if (lastWasEquals) { expression = ''; lastWasEquals = false; }

    if (paren === '(') {
      if (expression && !lastWasEquals && current !== '0') {
        expression += ' ' + current + ' * (';
      } else if (!expression) {
        expression = '(';
      } else {
        expression += ' (';
      }
      openParens++;
      current = '0';
    } else {
      if (openParens > 0) {
        expression += ' ' + current + ' )';
        openParens--;
        current = '0';
      }
    }
    updateDisplay();
  }

  // ── Button clicks ──
  document.querySelectorAll('.btn-grid .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const value = btn.dataset.value;

      switch (action) {
        case 'number': inputNumber(value); break;
        case 'decimal': inputDecimal(); break;
        case 'operator': inputOperator(value); break;
        case 'clear': inputClear(); break;
        case 'clear-entry': inputClearEntry(); break;
        case 'backspace': inputBackspace(); break;
        case 'sign': inputSign(); break;
        case 'percent': inputPercent(); break;
        case 'sqrt': inputSqrt(); break;
        case 'power': inputPower(); break;
        case 'parenthesis': inputParen(value); break;
        case 'equals': compute(); break;
      }
    });
  });

  // ── Keyboard support ──
  document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Prevent default for mapped keys
    if (/^[0-9+\-*/.=\r\n\b\x7F\x1b()%]$/.test(key) || key === 'Backspace' || key === 'Escape' || key === 'Enter') {
      e.preventDefault();
    }

    if (key >= '0' && key <= '9') inputNumber(key);
    else if (key === '.') inputDecimal();
    else if (key === '+' || key === '-' || key === '*' || key === '/') inputOperator(key);
    else if (key === 'Enter' || key === '=') compute();
    else if (key === 'Escape') inputClear();
    else if (key === 'Backspace') inputBackspace();
    else if (key === '(') inputParen('(');
    else if (key === ')') inputParen(')');
    else if (key === '%') inputPercent();
    else if (key === '^') inputPower();
  });

  // ── Init ──
  initTheme();
  loadHistory();
  updateDisplay();

})();
