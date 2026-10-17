const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const getProductImageUrl = (image) => {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;

  return `${backendUrl.replace(/\/+$/, "")}/${image.replace(/^\/+/, "")}`;
};
