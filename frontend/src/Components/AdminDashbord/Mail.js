// App.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import EmailDetail from "./EmailDetail";
import { emailData } from "./emailData";
import EmailList from "./EmailList";

function Mail() {
  const [selectedEmail, setSelectedEmail] = useState(emailData[0]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="text-2xl font-bold">Mail</div>
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Enter your search request"
              className="w-full pl-4 pr-10 py-2 border rounded-lg"
            />
            <button className="absolute right-3 top-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <div className="mr-4 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                3
              </span>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="/api/placeholder/40/40"
                alt="User profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <EmailList
            emails={emailData}
            setSelectedEmail={setSelectedEmail}
            selectedEmail={selectedEmail}
          />
          <EmailDetail email={selectedEmail} />
        </div>
      </div>
    </div>
  );
}

export default Mail;
