# Vibe Code Design System

A comprehensive design system based on your current website design patterns. This system ensures consistency, reusability, and maintainability across your entire application.

## 🎨 Design Tokens

### Colors
```tsx
import { designTokens } from '@/components/ui/design-system';

// Primary blue scale (your main brand color)
designTokens.colors.primary[600] // #2563eb - Main blue
designTokens.colors.primary[700] // #1d4ed8 - Darker blue
designTokens.colors.primary[50]  // #eff6ff - Light blue background

// Gray scale
designTokens.colors.gray[900] // #111827 - Dark text
designTokens.colors.gray[600] // #4b5563 - Muted text
```

### Typography
```tsx
// Responsive typography classes
designTokens.typography.hero  // Hero headlines (3xl → 7xl)
designTokens.typography.h1    // Section headlines (2xl → 5xl)
designTokens.typography.h2    // Subsection headlines (xl → 3xl)
designTokens.typography.body  // Body text (base → lg)
```

### Spacing
```tsx
designTokens.spacing.section     // py-16 px-4 (standard section padding)
designTokens.spacing.container   // max-w-4xl mx-auto (standard container)
designTokens.spacing.containerWide // max-w-6xl mx-auto (wide container)
```

## 🧱 Layout Components

### Section
Standard section wrapper with consistent padding and background options.

```tsx
import { Section, Container } from '@/components/ui/design-system';

<Section background="white" id="features" ariaLabel="Features section">
  <Container>
    {/* Your content */}
  </Container>
</Section>

<Section background="black">
  <Container>
    {/* Dark section content */}
  </Container>
</Section>

<Section background="blue">
  <Container>
    {/* Blue gradient section (like hero/CTA) */}
  </Container>
</Section>
```

### Container
Responsive container with consistent max-width and centering.

```tsx
<Container size="default">  {/* max-w-4xl */}
<Container size="wide">     {/* max-w-6xl */}
```

## 📝 Typography Components

### Heading
Responsive headings with consistent sizing and colors.

```tsx
import { Heading } from '@/components/ui/design-system';

<Heading level="hero" color="white" id="main-title">
  Clone $10M Apps in 21 Days
</Heading>

<Heading level="h1" color="default">
  Section Title
</Heading>

<Heading level="h2" color="blue">
  Subsection Title
</Heading>
```

### Text
Body text with consistent styling and color variants.

```tsx
import { Text } from '@/components/ui/design-system';

<Text variant="body" color="default">
  Main body text content
</Text>

<Text variant="body" color="muted">
  Secondary text content
</Text>

<Text variant="small" color="blue">
  Small blue text
</Text>
```

## 🔘 Button Components

### Button
Consistent button styling with multiple variants and responsive behavior.

```tsx
import { Button } from '@/components/ui/design-system';

{/* Primary CTA button */}
<Button 
  variant="primary" 
  size="lg" 
  fullWidth 
  href="/signup"
  ariaLabel="Join Clone Accelerator course"
>
  🔥 Join Clone Accelerator →
</Button>

{/* Secondary button */}
<Button 
  variant="secondary" 
  size="md"
  onClick={handleClick}
>
  Learn More
</Button>

{/* White button (for dark backgrounds) */}
<Button 
  variant="white" 
  size="lg"
  fullWidth
>
  Get Started
</Button>
```

**Button Props:**
- `variant`: `'primary' | 'secondary' | 'white'`
- `size`: `'sm' | 'md' | 'lg'`
- `fullWidth`: `boolean` (full-width on mobile, auto on desktop)
- `href`: `string` (renders as link)
- `onClick`: `() => void` (renders as button)
- `disabled`: `boolean`
- `ariaLabel`: `string`

## 🏷️ Badge Components

### Badge
Step indicators and status badges.

```tsx
import { Badge, StepBadge } from '@/components/ui/design-system';

{/* Basic badge */}
<Badge variant="blue">
  New Feature
</Badge>

{/* Step badge (for section numbering) */}
<StepBadge 
  step="01" 
  title="The Brutal Truth" 
  variant="blue" 
/>

<StepBadge 
  step="02" 
  title="The Clone Advantage" 
  variant="dark" 
/>
```

## 🃏 Card Component

### Card
Content containers with consistent styling.

```tsx
import { Card } from '@/components/ui/design-system';

<Card hover padding="md">
  <Heading level="h3">Card Title</Heading>
  <Text variant="body" color="muted">
    Card content goes here
  </Text>
</Card>
```

## 🎬 Animation Components

### Animated
Consistent animations using Framer Motion.

```tsx
import { Animated } from '@/components/ui/design-system';

<Animated animation="fadeInUp" delay={0.2}>
  <Heading level="h1">Animated Title</Heading>
</Animated>

<Animated animation="stagger">
  {items.map((item, i) => (
    <div key={i}>{item}</div>
  ))}
</Animated>
```

## 📋 List Component

### List
Consistent list styling with icons.

```tsx
import { List } from '@/components/ui/design-system';

const features = [
  "Proven product-market fit",
  "Known pricing models", 
  "Battle-tested user flows",
  "Validated demand"
];

<List 
  items={features} 
  variant="bullet" 
  color="blue" 
/>

const benefits = [
  "97% completion rate",
  "Money-back guarantee",
  "Live peer sessions"
];

<List 
  items={benefits} 
  variant="check" 
  color="green" 
/>
```

## ✨ Highlight Component

### Highlight
Inline text highlighting.

```tsx
import { Highlight } from '@/components/ui/design-system';

<Text variant="body">
  The course starts on <Highlight variant="blue">July 11, PST 10 AM</Highlight>
</Text>

<Highlight variant="blue">Ships Friday: Live landing page</Highlight>
```

## 🎯 Complete Example

Here's how to build a section using the design system:

```tsx
import { 
  Section, 
  Container, 
  Heading, 
  Text, 
  Button, 
  StepBadge, 
  List, 
  Animated 
} from '@/components/ui/design-system';

export function FeatureSection() {
  const features = [
    "Proven product-market fit — validated for millions",
    "Known pricing models — tested and optimized", 
    "Battle-tested user flows — years of optimization"
  ];

  return (
    <Section background="white" id="features" ariaLabel="Features section">
      <Container>
        <Animated animation="fadeInUp">
          <div className="flex justify-start mb-8">
            <StepBadge step="02" title="The Features" variant="blue" />
          </div>
        </Animated>

        <Animated animation="fadeInUp" delay={0.1}>
          <Heading level="h1" color="default" className="mb-6">
            Why choose our approach?
          </Heading>
        </Animated>

        <Animated animation="fadeInUp" delay={0.2}>
          <Text variant="body" color="muted" className="mb-8 max-w-3xl">
            When you follow proven patterns, you get proven results.
          </Text>
        </Animated>

        <Animated animation="fadeInUp" delay={0.3}>
          <List items={features} variant="bullet" color="blue" className="mb-8" />
        </Animated>

        <Animated animation="fadeInUp" delay={0.4}>
          <Button 
            variant="primary" 
            size="md" 
            fullWidth
            href="/signup"
            ariaLabel="Get started with our approach"
          >
            Get Started →
          </Button>
        </Animated>
      </Container>
    </Section>
  );
}
```

## 🎨 Design Principles

### 1. **Consistent Spacing**
- All sections use `py-16 px-4`
- Containers are `max-w-4xl` (default) or `max-w-6xl` (wide)
- Consistent gaps: `gap-4`, `gap-6`, `gap-8`, `gap-12`

### 2. **Responsive Typography**
- Mobile-first approach with responsive scaling
- Consistent line heights and font weights
- Proper heading hierarchy

### 3. **Rectangular Design**
- `rounded-md` for small elements (badges, highlights)
- `rounded-lg` for medium elements (buttons, cards, images)
- No circular designs (`rounded-full`)

### 4. **Color System**
- Blue as primary brand color (`blue-600`, `blue-700`)
- Gray scale for text hierarchy
- White/black for backgrounds
- Consistent color usage across components

### 5. **Mobile-First Buttons**
- Full-width on mobile (`w-full md:w-auto`)
- Proper touch targets
- Consistent hover and focus states

### 6. **Accessibility**
- Proper ARIA labels
- Semantic HTML structure
- Focus management
- Screen reader support

## 🚀 Usage Tips

1. **Always use the design system components** instead of writing custom styles
2. **Stick to the defined color palette** for consistency
3. **Use the responsive typography classes** for proper scaling
4. **Apply animations consistently** with the Animated component
5. **Follow the spacing system** for visual rhythm
6. **Test on mobile first** to ensure responsive behavior

This design system ensures your entire application maintains the same high-quality, consistent design as your current homepage! 🎉 