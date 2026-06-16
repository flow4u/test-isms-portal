// @ts-check
import { themes as githubThemes } from 'prism-react-renderer';

// ─── CENTRALIZED COMPLIANCE CONFIGURATION VARIABLES ───
// Change these two values to re-route your entire portal architecture automatically!
const GITHUB_ORG = 'flow4u';
const GITHUB_REPO = 'test-isms-portal';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Compliance Vault',
  tagline: 'Docs-as-Code ISMS Portal',
  favicon: 'img/favicon.ico',

  // Dynamic Routing Engines
  url: `https://${GITHUB_ORG}.github.io`,
  baseUrl: `/${GITHUB_REPO}/`,
  organizationName: GITHUB_ORG,
  projectName: GITHUB_REPO,

  // --- AUTOMATED AUDIT TRAIL GUARDRAILS ---
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',
  
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Dynamically constructs your visual "Edit this page" link
          editUrl: `https://github.com/` + GITHUB_ORG + `/` + GITHUB_REPO + `/edit/main/`,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false, 
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: ['docusaurus-lunr-search'],

  // ... keep the rest of your file's existing themeConfig/prism values below unchanged