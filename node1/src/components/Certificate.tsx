import React from 'react';
import { User, GameState } from '../types';
import { Trophy, Star, Award, RotateCcw, Download } from 'lucide-react';

interface CertificateProps {
  user: User;
  gameState: GameState;
  onRestart: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ user, gameState, onRestart }) => {
  const accuracy = Math.round((gameState.score / gameState.totalQuestions) * 100);
  const performance = accuracy >= 90 ? 'Outstanding' : accuracy >= 80 ? 'Excellent' : accuracy >= 70 ? 'Very Good' : 'Good';
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl print:shadow-none print:max-w-none">
        {/* Certificate Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-4">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Certificate of Achievement
          </h1>
          
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-4"></div>
          
          <h2 className="text-2xl font-semibold text-orange-600 mb-6">
            Fraction Frenzy: Conquer Every Operation
          </h2>
        </div>

        {/* Certificate Body */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 mb-4">This is to certify that</p>
          
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {user.name}
            </h3>
            <p className="text-lg text-gray-600">
              {user.grade} - Section {user.section}
            </p>
          </div>
          
          <p className="text-lg text-gray-600 mb-6">
            has successfully completed all levels of the Fraction Frenzy educational game
            with {performance.toLowerCase()} performance, demonstrating mastery of fraction operations
            including addition, subtraction, multiplication, and division.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center">
            <Star className="w-8 h-8 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{gameState.score}</div>
            <div className="text-blue-200">Total Score</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-6 text-white text-center">
            <Award className="w-8 h-8 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{accuracy}%</div>
            <div className="text-green-200">Accuracy</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center">
            <Trophy className="w-8 h-8 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{performance}</div>
            <div className="text-purple-200">Performance</div>
          </div>
        </div>

        {/* Skills Mastered */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Skills Mastered
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Fraction Addition',
              'Fraction Subtraction',
              'Fraction Multiplication',
              'Fraction Division'
            ].map((skill, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Footer */}
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-4">
            Awarded on {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="w-32 h-1 bg-gray-400 mb-2"></div>
              <p className="text-sm text-gray-600">Fraction Frenzy</p>
              <p className="text-xs text-gray-500">Educational Platform</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            <Download className="w-5 h-5" />
            <span>Print Certificate</span>
          </button>
          
          <button
            onClick={onRestart}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;