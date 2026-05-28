import { useState } from "react";

function NoticeCard({ notice, deleteNotice, updateNotice }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(notice.title);
  const [editCategory, setEditCategory] = useState(notice.category);

  const handleUpdate = () => {
    updateNotice(notice._id, editTitle, editCategory);
    setIsEditing(false);
  };

  return (
    <div className="notice-card">
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <input
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{notice.title}</h3>
          <p
  className={`category-badge ${
    notice.category.toLowerCase()
  }`}
>
  {notice.category}
</p>
          <small>{notice.date}</small>
          <br />

          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteNotice(notice._id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default NoticeCard;