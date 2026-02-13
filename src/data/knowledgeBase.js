// Knowledge base for Amir's AI chatbot
// Fully personalized based on Amir's skills, projects, and goals

export const knowledgeBase = {
  greeting: [
    "Hello! I'm Amir, an AI/ML Engineer from Nepal. How can I assist you today?",
    "Hi there! I'm Amir, skilled in AI/ML, MERN stack development, and Generative AI. Ask me anything!",
    "Hey! I'm Amir. I love building AI-powered systems and innovative web apps. What would you like to know?"
  ],

  skills: {
    frontend: "I specialize in building modern, responsive, and visually appealing frontends using React.js and Tailwind CSS. I also focus on UX/UI best practices and responsive design.",
    backend: "My backend expertise includes Node.js, Express.js, RESTful API design, JWT-based authentication, and integration with MySQL databases for secure and efficient data handling.",
    database: "I work with MySQL for relational database design, optimization, and efficient querying. I ensure scalable and secure database structures for full-stack applications.",
    aiml: "My AI/ML expertise includes Python, TensorFlow, Convolutional Neural Networks (CNNs), Retrieval-Augmented Generation (RAG), Computer Vision, NLP, and Generative AI. I focus on practical project-based implementations.",
    auth: "I implement secure authentication and authorization systems using JWT (JSON Web Tokens), ensuring safe user login, session management, and role-based access control.",
    full: "My complete tech stack: Frontend - React, Tailwind CSS | Backend - Node.js, Express | Database - MySQL | AI/ML - Python, TensorFlow, CNN, RAG, GenAI | Auth - JWT "
  },

  projects: {
    voting: "AI Voting System: Uses face detection for real-time voter verification. Combines Computer Vision, secure JWT authentication, and fraud prevention. [GitHub](https://github.com/AmirBR996/PYTORCH_projects)",
    krishik: "Krishik Bazaar: A MERN stack e-commerce platform for agricultural products, featuring JWT authentication, real-time inventory, and a seamless UX. [GitHub](https://github.com/AmirBR996/MERN-PROJECT)",
    cnn: "Dog vs Cat CNN Classifier: Deep learning project using TensorFlow to classify images of dogs and cats. Includes data preprocessing, augmentation, and CNN implementation. [GitHub](https://github.com/AmirBR996/Image-classification)",
    taskManager: "Task Manager App: MERN stack task management tool with authentication, real-time updates, and responsive UI for productivity. [GitHub](https://github.com/AmirBR996/web_dev)",
    blogGenerator: "AI Blog Generator: LangChain-based system for automatic blog content creation using advanced language models.",
    all: "Major projects: 1) AI Voting System, 2) Krishik Bazaar, 3) Dog vs Cat CNN Classifier, 4) Task Manager App, 5) AI Blog Generator"
  },

  internship: [
    "I'm actively seeking AI/ML internships to apply my skills in real-world projects.",
    "Yes! I'm looking for opportunities in AI/ML where I can contribute to innovative systems and grow professionally.",
    "Currently available for AI/ML internships with a passion for learning and building impactful projects."
  ],

  freelance: [
    "I'm open to freelance projects, particularly in AI/ML, Computer Vision, and MERN stack web applications.",
    "Yes, I can take freelance projects involving AI integration, web apps, or full-stack development."
  ],

  contact: {
    info: "You can reach me via the contact form on my website or connect on LinkedIn and GitHub. I'm happy to discuss AI/ML projects and collaborations!",
    email: "Send me a message via the contact form or at amir@example.com, and I'll respond promptly."
  },

  location: "I'm based in Nepal, open to remote or on-site opportunities globally.",

  experience: "I have hands-on experience in full-stack development (MERN), AI/ML projects, computer vision, deep learning, and Generative AI. Currently building real-world projects and seeking professional growth.",

  education: "I'm continuously learning AI/ML technologies, focusing on practical implementation of Generative AI, RAG systems, CNNs, and NLP models.",

  about: "I'm Amir, an AI/ML Engineer and MERN Stack Developer from Nepal. I specialize in AI-powered solutions, Generative AI, RAG, and Computer Vision. Passionate about innovative tech and practical problem-solving.",

  why: "AI fascinates me because it enables solving complex problems intelligently. I combine AI/ML expertise with full-stack development to build end-to-end intelligent systems.",

  workStyle: "I work efficiently in both independent and collaborative environments. I enjoy project-based learning, applying AI/ML concepts, and producing clean, scalable code.",

  achievements: "So far, I've built multiple AI and full-stack projects, including AI Voting System, Krishik Bazaar, CNN Classifiers, and LangChain-based content generators, showcasing both AI and development skills.",

  futureGoals: "I aim to contribute to AI/ML projects with practical real-world applications, expand my knowledge in Generative AI, and eventually lead AI-driven web applications.",

  softSkills: "I value communication, problem-solving, continuous learning, and adaptability in all my projects. I enjoy mentoring others and collaborating in tech teams.",

  default: [
    "That's an interesting question! I can provide details on my skills, projects, or career goals.",
    "I'm not sure about that specific detail, but feel free to ask about my tech stack, projects, or internship availability.",
    "Could you rephrase that? I can tell you about my skills, projects, experience, or goals."
  ]
};

// Chatbot response function
export function getChatbotResponse(userMessage) {
  const message = userMessage.toLowerCase();

  // Greeting
  if (/(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i.test(message)) {
    return knowledgeBase.greeting[Math.floor(Math.random() * knowledgeBase.greeting.length)];
  }

  // Skills
  if (/skills?|tech stack|technologies|what do you know|expertise|proficient/i.test(message)) {
    if (/frontend|react|tailwind|ui|interface/i.test(message)) return knowledgeBase.skills.frontend;
    if (/backend|node|express|api|server/i.test(message)) return knowledgeBase.skills.backend;
    if (/database|mysql|db|data/i.test(message)) return knowledgeBase.skills.database;
    if (/ai|ml|machine learning|deep learning|tensorflow|cnn|rag|computer vision|genai|generative/i.test(message)) return knowledgeBase.skills.aiml;
    if (/auth|authentication|jwt|security/i.test(message)) return knowledgeBase.skills.auth;
    return knowledgeBase.skills.full;
  }

  // Projects
  if (/project|portfolio|work|built|developed|created/i.test(message)) {
    if (/voting|voter|election|face/i.test(message)) return knowledgeBase.projects.voting;
    if (/krishik|bazaar|ecommerce|marketplace/i.test(message)) return knowledgeBase.projects.krishik;
    if (/cnn|dog|cat|image/i.test(message)) return knowledgeBase.projects.cnn;
    if (/task|manager|web_dev/i.test(message)) return knowledgeBase.projects.taskManager;
    if (/blog|generator|langchain/i.test(message)) return knowledgeBase.projects.blogGenerator;
    return knowledgeBase.projects.all;
  }

  // Internship
  if (/internship|intern|opportunity|opportunities|hiring|job|available|looking for/i.test(message)) {
    return knowledgeBase.internship[Math.floor(Math.random() * knowledgeBase.internship.length)];
  }

  // Freelance
  if (/freelance|contract|hire|collaboration|work with/i.test(message)) {
    return knowledgeBase.freelance[Math.floor(Math.random() * knowledgeBase.freelance.length)];
  }

  // Contact
  if (/contact|reach|email|message|connect|touch/i.test(message)) return knowledgeBase.contact.info;

  // Location
  if (/where|location|based|from|live/i.test(message)) return knowledgeBase.location;

  // Experience
  if (/experience|background|journey|career/i.test(message)) return knowledgeBase.experience;

  // Education
  if (/education|learning|study|training|course/i.test(message)) return knowledgeBase.education;

  // About
  if (/about|who are you|tell me about yourself|introduce/i.test(message)) return knowledgeBase.about;

  // Why AI
  if (/why|motivation|passion|interest/i.test(message)) return knowledgeBase.why;

  // Work Style
  if (/work style|work approach|how you work/i.test(message)) return knowledgeBase.workStyle;

  // Achievements
  if (/achievement|success|accomplishment|projects done/i.test(message)) return knowledgeBase.achievements;

  // Goals
  if (/goal|future|plan|aspiration/i.test(message)) return knowledgeBase.futureGoals;

  // Soft skills
  if (/soft skills|communication|team|collaboration/i.test(message)) return knowledgeBase.softSkills;

  // Default
  return knowledgeBase.default[Math.floor(Math.random() * knowledgeBase.default.length)];
}
