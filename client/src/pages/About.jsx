import React from "react";
import { FaPencilAlt, FaMagic, FaRobot, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

const About = () => {
  const { ready, authenticated, login } = usePrivy();

  const CTAButton = () => {
    if (!ready) {
      return (
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg opacity-60 cursor-not-allowed">
          Loading...
        </button>
      );
    }

    if (authenticated) {
      return (
        <Link
          to="/write"
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-100 transition duration-300"
        >
          Go to Editor
        </Link>
      );
    }

    return (
      <button
        onClick={login}
        className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-100 transition duration-300"
      >
        Login to Get Started
      </button>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          About AI Writing Assistant
        </h1>

        {/* Intro Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
          <p className="text-xl text-gray-700 mb-6">
            AI Writing Assistant is a modern tool built to enhance your writing
            experience using cutting-edge AI.
          </p>
          <p className="text-xl text-gray-700">
            Whether you are a student, professional, or content creator, our AI writing tools support you every step of the way.
          </p>
        </div>

        {/* Features */}
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <FeatureCard
            icon={<FaPencilAlt className="text-blue-500" />}
            title="Grammar Correction"
            description="Fix mistakes instantly using advanced grammar correction AI."
          />
          <FeatureCard
            icon={<FaMagic className="text-purple-500" />}
            title="Spell Check"
            description="Detect and correct spelling errors with smart suggestions."
          />
          <FeatureCard
            icon={<FaRobot className="text-green-500" />}
            title="Style Suggestions"
            description="Improve tone, clarity, and writing flow."
          />
          <FeatureCard
            icon={<FaChartLine className="text-red-500" />}
            title="Writing Analytics"
            description="Track your writing improvements over time."
          />
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Writing?
          </h2>
          <p className="text-xl mb-6">Join thousands of satisfied users.</p>

          <CTAButton />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <div className="flex items-center mb-4">
      <div className="text-3xl mr-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default About;
