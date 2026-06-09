import type { UIKey } from '../i18n/ui';

// When you add the screenshots to src/assets, replace the string paths below with
// `import` statements so astro:assets can optimise them, e.g.:
//   import moveMain from '../assets/move-score-main.jpg';
// and change `thumbMain: string` to `thumbMain: ImageMetadata`.

export interface PrototypeFrame {
  /** 'phone' = device mock, 'browser' = window with a fake URL bar */
  type: 'phone' | 'browser';
  /** path under /public/prototypes/… embedded via <iframe src> */
  src: string;
  /** fake address shown in the browser chrome */
  url?: string;
  /** accessible title for the iframe */
  title: string;
}

export interface Project {
  slug: 'move-score' | 'kinap' | 'dimagin';
  number: '01' | '02' | '03';
  /** display name (brand — same in every locale; styling lowercases it) */
  name: string;
  year: string;
  /** home-card copy, resolved through ui.ts */
  descKey: UIKey;
  roleKey: UIKey;
  tagKeys: UIKey[];
  /** card images (swap to imported ImageMetadata once assets are in src/assets) */
  thumbMain: string;
  thumbSub: string;
  /** live prototypes shown in the "Try it" section */
  prototypes: PrototypeFrame[];
  /**
   * Case-study facts + narrative, per locale.
   * TODO: port the exact text from reference/<slug>-case-study.html (keys:
   * tagline, v_role, v_scope, v_platform, overview_lead/p1/p2, challenge_*,
   * proto_hint, mo1_t/d…mo3_t/d, outcome_lead/p1).
   */
  caseStudy?: Record<'en' | 'fr' | 'it', Record<string, string>>;
}

/** Order matters: drives the nav, the work list, and the "Next project" loop. */
export const projects: Project[] = [
  {
    slug: 'move-score',
    number: '01',
    name: 'move score',
    year: '2025',
    descKey: 'p1_desc',
    roleKey: 'p1_role',
    tagKeys: ['tag_system', 'tag_mobile'],
    thumbMain: '/assets/move-score-main.jpg', // composite: dashboard + milestone phones
    thumbSub: '/assets/move-score-sub.jpg', // "Étape franchie · Berlin → Rome" card
    prototypes: [
      { type: 'phone', src: '/prototypes/move-score/app.html', title: 'Move Score app prototype' },
    ],
  },
  {
    slug: 'kinap',
    number: '02',
    name: 'kinap',
    year: '2025',
    descKey: 'p2_desc',
    roleKey: 'p2_role',
    tagKeys: ['tag_mobile', 'tag_branding'],
    thumbMain: '/assets/kinap-main.jpg', // Discover page (web)
    thumbSub: '/assets/kinap-sub.jpg', // Dr Jean Laurent profile
    prototypes: [
      { type: 'phone', src: '/prototypes/kinap/messages.html', title: 'Kinap — messages' },
      { type: 'phone', src: '/prototypes/kinap/confirmation.html', title: 'Kinap — confirmation' },
      { type: 'phone', src: '/prototypes/kinap/recap.html', title: 'Kinap — recap' },
      { type: 'phone', src: '/prototypes/kinap/profile.html', title: 'Kinap — profile' },
      { type: 'browser', src: '/prototypes/kinap/dashboard.html', url: 'kinap.app/dashboard', title: 'Kinap — dashboard' },
      { type: 'browser', src: '/prototypes/kinap/discover.html', url: 'kinap.app/discover', title: 'Kinap — discover' },
    ],
  },
  {
    slug: 'dimagin',
    number: '03',
    name: 'dimagin',
    year: '2026',
    descKey: 'p3_desc',
    roleKey: 'p3_role',
    tagKeys: ['tag_web', 'tag_system'],
    thumbMain: '/assets/dimagin-main.jpg', // contact page
    thumbSub: '/assets/dimagin-sub.jpg', // home hero
    prototypes: [
      { type: 'browser', src: '/prototypes/dimagin/site.html', url: 'dimagin-collective.com', title: 'Dimagin website' },
    ],
  },
];

/** Helper for the "Next project" loop (01 → 02 → 03 → 01). */
export function nextProject(slug: Project['slug']): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
