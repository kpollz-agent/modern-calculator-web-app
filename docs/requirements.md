# Modern Calculator Web App — Requirements Document

**Version:** 1.0  
**Author:** BA-Agent  
**Date:** 2026-06-14  
**Project:** Morden Calculator Web App  
**Status:** Draft (in_progress)

---

## 1. Overview

A modern, responsive web-based calculator supporting basic and advanced arithmetic, calculation history, keyboard input, accessibility, and theme switching. Built with plain HTML/CSS/JS (no framework).

---

## 2. Functional Requirements

### 2.1 Basic Arithmetic Operations

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | Support addition (`+`) of two or more numbers | Must |
| FR-002 | Support subtraction (`−`) of two or more numbers | Must |
| FR-003 | Support multiplication (`×`) of two or more numbers | Must |
| FR-004 | Support division (`÷`) of two or more numbers | Must |
| FR-005 | Division by zero must display a clear error message (e.g., "Cannot divide by zero") | Must |
| FR-006 | Support decimal point input (`.`) | Must |
| FR-007 | Support negative numbers via sign toggle (`+/−`) | Must |
| FR-008 | Support clear entry (`CE`) to reset current input | Must |
| FR-009 | Support all clear (`AC`) to reset entire calculation | Must |
| FR-010 | Support backspace/delete to remove last digit | Must |

### 2.2 Advanced Operations

| ID | Requirement | Priority |
|---|---|---|
| FR-011 | Support percentage (`%`) calculation | Must |
| FR-012 | Support square root (`√`) of non-negative numbers | Must |
| FR-013 | Square root of negative numbers must display error | Must |
| FR-014 | Support exponentiation (`^` / `xʸ`) | Must |
| FR-015 | Support parentheses for order of operations (`(` and `)`) | Must |
| FR-016 | Support nested parentheses up to 10 levels deep | Should |
| FR-017 | Support chained operations (e.g., `5 + 3 × 2 = 11`) following standard order of operations | Must |
| FR-018 | Display intermediate results during chained operations | Should |

### 2.3 History Log

| ID | Requirement | Priority |
|---|---|---|
| FR-019 | Store last 50 calculations in a scrollable history panel | Must |
| FR-020 | Each history entry shows: expression, result, timestamp | Must |
| FR-021 | Clicking a history entry restores the result to the current display | Must |
| FR-022 | History persists for the duration of the browser session (localStorage optional) | Should |
| FR-023 | Clear history button (`Clear History`) | Must |
| FR-024 | History panel can be toggled open/closed | Should |

### 2.4 Keyboard Support

| ID | Requirement | Priority |
|---|---|---|
| FR-025 | Numpad digits `0-9` input numbers directly | Must |
| FR-026 | Numpad operators `+`, `-`, `*`, `/` input corresponding operations | Must |
| FR-027 | `Enter` key triggers equals (`=`) | Must |
| FR-028 | `Escape` key triggers all clear (`AC`) | Must |
| FR-029 | `Backspace` key triggers delete last digit | Must |
| FR-030 | `.` key inputs decimal point | Must |
| FR-031 | `(` and `)` keys input parentheses | Must |
| FR-032 | `%` key inputs percentage | Must |
| FR-033 | Prevent default browser behavior for all mapped keys | Must |

### 2.5 Display & UI

| ID | Requirement | Priority |
|---|---|---|
| FR-034 | Primary display shows current input/result (min 16 digits) | Must |
| FR-035 | Secondary display shows the full expression being built | Must |
| FR-036 | Display numbers with appropriate thousand separators (e.g., `1,000,000`) | Should |
| FR-037 | Scientific notation for very large/small numbers (>16 digits) | Should |
| FR-038 | Smooth button press animations (CSS transitions) | Should |
| FR-039 | Button layout matches standard calculator grid (4×5 or 5×6) | Must |

---

## 3. Non-Functional Requirements

### 3.1 Responsive Design

| ID | Requirement | Priority |
|---|---|---|
| NFR-001 | Layout adapts to viewport width: desktop (≥1024px), tablet (768–1023px), mobile (<768px) | Must |
| NFR-002 | Mobile layout: buttons ≥48px touch target (WCAG 2.5.5) | Must |
| NFR-003 | Desktop layout: buttons proportionally larger, history panel side-by-side | Must |
| NFR-004 | Font sizes scale with viewport (clamp() or responsive units) | Should |
| NFR-005 | No horizontal scroll on any device | Must |

### 3.2 Accessibility (WCAG 2.1 AA)

| ID | Requirement | Priority |
|---|---|---|
| NFR-006 | All buttons have descriptive `aria-label` attributes | Must |
| NFR-007 | Focus states visible on all interactive elements (keyboard navigation) | Must |
| NFR-008 | Focus trap within calculator when history panel is open | Should |
| NFR-009 | Color contrast ratio ≥ 4.5:1 for all text and UI elements | Must |
| NFR-010 | Screen reader announces results after calculation (`aria-live="polite"`) | Must |
| NFR-011 | Screen reader announces errors (`aria-live="assertive"`) | Must |
| NFR-012 | Skip link to jump to calculator from top of page | Should |
| NFR-013 | Reduced motion support (`prefers-reduced-motion`) | Should |

### 3.3 Theme Support

| ID | Requirement | Priority |
|---|---|---|
| NFR-014 | Dark / light theme toggle button | Must |
| NFR-015 | Theme preference persists in `localStorage` | Must |
| NFR-016 | Respect `prefers-color-scheme` on first visit | Should |
| NFR-017 | Theme switch is instant (no page reload) | Must |
| NFR-018 | All colors defined as CSS custom properties (variables) | Must |

### 3.4 Performance

| ID | Requirement | Priority |
|---|---|---|
| NFR-019 | First Contentful Paint (FCP) < 1.5s on 3G | Should |
| NFR-020 | Time to Interactive (TTI) < 3s on 3G | Should |
| NFR-021 | Total bundle size < 100 KB (HTML+CSS+JS, uncompressed) | Should |
| NFR-022 | No external dependencies (pure HTML/CSS/JS) | Must |

### 3.5 Browser Compatibility

| ID | Requirement | Priority |
|---|---|---|
| NFR-023 | Chrome/Edge (latest 2 versions) | Must |
| NFR-024 | Firefox (latest 2 versions) | Must |
| NFR-025 | Safari (latest 2 versions) | Must |
| NFR-026 | Mobile Safari (iOS 15+) | Must |
| NFR-027 | Mobile Chrome (Android 10+) | Must |

---

## 4. User Stories

### US-001: Basic Calculation
> **As a** user, **I want** to perform basic arithmetic operations, **so that** I can quickly calculate sums, differences, products, and quotients.

**Acceptance Criteria:**
- Given I enter `12 + 8 =`, the display shows `20`
- Given I enter `25 − 5 =`, the display shows `20`
- Given I enter `6 × 7 =`, the display shows `42`
- Given I enter `100 ÷ 4 =`, the display shows `25`

### US-002: Division by Zero Handling
> **As a** user, **I want** clear feedback when I divide by zero, **so that** I understand the operation is invalid.

**Acceptance Criteria:**
- Given I enter `5 ÷ 0 =`, the display shows "Cannot divide by zero"
- Given the error is displayed, pressing any number clears the error and starts fresh
- Given the error is displayed, pressing `AC` clears the error immediately

### US-003: Advanced Operations
> **As a** user, **I want** to use percentage, square root, and exponentiation, **so that** I can perform more complex calculations.

**Acceptance Criteria:**
- Given I enter `100 % =`, the display shows `1` (or `0.01` depending on interpretation — see Edge Cases)
- Given I enter `√16 =`, the display shows `4`
- Given I enter `2 ^ 3 =`, the display shows `8`
- Given I enter `√−4 =`, the display shows "Invalid input"

### US-004: Parentheses & Order of Operations
> **As a** user, **I want** to use parentheses to control calculation order, **so that** complex expressions evaluate correctly.

**Acceptance Criteria:**
- Given I enter `( 2 + 3 ) × 4 =`, the display shows `20`
- Given I enter `2 + 3 × 4 =`, the display shows `14` (not `20`)
- Given I enter `( ( 1 + 2 ) × ( 3 + 4 ) ) =`, the display shows `21`

### US-005: Calculation History
> **As a** user, **I want** to see my recent calculations, **so that** I can reuse previous results.

**Acceptance Criteria:**
- Given I perform 5 calculations, the history panel shows all 5 entries
- Given I click a history entry, its result appears in the current display
- Given I click "Clear History", all entries are removed
- Given I perform 51 calculations, only the last 50 are retained

### US-006: Keyboard Input
> **As a** user, **I want** to use my keyboard, **so that** I can calculate without touching the mouse.

**Acceptance Criteria:**
- Given I type `123 + 456` on the keyboard, the display shows the expression
- Given I press `Enter`, the calculation executes
- Given I press `Escape`, the display clears
- Given I press `Backspace`, the last digit is removed

### US-007: Responsive Layout
> **As a** user, **I want** the calculator to work on my phone and laptop, **so that** I can use it on any device.

**Acceptance Criteria:**
- Given I view on a 1920px desktop, the calculator is centered with history panel beside it
- Given I view on a 375px mobile, the calculator fills the width with touch-friendly buttons
- Given I rotate my phone, the layout adapts without breaking

### US-008: Accessibility
> **As a** visually impaired user, **I want** the calculator to work with my screen reader, **so that** I can use it independently.

**Acceptance Criteria:**
- Given I navigate with Tab, all buttons are reachable and have visible focus
- Given I perform a calculation, the screen reader announces the result
- Given an error occurs, the screen reader announces it immediately
- Given I use high contrast mode, all elements remain distinguishable

### US-009: Dark/Light Theme
> **As a** user, **I want** to switch between dark and light themes, **so that** the calculator is comfortable in any lighting.

**Acceptance Criteria:**
- Given I click the theme toggle, the colors switch instantly
- Given I refresh the page, my last theme choice is remembered
- Given my OS is set to dark mode, the calculator defaults to dark on first visit

---

## 5. Edge Cases & Error Handling

| Scenario | Expected Behavior |
|---|---|
| Division by zero | Display "Cannot divide by zero"; allow `AC` or new number to reset |
| Square root of negative number | Display "Invalid input"; allow `AC` or new number to reset |
| Overflow (>16 digits) | Switch to scientific notation (e.g., `1.23e+20`) |
| Underflow (<0.000001) | Switch to scientific notation (e.g., `1.23e-7`) |
| Multiple decimal points in one number | Ignore second decimal point input |
| Leading zeros | `0005` displays as `5`; `0.5` remains `0.5` |
| Empty expression + equals | No change; display remains `0` or last result |
| Unmatched parentheses | Auto-close missing parentheses or display "Invalid expression" |
| Percentage interpretation | `50 %` = `0.5` (as decimal); `100 + 50 %` = `150` (as percentage increase) — **Decision needed** |
| Very long expressions | Secondary display scrolls horizontally; primary display truncates with ellipsis if needed |
| Rapid key presses | Queue inputs; do not drop keystrokes |
| Browser zoom (up to 200%) | Layout remains usable; buttons reflow if needed |
| JavaScript disabled | Display a graceful fallback message: "This calculator requires JavaScript" |

---

## 6. Open Questions / Decisions Needed

1. **Percentage behavior:** Should `50 %` return `0.5` (decimal) or `50` (as-is)? Should `100 + 50 %` return `150` (percentage increase) or `100.5` (decimal addition)?
2. **History persistence:** Should history survive browser restarts via `localStorage`?
3. **Keyboard mapping:** Should `^` map to exponentiation or be reserved for browser find? (Recommendation: use `Shift+6` for `^`)
4. **Scientific notation precision:** How many decimal places to display in scientific notation? (Recommendation: 6 significant digits)
5. **Copy to clipboard:** Should users be able to copy results? (Nice-to-have)

---

## 7. Acceptance Criteria Summary (Definition of Done)

- [ ] All FR-001 through FR-038 implemented and manually tested
- [ ] All NFR-001 through NFR-027 verified on target browsers/devices
- [ ] All US-001 through US-009 acceptance criteria pass
- [ ] All edge cases in Section 5 handled gracefully
- [ ] Accessibility audit passes WCAG 2.1 AA (manual + automated via axe/lighthouse)
- [ ] Responsive design tested on: iPhone SE, iPhone 14 Pro, iPad, 1366px laptop, 1920px desktop
- [ ] Performance audit: Lighthouse score ≥ 90 on all categories
- [ ] Code review completed by @lead or senior developer
- [ ] Requirements document (this file) approved by @lead

---

*End of Requirements Document v1.0*
