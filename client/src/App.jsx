import { useEffect, useState } from "react";
import NoticeCard from "./components/NoticeCard";
import "./App.css";

function App() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");

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

  const deleteNotice = async (id) => {
  await fetch(`http://127.0.0.1:5050/api/notices/${id}`, {
    method: "DELETE",
  });

  const updatedNotices = notices.filter((notice) => notice._id !== id);
  setNotices(updatedNotices);
};
const updateNotice = async (id, updatedTitle, updatedCategory) => {
  const response = await fetch(`http://127.0.0.1:5050/api/notices/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: updatedTitle,
      category: updatedCategory,
    }),
  });

  const updatedNotice = await response.json();

  const updatedNotices = notices.map((notice) =>
    notice._id === id ? updatedNotice : notice
  );

  setNotices(updatedNotices);
};

const filteredNotices = notices.filter((notice) => {
  const matchesSearch = notice.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" || notice.category === selectedCategory;

  return matchesSearch && matchesCategory;
});
  return (
    <div className="app">
      <div className="navbar">
        <h1 className="logo">CampusPulse 🎓</h1>
        <p>SRM Student Dashboard</p>
      </div>

      <div className="notice-form">

        <div className="filter-section">
  <input
    type="text"
    placeholder="Search notices..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option value="All">All</option>
    <option value="Academics">Academics</option>
    <option value="Clubs">Clubs</option>
    <option value="Events">Events</option>
    <option value="Urgent">Urgent</option>
  </select>
</div>
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
        {filteredNotices.map((notice) => (

      <NoticeCard
  key={notice._id}
  notice={notice}
  deleteNotice={deleteNotice}
  updateNotice={updateNotice}
/>
        ))}
      </div>
    </div>
  );
}

export default App;