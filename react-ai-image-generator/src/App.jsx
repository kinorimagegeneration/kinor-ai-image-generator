import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const generateImage = async () => {
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }

    try {
      const response = await axios.post("http://YOUR_FLASK_BACKEND_URL/generate", { 
        prompt: prompt 
      }, { responseType: 'blob' });

      const imageObjectUrl = URL.createObjectURL(response.data);
      setImageUrl(imageObjectUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Error generating image. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">AI Image Generator</h2>
      <input
        type="text"
        className="p-2 border rounded w-96"
        placeholder="Enter a text prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generateImage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate Image
      </button>
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="AI Generated" className="rounded shadow-lg w-96" />
          <a href={imageUrl} download="ai_image.jpg">
            <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
              Download Image
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
