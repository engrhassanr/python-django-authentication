// components/EmailDetail.jsx
import React from "react";

const EmailDetail = ({ email }) => {
  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden mr-4">
            <img
              src="/api/placeholder/48/48"
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-medium">{email.from.name}</h2>
            <div className="text-sm text-gray-500">{email.subject}</div>
          </div>
          <div className="ml-auto text-gray-500">
            {email.date} {email.time}
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-1">
          <span className="text-gray-500">To: </span>
          {email.to.email}
        </div>

        {email.cc && (
          <div className="text-sm text-gray-600 mb-4">
            <span className="text-gray-500">CC: </span>
            {email.cc}
          </div>
        )}

        <hr className="my-4 border-gray-200" />

        <div className="prose max-w-none">
          <p>Good Morning,</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam.
          </p>
          <p>
            Best Regards
            <br />
            {email.from.name}
          </p>
        </div>

        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between mb-3">
              <div className="text-sm text-gray-500">
                {email.attachments.length} Attachments
              </div>
              <button className="text-sm text-blue-600">Download All</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {email.attachments.map((attachment, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-col"
                >
                  <div className="mb-2 flex justify-center">
                    {getFileIcon(attachment.type)}
                  </div>
                  <div className="text-xs truncate mb-1">{attachment.name}</div>
                  <div className="text-xs text-gray-500">{attachment.size}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center">
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
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
            Extract
          </button>
        </div>
      </div>
    </div>
  );
};

function getFileIcon(type) {
  const iconColor =
    {
      pdf: "text-red-500",
      doc: "text-blue-500",
      xls: "text-green-500",
      zip: "text-yellow-500",
    }[type] || "text-gray-500";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-8 w-8 ${iconColor}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

export default EmailDetail;
