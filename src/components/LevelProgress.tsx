import React from 'react';
import { User, GameState } from '../types';
import { Trophy, User as UserIcon, RotateCcw, Star, ArrowLeft } from 'lucide-react';

interface LevelProgressProps {
  user: User;
  gameState: GameState;
  currentQuestionIndex: number;
  totalQuestions: number;
  levelScore: number;
  levelName: string;
  levelDescription: string;
  onBackToLevelSelection: () => void;
  onRestart: () => void;
}

const LevelProgress: React.FC<LevelProgressProps> = ({
  user,
  gameState,
  currentQuestionIndex,
  totalQuestions,
  levelScore,
  levelName,
  levelDescription,
  onBackToLevelSelection,
  onRestart
}) => {
  const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-b border-white/20 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <UserIcon className="w-5 h-5 text-purple-300" />
              <span className="font-medium">{user.name}</span>
              <span className="text-purple-300">|</span>
              <span className="text-purple-300">{user.grade} - {user.section}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="font-bold">{gameState.score}</span>
                <span className="text-purple-300">Total Score</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-green-400" />
                <span className="font-bold">{levelScore}</span>
                <span className="text-purple-300">Level Score</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={onBackToLevelSelection}
                className="flex items-center space-x-2 bg-blue-600/50 hover:bg-blue-600/70 text-white px-4 py-2 rounded-xl transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Levels</span>
              </button>
              
              <button
                onClick={onRestart}
                className="flex items-center space-x-2 bg-gray-600/50 hover:bg-gray-600/70 text-white px-4 py-2 rounded-xl transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-white">
              Level {gameState.currentLevel}: {levelName}
            </h1>
            <p className="text-purple-300 text-sm">{levelDescription}</p>
          </div>
          
          <div className="text-right text-white">
            <div className="text-lg font-bold">
              {currentQuestionIndex + 1}/{totalQuestions}
            </div>
            <div className="text-purple-300 text-sm">Questions</div>
          </div>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            {Array.from({ length: 4 }, (_, index) => {
              const levelNumber = index + 1;
              const isCompleted = gameState.completedLevels.includes(levelNumber);
              const isCurrent = gameState.currentLevel === levelNumber;
              
              return (
                <div
                  key={levelNumber}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                      : 'bg-white/20 text-purple-300'
                  }`}
                >
                  {levelNumber}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;