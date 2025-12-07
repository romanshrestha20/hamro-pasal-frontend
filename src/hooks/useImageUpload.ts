import toast from "react-hot-toast";

export const useImageUpload = (maxSize = 5 * 1024 * 1024) => {
  const validate = (file: File) => {
    if (file.size > maxSize) {
      toast.error("File too large");
      return false;
    }
    return true;
  };

  return { validate };
};
