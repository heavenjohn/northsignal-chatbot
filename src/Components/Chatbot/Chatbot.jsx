import { useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai'; // Chatbot Icon
import predictResponse from './Response/response'; // Import the function for predictions

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle chatbot window
  const [messages, setMessages] = useState([]); // Store messages
  const [inputText, setInputText] = useState(''); // User input

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { sender: 'user', text: inputText };
    setMessages((prev) => [...prev, userMessage]);

    const botResponse = await predictResponse(inputText);
    const botMessage = { sender: 'bot', text: botResponse };

    setMessages((prev) => [...prev, botMessage]);
    setInputText('');
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Chatbot Icon */}
      <button
        onClick={toggleChatbot}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <AiOutlineMessage size={24} />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg w-72 mt-2">
          {/* Header */}
          <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button onClick={toggleChatbot} className="text-white font-bold">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="p-3 h-60 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
