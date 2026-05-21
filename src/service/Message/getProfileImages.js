const API_URL = import.meta.env.VITE_API_URL;

const getProfileImages = async () => {
  const res = await fetch(`${API_URL}/profile-images/`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("이미지를 불러오는데 실패했습니다");
  }
  return data;
};
export default getProfileImages;
