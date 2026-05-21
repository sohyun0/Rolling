import { useState, useEffect, useCallback, useRef } from "react";
import getBackgroundImage from "../../../service/Post/getBackgroundImages";
import getFetchCloudinary from "../../../service/Post/getFetchCloudinary";

const usePostImages = (showToast) => {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const showToastRef = useRef(showToast);

  useEffect(() => {
    showToastRef.current = showToast;
  }, [showToast]);

  const loadImages = useCallback(async () => {
    try {
      setIsLoading(true);
      const image = await getBackgroundImage();
      const imageUrls = image?.imageUrls ?? [];
      const transformedImageUrls = imageUrls.map((url) =>
        getFetchCloudinary(url),
      );
      setImages({ ...image, imageUrls: transformedImageUrls });
    } catch (error) {
      console.error("이미지를 불러오는데 실패했습니다:", error);
      if (typeof showToastRef.current === "function") {
        showToastRef.current({
          icon: "alert",
          message: "이미지를 불러오는데 실패했습니다",
          iconClassName: "bg-error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);
  return { images, isLoading, loadImages };
};
export default usePostImages;
