// @ts-check
import { themes as githubThemes } from 'prism-react-renderer';

// ─── CENTRALIZED COMPLIANCE CONFIGURATION VARIABLES ───
const GITHUB_ORG = 'flow4u';
const GITHUB_REPO = 'test-isms-portal';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Compliance Vault',
  tagline: 'Docs-as-Code ISMS Portal',
  favicon: 'img/favicon.ico',

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
          editUrl: `https://github.com/${GITHUB_ORG}/${GITHUB_REPO}/edit/main/`,
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

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 🌟 CENTRAL THEME MECHANICS (DEFAULT TO DARK)
      colorMode: {
        defaultMode: 'dark',               // Initial landing layout state is Dark
        disableSwitch: false,             // Displays the interactive moon/sun toggle button in navbar
        respectPrefersColorScheme: false, // Forces our default setting over individual browser settings
      },
      navbar: {
        title: 'Compliance Portal',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Policies & Controls',
          },
          {
            href: `https://github.com/${GITHUB_ORG}/${GITHUB_REPO}`,
            label: 'GitHub Repo',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Corporate ISMS. Built securely with Docusaurus.`,
      },
      prism: {
        theme: githubThemes.github,
      },
    }),
};

export default config;