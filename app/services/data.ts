/**
 * app/services/data.ts
 * Content for the /services page and every /services/[slug] page.
 * (This file is not a route. It only holds data.)
 *
 * To change a picture: edit the `image` value  ->  "/images/services/yourfile.jpg"
 * (file inside public/images/services/, or a full "https://..." link).
 * The slug must match the link used in the navbar: /services/<slug>
 */
export type Highlight = { title: string; text: string };

export type ServiceDetail = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  bg: string;
  fg: string;
  accent: string;
  image: string;
  overview: string;
  highlights: Highlight[];
};

export const SERVICES: ServiceDetail[] = [
  {
    slug: "graphic-design",
    title: "Graphic Design",
    description: "We create visually compelling designs that build strong brand identities and make your business stand out.",
    tags: ["Brand Identity", "Social Media Creatives", "Marketing Materials"],
    bg: "#121414",
    fg: "#ffffff",
    accent: "#3dd6c6",
    image: "/images/services/graphic-design.jpg",
    overview:
      "Strong visuals help people notice your business and remember it. We design clear, consistent graphics that express your brand and look right everywhere your customers see you.",
    highlights: [
      { title: "Brand Identity", text: "Logos, colours and typography that give your business a distinct, consistent look." },
      { title: "Social Media Creatives", text: "Eye-catching posts and graphics designed for the platforms your audience uses." },
      { title: "Marketing Materials", text: "Brochures, flyers, banners and other materials that carry your message clearly." },
      { title: "Print and Digital Ready", text: "Files prepared correctly for both printing and online use." },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    description: "We build secure, scalable websites engineered for performance and growth.",
    tags: ["React / Next.js", "Node", "Python","MySql","MongoDB"],
    bg: "#121414",
    fg: "#ffffff",
    accent: "#3dd6c6",
    image: "/images/services/webdevelopment.jpg",
    overview:
      "We turn designs into fast, reliable websites and web applications. Our code is written to be secure, easy to maintain and ready to grow with your business.",
    highlights: [
      { title: "React / Next.js", text: "Modern, fast web applications with strong search engine visibility." },
      { title: "Node and Python", text: "Reliable back-end services, APIs and business logic built with Node and Python." },
      { title: "MySQL and MongoDB", text: "Well-structured databases, relational or document-based, chosen to fit your data." },
      { title: "Performance and Security", text: "Optimised loading speed and safe practices built in from the start." },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description: "We develop powerful Android and iOS apps for seamless user experiences.",
    tags: ["Android", "iOS", "Flutter","Python","Node","MySql"],
    bg: "#E3E3F8",
    fg: "#000000",
    accent: "#7b7be8",
    image: "/images/services/app-development.jpg",
    overview:
      "We build mobile apps that feel natural to use and run smoothly on the devices your customers already own, from first idea to store release.",
    highlights: [
      { title: "Android Apps", text: "Native Android apps built for the wide range of devices in use today." },
      { title: "iOS Apps", text: "Polished iPhone and iPad apps that follow platform design standards." },
      { title: "Flutter", text: "One shared codebase for both platforms, which saves time and cost." },
      { title: "Back-end and Database", text: "Secure APIs and databases built with Node, Python and MySQL to power your app." },
    ],
  },
  

{
  slug: "hosting-deployment",
  title: "Hosting & Deployment",
  description: "We provide reliable hosting and seamless deployment solutions for websites and mobile applications, from domain setup to going live.",
  tags: [
    "Website Hosting",
    "App Hosting",
    "Domain Registration",
    "Cloud Deployment"
  ],
  bg: "#E0E8F5",
  fg: "#101B2D",
  accent: "#4D83D8",
  image: "/images/services/hosting-deployment.png",
  overview:
    "From purchasing your domain to deploying your website and mobile application, we handle the complete hosting process. We configure hosting environments, connect domains, set up SSL certificates and ensure your digital products are accessible, secure and reliable.",
  highlights: [
    {
      title: "Domain Registration",
      text: "We help you choose and purchase the right domain name for your business and configure DNS settings."
    },
    {
      title: "Website Hosting",
      text: "We host and manage websites with reliable infrastructure, domain connectivity and smooth performance."
    },
    {
      title: "Mobile App Hosting",
      text: "We configure and deploy application backends, APIs and databases to reliable cloud hosting environments."
    },
    {
      title: "Deployment & Security",
      text: "We deploy websites and applications, configure SSL certificates and set up secure production environments."
    }
  ],
},

  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "We boost visibility and attract customers through result-driven digital strategies.",
    tags: ["SEO", "Social Media", "Content Marketing"],
    bg: "#111a13",
    fg: "#d9f3de",
    accent: "#5fbf7a",
    image: "/images/services/digital-marketing.jpg",
    overview:
      "We help the right people find your business and remember it. Our campaigns are planned around your goals and reviewed regularly so effort goes where it works.",
    highlights: [
      { title: "SEO", text: "Improving how your site ranks so customers can find you when they search." },
      { title: "Social Media", text: "Consistent, on-brand presence across the platforms your audience uses." },
      { title: "Content Marketing", text: "Useful articles, posts and creatives that build trust with your audience." },
      { title: "Campaign Reviews", text: "Regular check-ins to see what is working and adjust the plan." },
    ],
  },
  {
    slug: "e-commerce-application",
    title: "E-Commerce Application",
    description: "We build seamless online stores that turn visitors into loyal customers.",
    tags: ["WooCommerce", "Payment Gateway", "Inventory Management"],
    bg: "#BFE3FA",
    fg: "#0a2540",
    accent: "#6cb8ee",
    image: "/images/services/ecommerce.jpg",
    overview:
      "We build online stores that are simple to shop in and simple to manage. From product pages to checkout, every step is designed to make buying easy.",
    highlights: [
      { title: "WooCommerce", text: "Full-featured stores with the flexibility to grow as your catalogue grows." },
      { title: "Payment Gateway", text: "Secure online payments set up with the gateways your customers prefer." },
      { title: "Inventory Management", text: "Track stock, products and orders from one easy dashboard." },
      { title: "Smooth Checkout", text: "A short, clear buying process that helps visitors complete their order." },
    ],
  },
  {
    slug: "sales",
    title: "Sales",
    description: "We turn leads into long-term clients with a clear, consultative sales approach.",
    tags: ["Lead Generation", "Client Acquisition", "Business Development"],
    bg: "#1a1411",
    fg: "#ffedd7",
    accent: "#e8a15a",
    image: "/images/services/sales.jpg",
    overview:
      "We listen first, then recommend what actually fits your needs. Our consultative approach builds trust and turns first conversations into lasting working relationships.",
    highlights: [
      { title: "Lead Generation", text: "Finding and reaching businesses that are a good fit for your offering." },
      { title: "Client Acquisition", text: "Guiding interested prospects from first contact through to a signed project." },
      { title: "Business Development", text: "Building partnerships and new opportunities for steady, long-term growth." },
      { title: "Consultative Approach", text: "Honest advice based on your goals, not a one-size-fits-all pitch." },
    ],
  },
  {
    slug: "seo",
    title: "SEO",
    description: "We improve search rankings, increase organic traffic, and grow your online reach.",
    tags: ["On-Page SEO", "Off-Page SEO", "Keyword Optimization"],
    bg: "#121414",
    fg: "#ffffff",
    accent: "#3dd6c6",
    image: "/images/services/seo.jpg",
    overview:
      "We help search engines understand your website and help customers find it. Steady, ethical optimisation brings in visitors who are already looking for what you offer.",
    highlights: [
      { title: "On-Page SEO", text: "Page titles, content and structure improved so each page is clear to search engines." },
      { title: "Off-Page SEO", text: "Building your site's authority through quality links and online mentions." },
      { title: "Keyword Optimization", text: "Researching the words your customers search and using them in the right places." },
      { title: "Progress Tracking", text: "Regular reports on rankings and traffic so you can see the results." },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

/** The same four steps are shown on every service page. */
export const PROCESS: Highlight[] = [
  { title: "Discover", text: "We learn about your business, your goals and your audience." },
  { title: "Plan", text: "We agree on scope, timeline and the best approach for your project." },
  { title: "Deliver", text: "We build and refine the work, sharing progress along the way." },
  { title: "Support", text: "We stay available after launch to help you keep improving." },
];