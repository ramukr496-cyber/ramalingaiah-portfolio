// All portfolio content lives here so copy edits never touch layout code.

export const profile = {
  name: "Ramalingaiah KR",
  role: "Software Engineer — AI/ML, Generative & Agentic AI",
  location: "Doddaballapur, Karnataka",
  email: "ramukr496@gmail.com",
  phone: "+91 7483446584",
  github: "https://github.com/ramukr496-cyber",
  githubHandle: "ramukr496-cyber",
  linkedin: "https://www.linkedin.com/in/ramalingaiahkr",
  linkedinHandle: "ramalingaiahkr",
  summary:
    "Final-year Computer Science student building generative AI and agentic systems end to end — prompts, tools, reasoning loops, guardrails, RAG pipelines and the FastAPI services that carry them.",
};

// The loop rendered in the hero. Order matters: it is a real agent cycle.
export const agentLoop = [
  "prompt",
  "retrieve",
  "reason",
  "tool call",
  "guardrail",
  "answer",
];

export const projects = [
  {
    id: "rag",
    year: "2026",
    title: "PDF Layout-Aware RAG Agent",
    kicker: "Retrieval that respects the page",
    summary:
      "A YOLO11 layout model trained on DocLayNet detects sections in a PDF and drives layout-aware chunking, so retrieval follows the document's real structure instead of arbitrary character windows.",
    bullets: [
      "Trained a YOLO11 layout detector on DocLayNet to segment PDF sections and drive chunking.",
      "Generated embeddings with Cohere embed-v4.0 and stored them in a Weaviate cloud vector database.",
      "Grounded the command-a agent with tuned prompts so every answer carries section and page citations.",
    ],
    tech: [
      "Python",
      "YOLO11",
      "DocLayNet",
      "Cohere",
      "Weaviate",
      "PyMuPDF",
      "Streamlit",
    ],
    featured: true,
    link: null,
  },
  {
    id: "rosetta",
    year: "2026",
    title: "Rosetta",
    kicker: "Plain English in, live SQL out",
    summary:
      "A full-stack agentic platform that translates plain English into SQL, runs it against a live database, introspects the schema on the fly and draws the chart it thinks you meant.",
    bullets: [
      "Built a FastAPI REST backend with dynamic schema introspection and auto-generated charts.",
      "Designed a conversational agent with clarification prompts, tool use and a self-healing retry loop.",
      "Enforced defense-in-depth read-only guardrails; kept the LLM layer provider-agnostic across Groq, Gemini and Claude.",
      "Exposed the database as a Model Context Protocol server with typed read/write tools; shipped in Docker.",
    ],
    tech: [
      "Python",
      "FastAPI",
      "React",
      "Llama 3.3",
      "Groq",
      "MCP",
      "SQLite",
      "Docker",
    ],
    featured: true,
    link: null,
  },
  {
    id: "nyayasetu",
    year: "2025",
    title: "NyayaSetu",
    kicker: "Legal consultation, online",
    summary:
      "A real-time legal consultation platform with role-based dashboards, built with a team from schema design through to shipped features.",
    bullets: [
      "Designed the database schema and implemented features end to end.",
      "Built role-based dashboards and real-time video consultation.",
    ],
    tech: ["Django", "MySQL", "AgoraRTC", "REST", "Bootstrap"],
    featured: true,
    link: "https://www.linkedin.com/posts/ramalingaiah-kr-5b358a37a_project-launch-nyayasetu-an-ai-powered-ugcPost-7380664226903728128-QKS6/",
  },
  {
    id: "chatbot",
    year: "2025",
    title: "AI Chatbot Application",
    kicker: "50+ intents, 85% accuracy",
    summary:
      "An intent-classification model spanning more than 50 intents, trained with tokenization, lemmatization and text classification.",
    bullets: [],
    tech: ["Python", "NLP", "Deep Learning"],
    featured: false,
    link: null,
  },
  {
    id: "person",
    year: "2024",
    title: "Person Recognition System",
    kicker: "Vision on a Raspberry Pi",
    summary:
      "Real-time face recognition running on constrained Raspberry Pi hardware.",
    bullets: [],
    tech: ["Python", "OpenCV", "Raspberry Pi"],
    featured: false,
    link: "https://drive.google.com/drive/u/1/folders/1bBs9M8EmV2-hRR6bx76rxjLYFIgpt0Y_",
  },
  {
    id: "storage",
    year: "2024",
    title: "Data Storage Website",
    kicker: "Self-hosted file server",
    summary:
      "A Flask file-storage service hosted on a Raspberry Pi, backed by SQLite.",
    bullets: [],
    tech: ["Flask", "SQLite", "Python"],
    featured: false,
    link: "https://drive.google.com/drive/u/1/folders/1ToD55N9oEVKdvvG0ASo_nB3Z_R7bDU7r",
  },
];

const icon = (n) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-original.svg`;

export const skillGroups = [
  {
    label: "Generative & Agentic AI",
    note: "What I spend most of my time on",
    items: [
      { name: "LLM Agents" },
      { name: "RAG Pipelines" },
      { name: "Prompt Engineering" },
      { name: "Embeddings" },
      { name: "Vector DBs" },
      { name: "Guardrails" },
      { name: "LangChain" },
      { name: "MCP" },
      { name: "CrewAI / LangGraph" },
      { name: "OpenAI API" },
    ],
  },
  {
    label: "AI / Machine Learning",
    note: "Training and evaluation",
    items: [
      { name: "TensorFlow", icon: icon("tensorflow") },
      { name: "PyTorch", icon: icon("pytorch") },
      { name: "Keras", icon: icon("keras") },
      { name: "NLP" },
      { name: "Deep Learning" },
    ],
  },
  {
    label: "Languages & Backend",
    note: "How it ships",
    items: [
      { name: "Python", icon: icon("python") },
      { name: "Java", icon: icon("java") },
      { name: "JavaScript", icon: icon("javascript") },
      { name: "FastAPI", icon: icon("fastapi") },
      { name: "Spring Boot", icon: icon("spring") },
      { name: "React", icon: icon("react") },
      { name: "SQL", icon: icon("mysql") },
    ],
  },
  {
    label: "Data & Tooling",
    note: "Everything around the model",
    items: [
      { name: "pandas", icon: icon("pandas") },
      { name: "NumPy", icon: icon("numpy") },
      { name: "PostgreSQL", icon: icon("postgresql") },
      { name: "Docker", icon: icon("docker") },
      { name: "Git", icon: icon("git") },
      { name: "Streamlit" },
      { name: "Jupyter", icon: icon("jupyter") },
    ],
  },
];

export const timeline = [
  {
    period: "Jan 2026 — Jun 2026",
    title: "Java Full Stack Developer Intern",
    org: "Tap Academy, Bangalore",
    detail:
      "Developed, tested and maintained full-stack Java applications with Spring Boot and MySQL. Wrote SQL queries, built REST APIs, and worked in Agile/Scrum with Git, GitHub and code reviews.",
    tag: "Experience",
  },
  {
    period: "2022 — 2026",
    title: "B.Tech, Computer Science and Engineering",
    org: "Presidency University, Bangalore — CGPA 7.12",
    detail:
      "Coursework in Machine Learning, Probability & Statistics, Data Structures, Algorithms, DBMS and Operating Systems.",
    tag: "Education",
  },
];
