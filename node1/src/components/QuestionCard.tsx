import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { Lightbulb, CheckCircle, XCircle, BookOpen } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (isCorrect: boolean) => void;
  isAnswered?: boolean;
  savedAnswer?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
  isAnswered = false,
  savedAnswer = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(isAnswered);
  const [showResult, setShowResult] = useState(isAnswered);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowHint(false);
    setAnswered(isAnswered);
    setShowResult(isAnswered);
  }, [question.id, isAnswered]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || answered) return;
    
    setAnswered(true);
    setShowResult(true);
    
    const isCorrect = selectedAnswer === question.correctAnswer;
    onAnswerSubmit(isCorrect);
  };

  const handleHint = () => {
    setShowHint(!showHint);
  };

  const getButtonColor = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index 
        ? 'bg-purple-600 text-white border-purple-600' 
        : 'bg-white/10 hover:bg-white/20 text-white border-white/30';
    }
    
    if (index === question.correctAnswer) {
      return 'bg-green-500 text-white border-green-500';
    }
    
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'bg-red-500 text-white border-red-500';
    }
    
    return 'bg-white/10 text-white border-white/30';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-purple-300 font-medium">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleHint}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                showHint 
                  ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-400/50' 
                  : 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
            </button>
            
            {answered && (
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
                savedAnswer ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {savedAnswer ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Correct</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    <span>Incorrect</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          {question.question}
        </h2>
        
        {showHint && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4 animate-in slide-in-from-top duration-300">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-yellow-200 font-medium mb-2">💡 Hint:</p>
                <p className="text-yellow-200">{question.hint}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={answered}
            className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 ${getButtonColor(index)}`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
              {showResult && index === question.correctAnswer && (
                <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
              )}
              {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                <XCircle className="w-5 h-5 text-red-400 ml-auto" />
              )}
            </div>
          </button>
        ))}
      </div>

      {showResult && (
        <div className="space-y-4 mb-6">
          {/* Result Feedback */}
          <div className={`p-4 rounded-xl animate-in slide-in-from-bottom duration-300 ${
            selectedAnswer === question.correctAnswer 
              ? 'bg-green-500/20 border border-green-500/30' 
              : 'bg-red-500/20 border border-red-500/30'
          }`}>
            <div className="flex items-center space-x-3">
              {selectedAnswer === question.correctAnswer ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-green-300 font-semibold">Excellent! That's correct! 🎉</p>
                    <p className="text-green-200 text-sm">+1 point added to your score</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-400" />
                  <div>
                    <p className="text-red-300 font-semibold">Not quite right, but keep trying!</p>
                    <p className="text-red-200 text-sm">The correct answer was {String.fromCharCode(65 + question.correctAnswer)}: {question.options[question.correctAnswer]}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Detailed Solution */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 animate-in slide-in-from-bottom duration-500">
            <div className="flex items-start space-x-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-200 font-medium mb-2">📚 Step-by-Step Solution:</p>
                <div className="text-blue-200 space-y-2">
                  {question.solution && question.solution.map((step, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-blue-300 font-bold min-w-[20px]">{index + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                {question.explanation && (
                  <div className="mt-3 p-3 bg-blue-500/10 rounded-lg">
                    <p className="text-blue-200 text-sm">
                      <span className="font-medium">💭 Why this works: </span>
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {!answered && (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
        >
          Submit Answer
        </button>
      )}
    </div>
  );
};

export default QuestionCard;