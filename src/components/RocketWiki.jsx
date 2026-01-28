import React, { useState, useEffect, useRef } from 'react';
import { Book, ChevronRight, Home, Search, Rocket, Flame, Wind, Zap, Target, Settings, X, Plus, Edit, Trash2, Upload, Image, Sparkles, ArrowLeft, Menu, BookOpen } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_DATABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const RocketryWiki = ({ Header, headerProps }) => {
  const [wikiData, setWikiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [expandedMobileTopic, setExpandedMobileTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Admin state
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordAction, setPasswordAction] = useState('');
  
  // Modal state
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [editingChapter, setEditingChapter] = useState(null);
  const [topicToDelete, setTopicToDelete] = useState(null);
  const [chapterToDelete, setChapterToDelete] = useState(null);
  
  // Form state
  const [topicFormData, setTopicFormData] = useState({
    title: '',
    description: '',
    display_order: 0
  });
  
  const [chapterFormData, setChapterFormData] = useState({
    title: '',
    content: '',
    display_order: 0
  });
  
  const [uploadingContentImage, setUploadingContentImage] = useState(false);
  const contentTextareaRef = useRef(null);

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Fetch wiki data from Supabase
  useEffect(() => {
    fetchWikiData();
  }, []);

  const fetchWikiData = async () => {
    try {
      setLoading(true);
      
      const { data: topics, error: topicsError } = await supabase
        .from('wiki_topics')
        .select('*')
        .order('display_order', { ascending: true });

      if (topicsError) throw topicsError;

      const { data: chapters, error: chaptersError } = await supabase
        .from('wiki_chapters')
        .select('*')
        .order('display_order', { ascending: true });

      if (chaptersError) throw chaptersError;

      const combinedData = topics.map(topic => ({
        ...topic,
        chapters: chapters.filter(chapter => chapter.topic_id === topic.id)
      }));

      setWikiData(combinedData);
    } catch (error) {
      console.error('Error fetching wiki data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setShowPasswordPrompt(false);
      
      if (passwordAction === 'add-topic') {
        setShowTopicModal(true);
      } else if (passwordAction === 'edit-topic') {
        setShowTopicModal(true);
      } else if (passwordAction === 'delete-topic') {
        handleDeleteTopic();
      } else if (passwordAction === 'add-chapter') {
        setShowChapterModal(true);
      } else if (passwordAction === 'edit-chapter') {
        setShowChapterModal(true);
      } else if (passwordAction === 'delete-chapter') {
        handleDeleteChapter();
      }
      
      setPassword('');
    } else {
      alert('Incorrect password!');
      setPassword('');
    }
  };

  const handleContentImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingContentImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `wiki-${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('wiki-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('wiki-images')
        .getPublicUrl(filePath);

      const textarea = contentTextareaRef.current;
      const cursorPosition = textarea.selectionStart;
      const textBefore = chapterFormData.content.substring(0, cursorPosition);
      const textAfter = chapterFormData.content.substring(cursorPosition);
      const imageMarkdown = `\n\n![Image](${publicUrl})\n\n`;
      
      setChapterFormData({ 
        ...chapterFormData, 
        content: textBefore + imageMarkdown + textAfter 
      });

      alert('Image uploaded and inserted successfully!');
    } catch (error) {
      console.error('Error uploading content image:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingContentImage(false);
    }
  };

  // Topic CRUD operations
  const handleAddTopic = async () => {
    if (!topicFormData.title || !topicFormData.description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('wiki_topics')
        .insert([{
          title: topicFormData.title,
          description: topicFormData.description,
          display_order: topicFormData.display_order
        }]);

      if (error) throw error;

      alert('Topic created successfully!');
      setShowTopicModal(false);
      setAuthenticated(false);
      setTopicFormData({ title: '', description: '', display_order: 0 });
      fetchWikiData();
    } catch (error) {
      console.error('Error adding topic:', error);
      alert('Failed to create topic');
    }
  };

  const handleEditTopicClick = (topic, e) => {
    e.stopPropagation();
    setEditingTopic(topic);
    setTopicFormData({
      title: topic.title,
      description: topic.description,
      display_order: topic.display_order
    });
    setPasswordAction('edit-topic');
    setShowPasswordPrompt(true);
  };

  const handleUpdateTopic = async () => {
    if (!topicFormData.title || !topicFormData.description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('wiki_topics')
        .update({
          title: topicFormData.title,
          description: topicFormData.description,
          display_order: topicFormData.display_order
        })
        .eq('id', editingTopic.id);

      if (error) throw error;

      alert('Topic updated successfully!');
      setShowTopicModal(false);
      setAuthenticated(false);
      setEditingTopic(null);
      setTopicFormData({ title: '', description: '', display_order: 0 });
      fetchWikiData();
    } catch (error) {
      console.error('Error updating topic:', error);
      alert('Failed to update topic');
    }
  };

  const handleDeleteTopicClick = (topic, e) => {
    e.stopPropagation();
    setTopicToDelete(topic);
    setPasswordAction('delete-topic');
    setShowPasswordPrompt(true);
  };

  const handleDeleteTopic = async () => {
    if (!topicToDelete) return;

    try {
      const { error: chaptersError } = await supabase
        .from('wiki_chapters')
        .delete()
        .eq('topic_id', topicToDelete.id);

      if (chaptersError) throw chaptersError;

      const { error } = await supabase
        .from('wiki_topics')
        .delete()
        .eq('id', topicToDelete.id);

      if (error) throw error;

      alert('Topic and all its chapters deleted successfully!');
      setTopicToDelete(null);
      setAuthenticated(false);
      if (selectedTopic && selectedTopic.id === topicToDelete.id) {
        setSelectedTopic(null);
        setSelectedChapter(null);
      }
      fetchWikiData();
    } catch (error) {
      console.error('Error deleting topic:', error);
      alert('Failed to delete topic');
    }
  };

  // Chapter CRUD operations
  const handleAddChapter = async () => {
    if (!chapterFormData.title || !chapterFormData.content) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('wiki_chapters')
        .insert([{
          topic_id: selectedTopic.id,
          title: chapterFormData.title,
          content: chapterFormData.content,
          display_order: chapterFormData.display_order
        }]);

      if (error) throw error;

      alert('Chapter created successfully!');
      setShowChapterModal(false);
      setAuthenticated(false);
      setChapterFormData({ title: '', content: '', display_order: 0 });
      fetchWikiData();
    } catch (error) {
      console.error('Error adding chapter:', error);
      alert('Failed to create chapter');
    }
  };

  const handleEditChapterClick = (chapter, e) => {
    e.stopPropagation();
    setEditingChapter(chapter);
    setChapterFormData({
      title: chapter.title,
      content: chapter.content,
      display_order: chapter.display_order
    });
    setPasswordAction('edit-chapter');
    setShowPasswordPrompt(true);
  };

  const handleUpdateChapter = async () => {
    if (!chapterFormData.title || !chapterFormData.content) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('wiki_chapters')
        .update({
          title: chapterFormData.title,
          content: chapterFormData.content,
          display_order: chapterFormData.display_order
        })
        .eq('id', editingChapter.id);

      if (error) throw error;

      alert('Chapter updated successfully!');
      setShowChapterModal(false);
      setAuthenticated(false);
      setEditingChapter(null);
      setChapterFormData({ title: '', content: '', display_order: 0 });
      fetchWikiData();
    } catch (error) {
      console.error('Error updating chapter:', error);
      alert('Failed to update chapter');
    }
  };

  const handleDeleteChapterClick = (chapter, e) => {
    e.stopPropagation();
    setChapterToDelete(chapter);
    setPasswordAction('delete-chapter');
    setShowPasswordPrompt(true);
  };

  const handleDeleteChapter = async () => {
    if (!chapterToDelete) return;

    try {
      const { error } = await supabase
        .from('wiki_chapters')
        .delete()
        .eq('id', chapterToDelete.id);

      if (error) throw error;

      alert('Chapter deleted successfully!');
      setChapterToDelete(null);
      setAuthenticated(false);
      if (selectedChapter && selectedChapter.id === chapterToDelete.id) {
        setSelectedChapter(null);
      }
      fetchWikiData();
    } catch (error) {
      console.error('Error deleting chapter:', error);
      alert('Failed to delete chapter');
    }
  };

  const filteredTopics = wikiData.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = (content) => {
    const parts = content.split(/!\[([^\]]*)\]\(([^)]+)\)/g);
    const elements = [];
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        if (parts[i]) {
          parts[i].split('\n\n').forEach((paragraph, pIndex) => {
            if (paragraph.trim()) {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                elements.push(
                  <h3 key={`${i}-${pIndex}`} className="text-2xl font-bold mt-8 mb-4 text-blue-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              } else {
                const textParts = paragraph.split(/(\*\*.*?\*\*)/g);
                elements.push(
                  <p key={`${i}-${pIndex}`} className="text-gray-300 leading-relaxed text-lg mb-6" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, lineHeight: '1.8' }}>
                    {textParts.map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="text-white font-semibold">{part.replace(/\*\*/g, '')}</strong>;
                      }
                      return part;
                    })}
                  </p>
                );
              }
            }
          });
        }
      } else if (i % 3 === 2) {
        const altText = parts[i - 1] || 'Wiki image';
        const imageUrl = parts[i];
        elements.push(
          <div key={i} className="my-8">
            <img 
              src={imageUrl} 
              alt={altText}
              className="w-full rounded-2xl shadow-2xl shadow-blue-600/10"
            />
            {altText && altText !== 'Image' && (
              <p className="text-center text-gray-500 text-sm mt-3 italic" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                {altText}
              </p>
            )}
          </div>
        );
      }
    }
    
    return elements;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Header {...headerProps} />

      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 pt-28 pb-12">
          {/* Breadcrumb Navigation */}
          {(selectedTopic || selectedChapter) && (
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm flex-wrap">
                <button
                  onClick={() => {
                    setSelectedChapter(null);
                    setSelectedTopic(null);
                  }}
                  className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}
                >
                  <Home size={14} />
                  <span>Wiki</span>
                </button>
                
                {selectedTopic && (
                  <>
                    <ChevronRight size={14} className="text-gray-600" />
                    <button
                      onClick={() => setSelectedChapter(null)}
                      className={`transition-colors ${selectedChapter ? 'text-gray-400 hover:text-blue-400' : 'text-blue-400'}`}
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}
                    >
                      {selectedTopic.title}
                    </button>
                  </>
                )}
                
                {selectedChapter && (
                  <>
                    <ChevronRight size={14} className="text-gray-600" />
                    <span className="text-blue-400" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                      {selectedChapter.title}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <aside className={`hidden lg:block flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-0 overflow-hidden'}`}>
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 shadow-2xl shadow-blue-600/5">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>Navigation</h3>
                        <p className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{wikiData.length} Topics</p>
                      </div>
                    </div>
                  </div>

                  <nav className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar" aria-label="Rocket Wiki child pages">
                    <button
                      onClick={() => {
                        setSelectedChapter(null);
                        setSelectedTopic(null);
                      }}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-sm hover:bg-blue-600/10 transition-all duration-200 text-gray-400 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}
                    >
                      <div className="flex items-center gap-2">
                        <Home size={16} />
                        All Topics
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setPasswordAction('add-topic');
                        setShowPasswordPrompt(true);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm bg-gradient-to-r from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 text-blue-400 transition-all duration-200 border border-blue-600/20 shadow-lg shadow-blue-600/5"
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
                    >
                      <Plus size={16} />
                      New Topic
                    </button>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent my-4" />

                    {wikiData.map((topic) => (
                      <div key={topic.id} className="pl-0">
                        <div className="flex items-center gap-1 group">
                          <button
                            onClick={() => {
                              setSelectedTopic(topic);
                              setSelectedChapter(null);
                              setExpandedTopic(prev => (prev === topic.id ? null : topic.id));
                            }}
                            className={`flex-1 flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                              selectedTopic?.id === topic.id
                                ? 'bg-gradient-to-r from-blue-600/20 to-blue-700/20 text-blue-400 font-semibold border border-blue-600/30 shadow-lg shadow-blue-600/5' 
                                : 'text-gray-400 hover:bg-gray-800/50 hover:text-blue-400'
                            }`}
                            style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: selectedTopic?.id === topic.id ? 600 : 500 }}
                            aria-expanded={expandedTopic === topic.id}
                          >
                            <span className="truncate">{topic.title}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-0.5 bg-gray-800/50 rounded-full">{topic.chapters?.length || 0}</span>
                            </div>
                          </button>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => handleEditTopicClick(topic, e)}
                              className="p-1.5 hover:bg-blue-600/20 rounded-lg transition-colors"
                              title="Edit topic"
                            >
                              <Edit size={14} className="text-blue-400" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteTopicClick(topic, e)}
                              className="p-1.5 hover:bg-red-600/20 rounded-lg transition-colors"
                              title="Delete topic"
                            >
                              <Trash2 size={14} className="text-red-400" />
                            </button>
                          </div>
                        </div>

                        {(expandedTopic === topic.id || selectedTopic?.id === topic.id) && (
                          <div className="ml-3 border-l-2 border-blue-600/30 pl-3 mt-2 space-y-1">
                            <button
                              onClick={() => {
                                setSelectedTopic(topic);
                                setPasswordAction('add-chapter');
                                setShowPasswordPrompt(true);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 transition-all duration-200 border border-blue-600/20"
                              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}
                            >
                              <Plus size={12} />
                              Add Chapter
                            </button>
                            
                            {topic.chapters?.map((chapter) => (
                              <div key={chapter.id} className="flex items-center gap-1 group">
                                <button
                                  onClick={() => {
                                    setSelectedTopic(topic);
                                    setSelectedChapter(chapter);
                                  }}
                                  className={`flex-1 text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                    selectedChapter?.id === chapter.id 
                                      ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-600/30' 
                                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-blue-400'
                                  }`}
                                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: selectedChapter?.id === chapter.id ? 600 : 400 }}
                                >
                                  {chapter.title}
                                </button>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => handleEditChapterClick(chapter, e)}
                                    className="p-1 hover:bg-blue-600/20 rounded transition-colors"
                                    title="Edit chapter"
                                  >
                                    <Edit size={12} className="text-blue-400" />
                                  </button>
                                  <button
                                    onClick={(e) => handleDeleteChapterClick(chapter, e)}
                                    className="p-1 hover:bg-red-600/20 rounded transition-colors"
                                    title="Delete chapter"
                                  >
                                    <Trash2 size={12} className="text-red-400" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Toggle Sidebar Button (Desktop) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex fixed left-4 top-32 z-40 w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 rounded-xl items-center justify-center hover:bg-gray-800 transition-all shadow-lg"
              title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
            >
              <Menu size={18} className="text-gray-400" />
            </button>
            
            <div className="flex-1 min-w-0">
              {/* Mobile: floating Contents button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setMobileTocOpen(true)}
                  className="fixed bottom-6 right-4 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 border border-blue-500/50 flex items-center gap-2"
                  aria-label="Open table of contents"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
                >
                  <Menu size={18} />
                  Contents
                </button>

                {mobileTocOpen && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex">
                    <div className="m-auto w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 mx-4 h-[80vh] overflow-y-auto border border-gray-700/50 shadow-2xl">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/50">
                        <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>Contents</h3>
                        <button onClick={() => setMobileTocOpen(false)} className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                          <X />
                        </button>
                      </div>

                      <nav className="space-y-2">
                        {wikiData.map((topic) => (
                          <div key={topic.id} className="border-b border-gray-800/40 pb-3">
                            <button
                              onClick={() => {
                                setSelectedTopic(topic);
                                setSelectedChapter(null);
                                setExpandedMobileTopic(prev => (prev === topic.id ? null : topic.id));
                              }}
                              className="w-full flex items-center justify-between text-left text-white/90 py-2 hover:text-blue-400 transition-colors"
                            >
                              <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{topic.title}</span>
                              <span className="text-sm px-2 py-0.5 bg-gray-800/50 rounded-full text-gray-400">{topic.chapters?.length || 0}</span>
                            </button>

                            {expandedMobileTopic === topic.id && (
                              <div className="mt-2 pl-3 space-y-1 border-l-2 border-blue-600/30">
                                {topic.chapters?.map((chapter) => (
                                  <button
                                    key={chapter.id}
                                    onClick={() => {
                                      setSelectedTopic(topic);
                                      setSelectedChapter(chapter);
                                      setMobileTocOpen(false);
                                    }}
                                    className="w-full text-left text-gray-300 hover:text-white py-1.5 px-2 rounded hover:bg-gray-800/50 transition-colors text-sm"
                                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                                  >
                                    {chapter.title}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </nav>
                    </div>
                  </div>
                )}
              </div>

              {!selectedTopic && !selectedChapter && (
                <div>
                  {/* Welcome Section */}
                  <div className="mb-12 text-center max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      Rocketry Wiki
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, letterSpacing: '0.02em', lineHeight: '1.7' }}>
                      Explore in-depth guides on rocket design, propulsion systems, aerodynamics, and cutting-edge aerospace engineering
                    </p>
                  </div>

                  {/* Search Bar */}
                  <div className="mb-12 max-w-2xl mx-auto">
                    <div className="relative group">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 w-5 h-5 transition-colors" />
                      <input
                        type="text"
                        placeholder="Search topics and chapters..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-5 py-5 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/20 transition-all duration-200 shadow-xl shadow-black/20"
                        style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                      />
                    </div>
                  </div>

                  {/* Loading State */}
                  {loading ? (
                    <div className="text-center py-20">
                      <div className="relative inline-block">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-800 border-t-blue-600 mx-auto" />
                        <div className="absolute inset-0 rounded-full bg-blue-600/10 blur-xl" />
                      </div>
                      <p className="text-gray-400 mt-6 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                        Loading wiki...
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Topics Grid */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
                        {filteredTopics.map((topic, index) => (
                          <div key={topic.id} className="relative group h-full" style={{ animationDelay: `${index * 50}ms` }}>
                            <button
                              onClick={() => {
                                setSelectedTopic(topic);
                                setExpandedTopic(topic.id);
                              }}
                              className="w-full h-full flex flex-col group relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-blue-600/50 rounded-2xl p-7 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/10"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 rounded-2xl transition-all duration-300" />
                              
                              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
                              
                              <div className="relative flex flex-col h-full">
                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                  {topic.title}
                                </h3>
                                
                                <p className="text-gray-400 text-sm mb-5 flex-grow line-clamp-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, lineHeight: '1.6' }}>
                                  {topic.description}
                                </p>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-700/30 mt-auto">
                                  <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                                    <span className="px-3 py-1 bg-blue-600/10 rounded-full border border-blue-600/20">
                                      {topic.chapters?.length || 0} Chapters
                                    </span>
                                  </div>
                                  <ChevronRight size={18} className="text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                                </div>
                              </div>
                            </button>
                            
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                              <button
                                onClick={(e) => handleEditTopicClick(topic, e)}
                                className="w-9 h-9 bg-blue-600/90 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg shadow-blue-600/30 border border-blue-500/50"
                                title="Edit topic"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={(e) => handleDeleteTopicClick(topic, e)}
                                className="w-9 h-9 bg-red-600/90 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg shadow-red-600/30 border border-red-500/50"
                                title="Delete topic"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {filteredTopics.length === 0 && (
                        <div className="text-center py-20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl">
                          <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Search size={32} className="text-gray-600" />
                          </div>
                          <p className="text-gray-400 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                            No topics found
                          </p>
                          <p className="text-gray-600 text-sm mt-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                            Try adjusting your search query
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {selectedTopic && !selectedChapter && (
                <div className="max-w-5xl mx-auto">
                  {/* Back Button */}
                  <button
                    onClick={() => {
                      setSelectedTopic(null);
                      setExpandedTopic(null);
                    }}
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-6 px-4 py-2 rounded-xl hover:bg-gray-800/50"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}
                  >
                    <ArrowLeft size={18} />
                    Back to Topics
                  </button>

                  <div className="mb-10 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                          {selectedTopic.title}
                        </h2>
                        <p className="text-gray-400 text-lg mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, lineHeight: '1.6' }}>
                          {selectedTopic.description}
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-sm px-3 py-1 bg-blue-600/10 rounded-full border border-blue-600/20 text-blue-400" style={{ fontFamily: 'Rajdhani', fontWeight: 600 }}>
                            {selectedTopic.chapters?.length || 0} Chapters
                          </span>
                          <button
                            onClick={() => {
                              setPasswordAction('add-chapter');
                              setShowPasswordPrompt(true);
                            }}
                            className="text-sm px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 rounded-xl text-blue-400 transition-all duration-200 border border-blue-600/20 flex items-center gap-2"
                            style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
                          >
                            <Plus size={16} />
                            Add Chapter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedTopic.chapters?.map((chapter, index) => (
                      <div key={chapter.id} className="relative group">
                        <button
                          onClick={() => setSelectedChapter(chapter)}
                          className="w-full bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-blue-600/50 rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-xl flex items-center justify-center font-bold text-blue-400 border border-blue-600/30 shadow-lg shadow-blue-600/10 flex-shrink-0" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}>
                                {index + 1}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                  {chapter.title}
                                </h3>
                                <p className="text-gray-500 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                                  Click to read chapter
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
                          </div>
                        </button>
                        
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleEditChapterClick(chapter, e)}
                            className="w-9 h-9 bg-blue-600/90 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg shadow-blue-600/30 border border-blue-500/50"
                            title="Edit chapter"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={(e) => handleDeleteChapterClick(chapter, e)}
                            className="w-9 h-9 bg-red-600/90 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg shadow-red-600/30 border border-red-500/50"
                            title="Delete chapter"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {(!selectedTopic.chapters || selectedTopic.chapters.length === 0) && (
                      <div className="text-center py-16 bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl border border-gray-700/50 rounded-3xl">
                        <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Book size={32} className="text-gray-600" />
                        </div>
                        <p className="text-gray-400 mb-6 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                          No chapters yet
                        </p>
                        <button
                          onClick={() => {
                            setPasswordAction('add-chapter');
                            setShowPasswordPrompt(true);
                          }}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-sm font-semibold shadow-lg shadow-blue-600/30 border border-blue-500/50"
                          style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
                        >
                          <Plus size={18} />
                          Add First Chapter
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedChapter && (
                <div className="max-w-4xl mx-auto">
                  {/* Back Button */}
                  <button
                    onClick={() => setSelectedChapter(null)}
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-6 px-4 py-2 rounded-xl hover:bg-gray-800/50"
                    style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}
                  >
                    <ArrowLeft size={18} />
                    Back to {selectedTopic.title}
                  </button>

                  <article className="bg-gradient-to-br from-gray-900/70 via-gray-800/70 to-gray-900/70 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 md:p-14 shadow-2xl">
                    <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-700/30">
                      <h2 className="text-3xl md:text-4xl font-bold flex-1 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {selectedChapter.title}
                      </h2>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleEditChapterClick(selectedChapter, e)}
                          className="w-10 h-10 bg-blue-600/90 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg shadow-blue-600/30 border border-blue-500/50"
                          title="Edit chapter"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={(e) => handleDeleteChapterClick(selectedChapter, e)}
                          className="w-10 h-10 bg-red-600/90 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg shadow-red-600/30 border border-red-500/50"
                          title="Delete chapter"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="prose prose-invert prose-blue max-w-none">
                      {renderContent(selectedChapter.content)}
                    </div>
                  </article>

                  {/* Navigation */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedTopic.chapters?.map((chapter, index) => {
                      if (chapter.id === selectedChapter.id) {
                        const prevChapter = index > 0 ? selectedTopic.chapters[index - 1] : null;
                        const nextChapter = index < selectedTopic.chapters.length - 1 ? selectedTopic.chapters[index + 1] : null;
                        
                        return (
                          <React.Fragment key="nav">
                            {prevChapter && (
                              <button
                                onClick={() => setSelectedChapter(prevChapter)}
                                className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-blue-600/50 rounded-2xl p-5 text-left transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10"
                              >
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                                  <ArrowLeft size={14} />
                                  Previous
                                </div>
                                <div className="text-blue-400 font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{prevChapter.title}</div>
                              </button>
                            )}
                            {nextChapter && (
                              <button
                                onClick={() => setSelectedChapter(nextChapter)}
                                className={`bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-blue-600/50 rounded-2xl p-5 text-right transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 ${!prevChapter ? 'sm:col-start-2' : ''}`}
                              >
                                <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}>
                                  Next
                                  <ChevronRight size={14} />
                                </div>
                                <div className="text-blue-400 font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{nextChapter.title}</div>
                              </button>
                            )}
                          </React.Fragment>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>

      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 max-w-sm w-full shadow-2xl shadow-black/50">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Admin Authentication
              </h2>
            </div>
            
            <p className="text-gray-400 mb-6" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
              Enter the admin password to proceed with this action.
            </p>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/20 transition-all duration-200 mb-6"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handlePasswordSubmit();
                }
              }}
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
            />
            
            <div className="flex gap-4">
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 border border-blue-500/50"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                Verify
              </button>
              <button
                onClick={() => {
                  setShowPasswordPrompt(false);
                  setPassword('');
                }}
                className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-700/80 text-gray-300 font-semibold rounded-xl transition-all duration-200 border border-gray-600/50"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Topic Modal */}
      {showTopicModal && authenticated && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-black/50 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {editingTopic ? 'Edit Topic' : 'Add Topic'}
              </h2>
              <button
                onClick={() => {
                  setShowTopicModal(false);
                  setEditingTopic(null);
                  setTopicFormData({ title: '', description: '', display_order: 0 });
                  setAuthenticated(false);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Title
                </label>
                <input
                  type="text"
                  value={topicFormData.title}
                  onChange={(e) => setTopicFormData({ ...topicFormData, title: e.target.value })}
                  placeholder="Topic title"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/20 transition-all duration-200"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Description
                </label>
                <textarea
                  value={topicFormData.description}
                  onChange={(e) => setTopicFormData({ ...topicFormData, description: e.target.value })}
                  placeholder="Topic description"
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/20 transition-all duration-200 resize-none"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Display Order
                </label>
                <input
                  type="number"
                  value={topicFormData.display_order}
                  onChange={(e) => setTopicFormData({ ...topicFormData, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/20 transition-all duration-200"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={editingTopic ? handleUpdateTopic : handleAddTopic}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 border border-blue-500/50"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                {editingTopic ? 'Update' : 'Create'}
              </button>
              <button
                onClick={() => {
                  setShowTopicModal(false);
                  setEditingTopic(null);
                  setTopicFormData({ title: '', description: '', display_order: 0 });
                  setAuthenticated(false);
                }}
                className="flex-1 px-4 py-2 bg-gray-700/50 hover:bg-gray-700/80 text-gray-300 font-semibold rounded-xl transition-all duration-200 border border-gray-600/50"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Modal */}
      {showChapterModal && authenticated && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 max-w-2xl w-full shadow-2xl shadow-black/50 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {editingChapter ? 'Edit Chapter' : 'Add Chapter'}
              </h2>
              <button
                onClick={() => {
                  setShowChapterModal(false);
                  setEditingChapter(null);
                  setChapterFormData({ title: '', content: '', display_order: 0 });
                  setAuthenticated(false);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Title
                </label>
                <input
                  type="text"
                  value={chapterFormData.title}
                  onChange={(e) => setChapterFormData({ ...chapterFormData, title: e.target.value })}
                  placeholder="Chapter title"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/20 transition-all duration-200"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Content
                </label>
                <textarea
                  ref={contentTextareaRef}
                  value={chapterFormData.content}
                  onChange={(e) => setChapterFormData({ ...chapterFormData, content: e.target.value })}
                  placeholder="Chapter content (supports Markdown)"
                  rows="8"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/20 transition-all duration-200 resize-none font-mono text-sm"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                />
                <div className="mt-2 flex items-center gap-2">
                  <label className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 font-semibold rounded-lg cursor-pointer transition-all duration-200 border border-blue-600/20 flex items-center gap-2 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                    <Image size={14} />
                    Add Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleContentImageUpload}
                      disabled={uploadingContentImage}
                      className="hidden"
                    />
                  </label>
                  {uploadingContentImage && <span className="text-gray-400 text-sm">Uploading...</span>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Display Order
                </label>
                <input
                  type="number"
                  value={chapterFormData.display_order}
                  onChange={(e) => setChapterFormData({ ...chapterFormData, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/20 transition-all duration-200"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={editingChapter ? handleUpdateChapter : handleAddChapter}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 border border-blue-500/50"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                {editingChapter ? 'Update' : 'Create'}
              </button>
              <button
                onClick={() => {
                  setShowChapterModal(false);
                  setEditingChapter(null);
                  setChapterFormData({ title: '', content: '', display_order: 0 });
                  setAuthenticated(false);
                }}
                className="flex-1 px-4 py-2 bg-gray-700/50 hover:bg-gray-700/80 text-gray-300 font-semibold rounded-xl transition-all duration-200 border border-gray-600/50"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modals */}
      {topicToDelete && authenticated && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 max-w-sm w-full shadow-2xl shadow-black/50">
            <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Delete Topic?
            </h2>
            <p className="text-gray-400 mb-6" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
              Are you sure you want to delete "{topicToDelete.title}"? All chapters in this topic will also be deleted. This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteTopic}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-600/30 border border-red-500/50"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setTopicToDelete(null);
                  setAuthenticated(false);
                }}
                className="flex-1 px-4 py-2 bg-gray-700/50 hover:bg-gray-700/80 text-gray-300 font-semibold rounded-xl transition-all duration-200 border border-gray-600/50"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {chapterToDelete && authenticated && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 max-w-sm w-full shadow-2xl shadow-black/50">
            <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Delete Chapter?
            </h2>
            <p className="text-gray-400 mb-6" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
              Are you sure you want to delete "{chapterToDelete.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteChapter}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-600/30 border border-red-500/50"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setChapterToDelete(null);
                  setAuthenticated(false);
                }}
                className="flex-1 px-4 py-2 bg-gray-700/50 hover:bg-gray-700/80 text-gray-300 font-semibold rounded-xl transition-all duration-200 border border-gray-600/50"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RocketryWiki;