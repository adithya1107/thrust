import React, { useState, useEffect } from 'react';
import { Book, ChevronRight, Home, Search, Rocket, Flame, Wind, Zap, Target, Settings } from 'lucide-react';
import Footer from './Footer';
import Header from './Header';

const RocketryWiki = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Font loading
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const wikiData = [
    {
      id: 'rocket-basics',
      title: 'Rocket Basics',
      icon: Rocket,
      description: 'Fundamental principles of rocketry',
      chapters: [
        {
          id: 'intro',
          title: 'Introduction to Rocketry',
          content: `Rocketry is the science and technology of rocket design, construction, and flight. A rocket is a vehicle that obtains thrust from a rocket engine through the expulsion of reaction mass at high speed.

The fundamental principle behind rocket propulsion is Newton's Third Law of Motion: for every action, there is an equal and opposite reaction. When a rocket expels mass out of its nozzle at high velocity, it experiences an equal and opposite force that propels it forward.

Rockets are unique among propulsion systems because they carry both fuel and oxidizer, allowing them to operate in the vacuum of space where no atmospheric oxygen is available.`
        },
        {
          id: 'history',
          title: 'History of Rocketry',
          content: `The history of rocketry dates back to ancient China, where gunpowder-filled tubes were used as weapons and fireworks around the 13th century. However, modern rocketry began in the early 20th century with pioneers like Konstantin Tsiolkovsky, Robert Goddard, and Hermann Oberth.

Robert Goddard launched the first liquid-fueled rocket in 1926, marking a major milestone. The V-2 rocket developed during World War II became the first artificial object to reach space in 1944.

The Space Age began with the launch of Sputnik 1 in 1957, followed by Yuri Gagarin's historic spaceflight in 1961 and the Apollo moon landings from 1969-1972. Today, rocketry continues to advance with reusable rockets and ambitious missions to Mars and beyond.`
        },
        {
          id: 'types',
          title: 'Types of Rockets',
          content: `Rockets can be classified based on their propulsion systems:

**Solid Rockets**: Use a solid propellant mixture that burns continuously once ignited. Simple and reliable, but cannot be throttled or shut down once started. Commonly used in boosters and military applications.

**Liquid Rockets**: Use separate liquid fuel and oxidizer that are mixed in the combustion chamber. Offer precise throttle control and can be shut down and restarted. More complex but provide better performance.

**Hybrid Rockets**: Combine solid fuel with liquid or gaseous oxidizer. Offer benefits of both systems with improved safety and throttle capability.

**Electric Propulsion**: Use electrical energy to accelerate propellant to high speeds. Very efficient but provide low thrust. Used for spacecraft maneuvering and deep space missions.`
        }
      ]
    },
    {
      id: 'propulsion',
      title: 'Rocket Propulsion',
      icon: Flame,
      description: 'Engines, motors, and thrust generation',
      chapters: [
        {
          id: 'fundamentals',
          title: 'Propulsion Fundamentals',
          content: `Rocket propulsion is governed by the principle of momentum conservation. The thrust equation describes the force generated:

F = ṁ * Ve + (Pe - Pa) * Ae

Where:
- F is thrust
- ṁ is mass flow rate
- Ve is exhaust velocity
- Pe is exit pressure
- Pa is ambient pressure
- Ae is nozzle exit area

The specific impulse (Isp) is a key performance metric measuring the efficiency of a rocket engine. It represents the thrust produced per unit weight of propellant consumed per second.`
        },
        {
          id: 'combustion',
          title: 'Combustion Process',
          content: `The combustion process in rocket engines involves the rapid chemical reaction between fuel and oxidizer in the combustion chamber. This reaction releases tremendous amounts of energy in the form of heat, creating high-temperature, high-pressure gases.

Key factors affecting combustion:
- **Mixture Ratio**: The proportion of oxidizer to fuel
- **Chamber Pressure**: Higher pressures improve performance
- **Temperature**: Combustion temperatures can exceed 3000°C
- **Residence Time**: Duration reactants spend in chamber

The combustion products are then accelerated through a converging-diverging nozzle, converting thermal energy into kinetic energy and producing thrust.`
        },
        {
          id: 'nozzles',
          title: 'Rocket Nozzles',
          content: `The rocket nozzle is a critical component that converts high-pressure, high-temperature gases into high-velocity exhaust. Most rocket nozzles use a converging-diverging design (de Laval nozzle).

**Nozzle Sections**:
- **Convergent Section**: Accelerates flow to sonic velocity at the throat
- **Throat**: Minimum area where flow reaches Mach 1
- **Divergent Section**: Further accelerates flow to supersonic speeds

The nozzle expansion ratio (exit area to throat area) is optimized for the operating altitude. Overexpanded or underexpanded nozzles lose efficiency. Advanced designs include:
- Bell nozzles (most common)
- Aerospike nozzles (altitude-compensating)
- Plug nozzles (compact design)`
        }
      ]
    },
    {
      id: 'aerodynamics',
      title: 'Aerodynamics',
      icon: Wind,
      description: 'Stability, drag, and flight dynamics',
      chapters: [
        {
          id: 'stability',
          title: 'Rocket Stability',
          content: `Rocket stability is crucial for successful flight. A stable rocket naturally corrects itself when disturbed, while an unstable rocket will tumble out of control.

**Center of Gravity (CG)**: The point where the rocket's weight is balanced. It moves aft as propellant is consumed.

**Center of Pressure (CP)**: The point where aerodynamic forces act. It's determined by the rocket's external shape.

**Stability Margin**: For passive stability, the CP must be behind the CG by at least one rocket diameter (caliber). This ensures corrective moments when the rocket tilts.

Factors affecting stability:
- Fin size and placement
- Nose cone shape
- Body tube length
- Mass distribution`
        },
        {
          id: 'drag',
          title: 'Drag Forces',
          content: `Drag is the aerodynamic force opposing a rocket's motion through the atmosphere. It depends on velocity, air density, and the rocket's shape.

**Types of Drag**:

**Skin Friction Drag**: Caused by air viscosity along the rocket's surface. Reduced with smooth finishes.

**Pressure Drag (Form Drag)**: Results from pressure differences around the rocket body. Minimized with streamlined shapes.

**Base Drag**: Caused by low pressure at the rocket's base. Can be significant at transonic speeds.

**Wave Drag**: Occurs at supersonic speeds due to shock waves. Managed through proper nose cone design.

The drag coefficient (Cd) quantifies drag efficiency. Lower Cd values indicate better aerodynamic performance. Typical model rockets have Cd values between 0.4-0.8.`
        },
        {
          id: 'flight-phases',
          title: 'Flight Phases',
          content: `A typical rocket flight consists of several distinct phases:

**1. Launch Phase**: Maximum acceleration as the rocket lifts off. Structural loads are highest during this phase.

**2. Powered Flight**: The rocket accelerates while the motor burns. Experiences maximum dynamic pressure (Max-Q) partway through this phase.

**3. Coast Phase**: After burnout, the rocket coasts upward on momentum alone. Continues to decelerate due to gravity and drag.

**4. Apogee**: The highest point of flight where vertical velocity becomes zero. Ideal moment for recovery deployment.

**5. Recovery Descent**: Parachute or other recovery system deploys, slowing the rocket's descent to a safe landing speed.

**6. Landing**: Touchdown at terminal velocity under parachute. Proper recovery ensures the rocket can be flown again.`
        }
      ]
    },
    {
      id: 'avionics',
      title: 'Avionics & Electronics',
      icon: Zap,
      description: 'Flight computers, sensors, and telemetry',
      chapters: [
        {
          id: 'flight-computers',
          title: 'Flight Computers',
          content: `Flight computers are the brains of modern rockets, managing everything from data logging to active control systems.

**Core Functions**:
- Real-time sensor data acquisition
- Flight state estimation
- Event detection (liftoff, apogee, landing)
- Recovery system deployment
- Telemetry transmission

**Key Components**:
- **Microcontroller/Processor**: Executes flight software
- **IMU (Inertial Measurement Unit)**: Accelerometers and gyroscopes
- **Barometer**: Altitude measurement
- **GPS**: Position and velocity tracking
- **Flash Memory**: Data storage
- **Radio**: Telemetry and ground communication

Modern flight computers can log data at rates exceeding 100Hz, providing detailed flight profiles for post-flight analysis.`
        },
        {
          id: 'sensors',
          title: 'Sensor Systems',
          content: `Rockets use various sensors to monitor their state during flight:

**Accelerometers**: Measure acceleration along multiple axes. Used for velocity and position estimation through integration.

**Gyroscopes**: Measure angular rates of rotation. Essential for determining rocket orientation.

**Barometers**: Measure atmospheric pressure to calculate altitude. Highly reliable but can be affected by airflow.

**GPS Receivers**: Provide absolute position, velocity, and altitude. Crucial for tracking and recovery.

**Temperature Sensors**: Monitor critical components like motors and avionics bays.

**Magnetometers**: Measure magnetic field orientation for heading determination.

**Voltage/Current Sensors**: Monitor battery health and power consumption.

Sensor fusion algorithms combine data from multiple sensors to produce accurate state estimates even when individual sensors may be noisy or unreliable.`
        },
        {
          id: 'telemetry',
          title: 'Telemetry Systems',
          content: `Telemetry systems transmit flight data to ground stations in real-time, enabling monitoring and analysis during flight.

**Telemetry Components**:
- **Transmitter**: Radio module on the rocket
- **Antenna**: Optimized for the operating frequency
- **Receiver**: Ground station equipment
- **Data Link Protocol**: Defines packet structure and error correction

**Common Frequencies**:
- 433 MHz: Long range, good penetration
- 915 MHz: Higher bandwidth
- 2.4 GHz: High data rates, shorter range

**Data Transmitted**:
- Altitude and velocity
- Acceleration and orientation
- GPS coordinates
- Battery voltage
- Event flags
- Diagnostic information

Robust telemetry is crucial for high-altitude flights where visual tracking becomes impossible. It also provides valuable data if the rocket is not recovered.`
        }
      ]
    },
    {
      id: 'structures',
      title: 'Structures & Materials',
      icon: Settings,
      description: 'Airframe design and construction',
      chapters: [
        {
          id: 'materials',
          title: 'Rocket Materials',
          content: `Material selection is critical for rocket performance, balancing strength, weight, and manufacturability.

**Common Materials**:

**Cardboard/Paperboard**: Used in model rockets. Lightweight and easy to work with but limited strength.

**Fiberglass**: Excellent strength-to-weight ratio. Common in mid-power and high-power rockets. Available in various weave patterns and weights.

**Carbon Fiber**: Superior strength and stiffness with minimal weight. Expensive but ideal for performance applications.

**Aluminum**: Used for structural components, motor mounts, and centering rings. Easy to machine and weld.

**Plastics (PLA, ABS, Nylon)**: 3D-printable materials for custom components like nose cones and fin cans.

**Plywood**: Birch or aircraft ply for fins and internal structures. Good strength and easy to work with.

Material properties to consider: tensile strength, compressive strength, modulus of elasticity, density, temperature resistance, and machinability.`
        },
        {
          id: 'airframe',
          title: 'Airframe Design',
          content: `The airframe is the rocket's main structure, housing all components and withstanding flight loads.

**Design Considerations**:

**Load Cases**: Thrust during motor burn, aerodynamic loads, recovery system deployment shock, landing impact.

**Body Tube**: Usually circular for structural efficiency. Diameter chosen based on motor size and component packaging. Wall thickness determined by stress analysis.

**Bulkheads**: Separate compartments and distribute loads. Must be properly secured to handle parachute deployment forces.

**Couplers**: Join body tube sections. Should provide strong, reliable connections with proper overlap.

**Motor Mount**: Securely holds the motor and transfers thrust to the airframe. Typically uses centering rings and through-the-wall fin attachment for strength.

**Recovery Bay**: Houses parachutes and electronics. Sized for proper packing and must allow clean deployment.`
        },
        {
          id: 'manufacturing',
          title: 'Manufacturing Techniques',
          content: `Various manufacturing methods are used in rocket construction:

**Filament Winding**: Automated process wrapping fiber around a mandrel. Produces strong, consistent tubes.

**Hand Layup**: Manual application of fiber and resin. Allows complex geometries but requires skill for consistent results.

**Vacuum Bagging**: Removes air and excess resin, creating lighter, stronger laminates. Used with hand layup.

**3D Printing**: Rapid prototyping of complex parts like nose cones, fin cans, and custom brackets. FDM and SLA technologies commonly used.

**CNC Machining**: Precision manufacturing of aluminum components, centering rings, and bulkheads.

**Tube Rolling**: Creating body tubes from sheet materials (fiberglass, carbon fiber).

**Assembly Techniques**: Epoxy bonding, mechanical fasteners, through-the-wall fin attachment. Proper surface preparation and curing conditions are essential for strong bonds.`
        }
      ]
    },
    {
      id: 'recovery',
      title: 'Recovery Systems',
      icon: Target,
      description: 'Parachutes and landing systems',
      chapters: [
        {
          id: 'parachutes',
          title: 'Parachute Design',
          content: `Parachutes are the most common recovery method, slowing the rocket to a safe landing speed.

**Parachute Types**:

**Round Parachutes**: Classic dome design. Simple and reliable. Moderate descent rates.

**Cruciform**: Cross-shaped canopy. More stable than round chutes. Good for windy conditions.

**Annular (Ring)**: Donut-shaped with center hole. Very stable, slower oscillation.

**Parasheet**: Flat square or rectangular design. Simple but less stable.

**Sizing Calculation**: Parachute diameter based on desired descent rate, rocket weight, and air density. Typical descent rates: 15-20 fps for model rockets, 10-15 fps for high-power.

**Materials**: Ripstop nylon for strength and tear resistance. Spandex for shock absorption. Kevlar for high-temperature applications near motor ejection.

**Construction**: Properly sewn gores, reinforced apex and attachment points, shroud lines rated for deployment shock loads.`
        },
        {
          id: 'deployment',
          title: 'Deployment Methods',
          content: `Several methods exist for deploying recovery systems:

**Motor Ejection**: Black powder charge in motor delays ejects parachute. Simple but timing is fixed and motor-dependent.

**Electronic Deployment**: Flight computer triggers ejection charges based on sensor data (altitude, velocity, acceleration). Allows dual deployment and better timing control.

**Dual Deployment**: Uses two parachutes - small drogue at apogee, main chute at lower altitude (typically 500-1000 ft). Reduces drift while maintaining safe landing speed.

**CO2 Ejection**: Compressed CO2 cartridges triggered electronically. Cleaner than black powder, reusable hardware.

**Spring/Piston Ejection**: Mechanical systems that push nosecone off. Reliable and reusable.

**Deployment Considerations**: Shock loading on airframe, parachute packing techniques, separation mechanisms, shear pin sizing, ejection charge amount, altitude selection for main deployment.`
        },
        {
          id: 'alternative',
          title: 'Alternative Recovery',
          content: `Beyond traditional parachutes, several alternative recovery methods exist:

**Helicopter Recovery**: Rotating blades create lift, allowing controlled descent. Popular in model rocketry for minimal drift.

**Streamer Recovery**: Long ribbon creates drag. Compact and lightweight but higher descent rates. Used for small, durable rockets.

**Glider Recovery**: Rocket transforms into a glider after motor burnout. Complex but enables long flight times and precise landing.

**Powered Descent**: Uses motor thrust to slow descent (propulsive landing). Extremely challenging but enables pinpoint landing and reusability like SpaceX Falcon 9.

**Airbag Landing**: Inflatable cushioning system. Used in some space capsules.

**Water Landing**: Splash down in water body. Requires waterproof design and recovery boats.

Each method has trade-offs in complexity, weight, reliability, and landing speed. Choice depends on rocket size, field conditions, and mission requirements.`
        }
      ]
    }
  ];

  const filteredTopics = wikiData.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}

      {/* Breadcrumb */}
      {(selectedTopic || selectedChapter) && (
        <div className="bg-gradient-to-r from-blue-600/10 to-transparent border-b border-blue-600/20 py-10">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
              <button
                onClick={() => {
                  setSelectedChapter(null);
                  setSelectedTopic(null);
                }}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Home
              </button>
              {selectedTopic && (
                <>
                  <ChevronRight size={16} className="text-gray-600" />
                  <button
                    onClick={() => setSelectedChapter(null)}
                    className={`transition-colors ${
                      selectedChapter ? 'text-blue-400 hover:text-blue-300' : 'text-gray-400'
                    }`}
                  >
                    {selectedTopic.title}
                  </button>
                </>
              )}
              {selectedChapter && (
                <>
                  <ChevronRight size={16} className="text-gray-600" />
                  <span className="text-gray-400">{selectedChapter.title}</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 flex gap-8">
        {/* Sidebar Navigation */}
        {(selectedTopic || selectedChapter) && (
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                Child Pages
              </h3>
              
              <nav className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedChapter(null);
                    setSelectedTopic(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-blue-600/20 transition-colors text-gray-400 hover:text-blue-400"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}
                >
                  Pages
                </button>
                
                {selectedTopic && (
                  <div className="ml-2 border-l-2 border-gray-700 pl-2">
                    <button
                      onClick={() => setSelectedChapter(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        !selectedChapter 
                          ? 'bg-blue-600/20 text-blue-400' 
                          : 'text-gray-400 hover:bg-blue-600/10 hover:text-blue-400'
                      }`}
                      style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500 }}
                    >
                      {selectedTopic.title}
                    </button>
                    
                    <div className="ml-2 border-l-2 border-gray-700 pl-2 mt-1 space-y-1">
                      {selectedTopic.chapters.map((chapter) => (
                        <button
                          key={chapter.id}
                          onClick={() => setSelectedChapter(chapter)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedChapter?.id === chapter.id
                              ? 'bg-blue-600/20 text-blue-400 font-semibold'
                              : 'text-gray-400 hover:bg-blue-600/10 hover:text-blue-400'
                          }`}
                          style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: selectedChapter?.id === chapter.id ? 600 : 400 }}
                        >
                          {chapter.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </nav>
            </div>
          </aside>
        )}
        
        <div className="flex-1">
        {!selectedTopic && !selectedChapter && (
          <div>
            {/* Welcome Section */}
            <div className="mb-12 text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Welcome to the <span className="text-blue-600">Rocketry Knowledge Base</span>
              </h2>
              <p className="text-gray-400 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, letterSpacing: '0.05em' }}>
                Explore comprehensive guides on rocket design, propulsion, aerodynamics, and more
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-12 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search wiki topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-blue-600/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-600/50 transition-colors"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}
                />
              </div>
            </div>

            {/* Topics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 hover:border-blue-600/50 rounded-2xl p-6 text-left transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-blue-600/5 rounded-2xl transition-opacity" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                        <Icon className="w-7 h-7 text-blue-600" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {topic.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                        {topic.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
                        <span>{topic.chapters.length} Chapters</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {selectedTopic && !selectedChapter && (
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center">
                  {React.createElement(selectedTopic.icon, { className: "w-8 h-8 text-blue-600" })}
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {selectedTopic.title}
                  </h2>
                  <p className="text-gray-400 text-lg mt-2" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>
                    {selectedTopic.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {selectedTopic.chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => setSelectedChapter(chapter)}
                  className="group w-full bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 hover:border-blue-600/50 rounded-xl p-6 text-left transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-600/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center font-bold text-blue-600" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
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
                    <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedChapter && (
          <div className="max-w-4xl mx-auto">
            <article className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {selectedChapter.title}
              </h2>
              
              <div className="prose prose-invert prose-blue max-w-none">
                {selectedChapter.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="text-2xl font-bold mt-8 mb-4 text-blue-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  
                  const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={index} className="text-gray-300 leading-relaxed text-lg mb-6" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400, lineHeight: '1.8' }}>
                      {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={i} className="text-white font-semibold">{part.replace(/\*\*/g, '')}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </div>
            </article>

            {/* Navigation */}
            <div className="mt-8 flex gap-4">
              {selectedTopic.chapters.map((chapter, index) => {
                if (chapter.id === selectedChapter.id) {
                  const prevChapter = index > 0 ? selectedTopic.chapters[index - 1] : null;
                  const nextChapter = index < selectedTopic.chapters.length - 1 ? selectedTopic.chapters[index + 1] : null;
                  
                  return (
                    <div key="nav" className="flex gap-4 w-full">
                      {prevChapter && (
                        <button
                          onClick={() => setSelectedChapter(prevChapter)}
                          className="flex-1 bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 hover:border-blue-600/50 rounded-xl p-4 text-left transition-all hover:scale-105"
                        >
                          <div className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Previous</div>
                          <div className="text-blue-400 font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{prevChapter.title}</div>
                        </button>
                      )}
                      {nextChapter && (
                        <button
                          onClick={() => setSelectedChapter(nextChapter)}
                          className="flex-1 bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 hover:border-blue-600/50 rounded-xl p-4 text-right transition-all hover:scale-105 ml-auto"
                        >
                          <div className="text-sm text-gray-500 mb-1" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }}>Next</div>
                          <div className="text-blue-400 font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{nextChapter.title}</div>
                        </button>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
        </div>
      </main>

      {/* Footer */}
        <Footer />
    </div>
  );
};

export default RocketryWiki;