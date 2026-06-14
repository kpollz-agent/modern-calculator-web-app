# Modern Calculator Web App — Project Plan & Timeline

**Project:** Modern Calculator Web App  
**Target Delivery:** 2026-06-20 17:00 UTC  
**Project Start:** 2026-06-14  
**Duration:** 6 days  
**Team Size:** 4 agents (PM, BA, UI/UX Designer, Developer)  
**Lead:** Leader (GitHub integration owner)  

---

## 1. Executive Summary

This project delivers a modern, responsive calculator web application with full arithmetic capabilities, history tracking, keyboard support, dark/light themes, and WCAG 2.1 AA accessibility compliance. The 6-day timeline is aggressive but achievable with strict phase gates and parallel workstreams.

**Key success factors:**
- BA requirements are complete (v1.0) — 5 lead decisions unblock detailed planning
- UI/UX design must finish by EOD 2026-06-16 to give Developer 3 full days
- All 7 lead decisions received (%, history, ^ mapping, precision, copy-to-clipboard, theme, history panel) — scope is now locked
- Daily standups via task comments; no synchronous meetings required

---

## 2. Sprint Breakdown & Gantt-Style Timeline

### Sprint 1: Requirements Lock (Day 0–1) — 2026-06-14 → 2026-06-15
| Day | Agent | Activity | Deliverable | Gate |
|-----|-------|----------|-------------|------|
| Sun 06-14 | BA | Requirements v1.0 delivered | `requirements.md` | ✅ Done |
| Sun 06-14 | PM | Project plan + timeline | `project-plan.md` | This doc |
| Sun 06-14 | Lead | **All 7 decisions resolved** (see §9) | Decision log | ✅ Done — integrated into v1.1 |
| Mon 06-15 | PM | Update plan with decisions; confirm sprint 2 readiness | Revised plan v1.1 | Gate: all decisions logged |

**Sprint 1 Exit Criteria:**
- [x] BA requirements complete
- [x] Lead decisions on all 7 open questions (%, history persistence, `^` mapping, precision, copy-to-clipboard, theme, history panel)
- [ ] PM plan approved by lead

---

### Sprint 2: Design & Prototype (Day 2–3) — 2026-06-15 → 2026-06-17
| Day | Agent | Activity | Deliverable | Buffer |
|-----|-------|----------|-------------|--------|
| Mon 06-15 PM | UI/UX | Kickoff; color palette + typography | Design system draft | — |
| Tue 06-16 | UI/UX | Button grid, component specs, responsive breakpoints | Component library | 4h buffer |
| Tue 06-16 | UI/UX | History panel, theme toggle, accessibility annotations | Full mockups | — |
| Tue 06-16 PM | UI/UX | HTML/CSS prototype | Interactive prototype | 4h buffer |
| Wed 06-17 AM | Lead | Design review | Approval / change requests | 4h buffer |
| Wed 06-17 PM | UI/UX | Address feedback; finalize design system | `design/` folder in repo | Gate: design approved |

**Sprint 2 Exit Criteria:**
- [ ] Design system document complete
- [ ] HTML/CSS prototype functional
- [ ] Accessibility annotations pass self-check (contrast ratios, focus rings, ARIA labels)
- [ ] Lead approval

---

### Sprint 3: Development (Day 3–5) — 2026-06-17 → 2026-06-19
| Day | Agent | Activity | Deliverable | Buffer |
|-----|-------|----------|-------------|--------|
| Wed 06-17 PM | Developer | Repo setup, HTML/CSS scaffold, theme system | GitHub repo initialized | — |
| Thu 06-18 | Developer | Arithmetic engine, display, keyboard events | Core calculator working | 4h buffer |
| Thu 06-18 | Developer | History log, edge case handling | History + error handling | — |
| Fri 06-19 AM | Developer | Responsive layout, accessibility polish | Mobile + desktop ready | 4h buffer |
| Fri 06-19 PM | Developer | Unit tests, README, LICENSE, deploy | Test suite + deploy preview | Gate: all tests pass |

**Sprint 3 Exit Criteria:**
- [ ] All 38 functional requirements implemented
- [ ] All 27 non-functional requirements met (WCAG 2.1 AA, responsive, performance)
- [ ] Unit tests cover 14 edge cases
- [ ] Deploy preview live (GitHub Pages / Vercel / Netlify)
- [ ] README with setup instructions

---

### Sprint 4: Test & Deploy (Day 5–6) — 2026-06-19 → 2026-06-20
| Day | Agent | Activity | Deliverable | Buffer |
|-----|-------|----------|-------------|--------|
| Fri 06-19 PM | PM | Integration test plan; cross-browser checklist | Test plan | — |
| Sat 06-20 AM | PM | Smoke tests (Chrome, Firefox, Safari, mobile) | Test results | 4h buffer |
| Sat 06-20 AM | Developer | Bug fixes from smoke test | Patch release | — |
| Sat 06-20 PM | PM | Final acceptance; handoff documentation | Sign-off + handoff doc | — |
| Sat 06-20 17:00 | Lead | Final review & project closure | Project marked done | Hard deadline |

**Sprint 4 Exit Criteria:**
- [ ] Smoke tests pass on Chrome, Firefox, Safari (latest 2 versions)
- [ ] Mobile responsive verified (iOS Safari, Android Chrome)
- [ ] All 5 lead decisions from Sprint 1 reflected in final build
- [ ] Deploy URL confirmed live and accessible
- [ ] GitHub repo public with LICENSE

---

## 3. Milestone Dates with Buffer

| Milestone | Target Date | Buffer | Risk if Missed |
|-----------|-------------|--------|----------------|
| Requirements locked | 2026-06-15 12:00 UTC | 12h | Delays all downstream work |
| Design approved | 2026-06-17 12:00 UTC | 8h | Cuts dev time to <2 days |
| Dev complete | 2026-06-19 18:00 UTC | 6h | No time for bug fixes |
| Deploy live | 2026-06-20 12:00 UTC | 5h | Misses deadline |
| **Final delivery** | **2026-06-20 17:00 UTC** | — | Hard stop |

**Buffer strategy:** Buffers are placed at the end of each sprint, not distributed. If a sprint finishes early, the next sprint starts early. If a sprint runs over, it consumes buffer first, then escalates to lead.

---

## 4. Risk Register

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|----|------|------------|--------|------------|-------|
| R1 | **Scope creep** — lead adds features mid-sprint | Medium | High | Freeze scope after Sprint 1; change requests require buffer consumption + lead approval | PM |
| R2 | **Browser compatibility** — CSS Grid/flexbox gaps in older Safari | Medium | Medium | Test early (Sprint 3); use autoprefixer; fallback to simpler layout if needed | Developer |
| R3 | **Accessibility audit failure** — WCAG 2.1 AA not met | Low | High | Design annotations in Sprint 2; automated a11y testing (axe-core) in Sprint 3; PM smoke test in Sprint 4 | UI/UX + PM |
| R4 | **BA requirements ambiguity** — 7 open questions now resolved | Resolved | High | All decisions received 2026-06-14; plan updated to v1.1 | PM |
| R5 | **Developer blocked waiting for design** | Medium | High | UI/UX delivers incremental specs (palette + grid first) so dev can scaffold early | PM |
| R6 | **Keyboard event conflicts** — `^` mapped to exponentiation via `Shift+6` | Resolved | Medium | Decision: `Shift+6` = exponent; on-screen `^` button always available | Lead |
| R7 | **Deploy platform failure** — GitHub Pages/Vercel outage | Low | Medium | Have 2 deploy targets ready; verify deploy by 2026-06-20 12:00 | Developer |
| R8 | **Team agent unavailability** — one agent goes offline | Low | High | PM monitors task status daily; if agent offline >12h, reassign to lead or escalate | PM |

---

## 5. Acceptance Criteria per Phase

### Phase 1: Requirements (Sprint 1)
- All 38 functional requirements documented with unique IDs
- All 27 non-functional requirements have measurable thresholds (e.g., "load < 1s on 3G")
- 9 user stories follow "As a [user], I want [feature], so that [benefit]" format
- 14 edge cases have expected behavior + error messages defined
- All 7 lead decisions logged (%, history, ^ mapping, precision, copy-to-clipboard, theme, history panel)

### Phase 2: Design (Sprint 2)
- Color palette has ≥ 8 colors with hex codes + dark/light variants
- Typography scale has ≥ 4 sizes with line heights
- Button grid supports 4×5 layout + adaptive reflow
- Component specs document 5 states per interactive element
- Responsive breakpoints cover mobile (<480px), tablet (480–768px), desktop (>768px)
- Accessibility annotations include: focus ring color/width, ARIA label per button, color contrast ratios ≥ 4.5:1
- HTML/CSS prototype renders correctly in Chrome, Firefox, Safari

### Phase 3: Development (Sprint 3)
- All basic arithmetic operations (+, −, ×, ÷) produce correct results to 10 decimal places
- Advanced operations (%, √, ^, parentheses) follow BA-specified behavior: `50%` = `0.5`, `100+50%` = `150`; `^` uses `Shift+6` keyboard mapping
- History log stores last 50 calculations in localStorage with timestamp; FIFO eviction
- Copy-to-clipboard: one-click copy of current result
- Keyboard support: numpad digits, Enter=equals, Escape=clear, Backspace=delete last, `Shift+6` for exponentiation
- Theme toggle: instant switch via CSS variables + localStorage; respects `prefers-color-scheme`
- History panel: slide-out (desktop), bottom sheet (mobile)
- Accessibility: all buttons have `aria-label`, focus visible, screen-reader announces results
- Unit tests: ≥ 80% coverage of calculation engine; all 14 edge cases have tests
- Zero console errors on load and during normal operation

### Phase 4: Test & Deploy (Sprint 4)
- Smoke tests pass on Chrome 120+, Firefox 120+, Safari 17+ (desktop)
- Smoke tests pass on iOS Safari 17+, Android Chrome 120+ (mobile)
- Lighthouse score: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90
- Deploy URL loads in < 2s on simulated 3G
- GitHub repo has README, LICENSE (MIT), and deploy instructions
- No P0 or P1 bugs open at deadline

---

## 6. Resource Allocation

| Agent | Role | Primary Sprints | Secondary Support | Capacity Notes |
|-------|------|-----------------|-------------------|----------------|
| **PM-Agent** (7037b8a4) | Project Manager | 1, 4 (planning, testing, coordination) | 2, 3 (gate reviews, unblock) | 100% available; monitors all tasks daily |
| **BA-Agent** (a943faf8) | Business Analyst | 1 | 3, 4 (clarify requirements, edge cases) | ~20% after Sprint 1; on-call for questions |
| **UI/UX-Agent** | Designer | 2 | 3 (design QA, polish feedback) | 100% during Sprint 2; ~10% during Sprint 3 |
| **Developer-Agent** | Developer | 3 | 4 (bug fixes) | 100% during Sprint 3; ~50% during Sprint 4 |
| **Lead** (403034c3) | Lead / GitHub Owner | All (decisions, approvals, GitHub) | — | Async reviews; all 7 decisions received 2026-06-14 |

**Daily cadence:** Task comment updates by EOD each day. No synchronous standups required. PM monitors task statuses and pings agents if no update > 12h.

---

## 7. Dependency Chain

```
BA Requirements (DONE) ──→ PM Plan (REVIEW) ──→ UI/UX Design ──→ Developer Build ──→ Test & Deploy
     ↑                        ↑                        ↑                  ↑
     └─ Lead decisions ✅──────┘                        └─ Lead approval ────┘
```

**Critical path:** BA Requirements → PM Plan → UI/UX Design → Developer Build → Test & Deploy
**Float:** BA has 0 float (done). PM plan has 12h buffer. UI/UX has 8h buffer. Developer has 6h buffer. Test has 5h buffer.

---

## 8. Communication Plan

| Channel | Purpose | Cadence | Audience |
|---------|---------|---------|----------|
| Task comments | Progress, evidence, blockers | Per task update | Task owner + PM + lead |
| Project board chat | Decisions, escalations, mentions | As needed | All agents |
| GitHub repo | Code, design assets, docs | Continuous | Developer + lead |

**Escalation rules:**
- Agent blocked > 4h: Comment on task, tag @lead
- Sprint at risk of missing buffer: PM posts to board chat with @lead
- Scope change request: Lead approval required; PM logs decision

---

## 9. Decisions Log (All Resolved)

All 7 open questions from BA requirements v1.0 have been resolved by Lead:

| # | Question | Decision | Impact |
|---|----------|----------|--------|
| 1 | Percentage behavior | `50%` = `0.5`; `100+50%` = `150` | Calc engine implements `%` as percentage-of-previous-value |
| 2 | History persistence | localStorage, 50-entry FIFO | Data survives browser restart; oldest evicted at 51 |
| 3 | Keyboard `^` mapping | `Shift+6` = exponentiation | Avoids conflict with browser find (`Ctrl+F`); on-screen `^` button always available |
| 4 | Scientific notation precision | 10 decimal places | Display rounds to 10 d.p.; internal precision uses JS float64 |
| 5 | Copy-to-clipboard | Yes, include | One-click copy button on result display |
| 6 | Theme system | CSS variables + localStorage, instant switch | No page reload; `prefers-color-scheme` respected on first visit |
| 7 | History panel layout | Slide-out (desktop), bottom sheet (mobile) | UI/UX designs both variants; CSS media query switches |

**Scope freeze:** All decisions are now locked. Any change requires lead approval and buffer consumption.

## 10. Open Items & Next Actions

| Item | Owner | Due | Status |
|------|-------|-----|--------|
| PM plan approval | Lead | 2026-06-15 12:00 | ⏳ In review |
| UI/UX task assignment | Lead | 2026-06-15 | ⏳ Pending |
| GitHub repo creation | Lead | 2026-06-15 | ⏳ Pending |
| UI/UX kickoff | UI/UX | 2026-06-15 PM | ⏳ Awaiting assignment |
| Dev environment prep | Developer | 2026-06-15 | ⏳ Awaiting assignment |

---

## 11. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-06-14 | PM-Agent | Initial plan based on BA requirements v1.0 |
| 1.1 | 2026-06-14 | PM-Agent | All 7 lead decisions integrated; scope locked; risks R4/R6 marked resolved; acceptance criteria updated; open items trimmed |

**Next revision:** After lead approves plan (expected 2026-06-15).
