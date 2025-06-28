
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Brain, Target, Users, Sparkles, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized content that adapts to your learning style and pace"
    },
    {
      icon: Target,
      title: "Skill Tree Progress",
      description: "Visual progression system that gamifies your learning journey"
    },
    {
      icon: Users,
      title: "Cultural Personalization",
      description: "Learn through examples from your cultural background"
    },
    {
      icon: Sparkles,
      title: "Emotion-Aware AI",
      description: "Detects frustration and adjusts difficulty in real-time"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-20"
      >
        <div className="text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
          >
            EduSphere
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Experience the future of personalized education with AI-powered learning that adapts to your unique style, pace, and cultural background
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-4 justify-center mb-16"
          >
            <Link to="/onboarding">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
              >
                Start Learning <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/demo">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
              >
                <Play className="mr-2 h-5 w-5" /> Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* Feature Showcase */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className={`p-6 bg-gradient-to-br ${
                  currentFeature === index 
                    ? 'from-purple-800/80 to-blue-800/80 border-2 border-cyan-400' 
                    : 'from-purple-800/40 to-blue-800/40 border border-purple-600'
                } backdrop-blur-sm transition-all duration-500`}>
                  <feature.icon className={`h-12 w-12 mb-4 mx-auto ${
                    currentFeature === index ? 'text-cyan-400' : 'text-purple-400'
                  } transition-colors duration-500`} />
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">10.4B+</div>
              <div className="text-gray-300">EdTech Market Size by 2025</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">36.2%</div>
              <div className="text-gray-300">AI in EdTech Growth Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">90%</div>
              <div className="text-gray-300">Students Want Personalized Learning</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex gap-4 bg-black/20 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-500/30">
          <Link to="/dashboard">
            <Button size="sm" variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-600/50">
              Dashboard
            </Button>
          </Link>
          <Link to="/quiz">
            <Button size="sm" variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-600/50">
              Quiz
            </Button>
          </Link>
          <Link to="/tutor">
            <Button size="sm" variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-600/50">
              AI Tutor
            </Button>
          </Link>
          <Link to="/skill-tree">
            <Button size="sm" variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-600/50">
              Skill Tree
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
