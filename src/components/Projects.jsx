import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Image classification using CNN',
      description: 'Built a deep learning model using Convolutional Neural Networks to classify images with high accuracy, demonstrating expertise in Pytorch and image processing techniques.',
      techStack: ['Python', 'Pytorch', 'Resnet', 'Flower disease detection', 'Classification'],
      gradient: 'from-blue-500 to-cyan-500',
      category: 'AI/ML',
      link: 'https://github.com/AmirBR996/PYTORCH_projects', 
    },
    {
      title: 'Krishik Bazaar',
      description: 'Full-stack e-commerce platform for agricultural products with secure JWT authentication, real-time inventory management, and seamless user experience.',
      techStack: ['React', 'Node.js', 'Express', 'MySQL', 'JWT'],
      gradient: 'from-green-500 to-emerald-500',
      category: 'MERN Stack(present)',
      link: 'https://github.com/AmirBR996/MERN-PROJECT', 
    },
    {
      title: 'Task Manager App',
      description: 'A sleek and intuitive task management application built with the MERN stack, featuring user authentication, real-time updates, and a responsive design for seamless productivity on any device.',
      techStack: ['React', 'Node.js', 'Express', 'MySQL', 'JWT'],
      gradient: 'from-purple-500 to-pink-500',
      category: 'MERN Stack',
      link: 'https://github.com/AmirBR996/web_dev', 
    },
    {
      title: 'Deep Learning projects',
      description: 'Built 10 deep learning projects from scratch, including image classification, NLP applications, and sentiment analysis, showcasing a strong command of AI/ML technologies and practical implementation skills.',
      techStack: ['Python', 'Pytorch', 'DL', 'AI', 'NLP'],
      gradient: 'from-orange-500 to-yellow-500',
      category: 'GenAI',
      link: 'https://github.com/AmirBR996/Image-classification', 
    },
  ];

  return (
    <section id="projects" className="relative py-20 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>

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
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Showcasing my expertise in AI/ML and full-stack development through innovative projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -10 }}
              className="group relative"
            >
              <div className="h-full p-8 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`}></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="inline-block mb-4"
                >
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${project.gradient} text-white`}>
                    {project.category}
                  </span>
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 hover:border-purple-500/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-purple-500/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <Github size={16} />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/AmirBR996"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-purple-500/30 text-white rounded-lg font-semibold hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
          >
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
