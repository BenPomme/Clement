---
name: La Cuisine de Clément
description: Batch cooking à domicile à Mulhouse; the week's meals laid out on Alsatian kelsch linen.
colors:
  kelsch: "#22408f"
  kelsch-deep: "#162c66"
  kelsch-night: "#0e1d47"
  kelsch-mist: "#c9d3ee"
  linen: "#f2f3ef"
  linen-shade: "#e3e6df"
  linen-line: "#c9cec4"
  ink: "#101a36"
  ink-soft: "#3a4562"
  madder: "#b0281f"
  madder-deep: "#8e1d16"
  tape: "#ece3c4"
  marker: "#1d1d22"
  whatsapp-green: "#1e7a46"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "clamp(3rem, 1.6rem + 5.4vw, 5.4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 87, 'opsz' 96"
  headline:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "clamp(2.1rem, 1.4rem + 3vw, 3.75rem)"
    fontWeight: 750
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 88"
  title:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "clamp(1.35rem, 1.1rem + 1vw, 1.75rem)"
    fontWeight: 750
    lineHeight: 1.02
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 92"
  body:
    fontFamily: "Atkinson Hyperlegible Next Variable, sans-serif"
    fontSize: "clamp(1.0625rem, 0.98rem + 0.3vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  label-tape:
    fontFamily: "Shantell Sans Variable, cursive"
    fontSize: "0.98rem"
    fontWeight: 560
    lineHeight: 1.2
rounded:
  sm: "0.3rem"
  md: "0.35rem"
  sheet: "0.4rem"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  section: "clamp(4.5rem, 3rem + 6vw, 8.5rem)"
  max: "76rem"
components:
  button-primary:
    backgroundColor: "{colors.madder}"
    textColor: "{colors.linen}"
    rounded: "{rounded.md}"
    padding: "0.85rem 1.5rem"
    height: "3.4rem"
  button-primary-hover:
    backgroundColor: "{colors.madder-deep}"
  button-quiet:
    textColor: "{colors.linen}"
    rounded: "{rounded.md}"
    padding: "0.55rem 1rem"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp-green}"
    textColor: "{colors.linen}"
    rounded: "{rounded.md}"
  tape-label:
    backgroundColor: "{colors.tape}"
    textColor: "{colors.marker}"
    typography: "{typography.label-tape}"
    padding: "0.4rem 0.85rem"
  segmented-option:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "3.2rem"
  segmented-option-selected:
    backgroundColor: "{colors.kelsch}"
    textColor: "#ffffff"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.7rem 0.9rem"
    height: "3.2rem"
  chip:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "2.75rem"
  chip-selected:
    backgroundColor: "{colors.kelsch}"
    textColor: "#ffffff"
---

# Design System: La Cuisine de Clément

## Overview

**Creative North Star: "La semaine sur la nappe"**

The whole site is a kitchen table covered with an Alsatian kelsch cloth, the blue-and-white woven linen found in every Haut-Rhin family home. The week's meals are laid on it as real plates, cut out of Clément's own photos, and each one is named with a strip of masking tape written in marker, the way batch-cooked boxes are labelled in a fridge. Between the cloth fields the page rests on plain cool linen, where prices, steps and answers are set in calm, very legible type.

The voice is local and practical: Alsatian textile instead of stock "chef" imagery, honest figures before and after the tax credit, and large type for older readers and their families. Rejected explicitly: the category default of a smiling stock chef on a cream page with three icon cards, and anything that looks AI-generated.

**Key Characteristics:**
- Full-bleed kelsch weave (CSS-woven, with darker crossing squares and fibre noise) carries the hero, the dish gallery and the quote section.
- Real dishes as cut-out plates with soft drop shadows. Never boxed into cards.
- Masking-tape labels in Shantell Sans, the only handwritten voice.
- Cool linen white for reading sections; a dark "kelsch night" footer.
- One madder-red action per viewport.

## Colors

A committed two-tone world, kelsch blue and linen, with madder red held back for the action.

### Primary
- **Kelsch Blue** (#22408f): the woven ground of cloth sections, selected states, price figures, links on linen, the regular-sessions panel.
- **Kelsch Deep** (#162c66): the darker weave crossings and hover states for blue controls.

### Secondary
- **Madder Red** (#b0281f): the primary action button, the "Jour J" dot, the "50 %" figure, focus rings, the text caret. **Madder Deep** (#8e1d16) is its hover.

### Neutral
- **Cool Linen** (#f2f3ef): page ground and the sheets laid on cloth (semainier, quote form).
- **Linen Shade** (#e3e6df): the quiet alternate ground (chef section, info boxes, empty days).
- **Linen Line** (#c9cec4): hairlines, input strokes, table rules.
- **Ink** (#101a36) / **Ink Soft** (#3a4562): text on linen; secondary text is tinted blue-grey, never neutral grey.
- **Kelsch Mist** (#c9d3ee): secondary text on blue and night grounds.
- **Kelsch Night** (#0e1d47): footer.
- **Tape** (#ece3c4) with **Marker** (#1d1d22): label strips and filled semainier days.

### Named Rules
**The One Thread Rule.** Madder appears once per viewport, on the action. Seams, outlines and secondary buttons stay kelsch blue or linen.

**The Cloth Carries, Never Decorates Rule.** Kelsch fills whole regions (hero, food, quote). It is never shrunk to an accent stripe, border or icon background.

## Typography

**Display Font:** Bricolage Grotesque Variable (narrowed with the `wdth` axis, `opsz` 96 for the hero)
**Body Font:** Atkinson Hyperlegible Next Variable
**Label Font:** Shantell Sans Variable (tape labels only)

**Character:** A compact, sign-painter grotesque for headlines over a typeface designed for low-vision readers, so the page stays readable for seniors and tired parents alike. The marker hand is used only where a person would actually write: on tape.

### Hierarchy
- **Display** (800, clamp(3rem → 5.4rem), 0.95): hero h1 only. wdth 87, −0.02em.
- **Headline** (750, clamp(2.1rem → 3.75rem), 1.02): section h2. wdth 88.
- **Title** (750, clamp(1.35rem → 1.75rem)): h3, form legends, formula names in the price table.
- **Body** (400, 17–19px, 1.6): copy; measure capped at about 62–68ch.
- **Tape label** (560, ~0.98rem): dish names, day + dish + portions, timeline timings.

### Named Rules
**The Written-Only-On-Tape Rule.** Shantell Sans never sets a heading, a kicker or body text. If text isn't on a strip of tape or a semainier day, it isn't handwritten.

## Layout

Centred container of 76rem with a fluid gutter (1rem–3rem); sections breathe at clamp(4.5rem → 8.5rem) vertically. Two consecutive linen sections drop the second's top padding. The desktop hero is two columns (copy | plates) with the semainier sheet spanning the full width beneath, pulled up by −2rem over the cloth. The dish gallery is a 12-column grid with uneven spans and vertical offsets, so plates look set down by hand. At ≤40rem: hero plates shrink to two, a "Dès 72 € …" line sits under the subhead, the semainier day strip turns into a vertical list, and a sticky bottom action bar appears once the hero leaves the screen (hidden while the quote form is visible). Breakpoints in use: 34rem, 40rem, 54rem, 62rem.

## Elevation & Depth

Depth is physical: objects lying on cloth. Plates use stacked `drop-shadow` filters that follow the cut-out alpha. Sheets of linen on cloth (semainier, form) cast one long soft shadow. Tape has a small two-layer shadow. Nothing floats or glows.

### Shadow Vocabulary
- **Plate on cloth** (`filter: drop-shadow(0 18px 18px rgb(6 14 40 / .45)) drop-shadow(0 3px 4px rgb(6 14 40 / .35))`)
- **Sheet on cloth** (`box-shadow: 0 30px 60px -30px rgb(4 10 32 / .7)`)
- **Tape** (`box-shadow: 0 1px 2px rgb(0 0 0 / .18), 0 4px 10px -6px rgb(0 0 0 / .35)`)
- **Primary button** (`box-shadow: 0 1px 0 rgb(255 255 255 / .18) inset, 0 6px 16px -6px rgb(60 10 6 / .55)`)

## Shapes

Small, practical radii (0.3–0.4rem) on buttons, inputs and sheets; pills only for preference chips and town tags. Plates keep their real photographed contours: no circles or masks standing in for them. Tape labels are rectangles, slightly rotated (±1–3°).

## Components

### Buttons
- **Primary:** madder, 3.4rem tall, Bricolage 700, a trailing arrow icon. Hover lifts 1px and deepens. One per viewport.
- **Quiet:** transparent with a 2px currentColor outline. Used for the header "Mon devis" and secondary actions.
- **WhatsApp:** deep green with the authored WhatsApp glyph. Only rendered when a number is configured.

### Semainier (signature)
A linen sheet with household-size and formula segmented controls, an optional "courses" checkbox, a Mon→Sun strip where filled days become tape-coloured cells naming a dish, a live summary, and the price after tax credit (large, kelsch blue) over the price before. Changes re-drop the filled days in sequence (`drop` keyframes, 55ms stagger, ease-out). It pre-fills the quote form.

### Tape label
Masking-tape strip, marker hand, `day · dish` grammar, absolutely placed on a plate or on the timeline rule.

### Inputs / Chips
White fields with a 1.5px linen-line inset stroke. Focus becomes a 2.5px kelsch inset; errors a 2.5px madder inset plus a sentence naming the problem and the fix. Preference chips are pills that turn kelsch when selected.

### Navigation
Transparent over the cloth hero (white text), linen bar on prose pages. Text links collapse under 54rem, leaving brand + quiet button.

## Do's and Don'ts

### Do:
- **Do** lay real dish cut-outs directly on kelsch fields with the plate drop-shadow.
- **Do** name every plate with a tape label in `Jour · Plat` form.
- **Do** show prices both before and after the 50 % credit, with "sous réserve" until the SAP number exists.
- **Do** keep body text in Atkinson Hyperlegible at ≥17px and tap targets ≥44px.

### Don't:
- **Don't** put dishes in equal-sized cards or icon-heading-text card grids.
- **Don't** use Shantell Sans outside tape labels and semainier days.
- **Don't** use madder for seams, outlines or more than one element per viewport.
- **Don't** render the check as a dense tartan: keep two white threads per 136px repeat at ~10% opacity.
- **Don't** use stock chef photography or invented testimonials.
