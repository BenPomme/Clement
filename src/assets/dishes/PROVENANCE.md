# Provenance — dish images

All files in this folder are derived from Clément Bahr's own phone photos (originals in `/source-photos/1.jpg`–`12.jpg`, sent 15/11/2026).
Processing (no generative imagery): subject cut-out with Apple Vision `VNGenerateForegroundInstanceMaskRequest`
(macOS, on-device), then autocontrast (0.6% cutoff on opaque pixels), +10% saturation, +4% contrast, light sharpening,
slight cast correction on 1/8/12, alpha edge softened 0.8px. Mapping: 1 mille-feuille mangue · 2 crumbles · 3 saumon
œuf poché · 4 mont-blanc · 5 chili riz · 6 beignets · 7 poke bowl · 8 poisson petits pois (cropped) · 9 carpaccio ·
10 chocolat griottes (cropped) · 11 burrata légumes · 12 entremets fruits rouges.

`src/assets/photos/plateau-crumbles.jpg`: Clément's photo 2.jpg, cropped (top 250px removed), autocontrast 0.5%, +8% saturation, light sharpening.
- carte/chili-con-carne.png: copy of chili-riz.png (Clément's own photo), used as the hover photo on the map.
