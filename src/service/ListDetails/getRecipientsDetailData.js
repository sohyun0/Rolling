const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getRecipientsDetailData = async ({ id, offset, limit }) => {
  const res = await fetch(`${API_BASE_URL}/recipients/${id}/messages/?limit=${limit}&offset=${offset}`, {
    method: "GET",
  });

  return res.json();
};
