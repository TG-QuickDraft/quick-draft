import type { CSSProperties } from "react";

export const gerarBannerCliente = (
  nome?: string
): CSSProperties => {
  const valor = nome ?? "cliente";

  const hash = [...valor].reduce(
    (acc, char, index) =>
      acc + char.charCodeAt(0) * (index + 17) * 13,
    0
  );

  const patternSeed = [...valor].reduce(
    (acc, char, index) =>
      acc + char.charCodeAt(0) * (index + 3) * 7,
    0
  );

  const pattern = patternSeed % 4;
  const hue = (hash * 47 + valor.length * 29) % 360;

  const sat1 = 68 + (hash % 10);
  const sat2 = 64 + (hash % 14);

  const light1 = 50 + (hash % 8);
  const light2 = 58 + (hash % 10);

  const offset = 40 + (patternSeed % 80);

  const cor1 = `hsl(${hue}, ${sat1}%, ${light1}%)`;
  const cor2 = `hsl(${(hue + offset) % 360}, ${sat2}%, ${light2}%)`;

  const baseGradient = `
    linear-gradient(
      135deg,
      ${cor1} 0%,
      ${cor2} 100%
    )
  `;

  const patterns = [
    `
    radial-gradient(circle at 18% 30%, rgba(255,255,255,.14) 0 2px, transparent 3px),
    radial-gradient(circle at 72% 65%, rgba(255,255,255,.10) 0 3px, transparent 4px),
    radial-gradient(circle at 88% 22%, rgba(255,255,255,.08) 0 2px, transparent 3px)
    `,

    `
    repeating-linear-gradient(
      135deg,
      rgba(255,255,255,.08) 0px,
      rgba(255,255,255,.08) 8px,
      transparent 8px,
      transparent 22px
    )
    `,

    `
    radial-gradient(circle at 100% 0%, rgba(255,255,255,.14) 0 16%, transparent 17%),
    radial-gradient(circle at 78% 100%, rgba(255,255,255,.10) 0 18%, transparent 19%),
    radial-gradient(circle at 20% 80%, rgba(255,255,255,.08) 0 14%, transparent 15%)
    `,

    `
    radial-gradient(circle at 12% 18%, rgba(255,255,255,.12) 0 2px, transparent 3px),
    radial-gradient(circle at 32% 38%, rgba(255,255,255,.10) 0 2px, transparent 3px),
    radial-gradient(circle at 52% 58%, rgba(255,255,255,.09) 0 2px, transparent 3px),
    radial-gradient(circle at 72% 78%, rgba(255,255,255,.08) 0 2px, transparent 3px)
    `,
  ];

  return {
    backgroundImage: `${patterns[pattern]}, ${baseGradient}`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
};