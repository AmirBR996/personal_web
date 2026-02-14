import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import amir from "./amir.jpeg"
const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Building AI-powered systems for the future";
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typing animation
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const handleScrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE - TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <p className="text-lg text-blue-400 mb-4">Hello, I'm</p>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
              AMIR BR
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              AI/ML Engineer | MERN Stack Developer
            </p>

            {/* Typing Effect */}
            <div className="h-12 flex items-center justify-center md:justify-start mb-8">
              <p className="text-lg md:text-xl text-gray-400">
                {typedText}
                <span
                  className={`inline-block w-0.5 h-6 bg-purple-500 ml-1 ${
                    isTypingComplete ? "animate-pulse" : "animate-blink"
                  }`}
                ></span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-10">
              <button
                onClick={handleScrollToProjects}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                View Projects
              </button>

              <button
                onClick={handleScrollToContact}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-lg font-semibold border border-purple-500/30 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                Contact Me
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 justify-center md:justify-start">
              <a
                href="https://github.com/AmirBR996"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-purple-500/30 hover:bg-white/10 transition"
              >
                <Github size={22} className="text-white" />
              </a>

              <a
                href="https://www.linkedin.com/in/amir-bhattarai-7577b4322"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-purple-500/30 hover:bg-white/10 transition"
              >
                <Linkedin size={22} className="text-white" />
              </a>

              <a
                href="mailto:amirbhattrai861@gmail.com"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-purple-500/30 hover:bg-white/10 transition"
              >
                <Mail size={22} className="text-white" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE - IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 blur-3xl opacity-60 animate-pulse"></div>

              {/* Profile Image */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/10">
                <img
                  src={amir}  
                  alt="Amir BR"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown size={32} className="text-purple-400 animate-bounce" />
      </motion.div>

      {/* Animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
