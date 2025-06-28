
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  RotateCcw, 
  Lightbulb,
  Target,
  Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [subject, setSubject] = useState('');
  
  const navigate = useNavigate();

  const subjects = ['Mathematics', 'Science', 'History', 'Literature', 'Geography'];
  
  const questions = {
    Mathematics: {
      easy: [
        {
          question: "What is 15 + 27?",
          options: ["42", "41", "43", "40"],
          correct: 0,
          explanation: "15 + 27 = 42. This is basic addition."
        },
        {
          question: "What is 8 × 7?",
          options: ["54", "56", "58", "52"],
          correct: 1,
          explanation: "8 × 7 = 56. This is multiplication table."
        }
      ],
      medium: [
        {
          question: "Solve for x: 2x + 5 = 15",
          options: ["x = 5", "x = 10", "x = 7", "x = 3"],
          correct: 0,
          explanation: "2x + 5 = 15, so 2x = 10, therefore x = 5"
        },
        {
          question: "What is the area of a circle with radius 4?",
          options: ["12π", "16π", "8π", "20π"],
          correct: 1,
          explanation: "Area = πr² = π(4)² = 16π"
        }
      ],
      hard: [
        {
          question: "Find the derivative of f(x) = x³ + 2x² - 5x + 1",
          options: ["3x² + 4x - 5", "x⁴ + 2x³ - 5x²", "3x² + 2x - 5", "3x³ + 4x² - 5x"],
          correct: 0,
          explanation: "f'(x) = 3x² + 4x - 5 using power rule"
        }
      ]
    },
    Science: {
      easy: [
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "CO2", "NaCl", "O2"],
          correct: 0,
          explanation: "Water is composed of 2 hydrogen atoms and 1 oxygen atom: H2O"
        }
      ],
      medium: [
        {
          question: "What is the powerhouse of the cell?",
          options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
          correct: 1,
          explanation: "Mitochondria produces ATP, the energy currency of cells"
        }
      ],
      hard: [
        {
          question: "What is the first law of thermodynamics?",
          options: [
            "Energy cannot be created or destroyed",
            "Entropy always increases",
            "Every action has equal reaction",
            "Force equals mass times acceleration"
          ],
          correct: 0,
          explanation: "The first law states that energy cannot be created or destroyed, only transformed"
        }
      ]
    },
    History: {
      easy: [
        {
          question: "Who was the first President of the United States?",
          options: ["George Washington", "Thomas Jefferson", "John Adams", "Benjamin Franklin"],
          correct: 0,
          explanation: "George Washington served as the first President from 1789 to 1797"
        }
      ],
      medium: [
        {
          question: "In which year did World War II end?",
          options: ["1944", "1945", "1946", "1943"],
          correct: 1,
          explanation: "World War II ended in 1945 with the surrender of Japan"
        }
      ],
      hard: [
        {
          question: "Which empire was ruled by Justinian I?",
          options: ["Roman Empire", "Byzantine Empire", "Ottoman Empire", "Holy Roman Empire"],
          correct: 1,
          explanation: "Justinian I ruled the Byzantine Empire from 527 to 565 CE"
        }
      ]
    }
  };

  const currentQuestions = questions[subject]?.[difficulty] || [];

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResult) {
      timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, showResult]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = () => {
    if (!subject) return;
    setQuizStarted(true);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResult(false);
    setTimeLeft(300);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion + 1 < currentQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    const newAnswers = [...userAnswers];
    if (selectedAnswer !== null) {
      newAnswers[currentQuestion] = selectedAnswer;
    }
    setUserAnswers(newAnswers);
    setShowResult(true);
  };

  const calculateScore = () => {
    let correct = 0;
    currentQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.correct) {
        correct++;
      }
    });
    return {
      correct,
      total: currentQuestions.length,
      percentage: Math.round((correct / currentQuestions.length) * 100)
    };
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResult(false);
    setTimeLeft(300);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <Card className="p-8 bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30">
            <div className="text-center mb-8">
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Brain className="h-16 w-16 mx-auto text-cyan-400 mb-4" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  Adaptive Quiz
                </h1>
                <p className="text-gray-300 text-lg">
                  Test your knowledge with AI-powered adaptive questions
                </p>
              </motion.div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-white text-lg font-medium block mb-3">Select Subject</label>
                <div className="grid grid-cols-2 gap-3">
                  {subjects.map((subj) => (
                    <Button
                      key={subj}
                      onClick={() => setSubject(subj)}
                      variant={subject === subj ? "default" : "outline"}
                      className={`${
                        subject === subj 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
                          : 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white'
                      } transform hover:scale-105 transition-all duration-300`}
                    >
                      {subj}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white text-lg font-medium block mb-3">Difficulty Level</label>
                <div className="flex gap-3">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <Button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      variant={difficulty === level ? "default" : "outline"}
                      className={`${
                        difficulty === level 
                          ? 'bg-gradient-to-r from-green-500 to-teal-500' 
                          : 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white'
                      } capitalize transform hover:scale-105 transition-all duration-300`}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={startQuiz}
                disabled={!subject}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-lg py-6 transform hover:scale-105 transition-all duration-300"
              >
                <Trophy className="mr-2 h-5 w-5" />
                Start Quiz
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <Card className="p-8 bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30">
            <div className="text-center mb-8">
              <Trophy className={`h-20 w-20 mx-auto mb-4 ${
                score.percentage >= 80 ? 'text-yellow-400' : 
                score.percentage >= 60 ? 'text-orange-400' : 'text-red-400'
              }`} />
              <h2 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h2>
              <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                {score.percentage}%
              </div>
              <p className="text-gray-300 text-lg">
                You got {score.correct} out of {score.total} questions correct
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {currentQuestions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="p-4 bg-white/10 rounded-lg"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {userAnswers[index] === question.correct ? (
                      <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2">{question.question}</h4>
                      <p className="text-gray-300 text-sm mb-2">
                        Your answer: {question.options[userAnswers[index]] || 'No answer'}
                      </p>
                      {userAnswers[index] !== question.correct && (
                        <p className="text-green-400 text-sm mb-2">
                          Correct answer: {question.options[question.correct]}
                        </p>
                      )}
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-400 text-sm">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300"
              >
                <Target className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  const question = currentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

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
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2">
                {subject} - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
              <div className="flex items-center gap-2 text-white">
                <Clock className="h-5 w-5" />
                <span className="text-lg font-mono">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="text-white text-lg">
              Question {currentQuestion + 1} of {currentQuestions.length}
            </div>
          </div>
          
          <Progress value={progress} className="h-3 bg-purple-900/50" />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 50, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-8 bg-gradient-to-br from-purple-800/80 to-blue-800/80 backdrop-blur-sm border border-purple-500/30 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-8">
                {question?.question}
              </h2>
              
              <div className="grid gap-4">
                {question?.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                      selectedAnswer === index
                        ? 'border-cyan-400 bg-cyan-400/20 text-white'
                        : 'border-purple-500/30 bg-white/10 text-gray-300 hover:border-purple-400 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index 
                          ? 'border-cyan-400 bg-cyan-400' 
                          : 'border-gray-400'
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-lg">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
          >
            Exit Quiz
          </Button>
          
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 transform hover:scale-105 transition-all duration-300"
          >
            {currentQuestion + 1 === currentQuestions.length ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
