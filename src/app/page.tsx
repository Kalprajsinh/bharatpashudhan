'use client';

import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Shield, 
  Database, 
  Heart, 
  CheckCircle, 
  Users, 
  MapPin, 
  ArrowRight,
  Smartphone,
  Zap,
  Award,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  FileText,
  Eye,
  Clock,
  Target
} from 'lucide-react';
import LoginForm from '@/components/LoginForm';
import HomePage from '@/components/HomePage';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setShowLogin(false);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setShowLogin(false);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (user) {
    return <HomePage user={user} onLogout={handleLogout} />;
  }

  if (showLogin) {
    return (
      <LoginForm 
        onLogin={handleLogin} 
        onRegister={handleRegister}
        isLoading={isLoading} 
        error={error || undefined} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900"></span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#solution" className="text-gray-600 hover:text-blue-600 transition-colors">Solution</a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#dashboards" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboards</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            <button 
              onClick={() => setShowLogin(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 px-10">
        <img src="./image.png" alt="" />
      </section>

      <section id="solution" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our ML-Powered Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced machine learning technology that identifies cattle and buffalo breeds from images, 
              eliminating manual errors and supporting better livestock management decisions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Camera className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Image-Based Recognition</h3>
                    <p className="text-gray-600">Upload photos of cattle and buffalo to get instant, accurate breed identification using advanced ML algorithms.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Suggestions</h3>
                    <p className="text-gray-600">Get instant breed suggestions during animal registration, reducing errors and speeding up the process.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Robust Performance</h3>
                    <p className="text-gray-600">Works effectively across diverse backgrounds, lighting conditions, and animal poses for reliable field use.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-200" />
                    <span>Eliminates manual breed identification errors</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-200" />
                    <span>Improves policy planning accuracy</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-200" />
                    <span>Supports genetic improvement programs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-200" />
                    <span>Enhances nutrition and disease management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-200" />
                    <span>Streamlines registration process</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything field workers need to register, track, and manage livestock data 
              with accuracy and efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Animal Registration</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Easy-to-use platform for FLWs to register animals with accurate breed identification 
                and complete owner information.
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Health & Vaccination</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Track vaccinations, breeding records, and health details with automated reminders 
                and comprehensive medical history.
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Data Storage</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Centralized database storing all animal and owner data with secure access 
                and real-time synchronization across devices.
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Validation</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Instant breed suggestions and data validation during registration to prevent 
                errors and ensure data accuracy.
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboards Section */}
      <section id="dashboards" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Dashboards for All Stakeholders
            </h2>
            <p className="text-xl text-gray-600">
              Tailored interfaces for owners and government officials to track and analyze livestock data
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Owner Dashboard</h3>
                  <p className="text-blue-700">For livestock owners</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Track all registered animals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Monitor health and vaccination status</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Access subsidy information</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">View breeding records</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Government Dashboard</h3>
                  <p className="text-orange-700">For policy makers</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">Breed distribution analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">Region-wise ownership data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">Vaccination coverage reports</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">Genetic improvement tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              From image capture to data insights in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Image</h3>
              <p className="text-gray-600">
                Take or upload a photo of the cattle or buffalo using any smartphone camera.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-500">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Recognition</h3>
              <p className="text-gray-600">
                Our ML algorithm instantly identifies the breed with real-time suggestions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Register Data</h3>
              <p className="text-gray-600">
                Complete animal registration with owner details, health records, and breeding info.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Track & Analyze</h3>
              <p className="text-gray-600">
                Access dashboards for tracking animals, health status, and policy insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transforming Livestock Management
            </h2>
            <p className="text-xl text-gray-600">
              See the positive impact on policy planning and livestock health
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-blue-50 rounded-2xl">
              <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Better Policy Planning</h3>
              <p className="text-gray-600">
                Accurate breed data enables evidence-based policy decisions and resource allocation.
              </p>
            </div>

            <div className="text-center p-8 bg-green-50 rounded-2xl">
              <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Genetic Improvement</h3>
              <p className="text-gray-600">
                Support selective breeding programs with precise breed identification and tracking.
              </p>
            </div>

            <div className="text-center p-8 bg-orange-50 rounded-2xl">
              <Heart className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Health Management</h3>
              <p className="text-gray-600">
                Improve nutrition and disease management with breed-specific health protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold"></span>
              </div>
              <p className="text-gray-400">
                Empowering field workers with AI-powered livestock identification for better policy outcomes.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Breed Recognition</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Registration System</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Dashboards</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Owner Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Government Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Field Worker Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reports</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
}

export default App;