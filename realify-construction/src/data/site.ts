/**
 * ─────────────────────────────────────────────────────────────
 *  REALITY CONSTRUCTION — SITE CONTENT
 *  Edit everything on the website from this one file.
 *  Items marked  [PLACEHOLDER]  must be replaced before launch.
 * ─────────────────────────────────────────────────────────────
 */

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=2000`; // stock placeholder
const img = (name: string) => `/images/${name}.jpg`; // real Realify Construction photos in /public/images

export const site = {
  name: "Realify Construction",
  partner: "Realify Investments",
  serviceArea: "Bulawayo", // used in title + hero subheading
  url: "https://www.realifyshop.co.zw", // live domain (from your flyers)
  tagline: "Built with Integrity. Designed for Generations.",
  description:
    "Realify Construction builds, renovates and develops homes and commercial spaces across Bulawayo and Zimbabwe — with quality, transparency and on-time delivery. In partnership with Realify Investments.",
  ogImage: img("grey-home-exterior"),

  contact: {
    phone: "+263 77 241 8288",
    phoneHref: "tel:+263772418288",
    whatsapp: "263772418288", // international format, digits only
    whatsappMessage: "Hello Realify Construction, I'd like to discuss a project.",
    email: "info@realifyshop.co.zw", // [PLACEHOLDER] confirm email
    address: "19 Elliston Road, Bulawayo, Zimbabwe",
    hours: "Mon – Fri · 8:00 – 17:30",
    mapEmbed: "https://www.google.com/maps?q=19+Elliston+Road,+Bulawayo,+Zimbabwe&output=embed",
  },

  social: [
    { label: "Facebook", href: "https://www.facebook.com/realifyinvestments/" },
    { label: "Mtaalamu", href: "https://www.mtaalamu.com/member/10336" },
  ],

  nav: [
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Invest", href: "#invest" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    image: img("grey-home-exterior"),
    imageAlt: "A completed single-storey home with grey plaster walls, a stacked-stone feature column and black-framed glass doors",
    eyebrow: "Construction · Development · Renovation",
    title: "Built with Integrity.\nDesigned for Generations.",
    subheading: "Construction, development and renovation across Bulawayo and beyond.",
  },

  intro: {
    eyebrow: "About Us",
    heading: "Quiet confidence, carried through every wall we raise.",
    founder: "[Owner Name]", // [PLACEHOLDER]
    years: "[X]", // [PLACEHOLDER] years of experience
    paragraphs: [
      "Realify Construction is a Bulawayo-based builder and developer, working hand in hand with Realify Investments to deliver homes, commercial spaces and turnkey developments that are made to last.",
      "Founded by {founder}, the company brings {years} years of experience to every site — from the first foundation pour to the final coat of paint. We believe a building should feel as considered as it looks.",
    ],
    values: [
      { title: "Quality", text: "Honest materials and careful workmanship, inspected at every stage." },
      { title: "Transparency", text: "Clear quotes, open communication and no surprises along the way." },
      { title: "On-time delivery", text: "Realistic programmes, respected deadlines and a site run with discipline." },
    ],
  },

  services: [
    {
      title: "Residential Construction",
      text: "Custom homes built from the ground up — foundations, structure, roofing and finishes, delivered turnkey.",
      image: img("aerial-family-home"),
      alt: "Aerial view of a family home under construction, with a dark metal roof and brick walls",
    },
    {
      title: "Commercial Builds",
      text: "Offices, retail and steel-frame buildings planned for efficiency and built to code.",
      image: img("commercial-kitchen-refurb"),
      alt: "A commercial kitchen mid-refurbishment, with new white wall tiles going up",
    },
    {
      title: "Renovations & Remodelling",
      text: "Kitchens, bathrooms, additions and structural repairs that breathe new life into existing spaces.",
      image: img("bathroom-vanity"),
      alt: "A renovated bathroom with a white double vanity and two vessel basins",
    },
    {
      title: "Project Management",
      text: "One accountable team overseeing programme, budget, trades and quality from start to finish.",
      image: img("site-excavation"),
      alt: "Workers in hi-vis vests digging foundation trenches in red soil",
    },
    {
      title: "Property Development",
      text: "End-to-end development with Realify Investments — from land and approvals to completed, valuable assets.",
      image: img("concrete-slab"),
      alt: "A builder finishing a freshly poured concrete slab on a hillside development",
    },
    {
      title: "Interior Finishing",
      text: "Tiling, flooring, drywall and paintwork — the quiet details that make a space feel complete.",
      image: img("living-room-finish"),
      alt: "A finished living space with grey walls, a feature column, polished tiles and pendant lights",
    },
  ],

  featured: {
    eyebrow: "Featured Project",
    name: "[Flagship Project Name]", // [PLACEHOLDER]
    location: "Bradfield, Bulawayo", // [PLACEHOLDER]
    scope: "Turnkey residential build · Foundations to finishes",
    year: "[Year]", // [PLACEHOLDER]
    text: "A generous family home taken from concept render to reality — dark tiled roof, a stacked-stone feature wall and a paved arrival court laid by our own team. Delivered turnkey, with every detail resolved on site.",
    image: img("completed-home-paving"),
    alt: "A completed family home with a dark tiled roof and stone feature wall, with the team laying the paved driveway",
    detailImage: img("charcoal-kitchen"),
    detailAlt: "Charcoal kitchen with a timber-clad island, black stone countertop and pendant lights",
    link: "#projects",
  },

  process: {
    eyebrow: "Craftsmanship",
    heading: "A considered process, from first conversation to final key.",
    intro:
      "Good buildings are never rushed and never left to chance. Our process is simple, transparent and built around you — so you always know where your project stands.",
    image: img("bricklaying"),
    alt: "A bricklayer on scaffolding laying a face-brick wall",
    steps: [
      { title: "Consultation", text: "We listen first — your goals, site, budget and timeline — and give honest advice on what is possible." },
      { title: "Design & Planning", text: "Drawings, approvals, a clear itemised quote and a realistic programme, agreed before work begins." },
      { title: "Build", text: "A disciplined site, skilled trades and regular progress updates, with quality checked at every stage." },
      { title: "Handover", text: "A final walkthrough, snag list closed and keys handed over — with support long after we leave." },
    ],
  },

  portfolio: {
    eyebrow: "Projects",
    heading: "Selected work",
    filters: ["All", "Residential", "Commercial", "Renovation"] as const,
    items: [
      { title: "Family Home & Paving", category: "Residential", location: "Turnkey build", image: img("completed-home-paving"), alt: "Completed family home with the paved driveway being laid" },
      { title: "Charcoal Kitchen", category: "Residential", location: "Kitchen & interior finishing", image: img("charcoal-kitchen"), alt: "Charcoal kitchen with timber-clad island and pendant lights" },
      { title: "Double Vanity Bathroom", category: "Renovation", location: "Bathroom remodel", image: img("bathroom-vanity"), alt: "White double vanity with two vessel basins and chrome mixers" },
      { title: "Family Home in Progress", category: "Residential", location: "Structure & roofing", image: img("aerial-family-home"), alt: "Aerial view of a home under construction with a dark metal roof" },
      { title: "Living Space Finish", category: "Residential", location: "Ceilings, tiling & paint", image: img("living-room-finish"), alt: "Grey living space with feature column, bulkhead ceiling and polished tiles" },
      { title: "Commercial Kitchen Refurbishment", category: "Commercial", location: "Strip-out & re-tiling", image: img("commercial-kitchen-refurb"), alt: "Commercial kitchen being re-tiled during refurbishment" },
      { title: "White Shaker Kitchen", category: "Residential", location: "Kitchen fit-out", image: img("white-shaker-kitchen"), alt: "White shaker kitchen with island, black tops and mosaic splashback" },
      { title: "Timber Kitchen", category: "Renovation", location: "Kitchen remodel", image: img("timber-kitchen"), alt: "Mahogany-finish kitchen with white subway tile splashback" },
      { title: "Flat Roof Waterproofing", category: "Commercial", location: "Torch-on membrane", image: img("roof-waterproofing"), alt: "Torch-on waterproofing membrane applied to a flat roof" },
      { title: "White Gloss Kitchen", category: "Residential", location: "Kitchen fit-out", image: img("white-gloss-kitchen"), alt: "White gloss handleless kitchen with black stone island" },
      { title: "Kitchen Installation", category: "Renovation", location: "Work in progress", image: img("kitchen-install-progress"), alt: "Kitchen carcasses being installed mid-renovation" },
      { title: "Slab Pour", category: "Residential", location: "Structure", image: img("concrete-slab"), alt: "Builder finishing a concrete slab with formwork in place" },
    ],
  },

  invest: {
    eyebrow: "Realify Investments",
    heading: "Build value together.",
    text: "Through our partner Realify Investments, clients and investors can take part in carefully selected residential and commercial developments — sharing in the value we create, with the same transparency we bring to every build.",
    image: u("1448630360428-65456885c650"),
    alt: "A row of completed residential homes in a new development",
    points: [
      { title: "Co-develop", text: "Bring land or capital and partner with us on a development from feasibility to completion." },
      { title: "Invest in projects", text: "Participate in vetted developments with clear reporting at every milestone." },
      { title: "Own the result", text: "Acquire finished homes and commercial units built to our standard." },
    ],
    cta: { label: "Explore Investment Opportunities", href: "#contact" },
  },

  // [PLACEHOLDER] Replace with real, attributed client reviews before launch.
  testimonials: [
    { quote: "Placeholder review — replace with a real client quote about the quality and care of their build.", name: "[Client Name]", role: "Homeowner, Bulawayo" },
    { quote: "Placeholder review — replace with a real client quote about communication, transparency and pricing.", name: "[Client Name]", role: "Business owner" },
    { quote: "Placeholder review — replace with a real client quote about the project being delivered on time.", name: "[Client Name]", role: "Renovation client" },
  ],

  // [PLACEHOLDER] Replace values with real figures.
  stats: [
    { value: "[#]", label: "Projects completed" },
    { value: "[#]", label: "Years of experience" },
    { value: "[#]", label: "Happy clients" },
    { value: "[#]", label: "Service areas" },
  ],

  form: {
    projectTypes: [
      "Residential Construction",
      "Commercial Build",
      "Renovation / Remodelling",
      "Project Management",
      "Property Development",
      "Interior Finishing",
      "Investment Enquiry",
      "Other",
    ],
    budgets: ["Under US$10,000", "US$10,000 – 50,000", "US$50,000 – 150,000", "US$150,000 – 500,000", "US$500,000+", "Not sure yet"],
    // Optional: set a Formspree (or similar) endpoint to receive submissions by email.
    // Leave empty to open the visitor's email app with the message pre-filled.
    endpoint: "",
  },

  footer: {
    tagline: "Built with integrity. Designed for generations.",
    privacyHref: "#privacy", // [PLACEHOLDER] link to your privacy policy page
  },
};

export type Site = typeof site;
