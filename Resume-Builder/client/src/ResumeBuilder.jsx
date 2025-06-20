import React, { useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    summary: "",
  });

  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${form.name || "resume"}-smart-resume`,
    onBeforePrint: () =>
      alert("Print window is opening. Please choose 'Save as PDF'."),
    removeAfterPrint: true,
    suppressErrors: false,
  });

  const getSuggestion = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/suggest", {
        summary: form.summary,
      });
      if (res.data?.suggestion) {
        setSuggestion(res.data.suggestion);
      } else {
        setSuggestion("❌ AI did not return suggestion. Check backend.");
      }
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      setSuggestion("❌ AI failed — see console.");
    }
    setIsLoading(false);
  };

  const saveResume = async () => {
    try {
      await axios.post("http://localhost:5000/save", form);
      alert("✅ Resume saved to database!");
    } catch (err) {
      alert("❌ Failed to save. Make sure your backend is running.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-2xl rounded-xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">
          🧠 Smart Resume Builder
        </h1>

        <input
          className="input"
          type="text"
          name="name"
          placeholder="👤 Your Full Name"
          onChange={handleChange}
        />
        <input
          className="input"
          type="email"
          name="email"
          placeholder="📧 Your Email"
          onChange={handleChange}
        />
        <input
          className="input"
          type="text"
          name="skills"
          placeholder="💼 Skills (comma separated)"
          onChange={handleChange}
        />
        <textarea
          className="input"
          name="summary"
          placeholder="📝 Resume Summary"
          onChange={handleChange}
        ></textarea>

        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          <button onClick={getSuggestion} className="btn bg-blue-600">
            🤖 AI Suggestion
          </button>
          <button onClick={saveResume} className="btn bg-green-600">
            💾 Save
          </button>
          <button onClick={handlePrint} className="btn bg-purple-600">
            🖨️ Export PDF
          </button>
        </div>

        {isLoading ? (
          <p className="text-center mt-4 animate-pulse text-blue-500">
            Thinking...
          </p>
        ) : (
          suggestion && (
            <div className="mt-4 bg-green-50 border-l-4 border-green-400 text-green-700 p-4 rounded shadow">
              <strong>AI Suggestion:</strong> {suggestion}
            </div>
          )
        )}

        {/* Resume Preview */}
        <div
          ref={componentRef}
          className="mt-8 p-6 border rounded shadow bg-white print:shadow-none print:border-none"
        >
          <h2 className="text-2xl font-bold text-gray-900">{form.name}</h2>
          <p className="text-gray-700">{form.email}</p>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-800">Skills:</h3>
            <p className="text-gray-700">{form.skills}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-800">Summary:</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {form.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
