import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, '..', 'static', 'images', 'icons');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// 1. Stop Cockroach (Дезінсекція)
const stopCockroachSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" width="48" height="48">
  <circle cx="24" cy="24" r="22" fill="rgba(239, 68, 68, 0.12)" stroke="#ef4444" stroke-width="1.2" stroke-opacity="0.4"/>
  <!-- Cockroach silhouette -->
  <g fill="#cbd5e1">
    <!-- Antennae -->
    <path d="M22 13 C20 9, 14 7, 10 6" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <path d="M26 13 C28 9, 34 7, 38 6" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <!-- Head -->
    <ellipse cx="24" cy="14.5" rx="3" ry="2.5"/>
    <!-- Thorax -->
    <ellipse cx="24" cy="19.5" rx="4.5" ry="3"/>
    <!-- Abdomen -->
    <ellipse cx="24" cy="28" rx="6" ry="8.5"/>
    <!-- Legs Left -->
    <path d="M20 17 L12 14 M20 20 L10 21 M20 25 L11 29" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <!-- Legs Right -->
    <path d="M28 17 L36 14 M28 20 L38 21 M28 25 L37 29" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <!-- Cerci -->
    <path d="M22 36 L19 40 M26 36 L29 40" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  </g>
  <!-- Red Stop Slash Ring -->
  <circle cx="24" cy="24" r="18" stroke="#ef4444" stroke-width="3.2" fill="none"/>
  <line x1="11.3" y1="11.3" x2="36.7" y2="36.7" stroke="#ef4444" stroke-width="3.2" stroke-linecap="round"/>
</svg>`;

// 2. Stop Rodent (Дератизація)
const stopRodentSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" width="48" height="48">
  <circle cx="24" cy="24" r="22" fill="rgba(239, 68, 68, 0.12)" stroke="#ef4444" stroke-width="1.2" stroke-opacity="0.4"/>
  <!-- Rat / Mouse silhouette -->
  <g fill="#cbd5e1">
    <!-- Body -->
    <path d="M13 29 C13 22, 19 18, 25 18 C31 18, 35 22, 35 27 C35 31, 31 33, 24 33 C18 33, 13 32, 13 29 Z"/>
    <!-- Head & Nose -->
    <path d="M17 25 C14 24, 9 24, 7 26 C9 28, 14 29, 17 28 Z"/>
    <!-- Ear -->
    <circle cx="19" cy="20" r="3.5"/>
    <!-- Paws -->
    <path d="M16 32 L15 35 M22 33 L22 36 M30 32 L31 35" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round"/>
    <!-- Long Tail -->
    <path d="M35 28 C39 28, 42 24, 41 18 C40.5 15, 37 13, 35 15" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    <!-- Whiskers -->
    <path d="M9 25 L5 23 M9 26 L4 26 M9 27 L5 29" stroke="#cbd5e1" stroke-width="1" stroke-linecap="round"/>
  </g>
  <!-- Red Stop Slash Ring -->
  <circle cx="24" cy="24" r="18" stroke="#ef4444" stroke-width="3.2" fill="none"/>
  <line x1="11.3" y1="11.3" x2="36.7" y2="36.7" stroke="#ef4444" stroke-width="3.2" stroke-linecap="round"/>
</svg>`;

// 3. Disinfection Shield (Дезінфекція)
const disinfectionShieldSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" width="48" height="48">
  <circle cx="24" cy="24" r="22" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" stroke-width="1.2" stroke-opacity="0.4"/>
  <!-- Shield outline -->
  <path d="M24 6 L38 12 V23 C38 31.5 32 38.5 24 41 C16 38.5 10 31.5 10 23 V12 L24 6 Z" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2.5" stroke-linejoin="round"/>
  <!-- Medical Sanitize Cross with Central Droplet -->
  <path d="M24 14 V32 M15 23 H33" stroke="#34d399" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="24" cy="23" r="3.5" fill="#ffffff"/>
  <!-- Clean spark stars -->
  <path d="M34 11 L35 8 L36 11 L39 12 L36 13 L35 16 L34 13 L31 12 Z" fill="#6ee7b7"/>
  <path d="M13 32 L14 30 L15 32 L17 33 L15 34 L14 36 L13 34 L11 33 Z" fill="#6ee7b7"/>
</svg>`;

// 4. Ozone Molecule O3 (Озонування)
const ozoneMoleculeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" width="48" height="48">
  <circle cx="24" cy="24" r="22" fill="rgba(128, 82, 255, 0.12)" stroke="#8052ff" stroke-width="1.2" stroke-opacity="0.4"/>
  <!-- Active ionization orbital ring -->
  <ellipse cx="24" cy="24" rx="17" ry="9" stroke="#8052ff" stroke-width="1.5" stroke-dasharray="3 3" transform="rotate(-25 24 24)"/>
  <!-- Molecular Bonds -->
  <line x1="21" y1="16" x2="17" y2="25" stroke="#c084fc" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="27" y1="16" x2="31" y2="25" stroke="#c084fc" stroke-width="2.2" stroke-linecap="round"/>
  <!-- 3 Oxygen Atoms (O3 Triatomic) -->
  <circle cx="24" cy="12" r="5.5" fill="#8052ff" stroke="#c084fc" stroke-width="1.5"/>
  <circle cx="14" cy="28" r="5.5" fill="#8052ff" stroke="#c084fc" stroke-width="1.5"/>
  <circle cx="34" cy="28" r="5.5" fill="#8052ff" stroke="#c084fc" stroke-width="1.5"/>
  <circle cx="24" cy="12" r="2" fill="#ffffff"/>
  <circle cx="14" cy="28" r="2" fill="#ffffff"/>
  <circle cx="34" cy="28" r="2" fill="#ffffff"/>
  <!-- O3 Badge Label -->
  <text x="24" y="41" text-anchor="middle" fill="#c084fc" font-family="system-ui, sans-serif" font-weight="800" font-size="9" letter-spacing="0.05em">O₃ GAS</text>
</svg>`;

// 5. Pest Control HACCP (Пест-контроль)
const pestHaccpSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" width="48" height="48">
  <circle cx="24" cy="24" r="22" fill="rgba(245, 158, 11, 0.12)" stroke="#f59e0b" stroke-width="1.2" stroke-opacity="0.4"/>
  <!-- Clipboard / Document -->
  <rect x="11" y="10" width="26" height="29" rx="3" fill="rgba(245, 158, 11, 0.16)" stroke="#f59e0b" stroke-width="2"/>
  <!-- Clipboard top clamp -->
  <rect x="18" y="7" width="12" height="5" rx="2" fill="#f59e0b"/>
  <!-- Check lines -->
  <line x1="22" y1="18" x2="32" y2="18" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
  <line x1="22" y1="24" x2="32" y2="24" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
  <line x1="22" y1="30" x2="28" y2="30" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
  <!-- Green Checkmarks -->
  <path d="M15 17 L17 19 L20 16" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 23 L17 25 L20 22" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 29 L17 31 L20 28" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- HACCP Stamp Badge -->
  <rect x="25" y="27" width="17" height="13" rx="3" fill="#f59e0b"/>
  <text x="33.5" y="36.5" text-anchor="middle" fill="#000000" font-family="system-ui, sans-serif" font-weight="900" font-size="6.5" letter-spacing="0.02em">HACCP</text>
</svg>`;

fs.writeFileSync(path.join(dir, 'stop-cockroach.svg'), stopCockroachSvg);
fs.writeFileSync(path.join(dir, 'stop-rodent.svg'), stopRodentSvg);
fs.writeFileSync(path.join(dir, 'disinfection-shield.svg'), disinfectionShieldSvg);
fs.writeFileSync(path.join(dir, 'ozone-molecule.svg'), ozoneMoleculeSvg);
fs.writeFileSync(path.join(dir, 'pest-haccp.svg'), pestHaccpSvg);

console.log('Successfully written 5 SVG service icons to static/images/icons/');
