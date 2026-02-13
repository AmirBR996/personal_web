import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { getChatbotResponse } from '../data/knowledgeBase';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm Amir Bhattarai, an AI/ML Engineer from Nepal. How can I help you today? Feel free to ask about my skills, projects, or internship availability!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay and get bot response
    setTimeout(() => {
      const botResponse = getChatbotResponse(inputMessage);
      const botMessage = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const quickActions = [
    'Tell me about your skills',
    'What projects have you built?',
    'Are you available for internship?',
    'How can I contact you?',
  ];

  const handleQuickAction = (action) => {
    setInputMessage(action);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'hidden' : 'flex'
        }`}
        aria-label="Open Chat"
      >
        <MessageCircle size={28} />
        {/* Notification Dot */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] flex flex-col bg-gray-900/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-b border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">
                    A
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Amir</h3>
                  <p className="text-xs text-gray-400">AI/ML Engineer</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                  aria-label="Minimize Chat"
                >
                  <Minimize2 size={18} className="text-gray-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                  aria-label="Close Chat"
                >
                  <X size={18} className="text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-gray-800">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-white/5 backdrop-blur-sm border border-purple-500/20 text-gray-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-purple-500/20">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 space-y-2">
                <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickAction(action)}
                      className="text-xs px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-full text-gray-300 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-purple-500/30">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                  aria-label="Send Message"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thumb-purple-500\/50::-webkit-scrollbar-thumb {
          background-color: rgba(168, 85, 247, 0.5);
          border-radius: 3px;
        }
        .scrollbar-track-gray-800::-webkit-scrollbar-track {
          background-color: rgba(31, 41, 55, 0.5);
        }
      `}</style>
    </>
  );
};

export default Chatbot;
