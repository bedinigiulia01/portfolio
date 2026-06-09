// Translation dictionary for all UI strings.
// Keys mirror the data-i18n keys from the original static site so copy maps 1:1.
// Strings that contain markup (<em>, &amp;) are meant to be rendered with `set:html`.

export const languages = {
  en: 'English',
  fr: 'Français',
  it: 'Italiano',
} as const;

export const defaultLang = 'en';
export type Lang = keyof typeof ui;

export const ui = {
  en: {
    // nav
    nav_about: 'About',
    nav_work: 'Work',
    nav_contact: 'Contact',
    // hero
    hero_label: 'Portfolio — 2026',
    hero_l1: 'UX &amp; UI design for your', // set:html (entity)
    hero_l2: 'digital products',
    hero_intro:
      'Giulia Bedini — UX & UI product designer based in France. I shape interfaces that feel calm, clear and considered, from research to polished UI.',
    meta_role: 'UX / UI · Product Design',
    meta_status: 'Open to alternance',
    // about
    about_title: 'About',
    about_big:
      'I’m a product designer who cares about the <em>why</em> behind every screen — turning research and ambiguity into clear, usable, considered interfaces.', // set:html
    about_p1:
      'Currently looking for an alternance where I can grow alongside a product team — owning flows end to end, from user research and wireframes to design systems and high-fidelity UI.',
    about_p2:
      'I like working close to engineering, sweating the details, and keeping the user’s reality at the centre of every decision.',
    sk1l: 'Discipline',
    sk1r: 'UX & UI Product Design',
    sk2l: 'Tools',
    sk3l: 'Methods',
    sk3r: 'Research · Prototyping · Systems',
    sk4l: 'Languages',
    sk4r: 'English · French · Italian',
    // work
    work_title: 'Selected work',
    lbl_role: 'Role',
    lbl_year: 'Year',
    view_case: 'View case study',
    tag_system: 'Design system',
    tag_mobile: 'Mobile',
    tag_branding: 'Branding',
    tag_web: 'Web app',
    // project cards
    p1_desc:
      'A movement-tracking product that helps users read their progress at a glance. Led the experience end to end — research, flows, design system and motion.',
    p1_role: 'Product Design',
    p2_desc:
      'Rethinking a daily companion app around focus and rest. Defined flows and wireframes, then designed a soft, breathing mobile interface with a fresh brand.',
    p2_role: 'UX / UI Design',
    p3_desc:
      'An imaging tool made approachable. Restructured the information architecture, prototyped key journeys and built a confident, scalable visual language.',
    p3_role: 'UX / UI Design',
    // contact + footer
    avail: 'Available for an alternance — 2026',
    contact_title: 'Let’s build something <em>thoughtful.</em>', // set:html
    contact_cta: 'Get in touch',
    foot_made: 'Designed in France',
    // case-study shared chrome (reused across all case studies)
    cs_back: 'Back to work',
    cs_all_work: 'All work ↗',
    cs_next_label: 'Next project',
    cs_s_overview: 'Overview',
    cs_s_challenge: 'The challenge',
    cs_s_proto: 'Try it',
    cs_s_moments: 'Designed moments',
    cs_s_outcome: 'Outcome',
    cs_f_role: 'Role',
    cs_f_scope: 'Scope',
    cs_f_platform: 'Platform',
    cs_f_year: 'Year',
  },
  fr: {
    nav_about: 'À propos',
    nav_work: 'Projets',
    nav_contact: 'Contact',
    hero_label: 'Portfolio — 2026',
    hero_l1: 'Conception',
    hero_l2: 'd’expériences digitales',
    hero_intro:
      'Giulia Bedini — UX & UI product designer basée en France. Je conçois des interfaces calmes, claires et réfléchies, de la recherche à l’UI finalisée.',
    meta_role: 'UX / UI · Design produit',
    meta_status: 'Ouverte à une alternance',
    about_title: 'À propos',
    about_big:
      'Je suis product designer et je m’intéresse au <em>pourquoi</em> de chaque écran — transformer la recherche et l’ambiguïté en interfaces claires, utilisables et soignées.',
    about_p1:
      'Je recherche actuellement une alternance pour grandir au sein d’une équipe produit — piloter les parcours de bout en bout, de la recherche utilisateur aux wireframes jusqu’aux design systems et à l’UI haute-fidélité.',
    about_p2:
      'J’aime travailler au plus près de l’ingénierie, soigner les détails et garder la réalité de l’utilisateur au centre de chaque décision.',
    sk1l: 'Discipline',
    sk1r: 'Design produit UX & UI',
    sk2l: 'Outils',
    sk3l: 'Méthodes',
    sk3r: 'Recherche · Prototypage · Systèmes',
    sk4l: 'Langues',
    sk4r: 'Anglais · Français · Italien',
    work_title: 'Projets sélectionnés',
    lbl_role: 'Rôle',
    lbl_year: 'Année',
    view_case: 'Voir l’étude de cas',
    tag_system: 'Design system',
    tag_mobile: 'Mobile',
    tag_branding: 'Image de marque',
    tag_web: 'Application web',
    p1_desc:
      'Un produit de suivi du mouvement qui aide les utilisateurs à lire leur progression d’un coup d’œil. Expérience pilotée de bout en bout — recherche, parcours, design system et motion.',
    p1_role: 'Design produit',
    p2_desc:
      'Repenser une application compagnon du quotidien autour du focus et du repos. Définition des parcours et wireframes, puis une interface mobile douce et respirante avec une identité neuve.',
    p2_role: 'Design UX / UI',
    p3_desc:
      'Un outil d’imagerie rendu accessible. Restructuration de l’architecture de l’information, prototypage des parcours clés et un langage visuel affirmé et évolutif.',
    p3_role: 'Design UX / UI',
    avail: 'Disponible pour une alternance — 2026',
    contact_title: 'Construisons quelque chose de <em>réfléchi.</em>',
    contact_cta: 'Me contacter',
    foot_made: 'Conçu en France',
    cs_back: 'Retour aux projets',
    cs_all_work: 'Tous les projets ↗',
    cs_next_label: 'Projet suivant',
    cs_s_overview: 'Aperçu',
    cs_s_challenge: 'Le défi',
    cs_s_proto: 'Essaie',
    cs_s_moments: 'Moments conçus',
    cs_s_outcome: 'Résultat',
    cs_f_role: 'Rôle',
    cs_f_scope: 'Périmètre',
    cs_f_platform: 'Plateforme',
    cs_f_year: 'Année',
  },
  it: {
    nav_about: 'Chi sono',
    nav_work: 'Progetti',
    nav_contact: 'Contatti',
    hero_label: 'Portfolio — 2026',
    hero_l1: 'Design di',
    hero_l2: 'esperienze digitali',
    hero_intro:
      'Giulia Bedini — product designer UX & UI con base in Francia. Progetto interfacce calme, chiare e ponderate, dalla ricerca alla UI rifinita.',
    meta_role: 'UX / UI · Product Design',
    meta_status: 'Aperta a un’alternanza',
    about_title: 'Chi sono',
    about_big:
      'Sono una product designer attenta al <em>perché</em> dietro ogni schermata — trasformo ricerca e ambiguità in interfacce chiare, usabili e curate.',
    about_p1:
      'Cerco un’alternanza per crescere accanto a un team di prodotto — gestire i flussi dall’inizio alla fine, dalla ricerca utenti ai wireframe fino ai design system e alla UI ad alta fedeltà.',
    about_p2:
      'Mi piace lavorare a stretto contatto con l’ingegneria, curare i dettagli e mantenere la realtà dell’utente al centro di ogni decisione.',
    sk1l: 'Disciplina',
    sk1r: 'Product Design UX & UI',
    sk2l: 'Strumenti',
    sk3l: 'Metodi',
    sk3r: 'Ricerca · Prototipazione · Sistemi',
    sk4l: 'Lingue',
    sk4r: 'Inglese · Francese · Italiano',
    work_title: 'Progetti selezionati',
    lbl_role: 'Ruolo',
    lbl_year: 'Anno',
    view_case: 'Vedi il case study',
    tag_system: 'Design system',
    tag_mobile: 'Mobile',
    tag_branding: 'Branding',
    tag_web: 'Web app',
    p1_desc:
      'Un prodotto per il tracciamento del movimento che aiuta a leggere i progressi a colpo d’occhio. Esperienza guidata end-to-end — ricerca, flussi, design system e motion.',
    p1_role: 'Product Design',
    p2_desc:
      'Ripensare un’app compagna quotidiana attorno a focus e riposo. Definizione di flussi e wireframe, poi un’interfaccia mobile morbida e ariosa con un brand nuovo.',
    p2_role: 'Design UX / UI',
    p3_desc:
      'Uno strumento di imaging reso accessibile. Riorganizzazione dell’architettura informativa, prototipazione dei percorsi chiave e un linguaggio visivo deciso e scalabile.',
    p3_role: 'Design UX / UI',
    avail: 'Disponibile per un’alternanza — 2026',
    contact_title: 'Costruiamo qualcosa di <em>ponderato.</em>',
    contact_cta: 'Contattami',
    foot_made: 'Progettato in Francia',
    cs_back: 'Torna ai progetti',
    cs_all_work: 'Tutti i progetti ↗',
    cs_next_label: 'Progetto successivo',
    cs_s_overview: 'Panoramica',
    cs_s_challenge: 'La sfida',
    cs_s_proto: 'Provalo',
    cs_s_moments: 'Momenti progettati',
    cs_s_outcome: 'Risultato',
    cs_f_role: 'Ruolo',
    cs_f_scope: 'Ambito',
    cs_f_platform: 'Piattaforma',
    cs_f_year: 'Anno',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
