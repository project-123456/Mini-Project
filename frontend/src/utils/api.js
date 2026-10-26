const API_URL = import.meta.env.VITE_API_URL;
const ML_API_URL = "http://localhost:5002";


export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getUserProfile = async (token) => {
  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getJournals = async (token) => {
  const res = await fetch(`${API_URL}/journals`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const addJournal = async (data, token) => {
  const res = await fetch(`${API_URL}/journals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const uploadImage = async (base64, token) => {
  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ file: base64 }),
  });

  return res.json();
};


export const logMood = async (data, token) => {
  if (!token) {
    throw new Error("Please log in to save your mood.");
  }

  const res = await fetch(`${API_URL}/moods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Mood save nahi hua.");
  }

  return result;
};



export const getMoods = async (token) => {
  if (!token) {
    throw new Error("Login token missing. Please log in again.");
  }

  const res = await fetch(`${API_URL}/moods`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Mood API error ${res.status}: ${message}`);
  }

  return res.json();
};

export const predictEmotion = async (audioFile) => {
  const formData = new FormData();
  formData.append("file", audioFile);

  const res = await fetch(`${ML_API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  return res.json();
};
