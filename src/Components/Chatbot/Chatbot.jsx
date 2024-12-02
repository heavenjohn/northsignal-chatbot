import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import data from "./intents.json"; // Assuming the JSON is in the same directory
import axios from "axios";

const Chatbot = () => {
  const [model, setModel] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [classLabels, setClassLabels] = useState([]);
  const [vocabulary, setVocabulary] = useState({});
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

<<<<<<< HEAD
  // Load model and initialize classes and vocabulary
  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log('Loading model...');
        const loadedModel = await tf.loadLayersModel('https://nsv-chatbot.web.app/Model/model.json');
        setModel(loadedModel);

        // Extract class labels (unique tags) from intents
        const uniqueTags = Array.from(new Set(data.intents.map((intent) => intent.tag)));
        setClassLabels(uniqueTags);

        // Build vocabulary for bag-of-words model
        const vocab = {};
        let index = 1; // Index starts at 1 (to avoid 0 padding)
        data.intents.forEach((intent) => {
          intent.patterns.forEach((pattern) => {
            pattern.toLowerCase().split(/\W+/).forEach((word) => {
              if (!vocab[word]) {
                vocab[word] = index++;
              }
            });
          });
        });
        setVocabulary(vocab);

        setIsModelLoaded(true);
        setIsModelLoading(false);
        console.log('Model loaded successfully.');
      } catch (error) {
        console.error('Error loading model:', error);
        setIsModelLoaded(false);
        setIsModelLoading(false);
      }
    };

    loadModel();
  }, []);

=======
>>>>>>> 28c0d29687209266c67968d5ffe52296c7486d38
  // Preprocess user input to match the model's input requirements
  const preprocessInput = input => {
    const tokens = input.toLowerCase().split(/\W+/);
    const bag = Array(Object.keys(vocabulary).length).fill(0);

    tokens.forEach(token => {
      if (vocabulary[token]) {
        bag[vocabulary[token] - 1] = 1; // Set the corresponding index to 1
      }
    });

    // Reshape to 3D tensor for LSTM ([samples, timesteps, features])
    return tf.tensor3d([bag], [1, bag.length, 1]); // 1 sample, length of bag, 1 feature
  };

  // Predict the intent of the user input
  const predictIntent = async input => {
    if (!model) {
      console.error("Model not loaded yet");
      return "Sorry, I'm not ready yet.";
    }

    try {
      const inputTensor = preprocessInput(input);
      const prediction = model.predict(inputTensor);
      const predictedIndex = prediction.argMax(-1).dataSync()[0];
      const predictedTag = classLabels[predictedIndex];

      // Find responses for the predicted tag
      const responses = data.intents.find(intent => intent.tag === predictedTag)
        ?.responses || ["I'm sorry, I don't understand that."];

      return responses[Math.floor(Math.random() * responses.length)];
    } catch (error) {
      console.error("Error predicting intent:", error);
      return "Sorry, something went wrong.";
    }
  };

  const handleAiChat = async text => {
    return await axios
      .post("http://localhost:3000/api/nlp", { text })
      .then(res => {
        console.log(res.data);
        return res?.data?.answer;
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Handle user input submission
  const handleFormSubmit = async event => {
    event.preventDefault();
    if (!userInput.trim()) return;
    const botResponse = await handleAiChat(userInput);

    // Update chat history with the new message
    setChatHistory(prevHistory => [
      ...prevHistory,
      { user: userInput, bot: botResponse },
    ]);
    setUserInput("");
  };

  return (
    <div className="chatbot">
      <div className="chat-history">
        {chatHistory.map((entry, index) => (
          <div key={index}>
            <p>
              <strong>User:</strong> {entry.user}
            </p>
            <p>
              <strong>Bot:</strong> {entry.bot}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit">Send</button>
      </form>
      {/* Show loading message while the model is loading */}
      {isModelLoading ? (
        <p>Loading model...</p>
      ) : isModelLoaded ? (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            placeholder="Ask something..."
          />
          <button type="submit">Send</button>
        </form>
      ) : (
        <p>Failed to load model. Please try again later.</p>
      )}
    </div>
  );
};

export default Chatbot;
