// components/EmailList.jsx
import React, { useState, useEffect } from "react";

const EmailList = ({ emails, setSelectedEmail, selectedEmail }) => {
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contextMenuEmail, setContextMenuEmail] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const folders = [
    { id: "inbox", name: "Inbox", count: 94 },
    { id: "draft", name: "Draft", count: 3 },
    { id: "important", name: "Important", count: 0 },
    { id: "sent", name: "Sent", count: 0 },
    { id: "deleted", name: "Deleted", count: 0 },
  ];

  const contacts = [
    "Arslan",
    "Nouman",
    "Kishan",
    "Haider",
    "Zulfiqar",
    "Umair",
  ];

  const handleContextMenu = (e, email) => {
    e.preventDefault();
    setContextMenuEmail(email);
    setMenuOpen(true);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (menuOpen) setMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="w-96 border-r border-gray-200 bg-white flex flex-col">
      <div className="p-3">
        <button className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Compose
        </button>
      </div>

      <div className="overflow-y-auto flex-1 scrollbar-thin">
        <div className="px-2 space-y-1">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`flex items-center justify-between px-3 py-2 cursor-pointer text-sm ${
                activeFolder === folder.id
                  ? "text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveFolder(folder.id)}
            >
              <div className="flex items-center">
                <span className="w-5 h-5 mr-3 flex items-center justify-center">
                  {folderIcon(folder.id)}
                </span>
                <span>{folder.name}</span>
              </div>
              {folder.count > 0 && (
                <span
                  className={`text-xs rounded-full px-2 py-0.5 ${
                    folder.id === "inbox" ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  {folder.count}
                </span>
              )}
            </div>
          ))}
        </div>

        <hr className="my-3 border-gray-200" />

        <div className="px-4 mb-3">
          <button className="text-blue-600 flex items-center text-sm">
            <span>Create New</span>
          </button>
        </div>

        <div className="px-2 mb-3 hidden md:block">
          <div className="text-xs font-medium text-gray-500 mb-1 px-3">
            Contacts
          </div>
          <div className="space-y-1">
            {contacts.map((contact, idx) => (
              <div
                key={idx}
                className="px-3 py-1 hover:bg-gray-50 rounded cursor-pointer text-gray-600 text-sm"
              >
                {contact}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-0">
          {emails.map((email) => (
            <div
              key={email.id}
              className={`py-2 border-l-2 cursor-pointer ${
                selectedEmail.id === email.id
                  ? "bg-blue-50 border-blue-600"
                  : email.read
                  ? "border-transparent hover:bg-gray-50"
                  : "border-blue-600 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedEmail(email)}
              onContextMenu={(e) => handleContextMenu(e, email)}
            >
              <div className="flex items-start px-4">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center space-x-1">
                      {email.important && (
                        <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                      )}
                      <span
                        className={`font-medium text-sm ${
                          email.read ? "text-gray-700" : "text-gray-900"
                        }`}
                      >
                        {email.from.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{email.time}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    {email.subject}
                  </div>
                  <div className="text-xs text-gray-500 truncate pr-2">
                    {email.preview}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed bg-white rounded shadow-lg py-1 z-50 text-sm"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
          <div className="px-4 py-1 hover:bg-gray-50 cursor-pointer">
            Mark Read
          </div>
          <div className="px-4 py-1 hover:bg-gray-50 cursor-pointer">
            Flagged
          </div>
          <div className="px-4 py-1 hover:bg-gray-50 cursor-pointer text-red-600">
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

function folderIcon(folderId) {
  switch (folderId) {
    case "inbox":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      );
    case "draft":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      );
    case "important":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      );
    case "sent":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      );
    case "deleted":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default EmailList;
