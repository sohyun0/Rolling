const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getBackgroundImage = async () => {
  const res = await fetch(`${API_BASE_URL}/background-images/`);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Background image 요청 실패: ${res.status} ${res.statusText} - ${errorText}`,
    );
  }

  const data = await res.json();
  return data;
};
export default getBackgroundImage;
