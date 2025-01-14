import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const insuranceTypes = {
  health: {
    questions: [
      "What's your age?",
      "Do you have any pre-existing conditions?",
      "What's your preferred deductible range?",
    ],
    recommendations: {
      young: "Based on your profile, we recommend a high-deductible health plan (HDHP) with an HSA.",
      middle: "A PPO plan might be best suited for your needs, offering flexibility and comprehensive coverage.",
      senior: "Consider a Medicare Advantage plan with prescription drug coverage.",
    }
  },
  life: {
    questions: [
      "Are you married?",
      "Do you have dependents?",
      "What's your annual income?",
    ],
    recommendations: {
      single: "A term life insurance policy with 10x your annual income is recommended.",
      family: "Consider a whole life insurance policy with additional riders for family protection.",
    }
  }
};

function ChatInterface({ onClose }) {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hello! I'm your AI Insurance Advisor. What type of insurance are you interested in? (health/life)",
    },
  ]);
  const [input, setInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [insuranceType, setInsuranceType] = useState(null);
  const [userResponses, setUserResponses] = useState({});

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: 'user', content: input }];
    setMessages(newMessages);

    // Process user input
    if (!insuranceType) {
      if (input.toLowerCase() === 'health' || input.toLowerCase() === 'life') {
        setInsuranceType(input.toLowerCase());
        newMessages.push({
          type: 'bot',
          content: insuranceTypes[input.toLowerCase()].questions[0],
        });
      } else {
        newMessages.push({
          type: 'bot',
          content: "Please specify either 'health' or 'life' insurance.",
        });
      }
    } else {
      setUserResponses({ ...userResponses, [currentStep]: input });
      
      if (currentStep < insuranceTypes[insuranceType].questions.length - 1) {
        newMessages.push({
          type: 'bot',
          content: insuranceTypes[insuranceType].questions[currentStep + 1],
        });
        setCurrentStep(currentStep + 1);
      } else {
        // Provide recommendation based on responses
        const recommendation = getRecommendation(insuranceType, userResponses);
        newMessages.push({
          type: 'bot',
          content: recommendation,
        });
      }
    }

    setMessages(newMessages);
    setInput('');
  };

  const getRecommendation = (type, responses) => {
    if (type === 'health') {
      const age = parseInt(responses[0]);
      if (age < 30) return insuranceTypes.health.recommendations.young;
      if (age < 60) return insuranceTypes.health.recommendations.middle;
      return insuranceTypes.health.recommendations.senior;
    } else {
      return responses[1]?.toLowerCase() === 'yes' 
        ? insuranceTypes.life.recommendations.family 
        : insuranceTypes.life.recommendations.single;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">Insurance Advisor</h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;