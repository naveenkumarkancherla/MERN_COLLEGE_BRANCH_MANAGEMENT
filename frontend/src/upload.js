import axios from "axios";

// Unsigned Cloudinary upload. `/auto/upload` so images AND pdfs/docs both work.
// ponytail: no folder/public_id — add one if you want Cloudinary folder structure.
export const uploadToCloudinary = async (file) => {
  const cloud = process.env.REACT_APP_CLOUDINARY_CLOUD;
  const preset = process.env.REACT_APP_CLOUDINARY_PRESET;
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", preset);
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloud}/auto/upload`,
    form
  );
  return data.secure_url;
};
