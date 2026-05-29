const API_URL = "https://campuspulse-vhol.onrender.com/api/notices";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getNotices = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addNoticeAPI = async (notice) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
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
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(notice),
  });

  return response.json();
};

export const deleteNoticeAPI = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};