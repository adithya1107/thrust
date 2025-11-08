import React, { useState, useEffect } from 'react';
import { Rocket, User, Mail, Phone, BookOpen, Award, Send, CheckCircle } from 'lucide-react';

const JoinTeam = ({ Header, Footer, onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    year: '',
    branch: '',
    interests: [],
    experience: '',
    motivation: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const subsystems = [
    'Aerodynamics',
    'Avionics',
    'Payload',
    'Propulsion',
    'Management',
    'Structures'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.year || !formData.branch || !formData.motivation) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        year: '',
        branch: '',
        interests: [],
        experience: '',
        motivation: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative max-w-7xl mx-auto text-center pt-2">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Join <span className="text-blue-600">Our Team</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, letterSpacing: '0.05em' }}>
            Be part of something extraordinary. Help us push the boundaries of student rocketry and reach for the stars.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-12 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {submitted ? (
            <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-xl border border-green-600/50 rounded-3xl p-12 text-center">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Application Submitted!
              </h2>
              <p className="text-gray-300 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                Thank you for your interest in joining MITBLR Rocketry. We'll review your application and get back to you soon!
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 md:p-12">
              {/* Personal Information */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                      Year of Study *
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                    >
                      <option value="" className="bg-gray-900">Select year</option>
                      <option value="1st Year" className="bg-gray-900">1st Year</option>
                      <option value="2nd Year" className="bg-gray-900">2nd Year</option>
                      <option value="3rd Year" className="bg-gray-900">3rd Year</option>
                      <option value="4th Year" className="bg-gray-900">4th Year</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                      Branch/Department *
                    </label>
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                      placeholder="e.g., Mechanical Engineering, Computer Science"
                    />
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Subsystem Interests
                </h2>
                <p className="text-gray-400 mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                  Select the subsystems you're interested in working on (you can choose multiple)
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subsystems.map((subsystem) => (
                    <button
                      key={subsystem}
                      type="button"
                      onClick={() => handleInterestToggle(subsystem)}
                      className={`p-4 rounded-xl border transition-all ${
                        formData.interests.includes(subsystem)
                          ? 'bg-blue-600/20 border-blue-600 text-blue-400'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }`}
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}
                    >
                      {subsystem}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience & Motivation */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Additional Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                      Relevant Experience
                    </label>
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white resize-none"
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                      placeholder="Share any relevant technical skills, projects, or experience..."
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                      Why do you want to join thrustMIT? *
                    </label>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white resize-none"
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                      placeholder="Tell us what drives your passion for rocketry..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg font-bold"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Submit Application
                <Send size={20} />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinTeam;