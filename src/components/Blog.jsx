import React, { useState, useEffect } from 'react';
import { Rocket, Zap, Gauge, Layers, Info, ChevronRight, Search, Book, Star, TrendingUp, Plus, X, Upload, Lock, Eye, Calendar, User } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Header from './Header';
import Footer from './Footer';

// Initialize Supabase client
const supabaseUrl = 'https://lpmztexkqymllhssfwgz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwbXp0ZXhrcXltbGxoc3Nmd2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1OTgwNDQsImV4cCI6MjA3ODE3NDA0NH0.fgcj6ftOrbXkSGdaOrJjHbZacK2txMNajDSrapfNTrw';

const supabase = createClient(supabaseUrl, supabaseKey);

const ADMIN_PASSWORD = '123'; // Change this to your secure password

const RocketWiki = () => {
  const [rockets, setRockets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRocket, setSelectedRocket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'competition',
    tagline: '',
    description: '',
    height: '',
    diameter: '',
    weight: '',
    apogee: '',
    motor: '',
    features: ['', '', '', '', ''],
    status: 'Development',
    launch_date: '',
    author_name: '',
    image_url: ''
  });

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Fetch rockets from Supabase
  useEffect(() => {
    fetchRockets();
  }, []);

  const fetchRockets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rockets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRockets(data || []);
    } catch (error) {
      console.error('Error fetching rockets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setShowPasswordPrompt(false);
      setShowAddModal(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
      setPassword('');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('rocket-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('rocket-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rocketData = {
        name: formData.name,
        category: formData.category,
        tagline: formData.tagline,
        description: formData.description,
        specs: {
          height: formData.height,
          diameter: formData.diameter,
          weight: formData.weight,
          apogee: formData.apogee,
          motor: formData.motor
        },
        features: formData.features.filter(f => f.trim() !== ''),
        status: formData.status,
        launch_date: formData.launch_date,
        author_name: formData.author_name,
        image_url: formData.image_url || 'black_logo.svg'
      };

      const { error } = await supabase
        .from('rockets')
        .insert([rocketData]);

      if (error) throw error;

      alert('Rocket added successfully!');
      setShowAddModal(false);
      setAuthenticated(false);
      setFormData({
        name: '',
        category: 'competition',
        tagline: '',
        description: '',
        height: '',
        diameter: '',
        weight: '',
        apogee: '',
        motor: '',
        features: ['', '', '', '', ''],
        status: 'Development',
        launch_date: '',
        author_name: '',
        image_url: ''
      });
      fetchRockets();
    } catch (error) {
      console.error('Error adding rocket:', error);
      alert('Failed to add rocket');
    }
  };

  const categories = [
    { id: 'all', name: 'All Rockets', icon: Rocket },
    { id: 'competition', name: 'Competition', icon: Star },
    { id: 'research', name: 'Research', icon: Book },
    { id: 'experimental', name: 'Experimental', icon: TrendingUp }
  ];

  const filteredRockets = rockets.filter(rocket => {
    const matchesSearch = rocket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rocket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || rocket.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Development': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Testing': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
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
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowPasswordPrompt(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-600/30"
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
            >
              <Plus size={20} />
              Add New Article
            </button>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Rocket <span className="text-blue-600">Encyclopedia</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, letterSpacing: '0.05em' }}>
            Explore our fleet of rockets, from competition champions to experimental platforms pushing the boundaries of student rocketry
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search rockets by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 focus:border-blue-600 focus:outline-none transition-colors text-white placeholder-gray-500"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rockets Grid */}
      <section className="relative py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto" />
              <p className="text-gray-400 mt-4" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                Loading rockets...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRockets.map((rocket) => (
                <div
                  key={rocket.id}
                  className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50 rounded-3xl overflow-hidden hover:border-blue-600/50 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/20"
                  onClick={() => setSelectedRocket(rocket)}
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-600/20 to-blue-800/20 flex items-center justify-center border-b border-gray-800/50 overflow-hidden">
                    <img 
                      src={rocket.image_url || 'black_logo.svg'} 
                      alt={rocket.name} 
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {rocket.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(rocket.status)}`} style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                        {rocket.status}
                      </span>
                    </div>
                    <p className="text-blue-400 text-sm mb-3" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                      {rocket.tagline}
                    </p>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                      {rocket.description}
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Height</p>
                        <p className="text-white font-bold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{rocket.specs.height}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Apogee</p>
                        <p className="text-white font-bold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{rocket.specs.apogee}</p>
                      </div>
                    </div>

                    {/* Author & Date */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {rocket.author_name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {rocket.launch_date}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button className="w-full bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-blue-600/30" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                      View Details
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredRockets.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                No rockets found matching your search
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setShowPasswordPrompt(false)}>
          <div className="relative max-w-md w-full bg-gradient-to-br from-gray-900 to-black border border-blue-600/30 rounded-3xl p-8" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowPasswordPrompt(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={32} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Authentication Required
              </h2>
              <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                Enter the admin password to add a new rocket
              </p>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              placeholder="Enter password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4 focus:border-blue-600 focus:outline-none transition-colors text-white placeholder-gray-500"
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
            />

            <button
              onClick={handlePasswordSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all duration-300"
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Add Rocket Modal */}
      {showAddModal && authenticated && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-4xl w-full my-8 bg-gradient-to-br from-gray-900 to-black border border-blue-600/30 rounded-3xl p-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <button
              onClick={() => {
                setShowAddModal(false);
                setAuthenticated(false);
              }}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Add an Article
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Rocket Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                  >
                    <option value="competition">Competition</option>
                    <option value="research">Research</option>
                    <option value="experimental">Experimental</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Tagline *</label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white resize-none"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                />
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Height *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 3.2m"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Diameter *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 15cm"
                    value={formData.diameter}
                    onChange={(e) => setFormData({ ...formData, diameter: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Weight *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 25kg"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Apogee *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 10,000ft"
                    value={formData.apogee}
                    onChange={(e) => setFormData({ ...formData, apogee: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Motor *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., L-Class Solid"
                    value={formData.motor}
                    onChange={(e) => setFormData({ ...formData, motor: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                  >
                    <option value="Active">Active</option>
                    <option value="Development">Development</option>
                    <option value="Testing">Testing</option>
                  </select>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Key Features (5 features)</label>
                {formData.features.map((feature, index) => (
                  <input
                    key={index}
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...formData.features];
                      newFeatures[index] = e.target.value;
                      setFormData({ ...formData, features: newFeatures });
                    }}
                    placeholder={`Feature ${index + 1}`}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white mb-2"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                  />
                ))}
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Launch Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., March 2024"
                    value={formData.launch_date}
                    onChange={(e) => setFormData({ ...formData, launch_date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Author Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-600 focus:outline-none transition-colors text-white"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Cover Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full bg-white/5 border border-white/10 rounded-xl px-4 py-8 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {uploadingImage ? (
                      <div className="flex items-center gap-2 text-blue-400">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400" />
                        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Uploading...</span>
                      </div>
                    ) : formData.image_url ? (
                      <div className="text-center">
                        <img src={formData.image_url} alt="Preview" className="max-h-32 mx-auto mb-2 rounded-lg" />
                        <span className="text-green-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Image uploaded successfully</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                        <span className="text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Click to upload cover image</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                <Rocket size={20} />
                Publish Rocket
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Detailed Modal */}
      {selectedRocket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedRocket(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border border-blue-600/30 rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedRocket(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="relative h-64 bg-gradient-to-br from-blue-600/30 to-blue-800/30 flex items-center justify-center border-b border-gray-800/50 overflow-hidden">
              <img src={selectedRocket.image_url || 'black_logo.svg'} alt={selectedRocket.name} className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className={`px-4 py-2 rounded-full text-sm border ${getStatusColor(selectedRocket.status)} inline-block mb-3`} style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                  {selectedRocket.status}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {selectedRocket.name}
                </h2>
                <p className="text-blue-400 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                  {selectedRocket.tagline}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Info size={24} className="text-blue-600" />
                  Overview
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                  {selectedRocket.description}
                </p>
                <div className="flex items-center gap-6 mt-4 text-sm text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Author: {selectedRocket.author_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Launch Date: {selectedRocket.launch_date}</span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Gauge size={24} className="text-blue-600" />
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(selectedRocket.specs).map(([key, value]) => (
                    <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-gray-500 text-sm mb-2 capitalize" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>{key}</p>
                      <p className="text-white text-xl font-bold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <Layers size={24} className="text-blue-600" />
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedRocket.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                      <span className="text-gray-300" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RocketWiki;