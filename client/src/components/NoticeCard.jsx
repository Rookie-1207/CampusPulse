function NoticeCard({ notice, index, deleteNotice }) {
  return (
    <div className="notice-card">

      <h3>{notice.title}</h3>

      <p>{notice.category}</p>

      <small>{notice.date}</small>

      <br />

      <button onClick={() => deleteNotice(index)}>
        Delete
      </button>

    </div>
  );
}

export default NoticeCard;