export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  aspect: string;
  colSpan: string;
  image: string;
  summary: string;
  overview: string;
  deliverables: string[];
  metrics: string;
}

export interface JournalPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  excerpt: string;
  content: string[];
}

export interface ExplorationItem {
  id: string;
  title: string;
  medium: string;
  year: string;
  image: string;
  rotation: string;
  aspect: string;
}

export interface StatItem {
  number: string;
  suffix: string;
  value: number;
  label: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    id: "automotive-motion",
    title: "Automotive Motion",
    category: "Motion & 3D Spatial",
    year: "2026",
    client: "NextGen EV Studio",
    role: "Lead Creative Technologist & Director",
    aspect: "aspect-[16/10]",
    colSpan: "md:col-span-7",
    image: "/src/assets/images/work_automotive_motion_1791443951229.jpg",
    summary: "Real-time velocity fluid simulations and aerodynamic spatial visualizer for next-generation electric hypercars.",
    overview: "Built an interactive real-time visual system rendering parametric wind tunnel airflow streamlines and aerodynamic drag vectors directly within the browser at 120 FPS. Designed both the CGI lighting rigs and the custom GLSL shader pipelines.",
    deliverables: ["Custom WebGL Streamline Shader", "Dynamic Camera Director UI", "120 FPS Responsive Canvas", "Sound Design & Kinetic Audio"],
    metrics: "4.8M Interactive Impressions · 62% Increase in Pre-order Inquiries"
  },
  {
    id: "urban-architecture",
    title: "Urban Architecture",
    category: "Spatial Web & Archival",
    year: "2025",
    client: "Studio Monolith",
    role: "Fullstack Architecture & Design",
    aspect: "aspect-[4/3]",
    colSpan: "md:col-span-5",
    image: "/src/assets/images/work_urban_architecture_1791443963290.jpg",
    summary: "Monolithic brutalist archive mapping structural shadow transitions from dawn to dusk across global capitals.",
    overview: "A digital monument to mid-century modern brutalist architecture. Users navigate multi-dimensional shadow coordinates through dynamic sun positioning controls, revealing hidden structural details and tactile raw concrete textures.",
    deliverables: ["Coordinate-Driven Shadow Engine", "Bespoke Swiss Typographic Grid", "Audio Narrative Archives", "WebGL Spatial Viewport"],
    metrics: "Featured in Architectural Digest · 98/100 Lighthouse Performance"
  },
  {
    id: "human-perspective",
    title: "Human Perspective",
    category: "Art Direction & Curation",
    year: "2025",
    client: "Contemporary Form",
    role: "Curatorial Lead & Spatial Designer",
    aspect: "aspect-[4/3]",
    colSpan: "md:col-span-5",
    image: "/src/assets/images/work_human_perspective_1791443973045.jpg",
    summary: "Monochrome tactile portrait exhibition exploring physical clay sculpting translated into generative digital forms.",
    overview: "An intimate documentary investigation honoring physical craftsmen. We paired high-contrast monochrome cinematography with tactile haptic sound layers to bring the sensory friction of physical clay sculpting to digital screens.",
    deliverables: ["Exhibition Identity & Editorial Book", "Tactile Micro-interactions", "High-Resolution Image Lightbox", "Spatial Ambient Score"],
    metrics: "12 Global Gallery Showcases · Gold Cube in Digital Craft"
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    category: "Identity & Design System",
    year: "2026",
    client: "Aethelgard Atelier",
    role: "Brand Architect & Technologist",
    aspect: "aspect-[16/10]",
    colSpan: "md:col-span-7",
    image: "/src/assets/images/work_brand_identity_1791443984262.jpg",
    summary: "Comprehensive debossed identity system and design tokens for luxury Scandinavian architectural hardware.",
    overview: "Created the foundational visual language for an avant-garde architectural hardware atelier. Spanning debossed stone collateral, custom geometric type treatments, and a headless digital flagship with seamless checkout architecture.",
    deliverables: ["Modular Multi-Brand Token System", "Physical Stationery & Packaging Specs", "Headless E-Commerce Flagship", "Motion Guidelines"],
    metrics: "3.2x Revenue Velocity · Complete International Launch"
  }
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: "1",
    title: "Designing for Spatial Latency & Perceptual Coherence",
    date: "FEB 24, 2026",
    readTime: "5 MIN READ",
    category: "ENGINEERING",
    image: "/src/assets/images/journal_spatial_computing_1791444057754.jpg",
    excerpt: "How micro-delays between physical gesture inputs and virtual parallax layers dictate our subjective sense of tactile realism.",
    content: [
      "In physical reality, inertia and resistance provide instantaneous tactile feedback. When designing digital interfaces, even 16ms of frame jitter shatters perceptual immersion.",
      "By binding compositor-only transforms to hardware-accelerated scroll interpolation and decoupling heavy mathematical shaders onto Web Workers, we preserve perceptual coherence across devices.",
      "The secret lies not in adding more animations, but in matching the decay curves of real physical materials — damping oscillations with calibrated cubic beziers."
    ]
  },
  {
    id: "2",
    title: "The End of AI Slop: Returning to Tactile Editorial Polish",
    date: "JAN 18, 2026",
    readTime: "7 MIN READ",
    category: "PHILOSOPHY",
    image: "/src/assets/images/journal_design_systems_1791444045954.jpg",
    excerpt: "Why generic template candy badges and purple glow cards are failing users, and how Swiss grid typography restores dignity to software.",
    content: [
      "The modern web has been saturated with repetitive rounded-pill capsules, floating generic cards, and unearned neon gradients that convey zero authentic intent.",
      "True design polish is rooted in restraint: 60-30-10 color discipline, disciplined tabular figures, zero dead buttons, and purposeful typographic hierarchy.",
      "When we strip away ornamental noise and let raw editorial contrast carry the story, software begins to feel durable, authoritative, and crafted with human care."
    ]
  },
  {
    id: "3",
    title: "Building Autonomous Motion Frameworks with GSAP & Canvas",
    date: "DEC 12, 2025",
    readTime: "4 MIN READ",
    category: "MOTION",
    image: "/src/assets/images/work_automotive_motion_1791443951229.jpg",
    excerpt: "Techniques for achieving frame-perfect 120fps transitions across complex scroll hierarchies without dropping compositor cycles.",
    content: [
      "Smooth scroll performance requires rigorous discipline around what the browser paints during user gestures. Touching layout properties like top, width, or margin causes layout thrashing.",
      "Using GSAP ScrollTrigger paired with transform3d and will-change unlocks zero-jank scroll timelines that feel as fluid as native operating system interactions.",
      "By testing on low-power devices and clamping animation durations strictly within human response thresholds, your interfaces remain snappy and responsive."
    ]
  },
  {
    id: "4",
    title: "Brutalist Spatial Geometries in Modern Digital Products",
    date: "NOV 04, 2025",
    readTime: "6 MIN READ",
    category: "ARCHITECTURE",
    image: "/src/assets/images/work_urban_architecture_1791443963290.jpg",
    excerpt: "Translating raw concrete monolithic structural weight into light-weight, high-contrast digital interfaces.",
    content: [
      "Brutalist architecture was never about ugliness; it was an honest celebration of raw concrete (béton brut) and unpretentious structural integrity.",
      "In UI engineering, brutalism translates to unapologetic monolithic boundaries, stark hairline dividers, high typographic contrast, and pure spatial clarity.",
      "By eliminating fake decorative bevels and frivolous drop shadows, we allow content to assert its own natural weight and timeless authority."
    ]
  }
];

export const EXPLORATIONS: ExplorationItem[] = [
  {
    id: "exp-1",
    title: "Iridescent Parametric Core",
    medium: "WebGL / Chrome Dispersion",
    year: "2026",
    image: "/src/assets/images/gallery_exploration_one_1791443994257.jpg",
    rotation: "-rotate-2",
    aspect: "aspect-square"
  },
  {
    id: "exp-2",
    title: "Obsidian Monolith Structure",
    medium: "Titanium & Light Absorption",
    year: "2026",
    image: "/src/assets/images/gallery_exploration_two_1791444070135.jpg",
    rotation: "rotate-3",
    aspect: "aspect-square"
  },
  {
    id: "exp-3",
    title: "Aerodynamic Velocity Tunnel",
    medium: "Fluid Dynamics Simulation",
    year: "2026",
    image: "/src/assets/images/work_automotive_motion_1791443951229.jpg",
    rotation: "-rotate-1",
    aspect: "aspect-square"
  },
  {
    id: "exp-4",
    title: "Brutalist Twilight Monolith",
    medium: "Monolithic Concrete Shadow",
    year: "2025",
    image: "/src/assets/images/work_urban_architecture_1791443963290.jpg",
    rotation: "rotate-2",
    aspect: "aspect-square"
  },
  {
    id: "exp-5",
    title: "Tactile Sculptural Tension",
    medium: "Human Clay Form Study",
    year: "2025",
    image: "/src/assets/images/work_human_perspective_1791443973045.jpg",
    rotation: "-rotate-3",
    aspect: "aspect-square"
  },
  {
    id: "exp-6",
    title: "Swiss Grid Typographic Matrix",
    medium: "Debossed Editorial Artifact",
    year: "2026",
    image: "/src/assets/images/journal_design_systems_1791444045954.jpg",
    rotation: "rotate-1",
    aspect: "aspect-square"
  }
];

export const STATS: StatItem[] = [
  {
    number: "20",
    suffix: "+",
    value: 20,
    label: "Years Experience",
    description: "Navigating digital paradigms from early web architecture to modern spatial graphics and generative engines."
  },
  {
    number: "95",
    suffix: "+",
    value: 95,
    label: "Projects Done",
    description: "Bespoke digital platforms, interactive installations, high-performance web apps, and design systems."
  },
  {
    number: "200",
    suffix: "%",
    value: 200,
    label: "Satisfied Clients",
    description: "Relentless attention to craft, technical rigor, and measured results that drive sustainable retention."
  }
];
