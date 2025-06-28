
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, User, Brain, Globe, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    interests: [],
    learningStyle: '',
    culturalBackground: '',
    preferredLanguage: 'English',
    learningGoals: [],
    difficultyPreference: 'medium'
  });
  
  const navigate = useNavigate();

  const steps = [
    {
      title: "Welcome! Let's Get to Know You",
      icon: User,
      component: BasicInfoStep
    },
    {
      title: "How Do You Learn Best?",
      icon: Brain,
      component: LearningStyleStep
    },
    {
      title: "Your Cultural Context",
      icon: Globe,
      component: CulturalStep
    },
    {
      title: "What Drives Your Learning?",
      icon: Heart,
      component: GoalsStep
    }
  ];

  function BasicInfoStep() {
    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-white text-lg">What's your name?</Label>
          <Input
            id="name"
            value={userData.name}
            onChange={(e) => setUserData({...userData, name: e.target.value})}
            className="mt-2 bg-white/10 border-purple-400 text-white placeholder-gray-300"
            placeholder="Enter your name"
          />
        </div>
        
        <div>
          <Label htmlFor="age" className="text-white text-lg">How old are you?</Label>
          <Input
            id="age"
            type="number"
            value={userData.age}
            onChange={(e) => setUserData({...userData, age: e.target.value})}
            className="mt-2 bg-white/10 border-purple-400 text-white placeholder-gray-300"
            placeholder="Enter your age"
          />
        </div>

        <div>
          <Label className="text-white text-lg">What subjects interest you?</Label>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {['Mathematics', 'Science', 'History', 'Literature', 'Art', 'Technology', 'Languages', 'Music'].map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={subject}
                  checked={userData.interests.includes(subject)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setUserData({...userData, interests: [...userData.interests, subject]});
                    } else {
                      setUserData({...userData, interests: userData.interests.filter(i => i !== subject)});
                    }
                  }}
                  className="border-purple-400"
                />
                <Label htmlFor={subject} className="text-white">{subject}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function LearningStyleStep() {
    return (
      <div className="space-y-6">
        <div>
          <Label className="text-white text-lg">How do you prefer to learn?</Label>
          <RadioGroup 
            value={userData.learningStyle} 
            onValueChange={(value) => setUserData({...userData, learningStyle: value})}
            className="mt-4 space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="visual" id="visual" className="border-purple-400" />
              <Label htmlFor="visual" className="text-white">Visual (Images, diagrams, videos)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="auditory" id="auditory" className="border-purple-400" />
              <Label htmlFor="auditory" className="text-white">Auditory (Listening, discussions)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="kinesthetic" id="kinesthetic" className="border-purple-400" />
              <Label htmlFor="kinesthetic" className="text-white">Kinesthetic (Hands-on, interactive)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reading" id="reading" className="border-purple-400" />
              <Label htmlFor="reading" className="text-white">Reading/Writing (Text-based)</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-white text-lg">Preferred difficulty level?</Label>
          <RadioGroup 
            value={userData.difficultyPreference} 
            onValueChange={(value) => setUserData({...userData, difficultyPreference: value})}
            className="mt-4 space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="easy" id="easy" className="border-purple-400" />
              <Label htmlFor="easy" className="text-white">Start Easy (Build confidence)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" className="border-purple-400" />
              <Label htmlFor="medium" className="text-white">Moderate Challenge</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hard" id="hard" className="border-purple-400" />
              <Label htmlFor="hard" className="text-white">Challenge Me!</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    );
  }

  function CulturalStep() {
    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="cultural" className="text-white text-lg">What's your cultural background?</Label>
          <Input
            id="cultural"
            value={userData.culturalBackground}
            onChange={(e) => setUserData({...userData, culturalBackground: e.target.value})}
            className="mt-2 bg-white/10 border-purple-400 text-white placeholder-gray-300"
            placeholder="e.g., Indian, American, Japanese, etc."
          />
        </div>

        <div>
          <Label className="text-white text-lg">Preferred learning language?</Label>
          <RadioGroup 
            value={userData.preferredLanguage} 
            onValueChange={(value) => setUserData({...userData, preferredLanguage: value})}
            className="mt-4 space-y-3"
          >
            {['English', 'Hindi', 'Spanish', 'French', 'Mandarin', 'Arabic'].map((lang) => (
              <div key={lang} className="flex items-center space-x-2">
                <RadioGroupItem value={lang} id={lang} className="border-purple-400" />
                <Label htmlFor={lang} className="text-white">{lang}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    );
  }

  function GoalsStep() {
    return (
      <div className="space-y-6">
        <div>
          <Label className="text-white text-lg">What are your learning goals?</Label>
          <div className="grid grid-cols-1 gap-3 mt-3">
            {[
              'Improve academic performance',
              'Prepare for exams',
              'Learn new skills for career',
              'Personal enrichment',
              'Help with homework',
              'Build confidence',
              'Explore new subjects',
              'Enhance creativity'
            ].map((goal) => (
              <div key={goal} className="flex items-center space-x-2">
                <Checkbox
                  id={goal}
                  checked={userData.learningGoals.includes(goal)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setUserData({...userData, learningGoals: [...userData.learningGoals, goal]});
                    } else {
                      setUserData({...userData, learningGoals: userData.learningGoals.filter(g => g !== goal)});
                    }
                  }}
                  className="border-purple-400"
                />
                <Label htmlFor={goal} className="text-white">{goal}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save user data to localStorage and navigate to dashboard
      localStorage.setItem('userData', JSON.stringify(userData));
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const StepIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30 p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-purple-300">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-purple-300">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-purple-900/50 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Header */}
          <div className="text-center mb-8">
            <motion.div
              key={currentStep}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <StepIcon className="h-16 w-16 mx-auto text-cyan-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">{steps[currentStep].title}</h2>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white disabled:opacity-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Onboarding;
