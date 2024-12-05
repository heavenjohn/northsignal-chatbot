import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { FaComments, FaRobot, FaTimes, FaUser } from "react-icons/fa";
import { ThreeDots } from 'react-loader-spinner'; // Import ThreeDots Spinner

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const chatBoxRef = useRef(null); // Reference to the chatbox

  // Close chatbot if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
        setIsChatOpen(false); // Close chatbot
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle AI Chat through backend
  const handleAiChat = async (text) => {
    try {
      const response = await axios.post("http://localhost:3000/api/nlp", { text });
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

      // Update the last message with bot response
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
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer flex items-center justify-center"
        onClick={() => setIsChatOpen((prev) => !prev)}
        title="Chat with us!"
      >
        <FaComments size={30} />
      </div>

      {/* Chatbot UI */}
      {isChatOpen && (
        <div
          ref={chatBoxRef} // Attach the ref to the chatbox container
          className="fixed bottom-16 right-4 w-96 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
        >
          <div className="bg-blue-600 text-white flex justify-between items-center p-3 rounded-t-lg">
            <h3 className="font-semibold">Chatbot</h3>
            <button
              className="text-xl hover:text-gray-200"
              onClick={() => setIsChatOpen(false)}
              aria-label="Close chatbot"
            >
              <FaTimes />
            </button>
          </div>
          <div className="p-3 h-64 overflow-y-auto space-y-4">
            {chatHistory.length === 0 ? (
              <p className="text-center text-gray-500 text-sm">
                Start the conversation!
              </p>
            ) : (
              chatHistory.map((entry, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  {/* User Message (Right-aligned) */}
                  {entry.user && (
                    <div className="flex justify-end items-start space-x-2">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-l-lg rounded-tr-lg max-w-xs shadow">
                        <p className="text-sm">{entry.user}</p>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full shadow">
                        <FaUser />
                      </div>
                    </div>
                  )}
                  {/* Bot Message (Left-aligned) */}
                  {entry.bot !== null ? (
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-400 text-white rounded-full shadow">
                        <FaRobot />
                      </div>
                      <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-r-lg rounded-tl-lg max-w-xs shadow">
                        <p className="text-sm">{entry.bot}</p>
                      </div>
                    </div>
                  ) : isModelLoading ? (
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-400 text-white rounded-full shadow">
                        <FaRobot />
                      </div>
                      <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-r-lg rounded-tl-lg max-w-xs shadow">
                        <ThreeDots 
                          height="40" 
                          width="40" 
                          color="#1a4698" 
                          radius="9" 
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleFormSubmit} className="flex items-center p-3 border-t">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-grow border border-gray-300 rounded-lg px-3 py-2 mr-2 text-sm"
            />
            <button
              type="submit"
              disabled={isModelLoading}
              className={`px-4 py-2 rounded-lg text-white ${isModelLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
                }`}
            >
              {isModelLoading ? "Loading..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
