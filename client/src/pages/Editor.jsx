import React, { useState } from "react";
import axios from "axios";
import { FaSpellCheck, FaCheck } from "react-icons/fa";
import { SiGrammarly } from "react-icons/si";

let usePrivy;
try {
  usePrivy = require("@privy-io/react-auth").usePrivy;
} catch (e) {
  usePrivy = null;
}

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";


const Editor = () => {
  const privy = usePrivy ? usePrivy() : null;
  const getAccessToken = privy?.getAccessToken ? privy.getAccessToken : async () => "";

  const [text, setText] = useState("");
  const [correctedSentences, setCorrectedSentences] = useState([]);
  const [spellCheckedText, setSpellCheckedText] = useState("");
  const [grammarCheckedText, setGrammarCheckedText] = useState("");
  const [loading, setLoading] = useState({ spell: false, grammar: false });
  const [error, setError] = useState(null);

  const handleTextChange = (e) => setText(e.target.value);

  const addCorrectedSentence = (sentence) => {
    if (!sentence) return;
    setCorrectedSentences(prev => [sentence, ...prev]);
  };

  const checkSpelling = async () => {
    setError(null);
    if (!text || !text.trim()) {
      setError("Enter text to check spelling.");
      return;
    }
    setLoading(l => ({ ...l, spell: true }));
    try {
      const token = await getAccessToken();
      const res = await axios.post(
        `${API_BASE}/spell`,
        { text },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json"
          }
        }
      );
      setSpellCheckedText(res?.data?.correctedText || "");
    } catch (err) {
      console.error("Spell check error:", err);
      setError(err?.response?.data?.error || err?.message || "Spell check failed");
    } finally {
      setLoading(l => ({ ...l, spell: false }));
    }
  };

  const checkGrammar = async () => {
    setError(null);
    if (!text || !text.trim()) {
      setError("Enter text to check grammar.");
      return;
    }
    setLoading(l => ({ ...l, grammar: true }));
    try {
      const token = await getAccessToken();
      const res = await axios.post(
        `${API_BASE}/grammar`,
        { text },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json"
          }
        }
      );
      setGrammarCheckedText(res?.data?.correctedText || "");
    } catch (err) {
      console.error("Grammar check error:", err);
      setError(err?.response?.data?.error || err?.message || "Grammar check failed");
    } finally {
      setLoading(l => ({ ...l, grammar: false }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">AI Writing Assistant</h2>
            <p className="mb-4 text-gray-600">Enhance your writing with our advanced AI tools.</p>

            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Type your text here..."
              rows={10}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            {error && <div className="text-red-600 mb-3">{error}</div>}

            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={checkSpelling}
                disabled={loading.spell}
                className={`bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 ${loading.spell ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading.spell ? "Checking..." : "Check Spelling"}
              </button>

              <button
                onClick={checkGrammar}
                disabled={loading.grammar}
                className={`bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 ${loading.grammar ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading.grammar ? "Checking..." : "Check Grammar"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {spellCheckedText ? (
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center"><FaSpellCheck className="mr-2 text-green-500" /> Spell Checked Text</h3>
                <p className="mb-4">{spellCheckedText}</p>
                <button onClick={() => addCorrectedSentence(spellCheckedText)} className="bg-blue-600 text-white px-4 py-2 rounded-full">Accept</button>
              </div>
            ) : null}

            {grammarCheckedText ? (
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center"><SiGrammarly className="mr-2 text-blue-500" /> Grammar Checked Text</h3>
                <p className="mb-4">{grammarCheckedText}</p>
                <button onClick={() => addCorrectedSentence(grammarCheckedText)} className="bg-blue-600 text-white px-4 py-2 rounded-full">Accept</button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white shadow-lg rounded-lg p-6 sticky top-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center"><FaCheck className="mr-2 text-green-500" /> Corrected Sentences</h3>
            <p className="mb-4 text-gray-600">Your approved corrections will appear here.</p>

            {correctedSentences.length > 0 ? (
              correctedSentences.map((sentence, index) => (
                <div key={index} className="mb-2 pb-2 border-b border-gray-200 last:border-b-0">
                  <p>{sentence}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No corrected sentences yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;