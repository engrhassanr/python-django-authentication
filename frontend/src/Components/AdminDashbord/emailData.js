// data/emailData.js
export const emailData = [
  {
    id: 1,
    from: { name: "Azeem Khan", email: "azeem@example.com" },
    to: { name: "Me", email: "source@tactical.com.pk" },
    cc: ["source@tactical.com.pk", "behroze@example.com"], // Ensured cc is an array
    subject: "Immigration Application",
    preview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...",
    body: `Good Morning,
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    
        Best Regards,
        Azeem`,
    date: "Dec 11",
    time: "01:12am",
    read: false,
    important: false,
    attachments: [
      { name: "Pre-filled_imi.pdf", type: "pdf", size: "2.7MB" },
      { name: "ALP431.docx", type: "doc", size: "987KB" },
    ],
  },
  {
    id: 2,
    from: { name: "Faisal Awan", email: "faisal@example.com" },
    to: { name: "Me", email: "me@example.com" },
    subject: "Application for Updation",
    preview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...",
    date: "Dec 11",
    time: "10:02am",
    read: false,
    important: true,
    attachments: [],
  },
  {
    id: 3,
    from: { name: "Ghulam Ghous", email: "ghulam@example.com" },
    to: { name: "Me", email: "me@example.com" },
    subject: "Application for Updation",
    preview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...",
    date: "Dec 11",
    time: "08:20am",
    read: true,
    important: false,
    attachments: [],
  },
  {
    id: 4,
    from: { name: "Abu Baker", email: "abu@example.com" },
    to: { name: "Me", email: "me@example.com" },
    subject: "Follow-up on Meeting",
    preview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...",
    date: "Dec 9",
    time: "02:45pm",
    read: false,
    important: false,
    attachments: [],
  },
];
