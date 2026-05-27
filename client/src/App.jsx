const notices = [
  {
    title: "Mid Semester Exam Schedule Released",
    category: "Academics",
    date: "27 May 2026",
  },
  {
    title: "Coding Club Orientation This Friday",
    category: "Clubs",
    date: "29 May 2026",
  },
  {
    title: "Library Timing Extended During Exams",
    category: "Campus",
    date: "30 May 2026",
  },
];

function App() {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>CampusPulse 🎓</h1>
      <p>One place for campus updates, events, resources, and student needs.</p>

      <h2>Latest Notices</h2>

      {notices.map((notice, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "12px",
          }}
        >
          <h3>{notice.title}</h3>
          <p>{notice.category}</p>
          <small>{notice.date}</small>
        </div>
      ))}
    </div>
  );
}

export default App;