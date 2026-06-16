// @ts-check
import { themes as githubThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Compliance Vault',
  tagline: 'Docs-as-Code ISMS Portal',
  favicon: 'img/favicon.ico',

  // --- PRODUCTION DEPLOYMENT CONFIG CONFIGURATION ---
  // Replace these strings with your actual organization and hosting domains
  url: 'https://flow4u.github.io',
  baseUrl: '/test-isms-portal/',
  organizationName: 'test BV', 
  projectName: 'test-isms-portal', 

  // --- AUTOMATED AUDIT TRAIL GUARDRAILS ---
  // Throws compile errors during 'npm run build' if broken links exist
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  // Modern Docusaurus v4 migration path for markdown link tracking
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
          // Controls where the "Edit this page" web links target in your repo
          editUrl: 'https://github.com/your-org/test-isms-portal/edit/main/',
          
          // Natively scrapes Git signatures to calculate modification baselines
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        // Turned off to keep your policy framework lean and professional
        blog: false, 
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // --- LUNR PURE-JAVASCRIPT OFFLINE SEARCH PLUGIN ---
  plugins: ['docusaurus-lunr-search'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Compliance Portal',
        logo: {
          alt: 'ISMS Security Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Policies & Controls',
          },
          {
            href: 'https://github.com/your-org/test-isms-portal',
            label: 'GitHub Repo',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Framework Quick Links',
            items: [
              {
                label: 'Master Index',
                to: '/docs/intro',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Corporate ISMS. Built securely with Docusaurus.`,
      },
      prism: {
        theme: githubThemes.github,
      },
    }),
};

export default config;