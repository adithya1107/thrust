import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          About <span className="text-orange-500">thrustMIT</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto">
          A student-led team at MIT dedicated to pushing the boundaries of rocket propulsion and aerospace engineering
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              To build high-powered rockets that break altitude records and inspire the next generation of aerospace engineers. We design, manufacture, and launch advanced rocket systems while fostering a collaborative environment for innovation and learning.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our multidisciplinary team works on everything from propulsion systems and aerodynamics to avionics and recovery mechanisms, competing in national competitions and conducting cutting-edge research.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-lg overflow-hidden border border-white/10">
              <img src="/api/placeholder/600/400" alt="Team Photo" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;