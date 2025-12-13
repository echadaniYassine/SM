import { Link } from 'react-router-dom'
import { GraduationCap, BookOpen, Users, ArrowRight, CheckCircle, Star } from 'lucide-react'
export default function HomePage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
            {/* Main Hero Content */}
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Transform Your Educational Journey</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">School Management</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Empowering education through innovative technology. Discover programs, connect with excellence, and shape your future.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Link
                  to="/register-public"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/programs"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Explore Programs
                </Link>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-24 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {/* Card 1 */}
              <div className="group relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Diverse Programs
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Access a wide range of educational programs tailored to your goals and aspirations.
                  </p>
                  <Link to="/programs" className="text-blue-600 dark:text-blue-400 font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Smart Learning
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Experience cutting-edge educational tools designed to enhance your learning journey.
                  </p>
                  <div className="text-purple-600 dark:text-purple-400 font-semibold flex items-center">
                    Coming soon <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Community First
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Join a vibrant community of learners, educators, and innovators from around the world.
                  </p>
                  <Link to="/register-public" className="text-green-600 dark:text-green-400 font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                    Join us <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {[
                { number: '10K+', label: 'Students' },
                { number: '500+', label: 'Programs' },
                { number: '98%', label: 'Success Rate' },
                { number: '50+', label: 'Countries' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Login Link */}
            <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Already have an account?
              </p>
              <Link
                to="/login"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-lg group"
              >
                Sign in here
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="relative">
          <svg className="w-full h-24 fill-current text-blue-50 dark:text-gray-800" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>
  )
}