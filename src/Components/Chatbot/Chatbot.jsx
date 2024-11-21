import  { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';  // Import TensorFlow.js
import intents from './intents';  // Importing intents from intents.jsx
import responses from './responses';  // Importing responses from responses.jsx

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState(null);

  // Load your custom model
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Path to your custom model (you can load it from a local folder or Firebase)
        const loadedModel = await tf.loadLayersModel('https://nsvchatbot-e11ed.web.app/model.json');
        setModel(loadedModel);
        console.log('Custom model loaded');
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
  }, []);

  // Function to recognize intent using the custom model
  const recognizeIntent = async (userInput) => {
    if (!model) return "I'm still loading, please wait.";

    // Preprocess user input and convert it to tensor format
    const inputTensor = tf.tensor([userInput]);

    // Make a prediction using the custom model
    const prediction = model.predict(inputTensor);

    // You can customize this section based on how your model outputs predictions
    const predictedIntent = await prediction.data();
    let maxScore = Math.max(...predictedIntent);  // Get the maximum score
    const intentIndex = predictedIntent.indexOf(maxScore);  // Get the index of the max score
    const intent = Object.keys(intents)[intentIndex];  // Map index to intent

    return intent;
  };

  // Function to generate response
  const generateResponse = async (userInput) => {
    const intent = await recognizeIntent(userInput);
    if (intent && responses[intent]) {
      return responses[intent];
    } else {
      return responses.default;  // Using default response for unmatched intent
    }
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = { text: input, user: true };
      const botMessage = { text: await generateResponse(input), user: false };

      setMessages([...messages, userMessage, botMessage]);
      setInput('');
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
        <div className="flex flex-col p-4 space-y-4 h-[450px] overflow-auto">
          <div className="flex flex-col space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.user ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 max-w-xs rounded-lg ${msg.user ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center p-4 space-x-2 border-t border-gray-300">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
