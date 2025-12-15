import Journal from "../models/Journal.js";
export const uploadImage = async (base64, token) => {
  const res = await fetch("http://localhost:5000/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ file: base64 }),
  });
  return res.json();
};

export const createJournal = async (req, res) => {
  try {
    const { title, content, tags , image} = req.body;
    const journal = new Journal({ user: req.user.id, title, content, tags,image });
    await journal.save();
    res.status(201).json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.json({ message: "Journal deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
