# Provenance — dish images

All files in this folder are derived from Clément Bahr's own phone photos (originals in `/source-photos/1.jpg`–`12.jpg`, sent 15/11/2026).
Processing (no generative imagery): subject cut-out with Apple Vision `VNGenerateForegroundInstanceMaskRequest`
(macOS, on-device), then autocontrast (0.6% cutoff on opaque pixels), +10% saturation, +4% contrast, light sharpening,
slight cast correction on 1/8/12, alpha edge softened 0.8px. Mapping: 1 mille-feuille mangue · 2 crumbles · 3 saumon
œuf poché · 4 mont-blanc · 5 chili riz · 6 beignets · 7 poke bowl · 8 poisson petits pois (cropped) · 9 carpaccio ·
10 chocolat griottes (cropped) · 11 burrata légumes · 12 entremets fruits rouges.

`src/assets/photos/plateau-crumbles.jpg`: Clément's photo 2.jpg, cropped (top 250px removed), autocontrast 0.5%, +8% saturation, light sharpening.
- carte/chili-con-carne.png: copy of chili-riz.png (Clément's own photo), used as the hover photo on the map.

## AI-generated illustrations (`carte/*.ai.png`)

The 12 `carte/<dish>.ai.png` files are **AI-generated**, not Clément's cooking: made on 16/11/2026 with
`google/gemini-3.1-flash-image` via OpenRouter (one prompt per dish: dish description + "realistic smartphone food
photo, 45° angle, dark ceramic bowl, plain background, no text/props"), then cut out with Apple Vision, resized to
≤900px, alpha edge softened 0.8px, light unsharp mask. The site labels each one "Photo d'illustration" on hover.
Replace any of them with a real photo named `carte/<dish>.png`; the real photo wins automatically.

- 16/11/2026: lasagnes, pates-bolognaise, pates-carbonara, pates-alfredo, quiches (`*.ai.png`) generated with
  black-forest-labs/flux.2-klein-4b via OpenRouter (~$0.014 each), cut out by background colour + Apple Vision mask.
  Shown with the "Photo d'illustration" label until Clément sends real photos.

## Photos of Clément (src/assets/photos/clement-*.jpg)

Clément's own photos (WhatsApp, 16/11/2026), retouched with bytedance-seed/seedream-5-0-flash via
OpenRouter: neutral light, tidier background, apron with his name embroidered. Face, body and pose
are unchanged. Originals stay in source-photos/ (not published). To be validated by Clément.
