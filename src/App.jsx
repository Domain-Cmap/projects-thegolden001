import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, ShieldCheckIcon, ScaleIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import ChatInterface from './components/ChatInterface';

const features = [
  {
    name: 'Personalized Recommendations',
    description: 'Match users with optimal policies based on their unique needs.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Quick Assistance',
    description: 'Get instant answers to your insurance queries via our intelligent chatbot.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Policy Comparisons',
    description: 'Compare different insurance options side by side to make informed decisions.',
    icon: ScaleIcon,
  },
  {
    name: 'Analytics & Insights',
    description: 'Understand your coverage needs through data-driven insights.',
    icon: ChartBarIcon,
  },
  {
    name: 'Improved Customer Experience',
    description: 'Navigate complex insurance details with ease through our user-friendly interface.',
    icon: UserGroupIcon,
  },
];

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">AI-Powered</span>
              <span className="block text-blue-600">Insurance Advisor</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Get personalized insurance recommendations and instant answers to your coverage questions.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                  onClick={() => setShowChat(true)}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Smart Insurance Solutions</h2>
          <p className="mt-4 text-lg text-gray-500">
            Our AI-powered platform helps you make informed decisions about your insurance needs.
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl">
          <ChatInterface onClose={() => setShowChat(false)} />
        </div>
      )}
    </div>
  );
}

export default App;