import type { Project } from "@/types";

/* ------------------------------------------------------------------ */
/*  PROJECTS — source of truth: mohamedromanaCV.pdf + app screenshots. */
/*                                                                     */
/*  Link policy (per owner): store buttons use "#" placeholders that   */
/*  must be replaced with real URLs. AdEC is a government/NDA project   */
/*  and is intentionally marked Private with no public links.          */
/*  Any project with `needsContentReview: true` has copy NOT found in  */
/*  the CV and must be confirmed by the owner.                         */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    slug: "adec-request",
    name: "AdEC Request",
    tagline: "Enterprise engineering-request platform for the Roads General Authority (RGA), Saudi Arabia.",
    category: "Enterprise / GovTech",
    platform: "both",
    accent: "#0ea5e9",
    imageCount: 4,
    storeShots: true,
    featured: true,
    isPrivate: false,
    links: {
      appStore: "https://apps.apple.com/us/app/adec-request/id6747982866",
      playStore: "https://play.google.com/store/apps/details?id=com.app.adecrequest",
    },
    overview:
      "A large-scale Flutter application built for the Roads General Authority (RGA) in Saudi Arabia, delivered through ADEC (Advanced Company for Engineering Consultancy). The app connects contractors, consultants, engineers, and administrative branches inside a single digital system for managing engineering requests and project inspections.",
    problem:
      "Government engineering work spanned five different stakeholder roles whose requests, approvals, and field inspections lived in disconnected processes. Coordinating complex request lifecycles, geolocated inspections, and heavy field media at government scale demanded a unified, reliable, real-time platform with strict data integrity.",
    solution:
      "I implemented a multi-role workflow driven by BLoC and a Finite State Machine that models complex request lifecycles deterministically across all five roles. Inspections are geolocated with Google Maps and Geolocator, field documents/photos/videos are handled through enterprise-grade media uploads, and Firebase Push Notifications keep every stakeholder instantly informed — all tuned for government-level performance and integrity.",
    role:
      "Flutter Developer — owned the multi-role architecture, the request-lifecycle state machine, geolocation inspection flows, media handling, and notification integration.",
    features: [
      "Multi-role workflow across 5 distinct user roles",
      "Request lifecycle managed by a Finite State Machine",
      "Geolocation-based field inspections (Google Maps + Geolocator)",
      "Enterprise media uploads — documents, photos & videos",
      "Real-time data synchronisation between stakeholders",
      "Firebase push notifications for instant updates",
      "Responsive, government-grade UI with ScreenUtil",
    ],
    stack: [
      "Flutter",
      "Dart",
      "BLoC",
      "Finite State Machine",
      "Firebase",
      "REST APIs",
      "Google Maps API",
      "Geolocator",
      "ScreenUtil",
    ],
    decisions: [
      "Modelled the request lifecycle as a Finite State Machine so every transition is explicit, predictable, and auditable across roles.",
      "Chose BLoC to keep five role-specific flows isolated yet consistent, with a scalable and testable state layer.",
      "Standardised responsive sizing with ScreenUtil to keep the dense, data-heavy UI consistent across devices.",
    ],
    challenges: [
      {
        challenge:
          "Coordinating a complex, multi-step request lifecycle across five different roles without ambiguous or invalid states.",
        solution:
          "A Finite State Machine layered on BLoC made every transition explicit and guarded, eliminating invalid states and keeping role behaviour deterministic.",
      },
      {
        challenge:
          "Uploading large engineering documents, photos, and videos from field sites with poor connectivity while preserving data integrity.",
        solution:
          "Built enterprise-level media handling with resilient upload flows and integrity checks suited to government-level operations.",
      },
    ],
  },

  {
    slug: "satha",
    name: "Satha",
    tagline: "On-demand flatbed tow-truck platform — customer, driver & admin apps that rescue stranded cars on the road.",
    category: "Roadside Assistance",
    platform: "android",
    accent: "#f97316",
    imageCount: 7,
    storeShots: true,
    featured: false,
    isPrivate: false,
    links: {
      drive: "https://drive.google.com/file/d/1WNilV-Ve87c87OSdAf4F9NdIrxJidkZF/view",
    },
    overview:
      "Satha (سطحة) is a complete on-demand roadside-rescue platform that gets a flatbed tow truck to a stranded car within minutes — no matter the problem. It spans three connected apps: a customer app to request and track a tow, a driver app for tow operators to receive and fulfil requests, and an admin dashboard to manage customers, drivers, and live orders across the whole system.",
    problem:
      "When a car breaks down on the road, the driver is stuck with no fast, transparent way to find a nearby tow truck, agree on a fair price, and know when help will actually arrive. At the same time, tow operators need a steady stream of jobs and the business needs oversight of every customer, driver, and order — none of which existed in one connected system.",
    solution:
      "I built the full platform end-to-end: a customer app with a 5-step request flow and a competing-offers system so customers pick the best price, a driver app with an availability toggle, daily earnings, ratings, and trip management, and an admin dashboard with live platform stats and management of customers, drivers, and orders. A live status timeline, real-time chat, Google Maps tracking, and Firebase notifications keep all three sides in sync.",
    role:
      "Flutter Developer — built all three apps (customer, driver, and admin) end-to-end: the request and offers flows, driver job management, the admin dashboard, live order tracking, real-time chat, maps, and notifications.",
    features: [
      "Three connected apps — customer, driver & admin — on one platform",
      "Customer: guided 5-step tow request (service type, vehicle, problem, location, confirm)",
      "Tow-type selection — standard or hydraulic flatbed",
      "Competing offers — operators bid and the customer chooses the best price",
      "Live order timeline — sent, driver assigned, arrived, en route, completed",
      "Driver app — availability toggle, daily orders, earnings & ratings dashboard",
      "Admin dashboard — totals for customers, drivers & active orders with management",
      "In-app chat with voice notes, live location & photo sharing",
      "Firebase push notifications at every stage of the rescue",
    ],
    stack: [
      "Flutter",
      "Dart",
      "BLoC",
      "Dio",
      "REST APIs",
      "Firebase",
      "Firebase Messaging",
      "Google Maps API",
      "Geolocator",
      "ScreenUtil",
    ],
    decisions: [
      "Built three role-specific apps on a shared architecture so customer, driver, and admin experiences stay consistent while each is tailored to its user.",
      "Designed an offer/bidding flow rather than fixed pricing, letting operators compete and customers choose — which required keeping a single order in sync across multiple incoming offers.",
      "Used BLoC with Dio and Firebase messaging so live tracking, chat, and notifications all stay consistent across every side of the platform.",
    ],
    challenges: [
      {
        challenge:
          "Keeping a single order in sync across three different apps — customer, driver, and admin — as its status and competing offers change in real time.",
        solution:
          "A BLoC-driven order state combined with Firebase messaging keeps every side's view of an order live and accurate, from the customer's offers list to the driver's job and the admin's dashboard.",
      },
      {
        challenge:
          "Communicating a fast-moving roadside rescue clearly to a stressed customer who needs to know what's happening right now.",
        solution:
          "A simple status timeline plus real-time chat (voice, location, photos) gives the customer instant, unambiguous visibility into the rescue at every step.",
      },
    ],
  },

  {
    slug: "speak-mate",
    name: "Speak Mate",
    tagline: "Speech-therapy companion for people with special needs — an AAC board, guided exercises, and therapist follow-up.",
    category: "Health / Accessibility",
    platform: "android",
    accent: "#6366f1",
    imageCount: 10,
    storeShots: true,
    featured: false,
    isPrivate: false,
    links: {
      drive: "https://drive.google.com/file/d/1J6u42cEEEe19DG7ZEAoEZXvwkmts1dnu/view",
    },
    overview:
      "Speak Mate is a speech-therapy and communication companion for people with special needs. It pairs an AAC communication board — where users tap symbols to build a sentence and have it spoken aloud — with gamified pronunciation exercises, an AI assistant, progress tracking, and direct follow-up with speech therapists, all wrapped in a deeply accessible interface.",
    problem:
      "People with speech and communication difficulties need more than a single tool: a way to communicate when speaking is hard, structured practice to improve pronunciation, a way to stay connected to their therapist between sessions, and an interface built around accessibility — rarely found together in one app.",
    solution:
      "I built a multi-surface app: an AAC board that turns tapped symbols into spoken sentences via text-to-speech, gamified exercises (sound articulation, verbal puzzles, sound matching) with progress tracking, an AI assistant for support when the therapist is offline, real-time chat and calls with speech specialists, and a full accessibility layer — adjustable text size, high-contrast mode, voice commands, light/dark themes, Arabic/English, and an offline mode.",
    role:
      "Flutter Developer — built the AAC communication board and text-to-speech, the exercises and progress dashboard, the AI assistant and therapist chat, and the accessibility settings layer.",
    features: [
      "AAC communication board — tap symbols to build a sentence, then speak it aloud (text-to-speech)",
      "Categorised symbols — basics, food, feelings & actions",
      "Gamified exercises — sound articulation, verbal puzzles & sound matching with progress",
      "Progress dashboard — pronunciation accuracy, completed sessions, streaks & trend chart",
      "AI assistant for guidance and practice when a specialist is offline",
      "Therapist follow-up — real-time chat, voice notes, voice & video calls",
      "Accessibility layer — text size, high-contrast mode & voice commands",
      "Light/dark themes, Arabic & English, and an offline mode for practising without internet",
    ],
    stack: [
      "Flutter",
      "Dart",
      "BLoC",
      "Text-to-Speech",
      "REST APIs",
      "Firebase",
      "Local Storage",
    ],
    decisions: [
      "Treated accessibility as a first-class feature — adjustable text size, high contrast, voice commands, and bilingual RTL/LTR support — rather than an afterthought.",
      "Gamified practice with progress, streaks, and a trend chart to keep users motivated to return daily.",
      "Added an offline mode so exercises and recordings keep working without a connection, syncing when back online.",
    ],
    challenges: [
      {
        challenge:
          "Designing a single interface usable by people with a wide range of abilities, including non-verbal users.",
        solution:
          "An AAC board with large symbol tiles and text-to-speech lets non-verbal users communicate, while an adjustable accessibility layer (text size, contrast, voice commands) adapts the whole app to each person's needs.",
      },
      {
        challenge:
          "Keeping users engaged with repetitive speech practice over time.",
        solution:
          "Exercises are gamified with progress bars, streaks, and an accuracy trend chart, turning daily practice into visible, motivating momentum.",
      },
    ],
  },

  {
    slug: "almustarih",
    name: "Almustarih",
    tagline: "Auto-parts & car-service marketplace connecting owners, vendors, and workshops.",
    category: "Service Marketplace",
    platform: "both",
    accent: "#22d3ee",
    imageCount: 5,
    storeShots: true,
    featured: true,
    isPrivate: false,
    links: {
      appStore:
        "https://apps.apple.com/us/app/%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D8%B1%D9%8A%D8%AD/id6757157320",
      playStore: "https://play.google.com/store/apps/details?id=com.efadh.almustarih",
    },
    overview:
      "A comprehensive mobile application for the Almustarih platform — a service marketplace that connects car owners, spare-parts vendors, and service workshops. Customers browse and purchase auto parts, schedule car maintenance, and track deliveries in real time.",
    problem:
      "Car owners, spare-parts vendors, and workshops had no single channel to transact, communicate, and coordinate deliveries — making part sourcing and maintenance slow and fragmented.",
    solution:
      "I built a multi-role system that enables seamless communication between clients, delivery drivers, and service centres. State is managed with BLoC, APIs are handled with Dio, Firebase powers push notifications and messaging, and Google Maps provides live location tracking for deliveries.",
    role:
      "Flutter Developer — implemented the multi-role architecture, BLoC state layer, Dio networking, Firebase messaging/notifications, and Google Maps tracking.",
    features: [
      "Browse & purchase auto parts",
      "Schedule car maintenance services",
      "Real-time delivery tracking on Google Maps",
      "Multi-role flows — clients, drivers & service centres",
      "In-app messaging between parties",
      "Firebase push notifications",
    ],
    stack: ["Flutter", "Dart", "BLoC", "Dio", "Firebase", "Google Maps API", "REST APIs"],
    decisions: [
      "Used BLoC to keep distinct client / driver / service-centre experiences cleanly separated yet consistent.",
      "Centralised networking on Dio for interceptors, structured error handling, and predictable API calls.",
      "Combined Firebase messaging with Google Maps so order updates and live tracking stay in sync.",
    ],
    challenges: [
      {
        challenge:
          "Keeping three different user types — clients, drivers, and service centres — in sync around a single order in real time.",
        solution:
          "A shared BLoC-driven data flow plus Firebase messaging kept every party's view of an order consistent as its status changed.",
      },
    ],
  },

  {
    slug: "alaswak",
    name: "Alaswak",
    tagline: "Multi-store commerce bringing electronics shops, restaurants, and cafés into one app.",
    category: "E-commerce",
    platform: "both",
    accent: "#7c3aed",
    imageCount: 4,
    storeShots: true,
    featured: true,
    isPrivate: false,
    links: {
      appStore:
        "https://apps.apple.com/us/app/%D8%A7%D9%84%D8%A3%D8%B3%D9%88%D8%A7%D9%82/id6747349206",
      playStore: "https://play.google.com/store/apps/details?id=com.efadh.alaswak",
    },
    overview:
      "Alaswak brings electronics stores, restaurants, and cafés together in one place, so customers can find what they want fast, order, and get it delivered to their door — a smooth shopping experience with smart suggestions, easy checkout, and real-time order tracking.",
    problem:
      "Shoppers had to juggle separate apps for electronics, food, and cafés, with inconsistent checkout and no unified way to track their orders.",
    solution:
      "I built a single, multi-store commerce experience with smart product suggestions, a streamlined checkout, and real-time order tracking — so every purchase feels simpler and quicker regardless of the store type.",
    role:
      "Flutter Developer — implemented the multi-store browsing experience, cart and checkout flows, and real-time order tracking.",
    features: [
      "Unified browsing across electronics, restaurants & cafés",
      "Smart product suggestions",
      "Streamlined, easy checkout",
      "Real-time order tracking",
      "Per-store catalogues and offers",
    ],
    stack: ["Flutter", "Dart", "BLoC", "REST APIs", "Firebase"],
    decisions: [
      "Designed a flexible catalogue model so different store types (retail vs. food) share one browsing and checkout flow.",
      "Used a reactive state layer to reflect order status changes immediately in the UI.",
    ],
    challenges: [
      {
        challenge:
          "Unifying very different store types — electronics, restaurants, and cafés — under one consistent shopping and checkout experience.",
        solution:
          "A shared catalogue and checkout abstraction let each store type plug in while keeping the customer experience uniform.",
      },
    ],
  },

  {
    slug: "makhdom",
    name: "Makhdom",
    tagline: "On-demand app connecting customers with professional technicians for daily services.",
    category: "On-Demand Services",
    platform: "both",
    accent: "#0ea5e9",
    imageCount: 6,
    storeShots: true,
    featured: false,
    isPrivate: false,
    links: {
      appStore:
        "https://apps.apple.com/us/app/%D9%85%D8%AE%D9%80%D8%AF%D9%88%D9%85-%D9%85%D9%83%D9%81%D9%8A/id6739352807",
      playStore: "https://play.google.com/store/apps/details?id=com.efadh.makhdom",
    },
    overview:
      "A mobile application that connects customers with professional technicians for a range of daily services, with quick service requests, provider matching, and seamless in-app interaction between users and providers.",
    problem:
      "Finding a trusted technician for everyday services was slow and informal, with no structured way to request help or communicate with providers.",
    solution:
      "I built quick service-request flows, a provider-matching experience, and in-app interaction so customers and technicians can connect and coordinate smoothly inside a single app.",
    role:
      "Flutter Developer — implemented the request flows, provider matching experience, and user/provider interaction screens.",
    features: [
      "Quick service requests",
      "Customer ↔ provider matching",
      "Seamless in-app interaction",
      "Service categories for daily needs",
    ],
    stack: ["Flutter", "Dart", "BLoC", "REST APIs", "Firebase"],
    decisions: [
      "Kept the request flow short and guided to reduce friction for first-time users.",
      "Separated customer and provider experiences while sharing core service logic.",
    ],
    challenges: [
      {
        challenge: "Matching customers to the right provider quickly and clearly.",
        solution:
          "A focused matching flow surfaces relevant providers and lets both sides interact in-app without leaving the experience.",
      },
    ],
  },

  {
    slug: "wasal",
    name: "Wasal",
    tagline: "Lightweight delivery app connecting customers with couriers for meals and store items.",
    category: "Delivery",
    platform: "both",
    accent: "#22d3ee",
    imageCount: 5,
    featured: false,
    isPrivate: false,
    links: {
      appStore: "https://apps.apple.com/us/app/wasal-%D9%88%D8%A7%D8%B5%D9%84/id6754983789",
      playStore: "https://play.google.com/store/apps/details?id=com.efadh.wasal",
    },
    overview:
      "Wasal is a lightweight delivery app — first built as a Flutter training project — that connects customers with couriers to order meals and store items quickly and without hassle. It includes real-time order tracking through to doorstep delivery and full authentication for a simple, secure experience.",
    problem:
      "Customers wanted a fast, no-friction way to order meals and store items and follow their delivery, without a heavy or complicated app.",
    solution:
      "I built a focused delivery flow with full authentication and real-time order tracking from checkout through to doorstep delivery, keeping the experience simple and secure.",
    role:
      "Flutter Developer — built the app end-to-end, including authentication and the real-time order-tracking flow.",
    features: [
      "Order meals & store items",
      "Real-time order tracking to the doorstep",
      "Full authentication",
      "Simple, secure experience",
    ],
    stack: ["Flutter", "Dart", "BLoC", "REST APIs", "Authentication"],
    decisions: [
      "Kept the scope lightweight and the flow linear to make ordering effortless.",
      "Built authentication and tracking as the two core pillars of the experience.",
    ],
    challenges: [
      {
        challenge:
          "Delivering reliable real-time order tracking in a deliberately lightweight app.",
        solution:
          "A streamlined state-driven tracking flow keeps status updates live without adding unnecessary complexity.",
      },
    ],
  },

  {
    slug: "plan-a",
    name: "Plan A",
    tagline: "Smart travel companion that simplifies visas and passport renewals for international trips.",
    category: "Travel",
    platform: "android",
    accent: "#7c3aed",
    imageCount: 5,
    featured: false,
    isPrivate: false,
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.efadh.visa",
    },
    overview:
      "Plan A is a smart travel companion that takes the hassle out of international trips — making visas and passport renewals simple, clear, and stress-free. It guides travellers from planning to approval with accurate requirements and a smooth, secure experience.",
    problem:
      "Visa and passport-renewal processes are confusing and stressful, with scattered requirements and no clear path from planning to approval.",
    solution:
      "I built a guided experience that walks travellers from planning to approval with accurate requirements at each step, so they can travel confidently and with less stress.",
    role:
      "Flutter Developer — implemented the guided requirement flows and the supporting screens for planning and approvals.",
    features: [
      "Guided visa & passport-renewal flows",
      "Accurate, step-by-step requirements",
      "Planning-to-approval journey",
      "Smooth, secure experience",
    ],
    stack: ["Flutter", "Dart", "BLoC", "REST APIs"],
    decisions: [
      "Structured the experience as a clear, sequential journey to reduce the anxiety around paperwork.",
      "Presented requirements explicitly so travellers always know the next step.",
    ],
    challenges: [
      {
        challenge:
          "Turning complex, country-specific travel requirements into a clear and calm user flow.",
        solution:
          "A guided, step-by-step structure presents only what's relevant at each stage, from planning through to approval.",
      },
    ],
  },

  {
    slug: "hidaya",
    name: "Hidaya",
    tagline: "A meaningful Quran companion for reading, listening, and reflecting — anywhere.",
    category: "Islamic / Lifestyle",
    platform: "android",
    accent: "#22d3ee",
    imageCount: 6,
    featured: false,
    isPrivate: false,
    links: {
      drive: "https://drive.google.com/file/d/1d37emftBsUUegvs4V7mb26TXGyUToAqC/view",
    },
    overview:
      "Hidaya (هداية) is a meaningful Quran companion designed to make reading, listening, and reflecting on the Holy Quran simple, accessible, and peaceful. It keeps users connected to their daily recitation with clear Surah navigation, accurate verses, audio playback, and bookmarks.",
    problem:
      "Staying consistent with daily recitation needs an app that is calm and easy to use — with accurate verses, reliable audio, and a simple way to pick up where you left off.",
    solution:
      "I built a peaceful, easy-to-use experience with clear Surah navigation, accurate verses, audio playback, and bookmarks, so users can read, listen, and reflect anytime, wherever they are.",
    role:
      "Flutter Developer — implemented Surah navigation, the verse reading experience, audio playback, and bookmarking.",
    features: [
      "Clear Surah navigation",
      "Accurate verses",
      "Audio playback",
      "Bookmarks for daily recitation",
      "Calm, accessible experience",
    ],
    stack: ["Flutter", "Dart", "Audio Playback", "Local Storage"],
    decisions: [
      "Prioritised a calm, distraction-free reading experience above all else.",
      "Paired reliable audio playback with bookmarks to support a consistent daily habit.",
    ],
    challenges: [
      {
        challenge: "Presenting accurate verses and reliable audio in a clean, peaceful interface.",
        solution:
          "A focused reading and listening experience with clear navigation and bookmarks keeps users connected to their daily recitation.",
      },
    ],
  },

  {
    slug: "pocket-mind",
    name: "Pocket Mind",
    tagline: "A smart productivity companion for ideas, notes, tasks, and reminders.",
    category: "Productivity",
    platform: "android",
    accent: "#0ea5e9",
    imageCount: 6,
    featured: false,
    isPrivate: false,
    links: {
      drive: "https://drive.google.com/file/d/13MJHZEczcWH1m1ZGbqVCoSZ3qUjtBEPQ/view",
    },
    overview:
      "Pocket Mind is a smart personal productivity companion designed to help you capture ideas, organise your thoughts, and stay focused throughout the day. It keeps notes, tasks, reminders, and important moments in one simple, easy-to-use space.",
    problem:
      "Ideas, tasks, and reminders tend to scatter across different places, making it hard to stay organised and focused.",
    solution:
      "I built a single, simple space to capture ideas and keep notes, tasks, reminders, and important moments together — so users can clear their mind and stay organised.",
    role:
      "Flutter Developer — built the notes, tasks, and reminders experience and the overall productivity flow.",
    features: [
      "Capture ideas quickly",
      "Notes & organised thoughts",
      "Tasks & reminders",
      "Important moments in one place",
      "Simple, focused experience",
    ],
    stack: ["Flutter", "Dart", "Local Storage"],
    decisions: [
      "Kept everything in one simple space to reduce the friction of staying organised.",
      "Designed for quick capture so ideas aren't lost.",
    ],
    challenges: [
      {
        challenge: "Combining notes, tasks, reminders, and moments without overwhelming the user.",
        solution:
          "A single, easy-to-use space unifies them with a focused interface that keeps the day organised.",
      },
    ],
  },

  {
    slug: "unicourse",
    name: "Unicourse",
    tagline: "A smart learning companion to discover courses and track your progress.",
    category: "EdTech",
    platform: "android",
    accent: "#7c3aed",
    imageCount: 4,
    featured: false,
    isPrivate: false,
    links: {
      drive: "https://drive.google.com/file/d/14o8DWu8C1HTQ7ZLoan9gLcMpi3qRS-aP/view",
    },
    overview:
      "Unicourse is a smart learning companion designed to make the educational journey simpler, more organised, and more engaging. It helps learners discover courses, access learning materials, follow their progress, and stay on track — all in one smooth, easy-to-use experience.",
    problem:
      "Learners need one place to discover courses, reach their materials, and actually keep track of how far they've come.",
    solution:
      "I built a smooth experience for discovering courses, accessing learning materials, and following progress, so learners can stay on track and learn with confidence anytime, anywhere.",
    role:
      "Flutter Developer — implemented course discovery, learning-material access, and progress tracking.",
    features: [
      "Discover courses",
      "Access learning materials",
      "Follow your progress",
      "Stay on track with studies",
    ],
    stack: ["Flutter", "Dart", "REST APIs"],
    decisions: [
      "Centred the experience on progress so learners feel momentum.",
      "Kept course discovery and materials within a single, smooth flow.",
    ],
    challenges: [
      {
        challenge: "Helping learners stay on track across many courses and materials.",
        solution:
          "Progress tracking woven through course discovery and materials keeps the learning journey organised and engaging.",
      },
    ],
  },

  {
    slug: "naji-restaurant",
    name: "Naji Restaurant",
    tagline: "Mobile ordering app for Naji Al-Harbi — authentic kebab, a heritage taste since 1951.",
    category: "Restaurant",
    platform: "both",
    accent: "#22d3ee",
    imageCount: 4,
    storeShots: true,
    featured: false,
    isPrivate: false,
    // NOTE: Not described in the CV — copy below is grounded in the published
    // App Store listing and the app's own screens (Naji Al-Harbi kebab
    // restaurant, est. 1951). Tweak the wording if you'd like it more specific.
    links: {
      appStore:
        "https://apps.apple.com/us/app/%D9%85%D8%B7%D8%A7%D8%B9%D9%85-%D9%86%D8%A7%D8%AC%D9%8A-%D8%A7%D9%84%D8%AD%D8%B1%D8%A8%D9%8A-%D9%84%D9%84%D9%83%D8%A8%D8%A7%D8%A8/id6447362219",
      playStore: "https://play.google.com/store/apps/details?id=com.efada.kababNagy",
    },
    overview:
      "A mobile ordering app for Naji Al-Harbi Restaurant — a heritage kebab eatery serving its authentic taste since 1951 — letting customers browse the menu and order their favourite dishes from their phone.",
    problem:
      "A well-known heritage restaurant wanted its own branded app so loyal customers could browse the menu and order directly, instead of relying on third-party platforms.",
    solution:
      "I built a clean, branded Flutter ordering experience — menu browsing and a straightforward ordering flow — that carries the restaurant's identity and makes ordering quick and familiar.",
    role: "Flutter Developer — built the branded mobile ordering experience and menu flows.",
    features: [
      "Menu browsing",
      "Dish ordering",
      "Branded, heritage restaurant experience",
      "Simple, familiar ordering flow",
    ],
    stack: ["Flutter", "Dart", "REST APIs"],
    decisions: [
      "Built the experience around the restaurant's long-standing heritage brand identity.",
      "Kept the ordering flow short and familiar for returning customers.",
    ],
    challenges: [
      {
        challenge:
          "Giving a heritage restaurant a polished, on-brand app that feels as familiar as the place itself.",
        solution:
          "A focused menu-and-order flow wrapped in the restaurant's own visual identity keeps ordering simple and recognisable.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project;
  next: Project;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
}

/** Unique category list for the projects filter UI. */
export const projectCategories: string[] = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];
