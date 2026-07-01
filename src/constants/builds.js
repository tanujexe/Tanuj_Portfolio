export const BUILDS = [
  {
    id: "build-01",
    name: "VendorHub",
    lapStatus: "LAP RECORD: 1m 24s",
    powertrain: "React + Vite + MongoDB",
    mission: "An online marketplace website that allows multiple sellers to list products, featuring fast-loading store pages and smart product search.",
    status: "Track Ready",
    demo: "https://vendor-hub-lemon.vercel.app/",
    github: "https://github.com/tanujexe/vendor-hub",
    hp: 80,
    speed: 1.2,
    difficulty: "CLASS A",
    misfire: "When multiple users visited different store pages at the same time, the website load speed slowed down.",
    solution: "Built smart temporary data memory (caching) and loaded images only when they are visible, making store pages load 40% faster.",
    image: "/vendor_hub_screenshot.png",
    color: "#FF2D2D",
    techStack: "React + Vite + MongoDB",
    techList: ["React", "Vite", "MongoDB", "Node.js", "Express.js", "Tailwind CSS"],
    architecture: "Multi-seller database architecture optimized for fast load times and clean page navigation.",
    features: [
      "Fast-loading catalog pages for multiple sellers",
      "Optimized database loading to prevent screen freezes",
      "Smart browser memory to load previously viewed items instantly",
      "Easy search filters and seller categories"
    ],
    challenge: "Multiple users searching and ordering products at the same time caused database query bottlenecks.",
    devSolution: "Built lightweight local caching layers to retrieve product lists without querying the database repeatedly, increasing speed by 40%."
  },
  {
    id: "build-02",
    name: "TornadoGym",
    lapStatus: "LAP RECORD: 1m 32s",
    powertrain: "React + Tailwind + Vite",
    mission: "A modern fitness center website with interactive class schedules, subscription plan selectors, and clean mobile views.",
    status: "Tuning Stage 02",
    demo: "https://tornadogym.vercel.app/",
    github: "https://github.com/tanujexe/tornadogym",
    hp: 55,
    speed: 0.8,
    difficulty: "CLASS B",
    misfire: "Slow-loading calendar views caused users to leave the page when trying to book gym slots.",
    solution: "Designed a highly responsive class calendar booking system that updates slot availability instantly without reloading the page.",
    image: "/tornado_gym_screenshot.png",
    color: "#1c69d4",
    techStack: "React + Tailwind + Vite",
    techList: ["React", "Vite", "Tailwind CSS", "Framer Motion", "CSS Grid"],
    architecture: "Responsive single page application focusing on real-time visual feedback and simple booking steps.",
    features: [
      "Interactive booking calendar for fitness classes",
      "Smooth, helpful animations when choosing slots",
      "Interactive membership pricing calculator",
      "Mobile-first design that works perfectly on all screens"
    ],
    challenge: "Slow calendar loading on older mobile smartphones caused users to cancel their class bookings.",
    devSolution: "Optimized click response times, giving users instant visual confirmation the moment they tap 'Book Slot'."
  },
  {
    id: "build-03",
    name: "Nirogyasathi",
    lapStatus: "LAP RECORD: 1m 18s",
    powertrain: "React + FastAPI + Python + PyTorch",
    mission: "An AI-powered healthcare app that analyzes patient symptoms in plain language and immediately matches them with the right medical specialist.",
    status: "Telemetry Stage 03",
    demo: "https://github.com/tanujexe",
    github: "https://github.com/tanujexe",
    hp: 92,
    speed: 1.4,
    difficulty: "CLASS S",
    misfire: "The AI system took too long to analyze user symptoms when multiple patients typed queries at the same time.",
    solution: "Set up an asynchronous processing queue to handle AI requests in the background, keeping response times under 1.2 seconds.",
    image: "/nirogyasathi_screenshot.png",
    color: "#00A3C4",
    techStack: "React + FastAPI + Python + PyTorch",
    techList: ["React", "FastAPI", "Python", "PyTorch", "Redis", "Celery", "Tailwind CSS"],
    architecture: "AI-inference server with background task routing and live patient-doctor scheduling layers.",
    features: [
      "AI engine that understands symptoms written in normal, everyday language",
      "Live availability check for recommended doctors and specialists",
      "Clear visual indicators showing AI diagnostic confidence level",
      "Smart task queue to prevent system slowdowns under heavy traffic"
    ],
    challenge: "The heavy AI translation model froze the server during peak hours when many patients submitted text.",
    devSolution: "Isolated the AI model execution into a background queue, keeping the main website responsive and fast for all users."
  }
];

export const VENDORHUB_ITEMS = [
  { id: 1, title: "ECU Stage 2 Software", price: 899, category: "Powertrain", hpBoost: 80 },
  { id: 2, title: "Titanium Exhaust Catback", price: 1850, category: "Exhaust", hpBoost: 35 },
  { id: 3, title: "Carbon Ceramic Brake Kit", price: 4200, category: "Chassis", hpBoost: 0 },
  { id: 4, title: "Cold Air Intake Carbon", price: 650, category: "Powertrain", hpBoost: 15 }
];

export const symptomsData = {
  headache: {
    name: "Chronic Migraine",
    severity: "Moderate",
    confidence: 94.2,
    doctor: "Dr. A. K. Sharma (Neurologist)",
    specialty: "Neurology",
    eta: "10 mins",
    logs: [
      "[AI_ENGINE] Analyzing input text: 'severe throbbing headache behind eyes'...",
      "[INFERENCE] Calculating language model token weights...",
      "[MATCH] Found diagnosis match: Neurological / Migraine (94.2% confidence)",
      "[ROUTING] Searching hospital database for nearest Neurologist..."
    ]
  },
  breath: {
    name: "Dyspnea / Asthma Trigger",
    severity: "High",
    confidence: 88.7,
    doctor: "Dr. Priya Sen (Pulmonologist)",
    specialty: "Pulmonology",
    eta: "Immediate (Emergency Alert)",
    logs: [
      "[AI_ENGINE] Analyzing input text: 'difficulty breathing and coughing'...",
      "[INFERENCE] Calculating language model token weights...",
      "[MATCH] Found diagnosis match: Respiratory / Asthma (88.7% confidence)",
      "[ROUTING] Searching hospital database for nearest Pulmonologist..."
    ]
  },
  joint: {
    name: "Rheumatoid Arthritis",
    severity: "Low-Moderate",
    confidence: 81.5,
    doctor: "Dr. Rohan Mehta (Orthopedist)",
    specialty: "Orthopedics",
    eta: "Tomorrow 9:00 AM",
    logs: [
      "[AI_ENGINE] Analyzing input text: 'stiff joints and morning pain'...",
      "[INFERENCE] Calculating language model token weights...",
      "[MATCH] Found diagnosis match: Orthopedic / Joint Inflammation (81.5% confidence)",
      "[ROUTING] Searching hospital database for nearest Rheumatologist..."
    ]
  }
};
