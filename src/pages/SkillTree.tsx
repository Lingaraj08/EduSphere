import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  Lock, 
  CheckCircle, 
  Play, 
  Trophy,
  Target,
  BookOpen,
  Zap,
  Brain,
  Sparkles,
  Crown,
  Gem
} from 'lucide-react';

const SkillTree = () => {
  const [nodes, setNodes] = useState([
    { id: 1, title: 'Fundamentals', description: 'Basic concepts', xp: 100, completed: true, locked: false, category: 'theory' },
    { id: 2, title: 'Variables', description: 'Declaring variables', xp: 150, completed: true, locked: false, category: 'syntax' },
    { id: 3, title: 'Data Types', description: 'Understanding data types', xp: 120, completed: true, locked: false, category: 'theory' },
    { id: 4, title: 'Operators', description: 'Working with operators', xp: 180, completed: true, locked: false, category: 'syntax' },
    { id: 5, title: 'Conditionals', description: 'If/else statements', xp: 200, completed: true, locked: false, category: 'control_flow' },
    { id: 6, title: 'Loops', description: 'For and while loops', xp: 250, completed: true, locked: false, category: 'control_flow' },
    { id: 7, title: 'Functions', description: 'Defining functions', xp: 300, completed: true, locked: false, category: 'functions' },
    { id: 8, title: 'Arrays', description: 'Working with arrays', xp: 350, completed: true, locked: false, category: 'data_structures' },
    { id: 9, title: 'Objects', description: 'Understanding objects', xp: 400, completed: true, locked: false, category: 'data_structures' },
    { id: 10, title: 'Classes', description: 'Defining classes', xp: 450, completed: false, locked: false, category: 'oop' },
    { id: 11, title: 'Inheritance', description: 'Understanding inheritance', xp: 500, completed: false, locked: false, category: 'oop' },
    { id: 12, title: 'Polymorphism', description: 'Working with polymorphism', xp: 550, completed: false, locked: false, category: 'oop' },
    { id: 13, title: 'Abstraction', description: 'Understanding abstraction', xp: 600, completed: false, locked: false, category: 'oop' },
    { id: 14, title: 'Encapsulation', description: 'Working with encapsulation', xp: 650, completed: false, locked: false, category: 'oop' },
    { id: 15, title: 'Recursion', description: 'Recursive functions', xp: 700, completed: false, locked: false, category: 'algorithms' },
    { id: 16, title: 'Sorting', description: 'Sorting algorithms', xp: 750, completed: false, locked: false, category: 'algorithms' },
    { id: 17, title: 'Searching', description: 'Searching algorithms', xp: 800, completed: false, locked: false, category: 'algorithms' },
    { id: 18, title: 'Trees', description: 'Understanding trees', xp: 850, completed: false, locked: false, category: 'data_structures' },
    { id: 19, title: 'Graphs', description: 'Working with graphs', xp: 900, completed: false, locked: false, category: 'data_structures' },
    { id: 20, title: 'Dynamic Programming', description: 'Dynamic programming techniques', xp: 1000, completed: false, locked: false, category: 'algorithms' },
  ]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const categories = [
    { id: 'theory', label: 'Theory', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { id: 'syntax', label: 'Syntax', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { id: 'control_flow', label: 'Control Flow', icon: Target, color: 'from-purple-500 to-pink-500' },
    { id: 'functions', label: 'Functions', icon: Brain, color: 'from-green-500 to-teal-500' },
    { id: 'data_structures', label: 'Data Structures', icon: Star, color: 'from-red-500 to-rose-500' },
    { id: 'oop', label: 'OOP', icon: Gem, color: 'from-indigo-500 to-violet-500' },
    { id: 'algorithms', label: 'Algorithms', icon: Sparkles, color: 'from-lime-500 to-green-500' },
  ];

  useEffect(() => {
    // Simulate unlocking nodes based on completion
    const unlockNodes = () => {
      const updatedNodes = nodes.map((node, index) => {
        if (index > 0 && nodes[index - 1].completed) {
          return { ...node, locked: false };
        }
        return node;
      });
      setNodes(updatedNodes);
    };

    unlockNodes();
  }, [nodes]);

  const completeNode = (id) => {
    const updatedNodes = nodes.map(node =>
      node.id === id ? { ...node, completed: true } : node
    );
    setNodes(updatedNodes);
    setSelectedNode(null);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const calculateTotalXP = () => {
    return nodes.reduce((total, node) => total + node.xp, 0);
  };

  const calculateCompletedXP = () => {
    return nodes.reduce((total, node) => total + (node.completed ? node.xp : 0), 0);
  };

  const calculateLevel = () => {
    const completedXP = calculateCompletedXP();
    return Math.floor(Math.sqrt(completedXP / 100));
  };

  const totalXP = calculateTotalXP();
  const completedXP = calculateCompletedXP();
  const level = calculateLevel();
  const progress = (completedXP / totalXP) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Skill Tree 🌳
              </h1>
              <p className="text-gray-300">Visualize your learning path</p>
            </div>
            <div className="text-right">
              <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                Level: {level}
              </Badge>
              <p className="text-gray-300 text-sm">Total XP: {completedXP} / {totalXP}</p>
            </div>
          </div>

          <Progress value={progress} className="h-3 bg-purple-700" />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Skill Tree Visualization */}
          <div className="md:col-span-2">
            <Card className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30 p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Skills</h2>
              <div className="flex flex-col gap-4">
                {nodes.map((node) => (
                  <motion.div
                    key={node.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      node.completed
                        ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    } ${node.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => !node.locked && setSelectedNode(node)}
                    whileHover={{ scale: !node.locked ? 1.05 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3">
                      {node.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        categories.find(cat => cat.id === node.category)?.icon &&
                        React.createElement(categories.find(cat => cat.id === node.category).icon, { className: "h-5 w-5" })
                      )}
                      <div>
                        <h3 className="font-semibold">{node.title}</h3>
                        <p className="text-sm">{node.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-600/50 text-white text-xs">XP: {node.xp}</Badge>
                      {node.locked && <Lock className="h-4 w-4" />}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Node Details */}
          <div>
            <AnimatePresence>
              {selectedNode && (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-2xl font-semibold text-white">{selectedNode.title}</h2>
                        <p className="text-gray-300">{selectedNode.description}</p>
                      </div>
                      <Badge className="bg-purple-600/50 text-white">XP: {selectedNode.xp}</Badge>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Dive deeper into {selectedNode.title} and master the concepts. This will unlock new skills and
                      boost your overall level.
                    </p>
                    <Button
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                      onClick={() => completeNode(selectedNode.id)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Complete
                    </Button>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Categories */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Categories</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <Badge
                key={category.id}
                className={`bg-gradient-to-r ${category.color} text-white whitespace-nowrap`}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* You can add a confetti library here for a more realistic effect */}
            <div className="confetti-animation">🎉</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillTree;
