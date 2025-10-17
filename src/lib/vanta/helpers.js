// vanta/helpers.js

// Deep merge for options
export function extendDefaults(defaults, user) {
  const result = { ...defaults };
  for (let key in user) {
    if (user[key] !== undefined) {
      result[key] = user[key];
    }
  }
  return result;
}

// Detect mobile for performance
export function mobileCheck() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

export function hexToRgb(hex) {
  const r = (hex >> 16) & 255;
  const g = (hex >> 8) & 255;
  const b = hex & 255;
  return [r, g, b];
}

export const color2Hex = hexToRgb;
