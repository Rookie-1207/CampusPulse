import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import NoticeCard from "./components/NoticeCard";
import "./App.css";
import Login from "./pages/Login";

import {
  getNotices,
  addNoticeAPI,
  updateNoticeAPI,
  deleteNoticeAPI,
} from "./services/noticeService";

function App() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const name = localStorage.getItem("name");
const role = localStorage.getItem("role");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("token") ? true : false
);

  useEffect(() => {
    getNotices()
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Failed to load notices");
      });
  }, []);

  const addNotice = async () => {
    if (!title.trim() || !category.trim()) {
      alert("Please enter both title and category");
      return;
    }

    const savedNotice = await addNoticeAPI({
      title,
      category,
    });

    setNotices([savedNotice, ...notices]);
    setTitle("");
    setCategory("");

    toast.success("Notice added successfully!");
  };

  const deleteNotice = async (id) => {
    await deleteNoticeAPI(id);

    const updatedNotices = notices.filter((notice) => notice._id !== id);
    setNotices(updatedNotices);

    toast.error("Notice deleted");
  };

  const updateNotice = async (id, updatedTitle, updatedCategory) => {
    const updatedNotice = await updateNoticeAPI(id, {
      title: updatedTitle,
      category: updatedCategory,
    });

    const updatedNotices = notices.map((notice) =>
      notice._id === id ? updatedNotice : notice
    );

    setNotices(updatedNotices);

    toast.info("Notice updated");
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  if (!isLoggedIn) {
  return <Login setIsLoggedIn={setIsLoggedIn} />;
}
  return (
    <div className="app">
      <div className="navbar">
        <h1 className="logo">CampusPulse </h1>
        <p>SRM Student Dashboard</p>
        <button
  onClick={() => {
    localStorage.clear();
    setIsLoggedIn(false);
  }}
  
>
  <div className="user-info">
  <span>👤 {name}</span>
  <span>{role}</span>
</div>
  Logout
</button>
      </div>

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

      <h2>Latest Notices ({filteredNotices.length})</h2>

      {loading && <div className="spinner"></div>}

      {!loading && filteredNotices.length === 0 && (
  <p className="empty-state"> No notices found</p>
)}

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

      <ToastContainer />
    </div>
  );
}

export default App;