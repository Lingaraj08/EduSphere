
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  BookOpen, 
  Sparkles,
  Volume2,
  Camera,
  Mic,
  Settings,
  RefreshCw,
  Heart
} from 'lucide-react';
import Groq from 'groq-sdk';

const AITutor = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your AI tutor. I can help explain concepts, answer questions, and adapt my teaching style to your needs. What would you like to learn about today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tutorMode, setTutorMode] = useState('explain'); // explain, simplify, practice, cultural
  const [emotionDetected, setEmotionDetected] = useState('neutral');
  const [userData, setUserData] = useState(null);
  const messagesEndRef = useRef(null);
  const [groqClient, setGroqClient] = useState(null);

  const tutorModes = [
    { 
      id: 'explain', 
      label: 'Explain', 
      icon: BookOpen, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Detailed explanations'
    },
    { 
      id: 'simplify', 
      label: 'Teach Me Like I\'m 5', 
      icon: Lightbulb, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Simple, easy language'
    },
    { 
      id: 'practice', 
      label: 'Practice', 
      icon: Sparkles, 
      color: 'from-purple-500 to-pink-500',
      description: 'Interactive exercises'
    },
    { 
      id: 'cultural', 
      label: 'Cultural Context', 
      icon: Heart, 
      color: 'from-green-500 to-teal-500',
      description: 'Examples from your culture'
    }
  ];

  const emotions = ['happy', 'confused', 'frustrated', 'excited', 'neutral'];

  useEffect(() => {
    // Initialize Groq client
    const apiKey = localStorage.getItem('groq_api_key');
    if (apiKey) {
      setGroqClient(new Groq({ 
        apiKey: apiKey,
        dangerouslyAllowBrowser: true 
      }));
    }

    // Load user data
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }

    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getSystemPrompt = () => {
    const basePrompt = `You are an AI tutor for ${userData?.name || 'the student'}. `;
    
    let modePrompt = '';
    switch (tutorMode) {
      case 'explain':
        modePrompt = 'Provide detailed, clear explanations with examples. Break down complex concepts step by step.';
        break;
      case 'simplify':
        modePrompt = 'Explain everything in very simple terms, like you would to a 5-year-old. Use analogies and simple language.';
        break;
      case 'practice':
        modePrompt = 'Create interactive exercises, quizzes, or practice problems. Make learning engaging and hands-on.';
        break;
      case 'cultural':
        modePrompt = `Incorporate examples and contexts from ${userData?.culturalBackground || 'the student\'s cultural background'}. Make learning relatable to their cultural experiences.`;
        break;
    }

    const emotionPrompt = emotionDetected !== 'neutral' 
      ? `The student seems ${emotionDetected}. Adjust your tone and approach accordingly. `
      : '';

    const personalPrompt = userData 
      ? `Student info: Age ${userData.age}, interests in ${userData.interests?.join(', ')}, learning style: ${userData.learningStyle}, cultural background: ${userData.culturalBackground}. `
      : '';

    return basePrompt + modePrompt + emotionPrompt + personalPrompt + 'Keep responses concise but helpful.';
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !groqClient) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const chatCompletion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: getSystemPrompt() },
          ...messages.slice(-5).map(msg => ({ role: msg.role, content: msg.content })),
          { role: 'user', content: inputMessage }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.7,
        max_tokens: 1000,
      });

      const assistantMessage = {
        role: 'assistant',
        content: chatCompletion.choices[0]?.message?.content || 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Groq API:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'I\'m having trouble connecting right now. Please make sure your Groq API key is set up correctly.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const quickPrompts = [
    "Explain this concept simply",
    "Give me practice problems",
    "Show cultural examples",
    "Break this down step by step",
    "I'm confused about...",
    "Can you quiz me on this?"
  ];

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const setupGroqKey = () => {
    const key = prompt('Please enter your Groq API key:');
    if (key) {
      localStorage.setItem('groq_api_key', key);
      setGroqClient(new Groq({ 
        apiKey: key,
        dangerouslyAllowBrowser: true 
      }));
    }
  };

  if (!groqClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <Card className="p-8 bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30 max-w-md text-center">
          <Bot className="h-16 w-16 mx-auto text-cyan-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Setup AI Tutor</h2>
          <p className="text-gray-300 mb-6">
            To use the AI Tutor, you need to provide your Groq API key. 
            Get one free at <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">console.groq.com</a>
          </p>
          <Button
            onClick={setupGroqKey}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
          >
            <Settings className="mr-2 h-4 w-4" />
            Enter API Key
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="container mx-auto max-w-6xl h-[calc(100vh-3rem)]">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI Tutor 🤖
              </h1>
              <p className="text-gray-300">Your personalized learning companion</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={`bg-gradient-to-r ${emotionDetected === 'happy' ? 'from-green-500 to-teal-500' : 
                emotionDetected === 'confused' ? 'from-yellow-500 to-orange-500' :
                emotionDetected === 'frustrated' ? 'from-red-500 to-pink-500' :
                'from-blue-500 to-purple-500'} text-white`}>
                Mood: {emotionDetected}
              </Badge>
              <Button
                onClick={() => setEmotionDetected(emotions[Math.floor(Math.random() * emotions.length)])}
                size="sm"
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tutor Modes */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tutorModes.map((mode) => (
              <Button
                key={mode.id}
                onClick={() => setTutorMode(mode.id)}
                variant={tutorMode === mode.id ? "default" : "outline"}
                className={`${
                  tutorMode === mode.id 
                    ? `bg-gradient-to-r ${mode.color}` 
                    : 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white'
                } whitespace-nowrap transform hover:scale-105 transition-all duration-300`}
              >
                <mode.icon className="mr-2 h-4 w-4" />
                {mode.label}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="flex gap-6 h-[calc(100%-8rem)]">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <Card className="flex-1 p-6 bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}
                      
                      <div className={`max-w-[70%] p-4 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white ml-auto' 
                          : 'bg-white/10 text-white'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>

                      {message.role === 'user' && (
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                      <RefreshCw className="h-5 w-5 text-white animate-spin" />
                    </div>
                    <div className="bg-white/10 text-white p-4 rounded-lg">
                      Thinking...
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      onClick={() => setInputMessage(prompt)}
                      size="sm"
                      variant="outline"
                      className="border-purple-400/50 text-purple-300 hover:bg-purple-400 hover:text-white text-xs"
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your studies..."
                    className="flex-1 bg-white/10 border-purple-400 text-white placeholder-gray-300 resize-none"
                    rows={2}
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 h-full"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-4">
            <Card className="p-4 bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30">
              <h3 className="text-lg font-semibold text-white mb-3">Current Mode</h3>
              {tutorModes.find(mode => mode.id === tutorMode) && (
                <div className={`p-3 rounded-lg bg-gradient-to-r ${tutorModes.find(mode => mode.id === tutorMode).color}/20 border border-white/20`}>
                  <div className="flex items-center gap-2 mb-2">
                    {React.createElement(tutorModes.find(mode => mode.id === tutorMode).icon, { className: "h-5 w-5 text-white" })}
                    <span className="text-white font-medium">
                      {tutorModes.find(mode => mode.id === tutorMode).label}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {tutorModes.find(mode => mode.id === tutorMode).description}
                  </p>
                </div>
              )}
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30">
              <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <Volume2 className="mr-2 h-4 w-4" />
                  Text to Speech
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <Mic className="mr-2 h-4 w-4" />
                  Voice Input
                </Button>
                <Button
                  onClick={setupGroqKey}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  API Settings
                </Button>
              </div>
            </Card>

            {userData && (
              <Card className="p-4 bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-3">Your Profile</h3>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-300">
                    <span className="text-purple-300">Learning Style:</span> {userData.learningStyle}
                  </div>
                  <div className="text-gray-300">
                    <span className="text-purple-300">Interests:</span> {userData.interests?.join(', ')}
                  </div>
                  <div className="text-gray-300">
                    <span className="text-purple-300">Background:</span> {userData.culturalBackground}
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
