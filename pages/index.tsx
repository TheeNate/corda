import { useState } from "react";

// Define the Profile type
type Profile = {
  name: string;
  img: string;
  blurb: string;
};

// Define the ServiceTile type
type ServiceTile = {
  title: string;
  img: string;
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  
  // Explicitly type the state with Profile | null to avoid 'never' type inference
  const [expandedProfile, setExpandedProfile] = useState<Profile | null>(null);

  // Define the missing servicesTiles array
  const servicesTiles: ServiceTile[] = [
    {
      title: "Rope Access",
      img: "/images/services-rope.jpg",
    },
    {
      title: "Structural Inspections",
      img: "/images/services-inspection.jpg",
    },
    {
      title: "NDT Testing",
      img: "/images/services-ndt.jpg",
    },
  ];

  // Explicitly type the profiles array
  const profiles: Profile[] = [
    {
      name: "Jane Doe",
      img: "/images/profile1.jpg",
      blurb: "Jane is a founding member of Corda Verte and specializes in structural inspections.",
    },
    {
      name: "John Smith",
      img: "/images/profile2.jpg",
      blurb: "John leads operations and brings over a decade of rope access experience.",
    },
    {
      name: "Maria Lin",
      img: "/images/profile3.jpg",
      blurb: "Maria oversees safety training and co-op coordination.",
    },
  ];

  // Use a type guard to ensure expandedProfile is valid before accessing properties
  const renderExpandedProfile = () => {
    if (!expandedProfile) return null;
    
    return (
      <div className="p-6 md:p-12 max-w-4xl mx-auto">
        <button onClick={() => setExpandedProfile(null)} className="mb-4 text-sm text-gray-600 hover:underline">
          ← Back to team
        </button>
        <img src={expandedProfile.img} alt={expandedProfile.name} className="w-full h-96 object-cover rounded-xl mb-6" />
        <h3 className="text-2xl font-bold mb-2">{expandedProfile.name}</h3>
        <p>{expandedProfile.blurb}</p>
      </div>
    );
  };

  const renderTeamGrid = () => {
    return (
      <div className="p-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-8">Our Philosophy</h2>
        <p className="max-w-4xl mx-auto text-lg text-center mb-12">
          Corda Verte operates as a co-op — built on shared ownership, shared responsibility, and shared reward.
          We believe the best work happens when everyone involved has real skin in the game.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {profiles.map((profile: Profile) => (
            <div
              key={profile.name}
              className="bg-white shadow-md rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setExpandedProfile(profile)}
            >
              <img src={profile.img} alt={profile.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h4 className="text-lg font-semibold">{profile.name}</h4>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const sections: { [key: string]: JSX.Element } = {
    home: (
      <>
        <section
          className="h-[60vh] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url(/images/hero-rope-access.jpg)" }}
        ></section>
        <section className="bg-green-100 py-12 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
          <p className="max-w-3xl mx-auto text-lg">
            At Corda Verte, we believe the best work gets done when everyone has skin in the game.
            We're not a faceless corporation. We're a co-op of rope access technicians who care deeply about the quality of our craft—because we own the outcomes. When you hire Corda Verte, you're not just getting a crew—you're getting partners. People who care about doing the job right because we're directly invested in the success of the work.
            We know what it's like to work for companies that treat people like numbers. That's not us. We created Corda Verte to do things differently: to build something fair, transparent, and excellent—from the ground up.
            We're building tools that make the job easier, safer, and more efficient. Everyone has a voice, and everything is built around a simple idea:
            If you give people ownership, you get their best.
            That's the Corda Verte difference.
          </p>
        </section>
      </>
    ),

    services: (
      <div className="p-6 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesTiles.map(({ title, img }) => (
            <div
              key={title}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="h-80 md:h-96 lg:h-[28rem] w-full">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="bg-black bg-opacity-60 text-white text-center py-2">
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    
    // Use the helper functions for the about section
    about: expandedProfile ? renderExpandedProfile() : renderTeamGrid(),
    
    contact: (
      <div className="p-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <div className="max-w-xl mx-auto bg-white p-8 shadow-xl rounded-xl">
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full p-3 border rounded-xl" />
            <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl" />
            <textarea placeholder="Message" className="w-full p-3 border rounded-xl h-32" />
            <button type="submit" className="bg-black text-white px-6 py-3 rounded-xl hover:bg-green-700">Send</button>
          </form>
        </div>
      </div>
    ),
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Logo Banner - Updated */}
      <div className="bg-[#181713] text-white flex items-center py-10 px-8">
        <img src="/images/logo.png" alt="Corda Verte logo" className="h-50 w-auto ml-8 md:ml-16" />
      </div>

      {/* Nav Bar */}
      <nav className="bg-[#CCE8D5] shadow border-t border-b border-gray-200 sticky top-0 z-10">
        <ul className="flex justify-center space-x-6 py-3">
          {[
            { label: "Home", id: "home" },
            { label: "Services", id: "services" },
            { label: "About", id: "about" },
            { label: "Contact", id: "contact" },
          ].map(({ label, id }) => (
            <li
              key={id}
              className={`cursor-pointer font-medium transition-colors hover:text-green-600 ${
                activeSection === id ? "text-green-600" : "text-gray-800"
              }`}
              onClick={() => {
                setActiveSection(id);
                setExpandedProfile(null);
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      </nav>

      {/* Swipe Sections */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${["home", "services", "about", "contact"].indexOf(activeSection) * 100}%)` }}
        >
          {Object.values(sections).map((section, idx) => (
            <div key={idx} className="w-full flex-shrink-0">
              {section}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
