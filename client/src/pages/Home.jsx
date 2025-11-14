import React from "react";
import { FaPencilAlt, FaSpellCheck, FaCheck } from "react-icons/fa";
import ai from "../images/ai.png";
import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

const Home = () => {
  const { ready, authenticated, login } = usePrivy();

  const Button = () => {
    if (!ready) {
      return (
        <div className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg">
          Loading...
        </div>
      );
    }

    if (authenticated) {
      return (
        <Link
          to="/write"
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-100 transition duration-300"
        >
          Start Writing Now
        </Link>
      );
    }

    return (
      <button
        onClick={login}
        className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-100 transition duration-300"
      >
        Login to Start Writing
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Elevate Your Writing with AI
              </h2>

              <p className="text-xl mb-8">
                Perfect grammar, improve clarity, and enhance your writing style.
              </p>

              <Button />
            </div>

            <div className="md:w-1/2">
              <img
                style={{ width: "70%", height: "auto" }}
                src={ai}
                alt="AI Writing"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
              Powerful Features at Your Fingertips
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FeatureCard icon={<FaPencilAlt className="text-6xl text-blue-500" />} title="Smart Grammar Correction" description="AI-powered grammar suggestions for confident writing." />
              <FeatureCard icon={<FaSpellCheck className="text-6xl text-green-500" />} title="Advanced Spell Checker" description="Catch spelling errors with context-aware analysis." />
              <FeatureCard icon={<FaCheck className="text-6xl text-purple-500" />} title="Style Suggestions" description="Improve clarity and natural flow with AI style tips." />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>AI Writing Assistant ©{new Date().getFullYear()} | Shrihari J</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
    <div className="mb-6">{icon}</div>
    <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
