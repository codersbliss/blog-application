import { axiosPrivate } from "../api/axios";

const uploadImageToServer = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axiosPrivate.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
export default uploadImageToServer;
