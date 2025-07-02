import React, { useState, useEffect } from 'react';
import { User, GameState } from '../types';
import QuestionCard from './QuestionCard';
import LevelProgress from './LevelProgress';
import { generateQuestions } from '../utils/questionGenerator';
import { Trophy, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

interface GameLevelProps {
  user: User;
  gameState: GameState;
  onLevelComplete: (score: number, totalQuestions: number) => void;
  onBackToLevelSelection: () => void;
  onRestart: () => void;
}

const GameLevel: React.FC<GameLevelProps> = ({ 
  user, 
  gameState, 
  onLevelComplete,
  onBackToLevelSelection,
  onRestart 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [levelScore, setLevelScore] = useState(0);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [questions, setQuestions] = useState(generateQuestions(gameState.currentLevel));
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [questionScores, setQuestionScores] = useState<boolean[]>([]);

  const levelNames = [
    'Fraction Addition',
    'Fraction Subtraction', 
    'Fraction Multiplication',
    'Fraction Division'
  ];

  const levelDescriptions = [
    'Master adding fractions with different denominators',
    'Conquer subtracting fractions like a pro',
    'Multiply fractions with confidence',
    'Divide fractions and become unstoppable'
  ];

  useEffect(() => {
    const newQuestions = generateQuestions(gameState.currentLevel);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setLevelScore(0);
    setIsLevelComplete(false);
    setAnsweredQuestions(new Array(newQuestions.length).fill(false));
    setQuestionScores(new Array(newQuestions.length).fill(false));
  }, [gameState.currentLevel]);

  const handleAnswerSubmit = (isCorrect: boolean) => {
    const newAnsweredQuestions = [...answeredQuestions];
    const newQuestionScores = [...questionScores];
    
    newAnsweredQuestions[currentQuestionIndex] = true;
    newQuestionScores[currentQuestionIndex] = isCorrect;
    
    setAnsweredQuestions(newAnsweredQuestions);
    setQuestionScores(newQuestionScores);
    
    // Calculate total score
    const totalCorrect = newQuestionScores.filter(score => score).length;
    setLevelScore(totalCorrect);

    // Check if all questions are answered
    if (newAnsweredQuestions.every(answered => answered)) {
      setIsLevelComplete(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkipQuestion = () => {
    if (!answeredQuestions[currentQuestionIndex]) {
      handleAnswerSubmit(false);
    }
    handleNextQuestion();
  };

  const handleQuestionJump = (questionIndex: number) => {
    setCurrentQuestionIndex(questionIndex);
  };

  const handleNextLevel = () => {
    onLevelComplete(levelScore, questions.length);
  };

  if (gameState.isGameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Congratulations! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            You've completed all levels! Click continue to get your certificate.
          </p>
          <button
            onClick={handleNextLevel}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200"
          >
            Get My Certificate! 🏆
          </button>
        </div>
      </div>
    );
  }

  if (isLevelComplete) {
    const isLastLevel = gameState.currentLevel === 4;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-white/20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Level {gameState.currentLevel} Complete! 🎉
          </h2>
          
          <div className="bg-white/10 rounded-2xl p-6 mb-6">
            <div className="text-2xl font-bold text-green-400 mb-2">
              {levelScore}/{questions.length}
            </div>
            <div className="text-purple-200">
              Correct Answers
            </div>
            <div className="text-sm text-purple-300 mt-2">
              Score: +{levelScore} points
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onBackToLevelSelection}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Levels</span>
            </button>
            
            <button
              onClick={onRestart}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart</span>
            </button>
            
            <button
              onClick={handleNextLevel}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>{isLastLevel ? 'Certificate' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <LevelProgress
        user={user}
        gameState={gameState}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        levelScore={levelScore}
        levelName={levelNames[gameState.currentLevel - 1]}
        levelDescription={levelDescriptions[gameState.currentLevel - 1]}
        onBackToLevelSelection={onBackToLevelSelection}
        onRestart={onRestart}
      />
      
      <div className="pt-32 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Question Navigation Bar */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Question Navigation</h3>
              <div className="text-purple-300 text-sm">
                {answeredQuestions.filter(answered => answered).length} of {questions.length} answered
              </div>
            </div>
            
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionJump(index)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm transition-all duration-200 ${
                    index === currentQuestionIndex
                      ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                      : answeredQuestions[index]
                      ? questionScores[index]
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-white/20 text-purple-300 hover:bg-white/30'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <div className="flex justify-center mt-4 space-x-2 text-xs text-purple-300">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>Current</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Correct</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Incorrect</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-white/20 rounded"></div>
                <span>Unanswered</span>
              </div>
            </div>
          </div>

          <QuestionCard
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswerSubmit={handleAnswerSubmit}
            isAnswered={answeredQuestions[currentQuestionIndex]}
            savedAnswer={questionScores[currentQuestionIndex]}
          />

          {/* Navigation Controls */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center space-x-2 bg-gray-600/50 hover:bg-gray-600/70 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-3">
              <button
                onClick={handleSkipQuestion}
                disabled={answeredQuestions[currentQuestionIndex]}
                className="flex items-center space-x-2 bg-yellow-600/50 hover:bg-yellow-600/70 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                <span>Skip Question</span>
              </button>

              {answeredQuestions.every(answered => answered) && (
                <button
                  onClick={() => setIsLevelComplete(true)}
                  className="flex items-center space-x-2 bg-green-600/50 hover:bg-green-600/70 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Finish Level</span>
                </button>
              )}
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="flex items-center space-x-2 bg-purple-600/50 hover:bg-purple-600/70 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLevel;