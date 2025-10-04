mental-health-journal/
│── backend/
│   ├── server.js            # Express entry point
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── models/
│   │   ├── User.js
│   │   ├── Journal.js
│   │   └── Mood.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── journalRoutes.js
│   │   └── moodRoutes.js
│   └── controllers/
│       ├── authController.js
│       ├── journalController.js
│       └── moodController.js
│
│── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── JournalForm.js
│   │   │   ├── MoodTracker.js
│   │   │   └── Dashboard.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Journal.js
│   │   │   └── Profile.js
│   │   └── utils/
│   │       └── api.js
│   └── package.json
│
└── package.json
