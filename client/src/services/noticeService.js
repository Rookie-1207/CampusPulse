const API_URL = "http://127.0.0.1:5050/api/notices";

export const getNotices = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addNoticeAPI = async (notice) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notice),
  });

  return response.json();
};

export const updateNoticeAPI = async (id, notice) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notice),
  });

  return response.json();
};

export const deleteNoticeAPI = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return response.json();
};