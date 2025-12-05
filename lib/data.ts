export type Language = "en" | "fr";

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
      list: [
        {
          title: "PaperMind",
          description:
            "PaperMind is a full-stack RAG platform that turns PDFs into searchable knowledge",
          tech: ["Python", "FastApi", "Qdrant", "OpenAi" , "React"],
          github: "https://github.com/walid7shind",
        },
        {
          title: "Age estimation",
          description: "age estimation from facial images using challenging traditional computer vision techniques",
          tech: ["Python", "Matlab", "OpenCV", "vision"],
          github: "https://github.com/walid7shind",
        },
        {
          title: "Hockey AR Game",
          description:
            "A 1v1 AR hockey game developped by a team of 4 student as a project in image processing class",
          tech: ["Java", "Maven", " OpenCV"],
          github: "https://github.com/walid7shind",
        },
        {
          title: "Mimestis",
          description: "Chatbot that digests company's internal document and answer employees' questions",
          tech: ["Python", "FastApi", "Sqlite", "Azure pipelines","React" , "ollama Mistral"],
          github: "https://github.com/walid7shind",
        },
        {
          title: "Slice Defender",
          description: "Interactive 3D game with projectile slicing mechanics.",
          tech: ["C++", "OpenGL", "Qt"],
          github: "https://github.com/walid7shind",
        },
      ],
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
  fr: {
    personalInfo: {
      ...commonInfo,
      name: "Walid BENMAAROUF",
      profileSummary:
        "Futur Ingénieur IA & Logiciel de Télécom Saint-Étienne, spécialisé en intelligence artificielle, vision par ordinateur et développement logiciel. Mes projets personnels, mon parcours académique et mes expériences professionnelles m'ont permis d'acquérir des compétences solides et concrètes en GenAI, systèmes de vision et ingénierie logicielle moderne.",
    },
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
    },
    hero: {
      contactMe: "Me Contacter",
      downloadCv: "Télécharger CV",
    },
    about: {
      title: "À propos de moi",
      description:
        "Je suis un ingénieur GenAI passionné avec une solide base en IA et vision par ordinateur. Actuellement en cursus d'ingénieur à",
      school: "Télécom Saint-Étienne",
      descriptionEnd: ", je suis impatient d'appliquer mes compétences dans un environnement stimulant.",
      softSkillsTitle: "Soft Skills",
      softSkills: ["Rigueur", "Curiosité", "Esprit d'équipe", "Adaptabilité"],
      educationTitle: "Formation",
      education: [
        {
          school: "Télécom Saint-Étienne",
          degree: "Diplôme d'Ingénieur",
        },
        {
          school: "CPGE au lycée IBN GHAZI",
          degree: "Classes préparatoires Mathématiques et Physique",
        },
      ],
    },
    skills: {
      title: "Mes Compétences Techniques",
      categories: {
        languages: "Langages",
        aiMl: "IA & Machine Learning",
        dataCloud: "Data & Cloud",
        devopsTools: "DevOps & Outils",
        frontend: "Développement Frontend",
        backend: "Développement Backend",
        other: "Autres Compétences",
      },
      list: skillsList,
    },
    experience: {
      title: "Expérience",
      list: [
        {
          company: "Amadeus IT Group",
          role: "Apprenti Ingénieur GenAI",
          dates: "Sept 2025 - Présent",
          description:
            "Projet GenAI de bout en bout de l'architecture au déploiement, maintenance des outils, automatisation des processus et développement de nouveaux outils IA.",
        },
        {
          company: "DEF-Systems",
          role: "Stagiaire Développeur Logiciel C++",
          dates: "Juin 2025 - Août 2025",
          description:
            "Résolution de problèmes et ajout de nouvelles fonctionnalités à une application C++ legacy, en se concentrant sur la maintenabilité, la performance et l'amélioration de l'expérience utilisateur.",
        },
      ],
    },
    projects: {
      title: "Mes Projets",
      viewOnGithub: "Voir sur GitHub",
      list: [
        {
          title: "PaperMind",
          description:
            "PaperMind est une plateforme RAG full-stack qui transforme les PDFs en connaissances consultables",
          tech: ["Python", "FastApi", "Qdrant", "OpenAi", "React"],
          github: "https://github.com/walid7shind/PaperMind-Portfolio",
        },
        {
          title: "Estimation d'âge",
          description: "Estimation d'âge à partir d'images faciales en utilisant des techniques traditionnelles de vision par ordinateur",
          tech: ["Python", "Matlab", "OpenCV", "vision"],
          github: "https://github.com/walid7shind/estimation-d-age",
        },
        {
          title: "Jeu AR Hockey",
          description:
            "Un jeu de hockey en RA 1v1 développé par une équipe de 4 étudiants dans le cadre d'un projet de traitement d'images",
          tech: ["Java", "Maven", "OpenCV"],
          github: "https://github.com/walid7shind/hockeyAr",
        },
        {
          title: "Mimestis",
          description: "Chatbot qui digère les documents internes d'entreprise et répond aux questions des employés",
          tech: ["Python", "FastApi", "Sqlite", "Azure pipelines", "React", "ollama Mistral"],
          github: "https://github.com/walid7shind/mimestis",
        },
        {
          title: "Slice Defender",
          description: "Jeu 3D interactif avec mécanique de découpe de projectiles.",
          tech: ["C++", "OpenGL", "Qt"],
          github: "https://github.com/walid7shind/Slice-Defender",
        },
      ],
    },
    contact: {
      title: "Me Contacter",
      successTitle: "Message Envoyé !",
      successMessage:
        "Merci de m'avoir contacté. Je vous répondrai dès que possible.",
      nameLabel: "Nom",
      namePlaceholder: "Votre nom",
      emailLabel: "Email",
      emailPlaceholder: "votre.email@exemple.com",
      messageLabel: "Message",
      messagePlaceholder: "Comment puis-je vous aider ?",
      sendButton: "Envoyer le Message",
      sendingButton: "Envoi...",
    },
    footer: {
      rights: "Tous droits réservés.",
    },
  },
};

// Keep these for backward compatibility if needed, but we should migrate away
export const personalInfo = content.en.personalInfo;
export const skills = content.en.skills.list;
export const experience = content.en.experience.list;
export const projects = content.en.projects.list;

