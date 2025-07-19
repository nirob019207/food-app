import { useCallback, useState } from "react";
import { useUploadFileMutation } from "@/redux/api/uploaderApi";
import { toast } from "sonner";

export const useImageUpload = () => {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploadImage, { isLoading: isImageUploading }] =
    useUploadFileMutation();

  const uploadImageFile = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("images", file);

      try {
        const response = await uploadImage(formData).unwrap();
        if (response?.success && Array.isArray(response?.data)) {
          setUploadedUrls(response?.data);
          return response.data;
        } else {
          throw new Error("Invalid response from server.");
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload image.");
        return [];
      }
    },
    [uploadImage]
  );

  return {
    uploadImageFile,
    uploadedUrls,
    isImageUploading,
  };
};