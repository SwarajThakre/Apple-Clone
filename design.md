# Apple (India) Landing Page — Design System & Documentation

## Overview

A premium, modern landing page clone inspired by Apple's aesthetic, optimized for the Indian market. Features advanced animations, smooth scrolling, WebGL effects, and full SEO optimization.

---

## 1. Design Philosophy

### Core Principles

- **Minimalism**: Clean layouts with ample whitespace
- **Premium Feel**: Dark theme with sophisticated color palette
- **Performance First**: Optimized animations using GSAP and Lenis
- **Accessibility**: WCAG compliant, screen-reader friendly
- **Responsiveness**: Mobile-first approach with fluid layouts
- **Interactivity**: Magnetic hover effects, smooth transitions, WebGL backgrounds

---

## 2. Color Palette

### Primary Colors

| Variable                | Value     | Usage                     |
| ----------------------- | --------- | ------------------------- |
| `--color-bg`            | `#000000` | Main background           |
| `--color-surface-dark`  | `#1d1d1f` | Dark surfaces, navbar     |
| `--color-surface-light` | `#fbfbfd` | Light section backgrounds |
| `--color-surface-gray`  | `#f5f5f7` | Alternative light surface |

### Text Colors

| Variable                 | Value     | Usage                    |
| ------------------------ | --------- | ------------------------ |
| `--color-text-primary`   | `#1d1d1f` | Primary text (dark mode) |
| `--color-text-secondary` | `#86868b` | Secondary/disabled text  |
| `--color-text-light`     | `#f5f5f7` | Text on dark backgrounds |

### Interactive Colors

| Variable             | Value                    | Usage                 |
| -------------------- | ------------------------ | --------------------- |
| `--color-link`       | `#2997ff`                | Links (default state) |
| `--color-link-hover` | `#2dc2ff`                | Links (hover state)   |
| `--color-divider`    | `rgba(255,255,255,0.08)` | Borders & separators  |

### Accent Effects

- **Glow**: `rgba(41, 151, 255, 0.08)` — Blue accent glow
- **Drop Shadow**: `rgba(255, 255, 255, 0.25)` to `0.5)` — Light shadow on dark

---

## 3. Typography

### Font Family

**Primary**: `Inter` (Google Fonts)

- Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- Font Weights: 300, 400, 500, 600, 700, 800, 900

### Font Rendering

- **Font Smoothing**: `-webkit-font-smoothing: antialiased`
- **OSX Font Smoothing**: `-moz-osx-font-smoothing: grayscale`

### Text Styles

| Element            | Size   | Weight | Line Height | Letter Spacing |
| ------------------ | ------ | ------ | ----------- | -------------- |
| Hero Title (h1)    | Large  | 700    | 1.2         | -0.02em        |
| Section Title (h2) | Large  | 600    | 1.3         | -0.015em       |
| Subtitle           | Medium | 500    | 1.43        | -0.01em        |
| Body Text          | 16px   | 400    | 1.6         | Normal         |
| Nav Links          | 13px   | 400    | 48px        | Normal         |
| Small Text         | 14px   | 400    | 1.43        | -0.01em        |

---

## 4. Layout & Structure

### Spacing System

| Variable         | Value | Usage                 |
| ---------------- | ----- | --------------------- |
| `--nav-height`   | 44px  | Navigation bar height |
| `--promo-height` | 44px  | Promo banner height   |
| `--section-gap`  | 12px  | Gap between sections  |
| `--max-width`    | 980px | Max content width     |

### Grid & Layout

- **Container Max Width**: 980px (centered, auto margins)
- **Padding**: 16px horizontal (mobile), 20px+ (desktop)
- **Section Height**: Full viewport height (`100vh`) for hero sections
- **Responsive Breakpoints**: Mobile-first, breakpoints at 768px, 1024px, 1280px

### Navigation Structure

1. **Promo Banner** (44px) — Top promotional message with link
2. **Navbar** (48px, sticky) — Logo, navigation links, action buttons
   - Logo: 22px Apple SVG icon
   - Nav Links: 10 main categories
   - Actions: Search, Shopping bag, Hamburger menu
3. **Main Content**: Sections below navbar

---

## 5. Components

### Navigation Bar

- **Position**: `sticky` (stays at top on scroll)
- **Background**: Semi-transparent dark (`rgba(29, 29, 31, 0.72)`)
- **Backdrop Filter**: `saturate(180%) blur(20px)` (glass-morphism effect)
- **Border**: Bottom divider at `rgba(255,255,255,0.08)`
- **Z-Index**: 1000

#### Logo

- **Hover Effect**: Scale 1.1 + glow drop-shadow
- **Transition**: Smooth spring easing

#### Nav Links

- **Hover Effect**: Color change + underline reveal (60% width, left: 20%)
- **Transition**: Cubic-bezier easing (`var(--ease-out-expo)`)

### Hero Sections

- **Layout**: Full viewport height (`section-full`)
- **Content**: Centered heading, subtitle, CTA buttons
- **Background**: Image overlay with parallax effect (planned)
- **Text**: Large, bold typography with reveal animations

### Product Cards

- **Layout**: Grid layout (3-4 columns responsive)
- **Content**: Image, title, description, price, CTA
- **Hover**: Slight scale, shadow enhancement
- **Border**: Subtle divider between cards

### Buttons

- **Style**: Filled or outline variants
- **Magnetic Effect**: Cursor magnetic hover (draws button toward cursor)
- **Transition**: Smooth color/background changes
- **Focus**: Visible focus state for accessibility

### Loading Screen

- **Position**: Fixed full-screen overlay
- **Background**: Pure black
- **Content**:
  - Apple logo (68px) with breathing animation
  - Loading bar (140px × 4px)
- **Animation Duration**: 0.8s bar fill → 0.5s fade out

---

## 6. Animations & Interactions

### Easing Functions

| Variable          | Curve                               | Usage                   |
| ----------------- | ----------------------------------- | ----------------------- |
| `--ease-apple`    | `cubic-bezier(0.25, 0.1, 0.25, 1)`  | Standard UI transitions |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)`     | Exit animations         |
| `--ease-spring`   | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful, bouncy effects |

### Animation Effects

#### Loading Screen

- **Apple Breathe**: Repeating scale (1 → 1.06) with glow pulse
- **Duration**: 2.4s infinite
- **Glow**: Fade from white to blue on scale peak

#### Navigation

- **Entrance**: Fade + slide-up (Y: -20px, Duration: 0.6s)
- **Link Hover**: Underline reveals from center outward

#### Scroll Animations

- **Reveal-Up**: Elements fade in while sliding up on scroll
- **Parallax**: Background moves slower than foreground
- **Stagger**: Sequential animations for list items

#### Interactive Effects

- **Cursor Glow**: 300px radial gradient follows mouse (opacity toggled on hover)
- **Magnetic Buttons**: Cursor attracts interactive elements on hover
- **3D Tilt**: Card rotation based on mouse position (planned Three.js integration)

#### Text Effects

- **Split Text**: Character-level animations (fade + stagger)
- **Word Wrap**: Line-by-line animations

---

## 7. Advanced Features

### WebGL Canvas

- **Element**: `#webgl-canvas`
- **Position**: Fixed, full viewport
- **Z-Index**: 0 (behind all content)
- **Opacity**: 0.4 (subtle background effect)
- **Pointer Events**: None (doesn't interfere with interactions)
- **Purpose**: Constellation/particle background (Three.js)

### Smooth Scroll Library

- **Library**: Lenis.js
- **Features**:
  - Smooth scroll with momentum
  - Hardware-accelerated
  - Integrates with GSAP ScrollTrigger
  - Prevents scroll on certain elements (`[data-lenis-prevent]`)

### Animation Engine

- **Library**: GSAP (GreenSock Animation Platform)
- **Plugins**: ScrollTrigger, Flip
- **Features**:
  - Preloader animation timeline
  - Scroll-triggered animations
  - Staggered animations
  - Advanced easing

### SEO Optimization

- **Meta Tags**: Complete OG, Twitter, and structured data
- **JSON-LD**: Schema markup for organization, webpage, itemlist
- **Canonical**: Single URL targeting
- **Hreflang**: Language/region targeting (en-IN, x-default)
- **Structured Data**: Product information, business details

---

## 8. Accessibility Features

### Screen Reader Support

- **SR-Only Class**: `.sr-only` for visually hidden but audible text
- **Semantic HTML**: Proper heading hierarchy (h1, h2, h3)
- **ARIA Labels**: All interactive elements labeled
  - `aria-label="Apple"` on logo
  - `aria-label="Search"`, `aria-label="Shopping bag"`, etc.

### Color Contrast

- **Text on Dark**: Light text (`#f5f5f7` on `#000000` or `#1d1d1f`)
- **Text on Light**: Dark text (`#1d1d1f` on `#fbfbfd`)
- **Links**: Blue (`#2997ff`) meets WCAG AA standards

### Focus States

- **Outline**: Visible focus rings on keyboard navigation
- **Color**: Blue or white depending on background

### Motion Sensitivity

- **Prefers-Reduced-Motion**: Animations disabled or simplified for users who prefer reduced motion

---

## 9. Performance Optimizations

### Loading Performance

- **Preconnect**: CDN origins (jsDelivr, Cloudflare)
- **DNS Prefetch**: External resources pre-resolved
- **Lazy Loading**: Images load on-demand
- **Critical CSS**: Inline critical styling

### Rendering Performance

- **Hardware Acceleration**: `will-change: transform` on animated elements
- **Backface Visibility**: Prevent flickering on 3D transforms
- **Contain**: CSS containment for paint optimization

### Asset Optimization

- **SVG Icons**: Scalable, small filesize
- **Image Formats**: WebP with fallbacks
- **Font Loading**: Google Fonts via `display=swap`

### JavaScript Optimization

- **Event Delegation**: Single listeners for multiple elements
- **Debounce/Throttle**: Scroll and resize events
- **Code Splitting**: Lazy load non-critical scripts

---

## 10. Responsive Design

### Breakpoints

| Breakpoint | Width          | Usage               |
| ---------- | -------------- | ------------------- |
| Mobile     | 320px - 767px  | Phone devices       |
| Tablet     | 768px - 1023px | iPad / tablet size  |
| Desktop    | 1024px+        | Desktop monitors    |
| Wide       | 1280px+        | Ultra-wide displays |

### Mobile Optimizations

- **Touch Targets**: Minimum 44px × 44px for interactive elements
- **Simplified Navigation**: Hamburger menu for mobile
- **Reduced Animations**: Some animations simplified on mobile
- **Font Scaling**: Adjust based on viewport
- **Layout**: Stack sections vertically

### Tablet & Desktop

- **Multi-Column Layouts**: Products in grid (2-4 columns)
- **Wider Spacing**: Larger gaps and padding
- **Hover Effects**: Full interactive hover states available

---

## 11. File Structure

```
Apple clone/
├── index.html          # Main HTML structure
├── style.css           # Complete styling & design system
├── script.js           # Animations, interactivity, logic
├── design.md           # This file — design documentation
└── images/             # Product images & assets
    ├── hero_macbook_air_m5__eb1idggd120y_largetall_2x.jpg
    ├── apple-logo-svgrepo-com.svg
    └── [other product images]
```

---

## 12. Sections Overview

### 1. MacBook Air (Light Section)

- Hero image of MacBook Air M5
- Title: "MacBook Air"
- Subtitle: "Now supercharged by M5."
- CTA buttons: Explore, Learn more, Buy

### 2. iPhone Section

- Hero image of latest iPhone lineup
- Product details & features
- Pricing & offers

### 3. iPad Air (M4)

- Medium-sized section with product showcase
- Specs highlighting

### 4. MacBook Pro

- M5, M5 Pro, M5 Max variants
- Performance comparison

### 5. Apple Watch Series 11

- Health & fitness features
- Design variants

### 6. iPad Pro

- AI capabilities highlight
- Productivity features

### 7. AirPods Pro 3

- Audio quality & ANC features
- Product imagery

### 8. Apple Trade-In

- Upgrade incentive section
- Trade-in process explanation

### 9. Footer

- Links by category
- Company information
- Legal links
- Social media

---

## 13. Browser Support

| Browser       | Min Version | Status          |
| ------------- | ----------- | --------------- |
| Chrome        | 90+         | ✅ Full support |
| Firefox       | 88+         | ✅ Full support |
| Safari        | 14+         | ✅ Full support |
| Edge          | 90+         | ✅ Full support |
| Mobile Safari | 14+         | ✅ Full support |
| Chrome Mobile | 90+         | ✅ Full support |

---

## 14. Future Enhancements

- [ ] Three.js WebGL constellation background
- [ ] 3D product tilt on mouse move
- [ ] Video hero sections with autoplay
- [ ] Interactive product configurator
- [ ] Real-time pricing & EMI calculator
- [ ] Live chat / support widget
- [ ] Newsletter signup modal
- [ ] Testimonials/reviews carousel
- [ ] Blog integration
- [ ] Analytics tracking (GA4, hotjar)

---

## 15. Key Libraries & Dependencies

| Library              | Version  | Purpose                        |
| -------------------- | -------- | ------------------------------ |
| GSAP                 | 3.12+    | Advanced animations & timeline |
| Lenis                | Latest   | Smooth scroll library          |
| Three.js             | 3.0+     | WebGL/3D graphics              |
| Google Fonts (Inter) | Current  | Typography                     |
| SVG Icons            | Embedded | Navigation & action icons      |

---

## 16. Maintenance Notes

### Common Tasks

- **Update Colors**: Modify CSS variables in `:root` selector
- **Add Section**: Create new `<section>` with class `section` + unique ID
- **Edit Typography**: Update font sizes/weights in specific selectors
- **Adjust Animations**: Modify GSAP timelines in script.js

### Performance Audits

- Run Lighthouse checks monthly
- Monitor Core Web Vitals (LCP, FID, CLS)
- Check for console errors in DevTools
- Test on real devices (iOS, Android, various browsers)

### SEO Maintenance

- Update meta descriptions quarterly
- Refresh OpenGraph images before major campaigns
- Monitor search console for issues
- Update structured data with new products

---

_Last Updated: August 2026_
_Design System Version: 1.0_
