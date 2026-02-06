export type Language = "en";

export type ProjectTabItem = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
};

export type ProjectPageItem = {
  slug: string;
  title: string;
  description: string;
  overview: string;
  techStack: string[] | Record<string, string[]>;
  github: string;
  punchline?: string;
  demoUrl?: string;
  demoVideo?: string;
  heroVideo?: string;
  heroImage?: string;
  gallery?: string[];
  details?: Record<string, string>;
};

const commonInfo = {
  email: "walid7benmaarouf@gmail.com",
  linkedin: "https://www.linkedin.com/in/walid-benmaarouf/",
  github: "https://github.com/walid7shind",
};

const skillsList = {
  aiMl: [
    "LangChain",
    "OpenAI API",
    "AWS Bedrock",
    "AWS SageMaker",
    "Ollama",
    "RAG Systems",
    "Computer Vision",
    "LSTM/Neural Networks",
  ],
  dataCloud: [
    "AWS (Bedrock, SageMaker, S3)",
    "Azure (IoT Hub, Pipelines)",
    "Qdrant",
    "PostgreSQL",
    "MongoDB",
    "SQLite",
  ],
  devopsTools: [
    "Docker",
    "Jenkins",
    "Git/GitHub",
    "GitLab CI/CD",
    "Linux",
    "Postman",
  ],
  other: [
    "OpenCV",
    "Matlab",
    "Qt",
    "Unit Testing",
    "Agile/Scrum",
    "System Design",
  ],
    languages: [
    "Python",
    "TypeScript",
    "JavaScript",
    "C/C++",
    "Java",
    "SQL",
    "Bash",
  ],
  frontend: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "Streamlit",
  ],
  backend: [
    "FastAPI",
    "Flask",
    "Node.js",
    "REST APIs",
    "Spring Boot",
    "Microservices",
  ],
};

export const content = {
  en: {
    personalInfo: {
      ...commonInfo,
      name: "Walid BENMAAROUF",
      profileSummary:
        "Aspiring AI & Software Engineer from Télécom Saint-Étienne, specializing in artificial intelligence, computer vision, and software development. My personal projects, academic background, and professional experiences have equipped me with strong, concrete skills in GenAI, vision systems, and modern software engineering.",
    },
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      contactMe: "Contact Me",
      downloadCv: "Download CV",
    },
    about: {
      title: "About Me",
      description:
        "I am a passionate GenAi engineer with strong foundation in AI and computer vision. Currently pursuing my engineering degree at",
      school: "Télécom Saint-Étienne",
      descriptionEnd: ", I am eager to apply my skills in a challenging environment.",
      softSkillsTitle: "Soft Skills",
      softSkills: ["Rigor", "Curiosity", "Team Spirit", "Adaptability"],
      educationTitle: "Education",
      education: [
        {
          school: "Télécom Saint-Étienne",
          degree: "Engineering Degree",
        },
        {
          school: "CPGE at lycée IBN GHAZI ",
          degree: "Mathematics and Physics preparatory classes",
        },
      ],
    },
    skills: {
      title: "My Technical Skills",
      categories: {
        languages: "Languages",

        aiMl: "AI & Machine Learning",
        dataCloud: "Data & Cloud",
        devopsTools: "DevOps & Tools",
        frontend: "Frontend Development",
        backend: "Backend Development",
        other: "Other Skills",
      },
      list: skillsList,
    },
    experience: {
      title: "Experience",
      list: [
        {
          company: "Amadeus IT Group",
          role: "Apprentice GenAi Engineer",
          dates: "Sept 2025 - Present",
          description:
            "Genai end to end project from architecture to deployment, tool maintenance, process automation, and new AI tools development.",
        },
        {
          company: "DEF-Systems",
          role: "C++ software Developer Intern",
          dates: "June 2025 - Aug 2025",
          description:
            "Worked on resolving issues and adding new features to a legacy C++ application, focusing on maintainability, performance, and user experience improvements.",
        },
      
      ],
    },
    projects: {
      title: "My Projects",
      viewOnGithub: "View on GitHub",
      tabs: [
        {
          slug: "lanesight",
          title: "LaneSight",
          description: "AI-powered lane perception for real-world driving scenes.",
          tech: ["PyTorch", "OpenCV", "YOLO"],
          github: "https://github.com/walid7shind/LaneSight",
        },
        {
          slug: "papermind",
          title: "PaperMind",
          description:
            "PaperMind is a full-stack RAG platform that turns PDFs into searchable knowledge",
          tech: ["RAG", "FastAPI", "Qdrant"],
          github: "https://github.com/walid7shind",
        },
          {
          slug: "slice-defender",
          title: "Slice Defender",
          description: "Interactive 3D game with projectile slicing mechanics.",
          tech: ["C++", "OpenGL", "Qt"],
          github: "https://github.com/walid7shind",
        },
        {
          slug: "age-estimation",
          title: "Age estimation",
          description:
            "age estimation from facial images using challenging traditional computer vision techniques",
          tech: ["OpenCV", "Matlab", "CV"],
          github: "https://github.com/walid7shind",
        },
        {
          slug: "hockey-ar-game",
          title: "Hockey AR Game",
          description:
            "A 1v1 AR hockey game developped by a team of 4 student as a project in image processing class",
          tech: ["Java", "OpenCV", "AR"],
          github: "https://github.com/walid7shind",
        },
        {
          slug: "mimestis",
          title: "Mimestis",
          description:
            "Chatbot that digests company's internal document and answer employees' questions",
          tech: ["RAG", "FastAPI", "React"],
          github: "https://github.com/walid7shind",
        },
      
      ] satisfies ProjectTabItem[],
      pages: [
        {
          slug: "lanesight",
          title: "LaneSight",
          description: "AI-powered lane perception for real-world driving scenes.",
overview: `
**LaneSight** is an **end-to-end multi-paradigm lane perception system** designed for real-world driving scenes.

It combines **deep semantic understanding (Hybrid ViT-UNet)** with **geometric lane modeling (UFLD)**, **classical vision priors**, and **object-aware filtering (YOLO)** into a unified inference pipeline.

The core model leverages a **CNN encoder with a Vision Transformer bottleneck** to capture both **local lane structures** and **long-range spatial dependencies**. It is trained using **class-balanced Cross-Entropy and Dice loss** to handle extreme foreground/background imbalance.

At inference time, **lane hypotheses are validated, filtered, and fused** using **semantic confidence maps** and **vehicle awareness**, producing **robust lane masks** even under occlusions, clutter, or non-ideal road geometries.

This project demonstrates **full ownership of the computer vision stack**: architecture design, loss engineering, dataset debugging, GPU-safe training, and **multi-model fusion** — bridging **deep learning, geometry, and classical vision** in a production-oriented setup.
`,
          punchline: "AI-powered lane perception for real-world driving scenes.",
techStack: {
  coreML: [
    "PyTorch (training, inference, autograd, AMP)",
    "Custom Hybrid ViT-UNet architecture",
    "CNN encoder with Conv + ResBlocks and vertical inductive bias",
    "Vision Transformer bottleneck operating on feature maps (not raw pixels)",
    "Multi-Head Self-Attention (MHSA)",
    "2D relative position bias",
    "MLP blocks and DropPath (stochastic depth)",
    "Binary semantic segmentation (lane vs background)",
    "Losses: class-weighted Cross-Entropy + lane-only Dice loss",
    "Optimization: AdamW, CosineAnnealingLR, gradient clipping"
  ],

  geometry: [
    "UFLD (Ultra-Fast Lane Detection)",
    "Pretrained geometry-based lane detection model",
    "Lane polyline extraction",
    "Polyline resampling and normalization",
    "Strong geometric lane priors"
  ],

  perceptionFusion: [
    "Multi-model fusion of ViT semantics, UFLD geometry, and YOLO context",
    "Sampling ViT probability along lane polylines",
    "Confidence-based lane filtering",
    "Unified lane representation (Lane, LaneSet)",
    "Fusion of geometry + semantics + object awareness"
  ],

  vision: [
    "OpenCV-based classical vision pipeline",
    "Grayscale conversion and Gaussian smoothing",
    "Canny edge detection",
    "Region-of-Interest (ROI) masking",
    "Hough Transform for line detection",
    "Lane polygon fitting",
    "Temporal smoothing using EMA on lane slopes",
    "Color-based priors using CIE Lab color space",
    "White / yellow lane color anchors",
    "Road color estimation",
    "Soft edge weighting via color confidence maps"
  ],

  detection: [
    "YOLOv8 (Ultralytics)",
    "Vehicle detection for contextual awareness",
    "Object-aware lane rejection (lanes crossing vehicles)"
  ],

  inference: [
    "Frame-wise inference on images and video streams",
    "Resolution handling and dynamic resizing",
    "Binary mask generation and overlay",
    "Multi-source visualization (ViT / UFLD / YOLO / traditional)"
  ],

  experimentation: [
    "TensorBoard logging",
    "Loss and learning-rate tracking",
    "Gradient norm monitoring",
    "Attention entropy analysis",
    "Activation statistics inspection",
    "Attention map capture (optional)",
    "NaN and numerical anomaly guards",
    "Deterministic seeding for reproducibility"
  ],

  scientificStack: [
    "NumPy",
    "SciPy (softmax for UFLD decoding)",
    "Python dataclasses",
    "Typing",
    "pathlib"
  ],

  infra: [
    "Python 3",
    "CUDA",
    "cuDNN",
    "GPU-first execution with safe CPU fallback",
    "Windows-compatible training and inference",
    "Modular repository architecture (training / inference / fusion / UI)"
  ]
},


          github: "https://github.com/walid7shind/LaneSight",
          heroVideo: "/project%20assets/lanesight/lanesight_proccessed.mp4",
          demoVideo: "/project%20assets/lanesight/lanesight_proccessed.mp4",
          gallery: [
            "/project%20assets/lanesight/ui1.png",
            "/project%20assets/lanesight/ui2.png",
            "/project%20assets/lanesight/ui3.png",
          ],
        },
        {
          slug: "papermind",
          title: "PaperMind",
          description:
            "PaperMind is a full-stack RAG platform that turns PDFs into searchable knowledge",
          overview: `
**PaperMind** is an intelligent application that lets users chat with their PDF documents.

Instead of manually reading long research papers or technical documents, users can:

- upload one or multiple PDFs,
- ask questions in natural language,
- and receive precise answers grounded only in the uploaded documents.

The system understands the documents, remembers past conversations, and highlights relevant information instead of giving generic answers.

It is designed for:

- research papers,
- technical documentation,
- academic work,
- multi-PDF analysis.

In short: **PaperMind turns static PDFs into an interactive knowledge base.**

**Architecture**

\`\`\`text
React Frontend
  ↓
FastAPI Backend (Streaming)
  ↓
Async Ingestion & Embedding Pipeline
  ↓
Qdrant Vector Database + OpenAI Models
\`\`\`
          `,
          punchline: "Chat with your PDFs using grounded RAG.",
          techStack: {
            frontend: [
              "React (Hooks, Context) - dynamic, stateful chat UI",
              "Streaming Fetch API - real-time token rendering",
              "React-Markdown + GFM - rich answers (code, tables)",
              "jsPDF - export answers to PDF",
              "Responsive UI - desktop & mobile support",
            ],
            backend: [
              "FastAPI (Python) - async, high-performance API",
              "Server-Sent Events (SSE) - streaming LLM responses",
              "Subprocess orchestration - non-blocking ingestion pipeline",
              "PyMuPDF - PDF text extraction",
              "WebSockets - live pipeline logs",
            ],
            rag_ai: [
              "OpenAI text-embedding-3-large - 3072-D semantic embeddings",
              "GPT-4o-mini - HyDE generation, reranking, summarization",
              "Hybrid RAG - query rewriting + HyDE + LLM rerank",
              "Context-grounded answering - no hallucinated content",
            ],
            vector_database: [
              "Qdrant (Cloud) - HNSW-indexed vector search",
              "Multi-level vectors - document / chunk / topic",
              "Payload filtering - topic, filename, discipline",
            ],
            infrastructure_design: [
              "Stateless API - horizontally scalable",
              "Async background workers - ingestion isolated from chat",
              "JSON-based persistence - conversations & metadata",
              "Secure key handling - server-side only",
            ],
          },
          github: "https://github.com/walid7shind",
          gallery: [
            "/project%20assets/papermind/AI-powered-chatbot.png",
            "/project%20assets/papermind/full%20ui.png",
            "/project%20assets/papermind/full%20ui%202.png",
            "/project%20assets/papermind/input_output.png",
            "/project%20assets/papermind/mobile%20ui.png",
            "/project%20assets/papermind/mobile%20ui2.png",
          ],
          demoVideo: "/project%20assets/papermind/papermind.mp4",
          heroVideo: "/project%20assets/papermind/papermind.mp4",
        },
        {
          slug: "age-estimation",
          title: "Age estimation",
          description:
            "age estimation from facial images using challenging traditional computer vision techniques",
          overview:
            "Age estimation from facial images using challenging traditional computer vision techniques. The goal was to build a robust pipeline that stays reliable across lighting, pose, and expression changes.",
          punchline: "Robust age prediction from facial cues.",
          techStack: ["Python", "Matlab", "OpenCV", "Classical CV pipeline"],
          github: "https://github.com/walid7shind",
        },
        {
          slug: "hockey-ar-game",
          title: "Hockey AR Game",
          description:
            "A 1v1 AR hockey game developped by a team of 4 student as a project in image processing class",
          overview:
            "A 1v1 AR hockey game developed as an image processing class project. Built to be quick to learn, responsive in play, and grounded in practical vision techniques.",
          punchline: "A fast, playful AR duel built with vision.",
          techStack: ["Java", "Maven", "OpenCV"],
          github: "https://github.com/walid7shind",
        },
        {
          slug: "mimestis",
          title: "Mimestis",
          description:
            "Chatbot that digests company's internal document and answer employees' questions",
          overview:
            "Mimestis is a chatbot that digests internal company documents and answers employees’ questions. The focus is on accurate retrieval, safe responses, and a smooth UX for everyday knowledge work.",
          punchline: "Internal docs → accurate answers, instantly.",
          techStack: [
            "Python",
            "FastAPI",
            "SQLite",
            "Azure Pipelines",
            "React",
            "Ollama (Mistral)",
          ],
          github: "https://github.com/walid7shind",
        },
        {
          slug: "slice-defender",
          title: "Slice Defender",
          description: "Interactive 3D game with projectile slicing mechanics.",
          overview: `
**Technical Overview**

**System Architecture**

- End-to-end real-time pipeline: Webcam → Vision Processing → Coordinate Mapping → 3D Rendering
- Tight coupling between OpenCV frame processing and Qt event loop via QTimer (~30 FPS)

**Computer Vision Pipeline (OpenCV)**

- Frame acquisition using VideoCapture
- Color-space conversion RGB → YCrCb
- Adaptive contrast enhancement using CLAHE on Cr/Cb channels
- Skin mask extraction via thresholding
- Noise reduction using morphological opening/closing
- Contour filtering to isolate hand region
- Distance Transform to estimate palm center
- Haar Cascade (detectMultiScale) as a fallback detection mechanism

**Interaction & Mapping**

- Palm center coordinates normalized and mirrored
- 2D camera space mapped to 3D world coordinates

**Rendering & UI (Qt + OpenGL)**

- Real-time 3D sword movement in OpenGL scene
- Qt-based GUI (camera preview, score, timer)
- Modular separation between vision, UI, and rendering layers
- Custom OpenGL scene embedded in Qt (QOpenGLWidget) with a manually designed 3D background
- Dynamic projectile system: multiple shapes spawned at random positions following projectile-motion trajectories
- Sword–projectile interaction model: sword position driven by palm tracking and mapped to 3D world space
- Collision detection based on cylindrical hit volume and radius-threshold intersection (\`||P_sword - P_proj|| < r\`)
- Successful intersections trigger explosion effects and score updates
- Qt-based HUD integrating camera preview, timer, score, with clean separation between vision, game logic, and rendering layers

**Performance**

- C++17 implementation
- Stable real-time interaction at ~30 FPS
`,
          punchline: "Satisfying slicing mechanics in 3D.",
          techStack: [
            "C++17 - core application, real-time processing, and game logic",
            "OpenCV 4.x - webcam capture, skin segmentation, palm detection, and tracking",
            "Qt 6 - GUI framework, event loop (QTimer), windowing, and layout management",
            "OpenGL (via Qt) - real-time 3D rendering, scene management, sword and projectile visualization",
            "qmake / .pro - build configuration and project management",
            "Haar Cascade Classifier - fallback palm detection for robustness under challenging conditions",
          ],
          heroVideo: "/project%20assets/slice%20defender/final.mp4",
          demoVideo: "/project%20assets/slice%20defender/final.mp4",
          github: "https://github.com/walid7shind",
        },
      ] satisfies ProjectPageItem[],
    },
    contact: {
      title: "Get In Touch",
      successTitle: "Message Sent!",
      successMessage:
        "Thanks for reaching out. I'll get back to you as soon as possible.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "your.email@example.com",
      messageLabel: "Message",
      messagePlaceholder: "How can I help you?",
      sendButton: "Send Message",
      sendingButton: "Sending...",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
};

// Keep these for backward compatibility if needed, but we should migrate away
export const personalInfo = content.en.personalInfo;
export const skills = content.en.skills.list;
export const experience = content.en.experience.list;
export const projects = content.en.projects.tabs;

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  return Array.from(
    new Map(items.map((p) => [p.slug, p])).values()
  );
}

export const allProjectTabs: ProjectTabItem[] = uniqueBySlug([
  ...(content.en.projects.tabs as ProjectTabItem[]),
]);

export const allProjectPages: ProjectPageItem[] = uniqueBySlug([
  ...(content.en.projects.pages as ProjectPageItem[]),
]);

export function getProjectTabBySlug(slug: string): ProjectTabItem | undefined {
  return allProjectTabs.find((p) => p.slug === slug);
}

export function getProjectPageBySlug(slug: string): ProjectPageItem | undefined {
  return allProjectPages.find((p) => p.slug === slug);
}

