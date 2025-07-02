import React, { useState } from 'react';
import { User, CalendarDays, GraduationCap, Users } from 'lucide-react';

interface DashboardProps {
  onUserSetup: (user: User) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onUserSetup }) => {
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    section: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.grade && formData.section) {
      onUserSetup(formData as User);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
            <CalendarDays className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Fraction Frenzy
          </h1>
          <p className="text-xl text-purple-200 font-semibold">
            Conquer Every Operation
          </p>
          <p className="text-purple-300 mt-2">
            Master fractions through exciting challenges!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
              <input
                type="text"
                name="grade"
                placeholder="Enter your grade level (e.g., Grade 5, 5th Grade)"
                value={formData.grade}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
              <input
                type="text"
                name="section"
                placeholder="Enter your section (e.g., A, B, 1, 2)"
                value={formData.section}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Fraction Adventure! 🚀
          </button>
        </form>

        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-8 text-purple-200">
            <div className="text-center">
              <div className="font-bold text-xl">4</div>
              <div className="text-sm">Levels</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl">40+</div>
              <div className="text-sm">Questions</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl">🏆</div>
              <div className="text-sm">Certificate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;