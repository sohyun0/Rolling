import { useState, useCallback } from "react";
import { validateFile } from "../../../utils/validate";
import useCloudinaryUpload from "./useCloudinaryUpload";

const LIMIT_SIZE = 5;
const TOAST_INIT = {
  isOpen: false,
  type: "success", // "success" | "error"
  message: "",
};
const TOAST_MESSAGES = {
  fileTooLarge: {
    type: "error",
    message: `파일이 너무 커요. ${LIMIT_SIZE}MB 이하로 준비해주세요 😉`,
  },
  duplicateFile: {
    type: "error",
    message: "이미 올린 이미지예요. 다른 이미지를 선택해볼까요? 🧐",
  },
  uploadSuccess: {
    type: "success",
    message: "배경 이미지가 등록됐습니다 🎉",
  },
};
const useOptionFileUpload = (onUpload) => {
  const { uploadFiles, isUploading } = useCloudinaryUpload();
  const [isActive, setIsActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]); // 파일 업로드
  const [toast, setToast] = useState(TOAST_INIT);
  const showToast = ({ type, message }) => {
    setToast({ isOpen: true, type, message });
  };
  const closeToast = () => {
    setToast((prev) => ({ ...prev, isOpen: false }));
  };

  const handleFiles = useCallback(
    async (files) => {
      const validFiles = validateFile(files, LIMIT_SIZE);

      if (validFiles.length === 0) {
        showToast(TOAST_MESSAGES.fileTooLarge);
        return;
      }

      const uploadedUrls = await uploadFiles(validFiles);
      const newImages = uploadedUrls.filter(
        (url) => !uploadedImages.includes(url),
      );
      if (newImages.length === 0) {
        showToast(TOAST_MESSAGES.duplicateFile);
        return;
      }
      setUploadedImages((prev) => [...prev, ...newImages]);
      onUpload(newImages);
      showToast(TOAST_MESSAGES.uploadSuccess);
    },
    [uploadFiles, uploadedImages, onUpload],
  );

  const handleDrag = {
    start: () => setIsActive(true),
    end: () => setIsActive(false),
    over: (e) => e.preventDefault(),
    drop: (e) => {
      e.preventDefault();
      setIsActive(false);
      handleFiles(Array.from(e.dataTransfer.files));
    },
  };

  return {
    isActive,
    isUploading,
    toast,
    showToast,
    closeToast,
    handleDrag,
    handleFiles,
  };
};

export default useOptionFileUpload;
