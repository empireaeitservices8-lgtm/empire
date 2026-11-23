export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  heroImage: string;
  theme: {
    bg: string;
    fg: string;
    accent: string;
  };
  tags: string[];
  shortDescription: string;
  fullOverview: string[];
  stats: ServiceStat[];
  keyDeliverables: ServiceDeliverable[];
  process: ServiceProcessStep[];
  techStack: string[];
  benefits: string[];
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    slug: "web-designing",
    title: "Web Designing",
    tagline: "Crafting captivating, human-centric digital experiences that elevate your brand and turn visitors into loyal customers.",
    category: "UI/UX & Branding",
    heroImage: "/images/services/webdesign.jpg",
    theme: { bg: "#1a1411", fg: "#ffedd7", accent: "#e8a15a" },
    tags: ["UI/UX Design", "Responsive Layouts", "Brand Identity", "Figma Prototyping", "Design Systems"],
    shortDescription: "We create stunning, responsive websites that captivate visitors and elevate your brand.",
    fullOverview: [
      "At Empire AE, we believe exceptional web design is more than just visual aesthetics — it is the bridge between human emotion and business results. Every layout, color palette, typography choice, and micro-interaction is intentionally engineered to reflect your brand's unique identity while driving intuitive user action.",
      "Our design philosophy combines deep empathy for your target audience with modern conversion psychology. From initial wireframing to high-fidelity clickable prototypes, we create memorable digital storefronts and corporate platforms that stand out in crowded markets and engage visitors from the very first second."
    ],
    stats: [
      { value: "100%", label: "Custom Tailored UI" },
      { value: "3x", label: "Higher Engagement" },
      { value: "60+", label: "Design Systems Built" }
    ],
    keyDeliverables: [
      {
        title: "User Journey & Experience Architecture",
        description: "Mapping customer journeys to eliminate friction, streamline navigation, and maximize conversion touchpoints."
      },
      {
        title: "High-Fidelity Interactive Prototypes",
        description: "Fully clickable Figma prototypes that allow you to test and validate every screen before code is written."
      },
      {
        title: "Multi-Device Responsive Design",
        description: "Pixel-perfect adaptation across ultra-wide monitors, laptops, tablets, and mobile devices."
      },
      {
        title: "Scalable Design Systems",
        description: "Reusable component libraries, typography scales, and token systems that ensure brand consistency as you grow."
      },
      {
        title: "Brand Identity Integration",
        description: "Harmonizing digital aesthetics with your logos, color schemes, custom iconography, and brand voice."
      },
      {
        title: "Accessibility & Usability Audits",
        description: "Adherence to WCAG standards ensuring accessible, inclusive experiences for every visitor."
      }
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Brand Research",
        description: "We analyze your industry landscape, audience psychology, and business objectives to define the design direction."
      },
      {
        step: "02",
        title: "Wireframing & Information Architecture",
        description: "Structuring content hierarchy and user pathways to ensure effortless navigation."
      },
      {
        step: "03",
        title: "Visual Design & Micro-Interactions",
        description: "Bringing your digital presence to life with bespoke visual styles, typography, and motion design."
      },
      {
        step: "04",
        title: "Prototyping & User Testing",
        description: "Iterating through interactive prototypes with team feedback and usability testing."
      },
      {
        step: "05",
        title: "Developer Hand-off & Support",
        description: "Delivering organized design specs, assets, and design tokens for flawless frontend development."
      }
    ],
    techStack: ["Figma", "Adobe Creative Suite", "Tailwind CSS", "Protopie", "Design Tokens", "Lottie Animations"],
    benefits: [
      "Custom, modern aesthetics built specifically for your brand rather than off-the-shelf templates",
      "Conversion-focused layouts that guide users directly toward your primary business goals",
      "Mobile-first architecture ensuring seamless navigation on smartphones and tablets",
      "Close collaboration with ongoing design reviews and interactive prototypes"
    ]
  },
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "High-performance, secure, and scalable web solutions engineered with modern frameworks.",
    category: "Full-Stack Engineering",
    heroImage: "/images/services/webdevelopment.jpg",
    theme: { bg: "#121414", fg: "#ffffff", accent: "#3dd6c6" },
    tags: ["React / Next.js", "TypeScript", "WordPress & Headless CMS", "REST & GraphQL", "Cloud Architecture"],
    shortDescription: "We build secure, scalable websites engineered for performance and growth.",
    fullOverview: [
      "Modern web applications demand unmatched speed, bulletproof security, and seamless scalability. At Empire AE, our engineering team crafts enterprise-grade web applications utilizing the latest technology stacks such as Next.js, React, Node.js, and modern headless architectures.",
      "We write clean, modular, and maintainable code built to handle heavy user traffic and dynamic workloads effortlessly. Whether you need an ultra-fast corporate web presence, a complex SaaS web portal, or a scalable content-driven platform, we deliver solutions engineered to last."
    ],
    stats: [
      { value: "< 1s", label: "Average Page Load Time" },
      { value: "99.9%", label: "Uptime Reliability" },
      { value: "100%", label: "Lighthouse Performance" }
    ],
    keyDeliverables: [
      {
        title: "Custom Full-Stack Web Development",
        description: "Bespoke frontend interfaces paired with resilient backends tailored to your exact business specifications."
      },
      {
        title: "Headless CMS & Content Workflows",
        description: "Empowering your team with intuitive content management while maintaining cutting-edge frontend performance."
      },
      {
        title: "API Architecture & Integrations",
        description: "Robust REST and GraphQL APIs connecting your website with CRMs, payment processors, and third-party tools."
      },
      {
        title: "Performance & Core Web Vitals Optimization",
        description: "Zero-bloat code, asset compression, and edge caching ensuring top-tier search engine performance."
      },
      {
        title: "Enterprise Security & Data Protection",
        description: "SSL encryption, sanitized database queries, automated vulnerability patching, and DDoS protection."
      },
      {
        title: "DevOps & Continuous Deployment",
        description: "Automated CI/CD pipelines enabling rapid, zero-downtime updates and seamless hosting scalability."
      }
    ],
    process: [
      {
        step: "01",
        title: "Architecture Planning",
        description: "Defining technology stacks, database schemas, and API contracts based on scalability requirements."
      },
      {
        step: "02",
        title: "Agile Development Sprints",
        description: "Building frontend and backend modules in 2-week agile sprints with continuous client visibility."
      },
      {
        step: "03",
        title: "Third-Party Integration",
        description: "Connecting essential business tools, payment gateways, analytics, and automation engines."
      },
      {
        step: "04",
        title: "Testing & Performance Benchmarking",
        description: "Conducting unit tests, end-to-end user testing, and Core Web Vitals speed optimization."
      },
      {
        step: "05",
        title: "Production Deployment & Monitoring",
        description: "Launching on high-availability edge networks with 24/7 uptime monitoring."
      }
    ],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "WordPress", "Docker"],
    benefits: [
      "Ultra-fast page loads that lower bounce rates and improve organic search rankings",
      "Future-proof, modular code that scales effortlessly as your business grows",
      "Seamless integration with your existing marketing, sales, and analytics stack",
      "Post-launch technical support, maintenance, and regular security audits"
    ]
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Intuitive, high-performance native and cross-platform mobile apps for iOS and Android.",
    category: "Mobile Solutions",
    heroImage: "/images/services/app-development.jpg",
    theme: { bg: "#16162a", fg: "#ffffff", accent: "#7b7be8" },
    tags: ["Flutter", "React Native", "iOS & Android", "Offline Architecture", "Push Notifications"],
    shortDescription: "We develop powerful Android and iOS apps for seamless user experiences.",
    fullOverview: [
      "In a mobile-first world, your customers expect snappy, responsive, and reliable apps in the palm of their hands. Empire AE specializes in developing state-of-the-art mobile applications using Flutter and React Native that deliver genuine native performance on both iOS and Android from a unified codebase.",
      "From complex backend integrations and real-time push alerts to offline storage and intuitive gestural interfaces, our mobile development team handles the complete app lifecycle from concept to App Store and Google Play publication."
    ],
    stats: [
      { value: "60 FPS", label: "Fluid Animation Speed" },
      { value: "2x", label: "Faster Go-To-Market" },
      { value: "100%", label: "App Store Compliance" }
    ],
    keyDeliverables: [
      {
        title: "Cross-Platform Mobile Apps",
        description: "Unified Flutter and React Native apps that maximize code reuse while delivering genuine native feel."
      },
      {
        title: "Native Device Capabilities",
        description: "Integration with GPS location, biometric authentication, camera, accelerometer, and native notifications."
      },
      {
        title: "Offline-First Synchronization",
        description: "Local database caching that allows users to seamlessly navigate and create content even without connectivity."
      },
      {
        title: "Secure Payment & Subscription Systems",
        description: "Seamless in-app purchases, recurring subscriptions, and gateway integration (Stripe, Apple Pay, Google Pay)."
      },
      {
        title: "Real-Time Chat & Push Notifications",
        description: "Engaging users with targeted push campaigns and instantaneous real-time updates."
      },
      {
        title: "App Store Publishing & Compliance",
        description: "Complete management of App Store and Google Play submissions, compliance, and release tracks."
      }
    ],
    process: [
      {
        step: "01",
        title: "Concept & Technical Blueprint",
        description: "Evaluating target user personas, technical requirements, and core device capabilities."
      },
      {
        step: "02",
        title: "Mobile UX & UI Design",
        description: "Designing touch-friendly, platform-compliant interfaces for both iOS Human Interface and Material Design."
      },
      {
        step: "03",
        title: "App Engineering & APIs",
        description: "Developing robust mobile logic connected to secure cloud backends and microservices."
      },
      {
        step: "04",
        title: "Multi-Device Lab Testing",
        description: "Rigorous quality testing across multiple screen sizes, OS versions, and network speeds."
      },
      {
        step: "05",
        title: "App Store Submission & Launch",
        description: "Handling app certificates, store metadata, screenshots, and submission approvals."
      }
    ],
    techStack: ["Flutter", "React Native", "Dart", "Swift", "Kotlin", "Firebase", "REST APIs", "GraphQL"],
    benefits: [
      "Single codebase efficiency reducing development costs and ensuring feature parity",
      "Native-grade performance with smooth 60fps animations and rapid launch times",
      "Full compliance with Apple and Google app store guidelines for frictionless approvals",
      "Ongoing OS compatibility updates, bug fixes, and feature expansions"
    ]
  },
  {
    slug: "operations",
    title: "Operations & Project Delivery",
    tagline: "Bridging client vision and technical execution with structured agile delivery and quality control.",
    category: "Agile & Quality Delivery",
    heroImage: "/images/services/operations.jpg",
    theme: { bg: "#241818", fg: "#ffffff", accent: "#d8554f" },
    tags: ["Client Coordination", "Project Management", "Quality Assurance", "Agile Sprints", "Risk Mitigation"],
    shortDescription: "We act as the mediator between the client and the developers, keeping every project clear and on track.",
    fullOverview: [
      "Great digital projects succeed not only on code, but on communication, clear milestones, and meticulous execution. Our Operations team acts as your dedicated advocate and technical liaison, ensuring developers, designers, and business stakeholders remain in complete alignment.",
      "We eliminate project chaos through transparent agile methodologies, proactive risk management, and rigorous quality assurance. You always know exactly what is being built, when it will be delivered, and that it has been thoroughly tested before reaching production."
    ],
    stats: [
      { value: "100%", label: "On-Time Milestones" },
      { value: "24h", label: "Max Response Time" },
      { value: "0", label: "Communication Surprises" }
    ],
    keyDeliverables: [
      {
        title: "Dedicated Project Management",
        description: "A single, experienced point of contact overseeing timelines, scope, and technical deliverables."
      },
      {
        title: "Transparent Sprint Planning",
        description: "Structured 2-week sprints with clear sprint backlogs, live burndown charts, and progress reports."
      },
      {
        title: "Rigorous Quality Assurance (QA)",
        description: "Manual and automated regression testing across browsers and platforms to catch defects before users do."
      },
      {
        title: "Requirement Scoping & Risk Management",
        description: "Translating business goals into precise engineering user stories and mitigating potential roadblocks early."
      },
      {
        title: "Client Demos & Feedback Loops",
        description: "Regular milestone demonstrations allowing you to inspect live progress and provide feedback."
      },
      {
        title: "Post-Launch Handover & SLAs",
        description: "Clear operational handover, user documentation, and service level agreements for ongoing peace of mind."
      }
    ],
    process: [
      {
        step: "01",
        title: "Scope Definition & Roadmapping",
        description: "Clarifying project parameters, setting milestone goals, and aligning project budgets."
      },
      {
        step: "02",
        title: "Sprint Setup & Team Briefing",
        description: "Configuring development boards, sprint cadences, and acceptance criteria for developers."
      },
      {
        step: "03",
        title: "Continuous QA & Progress Tracking",
        description: "Auditing pull requests, verifying features against user stories, and maintaining sprint velocity."
      },
      {
        step: "04",
        title: "Live Milestones & Demonstrations",
        description: "Hosting review sessions to showcase completed functionality in staging environments."
      },
      {
        step: "05",
        title: "Deployment & Production Sign-off",
        description: "Supervising safe production cutovers, smoke testing, and post-launch stability."
      }
    ],
    techStack: ["Jira", "ClickUp", "Linear", "Slack", "Postman", "Cypress", "GitHub Projects"],
    benefits: [
      "Total transparency into project velocity, budget utilization, and upcoming deliverables",
      "Dramatically reduced turnaround times by eliminating ambiguity and scope creep",
      "Higher product quality through continuous multi-stage testing before deployment",
      "Seamless communication between business managers and technical teams"
    ]
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Accelerate revenue and expand market share through high-impact, data-driven marketing campaigns.",
    category: "Growth & Performance",
    heroImage: "/images/services/digital-marketing.jpg",
    theme: { bg: "#111a13", fg: "#d9f3de", accent: "#5fbf7a" },
    tags: ["SEO", "Social Media", "Content Marketing", "PPC Campaigns", "Conversion Optimization"],
    shortDescription: "We boost visibility and attract customers through result-driven digital strategies.",
    fullOverview: [
      "Having an outstanding digital product is only half the battle; ensuring your ideal customers find and engage with it is what drives sustainable revenue. Empire AE crafts tailored, multi-channel growth campaigns built to deliver measurable ROI.",
      "We combine targeted paid advertising, creative content marketing, social media branding, and conversion rate optimization to turn strangers into leads and leads into loyal brand evangelists. Every rupee or dollar invested is tracked and optimized for maximum yield."
    ],
    stats: [
      { value: "3.5x", label: "Average Campaign ROAS" },
      { value: "250%+", label: "Average Traffic Growth" },
      { value: "40%", label: "Lower Cost Per Acquisition" }
    ],
    keyDeliverables: [
      {
        title: "Pay-Per-Click Advertising (Google & Meta)",
        description: "Hyper-targeted search, display, and social media ads calibrated for high purchase intent."
      },
      {
        title: "Social Media Strategy & Content",
        description: "Cohesive brand storytelling, visual asset creation, and engagement across Instagram, LinkedIn, and Facebook."
      },
      {
        title: "Conversion Funnel Optimization",
        description: "Landing page design and split testing engineered to turn incoming visitors into paying customers."
      },
      {
        title: "Email Marketing & Automated Sequences",
        description: "Automated nurture sequences, cart abandonment triggers, and high-converting promotional broadcasts."
      },
      {
        title: "Audience Segmentation & Retargeting",
        description: "Dynamic retargeting campaigns re-engaging warm prospects across web and social channels."
      },
      {
        title: "Transparent Analytics & Performance Dashboards",
        description: "Real-time custom dashboards tracking CPC, CPA, conversion rates, and overall revenue attribution."
      }
    ],
    process: [
      {
        step: "01",
        title: "Audience & Competitor Intelligence",
        description: "Deep dive into your industry, customer pain points, competitor gaps, and top acquisition channels."
      },
      {
        step: "02",
        title: "Strategy & Creative Asset Production",
        description: "Developing conversion-focused ad creatives, compelling sales copy, and campaign roadmaps."
      },
      {
        step: "03",
        title: "Campaign Setup & Tracking Infrastructure",
        description: "Configuring Meta Pixel, Google Tag Manager, conversion APIs, and event tracking."
      },
      {
        step: "04",
        title: "Active Scaling & A/B Testing",
        description: "Continuously testing headlines, targeting, and budgets to lower cost per lead."
      },
      {
        step: "05",
        title: "ROI Reporting & Strategy Iteration",
        description: "Monthly executive summaries showing tangible business impact, revenue, and next steps."
      }
    ],
    techStack: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "Semrush", "Klaviyo", "Looker Studio"],
    benefits: [
      "Direct alignment between marketing expenditures and tangible revenue metrics",
      "Creative campaigns that resonate emotionally with your target demographic",
      "Continuous data-driven optimization eliminating wasted ad spend",
      "Multi-channel coverage ensuring omnipresence in your industry sector"
    ]
  },
  {
    slug: "e-commerce-application",
    title: "E-Commerce Application",
    tagline: "Modern online storefronts optimized for frictionless shopping, high conversions, and rapid scale.",
    category: "Digital Commerce",
    heroImage: "/images/services/ecommerce.jpg",
    theme: { bg: "#0a2540", fg: "#ffffff", accent: "#6cb8ee" },
    tags: ["WooCommerce", "Shopify", "Payment Gateway", "Inventory Sync", "Mobile Commerce"],
    shortDescription: "We build seamless online stores that turn visitors into loyal customers.",
    fullOverview: [
      "In modern digital commerce, every millisecond of latency and every checkout hurdle directly impacts your bottom line. At Empire AE, we engineer custom e-commerce experiences that captivate shoppers, minimize cart abandonment, and streamline back-office operations.",
      "Whether you are launching a bespoke direct-to-consumer lifestyle brand or managing thousands of SKUs across multiple warehouses, our platforms offer frictionless payment integrations, automated inventory management, and blistering speed."
    ],
    stats: [
      { value: "45%", label: "Lower Cart Abandonment" },
      { value: "< 2s", label: "Checkout Completion" },
      { value: "100%", label: "PCI-DSS Compliant" }
    ],
    keyDeliverables: [
      {
        title: "Bespoke Storefront Architecture",
        description: "Custom-designed product grids, filtration, and detail pages crafted to maximize visual appeal and conversion."
      },
      {
        title: "Global & Domestic Payment Gateways",
        description: "Frictionless integration of Stripe, Razorpay, Apple Pay, Google Pay, and localized payment methods."
      },
      {
        title: "Real-Time Inventory & ERP Synchronization",
        description: "Automated stock tracking, multi-warehouse support, and seamless integration with back-office ERPs."
      },
      {
        title: "1-Click Checkout & Mobile Optimization",
        description: "Friction-free checkout flows optimized for smartphone shoppers and rapid order completion."
      },
      {
        title: "Automated Order & Shipping Workflows",
        description: "Automated shipping label generation, courier API integration, and real-time tracking for customers."
      },
      {
        title: "Security, Fraud Prevention & Backup Systems",
        description: "Ironclad transaction security, automated anti-fraud checks, and continuous database backups."
      }
    ],
    process: [
      {
        step: "01",
        title: "E-Commerce Strategy & Catalog Architecture",
        description: "Structuring product taxonomies, attributes, variants, and shipping calculation rules."
      },
      {
        step: "02",
        title: "Conversion-Centric UX/UI Design",
        description: "Designing streamlined product pages, quick-view modals, and distraction-free checkout."
      },
      {
        step: "03",
        title: "Platform Development & Integrations",
        description: "Building the custom store frontend and configuring payment, shipping, and inventory APIs."
      },
      {
        step: "04",
        title: "Security & Load Testing",
        description: "Simulating high concurrent shopping volumes and auditing checkout encryption."
      },
      {
        step: "05",
        title: "Store Launch & Growth Setup",
        description: "Launching live sales channels, analytics tracking, and automated customer notifications."
      }
    ],
    techStack: ["Next.js Commerce", "Shopify", "WooCommerce", "Stripe", "Razorpay", "Tailwind CSS", "Redis"],
    benefits: [
      "Streamlined shopping journeys that drive higher average order value (AOV)",
      "High-availability architecture built to withstand viral traffic spikes and seasonal sales",
      "Automated logistics and inventory syncing freeing your team from manual overhead",
      "Deep customer insights with comprehensive purchase behavior tracking"
    ]
  },
  {
    slug: "sales",
    title: "Sales & Strategic Growth",
    tagline: "Consultative client acquisition workflows and sales pipelines that turn leads into predictable revenue.",
    category: "Revenue Strategy",
    heroImage: "/images/services/sales.jpg",
    theme: { bg: "#1f1914", fg: "#ffedd7", accent: "#e8a15a" },
    tags: ["Lead Generation", "Client Acquisition", "Business Development", "Sales Funnels", "CRM Integration"],
    shortDescription: "We turn leads into long-term clients with a clear, consultative sales approach.",
    fullOverview: [
      "A steady flow of qualified opportunities is the lifeblood of any growing enterprise. Our Sales & Strategic Growth service empowers your organization with structured, repeatable client acquisition frameworks that turn initial interest into high-value contracts.",
      "We align your digital presence, outbound positioning, and consultation process so your sales team speaks directly to key decision-makers with compelling value propositions and frictionless closing workflows."
    ],
    stats: [
      { value: "2.4x", label: "Pipeline Value Growth" },
      { value: "85%", label: "Qualified Lead Rate" },
      { value: "30%", label: "Faster Closing Cycles" }
    ],
    keyDeliverables: [
      {
        title: "B2B Outbound Acquisition Playbooks",
        description: "Targeted outbound prospecting strategies aimed directly at high-value corporate decision makers."
      },
      {
        title: "High-Ticket Consultative Funnels",
        description: "Positioning your offerings as essential strategic investments rather than commoditized services."
      },
      {
        title: "CRM Architecture & Pipeline Automation",
        description: "Configuring automated deal stages, follow-up reminders, and activity tracking in your CRM."
      },
      {
        title: "Sales Collateral & Pitch Deck Design",
        description: "Persuasive presentation decks, case study one-pagers, and proposal templates that win deals."
      },
      {
        title: "Discovery Call & Objection Handling Frameworks",
        description: "Equipping your sales reps with structured scripts and frameworks to uncover budget and pain points."
      },
      {
        title: "Client Retention & Account Expansion",
        description: "Building recurring relationship touchpoints that foster upsells, cross-sells, and long-term loyalty."
      }
    ],
    process: [
      {
        step: "01",
        title: "Ideal Customer Profile (ICP) Mapping",
        description: "Identifying the highest-margin industries, company sizes, and buyer personas for your services."
      },
      {
        step: "02",
        title: "Value Proposition & Offer Packaging",
        description: "Refining pricing models, service tiers, and outcome-oriented sales narratives."
      },
      {
        step: "03",
        title: "Pipeline Infrastructure Setup",
        description: "Configuring CRM workflows, proposal software, and automated communication triggers."
      },
      {
        step: "04",
        title: "Outreach & Inbound Lead Qualification",
        description: "Deploying multi-channel touchpoints to generate and qualify inbound and outbound interest."
      },
      {
        step: "05",
        title: "Conversion Review & Cycle Acceleration",
        description: "Analyzing win/loss ratios to continuously refine objection handling and shorten sales cycles."
      }
    ],
    techStack: ["HubSpot CRM", "Salesforce", "Apollo.io", "LinkedIn Sales Navigator", "DocuSign", "Loom"],
    benefits: [
      "A predictable, disciplined sales pipeline replacing unpredictable word-of-mouth reliance",
      "Higher win rates on competitive proposals through authoritative positioning",
      "Shorter sales cycles from initial meeting to signed agreement",
      "Enhanced lifetime customer value through structured upselling and account management"
    ]
  },
  {
    slug: "seo",
    title: "Search Engine Optimization (SEO)",
    tagline: "Sustainable organic search visibility, high-intent rankings, and continuous inbound traffic growth.",
    category: "Organic Search Engine",
    heroImage: "/images/services/seo.jpg",
    theme: { bg: "#101c1a", fg: "#ffffff", accent: "#3dd6c6" },
    tags: ["On-Page SEO", "Off-Page SEO", "Keyword Optimization", "Technical SEO", "Core Web Vitals"],
    shortDescription: "We improve search rankings, increase organic traffic, and grow your online reach.",
    fullOverview: [
      "Paid advertising stops working the moment you turn off the budget; organic search optimization creates lasting digital equity that delivers qualified leads year after year. Empire AE delivers white-hat, technically rigorous SEO strategies built for Google's latest algorithms.",
      "We address every pillar of search success: deep technical audits to eliminate crawl errors, high-intent keyword mapping that matches buyer psychology, on-page optimization, and authoritative backlink acquisition that cements your domain authority."
    ],
    stats: [
      { value: "400%+", label: "Organic Inbound Growth" },
      { value: "Top 3", label: "Target Keyword Placements" },
      { value: "100%", label: "White-Hat Compliance" }
    ],
    keyDeliverables: [
      {
        title: "Comprehensive Technical SEO Audits",
        description: "Identifying and resolving indexing issues, canonical errors, broken redirects, and slow response times."
      },
      {
        title: "High-Intent Keyword Intelligence",
        description: "Targeting commercial and transactional keywords that actual buyers use to find solutions."
      },
      {
        title: "On-Page Optimization & Schema Markup",
        description: "Optimizing metadata, heading hierarchies, semantic HTML, and JSON-LD structured data."
      },
      {
        title: "Core Web Vitals & Speed Tuning",
        description: "Optimizing LCP, INP, and CLS scores to ensure your website meets Google's ranking criteria."
      },
      {
        title: "Quality Backlink Strategy & Digital PR",
        description: "Building authoritative, niche-relevant links that genuinely boost domain authority."
      },
      {
        title: "Monthly Ranking & Competitor Reports",
        description: "Transparent analytics dashboards showing keyword rank improvements and organic traffic growth."
      }
    ],
    process: [
      {
        step: "01",
        title: "Technical Site & Competitor Audit",
        description: "Uncovering crawling barriers, technical debt, and ranking opportunities across your competitor set."
      },
      {
        step: "02",
        title: "Keyword & Content Architecture",
        description: "Mapping targeted search queries to specific service pages and informative landing pages."
      },
      {
        step: "03",
        title: "On-Page & Schema Implementation",
        description: "Updating page titles, meta descriptions, image alt tags, internal links, and structured data."
      },
      {
        step: "04",
        title: "Authority Building & Backlinks",
        description: "Securing authoritative references and high-reputation domain mentions."
      },
      {
        step: "05",
        title: "Performance Monitoring & Algorithm Updates",
        description: "Reviewing search console metrics, tracking ranking jumps, and adapting to search engine updates."
      }
    ],
    techStack: ["Google Search Console", "Ahrefs", "Semrush", "Screaming Frog", "Schema.org", "Google Analytics 4"],
    benefits: [
      "Consistent stream of high-intent inbound inquiries without ongoing per-click ad costs",
      "Higher brand credibility when prospective clients find you at the top of Google",
      "Enhanced user experience from faster load speeds and structured navigation",
      "Compounding ROI that continues to yield business growth month after month"
    ]
  },
  {
    slug: "hosting-domain",
    title: "Hosting & Domain Management",
    tagline: "Enterprise-grade cloud infrastructure, 99.9% uptime reliability, automated backups, and SSL security.",
    category: "Cloud Infrastructure",
    heroImage: "/images/services/webdevelopment.jpg",
    theme: { bg: "#1f1313", fg: "#ffffff", accent: "#d8554f" },
    tags: ["SSL Security", "99.9% Uptime", "Daily Backups", "Cloud Servers", "DDoS Mitigation"],
    shortDescription: "We keep your website fast, secure, and online with reliable hosting solutions.",
    fullOverview: [
      "Your website cannot generate revenue if it is slow, unreachable, or compromised. Empire AE provides managed enterprise cloud hosting solutions that guarantee world-class reliability, enterprise-grade protection, and maximum speed.",
      "We manage the entire infrastructure lifecycle: DNS records, SSL certifications, automated offsite backups, edge CDN delivery, and continuous security monitoring, leaving you free to focus entirely on running your business."
    ],
    stats: [
      { value: "99.99%", label: "Uptime Guarantee" },
      { value: "< 50ms", label: "Global Edge DNS Latency" },
      { value: "Daily", label: "Automated Encrypted Backups" }
    ],
    keyDeliverables: [
      {
        title: "Dedicated Managed Cloud Hosting",
        description: "High-performance virtual servers configured specifically for your application's resource demands."
      },
      {
        title: "Global Content Delivery Network (CDN)",
        description: "Edge caching across hundreds of global nodes ensuring near-instant load speeds worldwide."
      },
      {
        title: "Automated Daily Offsite Backups",
        description: "Encrypted daily backups with one-click restore capabilities for complete disaster recovery."
      },
      {
        title: "Automated SSL & Security Hardening",
        description: "End-to-end HTTPS encryption, automated certificate renewals, and web application firewalls (WAF)."
      },
      {
        title: "DDoS Mitigation & Threat Prevention",
        description: "Continuous real-time traffic filtering preventing malicious attacks from impacting availability."
      },
      {
        title: "Domain DNS & Business Email Setup",
        description: "Professional DNS management, SPF/DKIM/DMARC email authentication, and MX record routing."
      }
    ],
    process: [
      {
        step: "01",
        title: "Resource & Bandwidth Assessment",
        description: "Analyzing expected concurrent traffic, storage requirements, and database complexity."
      },
      {
        step: "02",
        title: "Cloud Provisioning & Tuning",
        description: "Setting up hardened cloud instances, caching layers, and database optimization."
      },
      {
        step: "03",
        title: "Migration & Zero-Downtime Cutover",
        description: "Transferring existing files and databases seamlessly with zero disruption to users."
      },
      {
        step: "04",
        title: "Security & Backup Verification",
        description: "Testing SSL certificates, WAF rules, and automated backup snapshots."
      },
      {
        step: "05",
        title: "24/7 Monitoring & Maintenance",
        description: "Activating proactive uptime alerts, server patch management, and health checks."
      }
    ],
    techStack: ["AWS", "Cloudflare", "Vercel", "DigitalOcean", "Nginx", "Let's Encrypt", "Redis"],
    benefits: [
      "Guaranteed peace of mind with 99.99% uptime and redundant failover architecture",
      "Immediate protection against cyber threats, brute force attacks, and malware injection",
      "Lightning-fast server response times that directly improve Google Core Web Vitals",
      "Dedicated technical support handling all server configurations and domain renewals"
    ]
  },
  {
    slug: "software-application",
    title: "Software Application",
    tagline: "Custom enterprise software, internal ERPs, and workflow automation systems built for peak productivity.",
    category: "Custom Software",
    heroImage: "/images/services/operations.jpg",
    theme: { bg: "#1a1411", fg: "#ffedd7", accent: "#e8a15a" },
    tags: ["ERP Systems", "CRM", "Custom Software", "Process Automation", "Role-Based Access"],
    shortDescription: "We create custom software that streamlines workflows and boosts productivity.",
    fullOverview: [
      "Off-the-shelf software often forces your organization into rigid, inefficient processes that stifle productivity. Empire AE designs and develops custom software applications and enterprise resource planning (ERP) platforms tailored precisely to your operational workflow.",
      "From multi-department collaboration and automated inventory tracking to granular role-based access control and executive analytics dashboards, we engineer secure systems that eliminate manual data entry, reduce overhead, and scale alongside your business."
    ],
    stats: [
      { value: "60%", label: "Manual Workflow Reduction" },
      { value: "100%", label: "Bespoke to Your Business" },
      { value: "0", label: "Per-User License Fees" }
    ],
    keyDeliverables: [
      {
        title: "Custom ERP & CRM Platforms",
        description: "Centralized operational hubs managing customers, inventory, finances, and team workflows."
      },
      {
        title: "Role-Based Permissions & Auditing",
        description: "Granular administrative rights, multi-factor authentication, and tamper-proof action audit logs."
      },
      {
        title: "Workflow & Data Automation",
        description: "Automated report generation, cross-department notifications, and invoice processing."
      },
      {
        title: "Executive Business Intelligence Dashboards",
        description: "Real-time visual reporting on KPIs, profitability, team velocity, and business health."
      },
      {
        title: "Legacy System Modernization & Migration",
        description: "Modernizing outdated legacy databases and spreadsheets into intuitive, web-based applications."
      },
      {
        title: "REST & Webhook Integrations",
        description: "Seamless connectivity with banking APIs, third-party logistics, accounting software, and CRMs."
      }
    ],
    process: [
      {
        step: "01",
        title: "Business Process Mapping",
        description: "Shadowing your operational teams to identify bottlenecks, redundant steps, and data requirements."
      },
      {
        step: "02",
        title: "System Architecture & Database Modeling",
        description: "Designing relational database schemas, state machines, and microservice structures."
      },
      {
        step: "03",
        title: "Iterative Module Development",
        description: "Engineering and testing functional software modules in manageable agile milestones."
      },
      {
        step: "04",
        title: "User Acceptance Testing (UAT)",
        description: "Testing directly with end users to validate usability, speed, and business logic accuracy."
      },
      {
        step: "05",
        title: "Deployment, Training & Ongoing Evolution",
        description: "Migrating production data, conducting team training, and providing ongoing support."
      }
    ],
    techStack: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS", "Redis"],
    benefits: [
      "Software that molds to your unique operations rather than forcing you to alter your business model",
      "Elimination of expensive recurring per-seat subscription fees from third-party SaaS vendors",
      "Dramatic increase in operational throughput and elimination of human transcription errors",
      "Complete ownership and sovereignty over your proprietary business data and logic"
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  const normalizedSlug = slug.toLowerCase().trim();
  // Support aliases: web-design <-> web-designing
  if (normalizedSlug === "web-design") {
    return SERVICES_DATA.find((s) => s.slug === "web-designing");
  }
  return SERVICES_DATA.find((s) => s.slug === normalizedSlug);
}

export function getAllServices(): ServiceDetail[] {
  return SERVICES_DATA;
}

export function getAllServiceSlugs(): string[] {
  const slugs = SERVICES_DATA.map((s) => s.slug);
  slugs.push("web-design"); // alias
  return slugs;
}
