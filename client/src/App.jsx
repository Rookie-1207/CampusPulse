import { useEffect, useState } from "react";
import NoticeCard from "./components/NoticeCard";
import "./App.css";

function App() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5050/api/notices")
      .then((response) => response.json())
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const addNotice = async () => {
    if (!title.trim() || !category.trim()) {
      alert("Please enter both title and category");
      return;
    }

    const newNotice = {
      title,
      category,
    };

    const response = await fetch("http://127.0.0.1:5050/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNotice),
    });

    const savedNotice = await response.json();

    setNotices([...notices, savedNotice]);
    setTitle("");
    setCategory("");
  };

  const deleteNotice = async (index) => {
    await fetch(`http://127.0.0.1:5050/api/notices/${index}`, {
      method: "DELETE",
    });

    const updatedNotices = notices.filter((_, i) => i !== index);
    setNotices(updatedNotices);
  };

  return (
    <div className="app">
      <div className="navbar">
        <h1 className="logo">CampusPulse 🎓</h1>
        <p>SRM Student Dashboard</p>
      </div>

      <div className="notice-form">
        <input
          type="text"
          placeholder="Notice title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button onClick={addNotice}>Add Notice</button>
      </div>

      <h2>Latest Notices</h2>

      {loading && <p>Loading notices...</p>}

      {!loading && notices.length === 0 && <p>No notices available</p>}

      <div className="notice-container">
        {notices.map((notice, index) => (
          <NoticeCard
            key={index}
            notice={notice}
            index={index}
            deleteNotice={deleteNotice}
          />
        ))}
      </div>
    </div>
  );
}

export default App;