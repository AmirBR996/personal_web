import { motion } from 'framer-motion';
import { Code, Database, Briefcase, Target } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Full-Stack Developer',
      description: 'MERN Stack expertise with modern UI/UX',
    },
    {
      icon: Database,
      title: 'AI/ML Engineer',
      description: 'GenAI, NLP and DL projects',
    },
    {
      icon: Briefcase,
      title: 'Problem Solver',
      description: 'Building innovative solutions',
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Seeking AI/ML internship with MERN opportunities',
    },
  ];

  const skills = [
    'Python',
    'Generative AI',
    'Machine Learning',
    'Natural Language Processing',
    'Deep Learning',
    'React.js',
    'Node.js',
    'MySQL/MongoDB',
    'Pytorch',
  ];

  return (
    <section id="about" className="relative py-20 bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>

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
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Hello! I'm <span className="text-blue-400 font-semibold">Amir Bhattarai</span>, an{' '}
                <span className="text-purple-400 font-semibold">AI/ML Engineer</span> and{' '}
                <span className="text-purple-400 font-semibold">MERN Stack Developer</span> based in{' '}
                <span className="text-blue-400 font-semibold">Nepal</span>.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                I specialize in building <span className="text-purple-400 font-semibold">AI-powered systems</span> with 
                a focus on <span className="text-blue-400">Generative AI</span>, <span className="text-blue-400">Deep Learning</span>, 
                and <span className="text-blue-400">Natural LanguagE Processing</span>. I combine cutting-edge AI technologies with 
                full-stack development to create intelligent, scalable solutions.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Currently, I'm <span className="text-green-400 font-semibold">actively seeking AI/ML internship opportunities</span> where 
                I can contribute to innovative projects and continue growing as an engineer. I'm passionate about 
                solving real-world problems through technology and AI.
              </p>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2 pt-4">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm text-gray-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} className="text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
