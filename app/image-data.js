const exactDimensions = {
  "/home-assets/about-img.gif": { width: 1000, height: 667 },
  "/home-assets/logo.png": { width: 2248, height: 1638 },
  "/home-assets/logo-white.png": { width: 2248, height: 1638 },
  "/home-assets/magnoliya-official-logo.png": { width: 4216, height: 806 },
  "/gallery/img-1.jpg": { width: 465, height: 385 },
  "/gallery/img-3.jpg": { width: 465, height: 385 },
};

export function imageDimensions(src) {
  if (!src || typeof src !== "string") return { width: 1600, height: 1067 };
  if (exactDimensions[src]) return exactDimensions[src];
  if (/\/home-assets\/banner-\d+\.jpg$/.test(src)) return { width: 1920, height: 716 };
  if (/\/home-assets\/[^/]+\.jpg$/.test(src)) return { width: 640, height: 720 };
  const galleryMatch = src.match(/\/gallery\/img-(\d+)\.jpg$/);
  if (galleryMatch) {
    const number = Number(galleryMatch[1]);
    if (number >= 13 && number <= 16) return { width: 1500, height: 1125 };
    if (number >= 17) return { width: 1500, height: 1126 };
    return { width: 1000, height: 773 };
  }
  return { width: 1600, height: 1067 };
}
