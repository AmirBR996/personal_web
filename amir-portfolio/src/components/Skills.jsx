import { motion } from 'framer-motion';
import { Code, Server, Database, Brain, Shield } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Frontend Development',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React.js', level: 75 },
        { name: 'Tailwind CSS', level: 60 },
        { name: 'JavaScript', level: 80 },
      ],
    },
    {
      category: 'Backend Development',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Express.js', level: 75 },
        { name: 'RESTful APIs', level: 70 },
      ],
    },
    {
      category: 'Database',
      icon: Database,
      color: 'from-orange-500 to-yellow-500',
      skills: [
        { name: 'MySQL', level: 80 },
        { name: 'Database Design', level: 78 },
        { name: 'Query Optimization', level: 75 },
      ],
    },
    {
      category: 'AI/ML',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'Pytorch', level: 90 },
        { name: 'Machine Learning', level: 85 },
        { name: 'Deep Learning', level: 90 },
        { name: 'GenAI', level: 60 },
        { name: 'NLP', level: 75 },
      ],
    },
    {
      category: 'Data science',
      icon: Shield,
      color: 'from-red-500 to-rose-500',
      skills: [
        { name: 'Math & Stat', level: 80 },
        { name: 'Pandas', level: 85 },
        { name: 'Numpy', level: 85 },
        { name: 'Data Visualization', level: 70 },
        {name: 'Machine Learining', level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>

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
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="p-6 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl hover:border-purple-500/40 hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-white">{category.category}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 text-sm">{skill.name}</span>
                        <span className="text-gray-400 text-xs">{skill.level}%</span>
                      </div>
                      {/* Progress Bar */}
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-lg">
            Continuously learning and expanding my skillset in AI/ML and modern web technologies
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
