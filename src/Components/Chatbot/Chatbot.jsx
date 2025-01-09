import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { FaRobot, FaComments, FaTimes, FaUser } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // Close chatbot if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
        setIsChatOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle AI Chat through backend
  const handleAiChat = async (text) => {
    try {
      const response = await axios.post("/api/nlp", { text });
      return response?.data?.answer || "Sorry, I couldn't process your request.";
    } catch (error) {
      console.error("Error communicating with AI:", error);
      return "Sorry, there was a problem connecting to the server.";
    }
  };

  // Handle user input submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    // Add user input to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { user: userInput, bot: null },
    ]);
    setUserInput("");
    setIsModelLoading(true);

    try {
      const botResponse = await handleAiChat(userInput);
      setChatHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        updatedHistory[updatedHistory.length - 1].bot = botResponse;
        return updatedHistory;
      });
    } catch (error) {
      console.error("Error fetching bot response:", error);
    } finally {
      setIsModelLoading(false);
    }
  };

  return (
    <div>
      {/* Chatbot Icon */}
      <div
        className="fixed bottom-4 right-4 text-white bg-blue-600 hover:bg-blue-700 rounded-full p-4 cursor-pointer flex items-center justify-center shadow-lg transition-all duration-300"
        onClick={() => setIsChatOpen((prev) => !prev)}
        title="Chat with us!"
        aria-label="Toggle Chatbot"
      >
        <FaComments size={24} />
      </div>

      {/* Chatbot UI */}
      {isChatOpen && (
        <div
          ref={chatBoxRef}
          className="fixed bottom-20 right-4 w-96 bg-white border border-gray-300 rounded-lg shadow-2xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white flex justify-between items-center p-4 rounded-t-lg">
            <h3 className="font-bold">Chatbot</h3>
            <button
              className="text-xl hover:text-gray-200"
              onClick={() => setIsChatOpen(false)}
              aria-label="Close chatbot"
            >
              <FaTimes />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-grow p-4 h-64 overflow-y-auto space-y-4 bg-gray-50">
            {chatHistory.length === 0 ? (
              <p className="text-center text-gray-500 text-sm">
                Start the conversation!
              </p>
            ) : (
              chatHistory.map((entry, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  {/* User Message */}
                  {entry.user && (
                    <div className="flex justify-end items-center space-x-2">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-l-lg rounded-tr-lg shadow-md max-w-xs">
                        <p className="text-sm">{entry.user}</p>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full shadow">
                        <FaUser />
                      </div>
                    </div>
                  )}
                  {/* Bot Message */}
                  {entry.bot !== null ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-400 text-white rounded-full shadow">
                        <FaRobot />
                      </div>
                      <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-r-lg rounded-tl-lg shadow-md max-w-xs">
                        <p className="text-sm">{entry.bot}</p>
                      </div>
                    </div>
                  ) : isModelLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-400 text-white rounded-full shadow">
                        <FaRobot />
                      </div>
                      <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-r-lg rounded-tl-lg shadow-md max-w-xs">
                        <ThreeDots
                          height="20"
                          width="20"
                          color="#1a4698"
                          radius="9"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center p-3 bg-white border-t border-gray-200"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              aria-label="User input"
            />
            <button
              type="submit"
              disabled={isModelLoading}
              className={`ml-3 px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ${
                isModelLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              aria-label="Send message"
            >
              {isModelLoading ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
