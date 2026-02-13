import { motion } from 'framer-motion';
import { GraduationCap, Code2, Rocket, Target } from 'lucide-react';

const Experience = () => {
  const timeline = [
    {
      year: '2023 - Present',
      title: 'AI/ML Learning Journey',
      organization: 'Self-Learning & Project Development',
      icon: GraduationCap,
      color: 'from-blue-500 to-cyan-500',
      description: 'Started from making multilingual chatbot for college and then mastered Pytorch and deep learning architectures, building 15+ AI/ML projects including computer vision and NLP applications.',
      achievements: [
        'Mastered Pytorch and Deep Learning architectures',
        'Built 15+ AI/ML projects from scratch',
        'Implemented CNN/RNN/LSTM using Pytorch',
        'Developed computer vision/Natural Language Processing applications',
      ],
    },
    {
      year: '2026 - Present',
      title: 'MERN Stack Development',
      organization: 'Full-Stack Project Development',
      icon: Code2,
      color: 'from-green-500 to-emerald-500',
      description: 'Focused on mastering the MERN stack with emphasis on building scalable, secure applications with modern authentication and database management.',
      achievements: [
        'Built full-stack applications with React & Node.js',
        'Implemented JWT authentication systems',
        'Designed and optimized Mongodb databases',
        'Created RESTful APIs with Express.js',
      ],
    },
    {
      year: 'Current',
      title: 'Seeking AI/ML and MERN stack Internship',
      organization: 'Open to Opportunities',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      description: 'Actively seeking AI/ML and MERN stack internship positions to apply my technical skills in a professional environment and contribute to innovative AI projects.',
      achievements: [
        'Ready to contribute to real-world AI projects',
        'Strong foundation in AI/ML and full-stack development',
        'Eager to learn from industry experts',
        'Passionate about solving complex problems',
      ],
    },
    {
      year: 'Future Goals',
      title: 'AI Engineer with MERN Expertise',
      organization: 'Career Aspirations',
      icon: Rocket,
      color: 'from-orange-500 to-yellow-500',
      description: 'Aspiring to become a leading AI/ML engineer, contributing to cutting-edge AI research and building transformative AI-powered solutions.',
      achievements: [
        'Advance in Generative AI and LLMs',
        'Contribute to open-source AI projects',
        'Build scalable AI solutions for real problems',
        'Mentor and inspire future developers',
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Experience & Journey
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My learning journey and professional aspirations in AI/ML and software development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-5/12">
                    <motion.div
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="p-6 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300 group"
                    >
                      {/* Year Badge */}
                      <div className={`inline-block px-3 py-1 mb-4 text-sm font-semibold rounded-full bg-gradient-to-r ${item.color} text-white`}>
                        {item.year}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                        {item.title}
                      </h3>

                      {/* Organization */}
                      <p className="text-purple-400 mb-4">{item.organization}</p>

                      {/* Description */}
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Achievements */}
                      <ul className="space-y-2">
                        {item.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color} mt-1.5 flex-shrink-0`}></span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Center Icon */}
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg shadow-purple-500/30 z-10`}
                    >
                      <Icon size={28} className="text-white" />
                    </motion.div>
                  </div>

                  {/* Empty Space for Alternating Layout */}
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="p-8 bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-sm border border-purple-500/30 rounded-xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Let's Build Something Amazing Together!
            </h3>
            <p className="text-gray-400 mb-6">
              I'm actively seeking AI/ML internship opportunities and open to freelance projects. 
              Let's connect and discuss how I can contribute to your team!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Get in Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
