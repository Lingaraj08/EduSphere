
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Brain, 
  Target, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Star,
  Play,
  MessageCircle,
  Map
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [learningStats, setLearningStats] = useState({
    totalHours: 24,
    completedLessons: 18,
    currentStreak: 7,
    skillPoints: 1250,
    level: 5
  });

  const progressData = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 75 },
    { day: 'Wed', score: 85 },
    { day: 'Thu', score: 70 },
    { day: 'Fri', score: 90 },
    { day: 'Sat', score: 88 },
    { day: 'Sun', score: 95 }
  ];

  const recentActivities = [
    { subject: 'Mathematics', topic: 'Algebra Basics', score: 92, time: '2 hours ago' },
    { subject: 'Science', topic: 'Photosynthesis', score: 88, time: '1 day ago' },
    { subject: 'History', topic: 'Ancient Civilizations', score: 95, time: '2 days ago' },
    { subject: 'Literature', topic: 'Poetry Analysis', score: 87, time: '3 days ago' }
  ];

  const recommendedTopics = [
    { title: 'Quadratic Equations', difficulty: 'Medium', subject: 'Mathematics', estimatedTime: '45 min' },
    { title: 'Chemical Bonds', difficulty: 'Hard', subject: 'Science', estimatedTime: '60 min' },
    { title: 'World War History', difficulty: 'Easy', subject: 'History', estimatedTime: '30 min' },
    { title: 'Creative Writing', difficulty: 'Medium', subject: 'Literature', estimatedTime: '40 min' }
  ];

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Welcome back, {userData?.name || 'Learner'}! 🎓
              </h1>
              <p className="text-gray-300 mt-2">Ready to continue your learning journey?</p>
            </div>
            <div className="flex gap-3">
              <Link to="/quiz">
                <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all">
                  <Play className="mr-2 h-4 w-4" /> Take Quiz
                </Button>
              </Link>
              <Link to="/tutor">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all">
                  <MessageCircle className="mr-2 h-4 w-4" /> AI Tutor
                </Button>
              </Link>
              <Link to="/skill-tree">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all">
                  <Map className="mr-2 h-4 w-4" /> Skill Tree
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { icon: Clock, label: 'Learning Hours', value: learningStats.totalHours, color: 'from-blue-500 to-cyan-500' },
            { icon: BookOpen, label: 'Lessons Completed', value: learningStats.completedLessons, color: 'from-green-500 to-teal-500' },
            { icon: Target, label: 'Day Streak', value: learningStats.currentStreak, color: 'from-orange-500 to-red-500' },
            { icon: Star, label: 'Skill Points', value: learningStats.skillPoints, color: 'from-purple-500 to-pink-500' },
            { icon: Trophy, label: 'Current Level', value: learningStats.level, color: 'from-yellow-500 to-orange-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className={`p-6 bg-gradient-to-br ${stat.color} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-white/80" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-cyan-400" />
                Weekly Progress
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #6366F1',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="url(#colorGradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#06B6D4', strokeWidth: 2, r: 6 }}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="p-6 bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Brain className="mr-2 h-5 w-5 text-cyan-400" />
                Recent Activities
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-medium">{activity.topic}</h4>
                        <p className="text-gray-300 text-sm">{activity.subject}</p>
                      </div>
                      <Badge className={`${activity.score >= 90 ? 'bg-green-500' : activity.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                        {activity.score}%
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recommended Topics */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Target className="mr-2 h-5 w-5 text-cyan-400" />
              Recommended for You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-medium text-sm">{topic.title}</h4>
                    <Badge 
                      className={`${getDifficultyColor(topic.difficulty)} text-white text-xs px-2 py-1`}
                    >
                      {topic.difficulty}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{topic.subject}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">{topic.estimatedTime}</span>
                    <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-xs">
                      Start
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
