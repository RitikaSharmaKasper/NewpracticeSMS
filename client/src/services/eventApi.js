import api from "../config/axiosInstance";

// API returns `image` URL; UI cards use `uploadedImage`
export const mapApiEventToUi = (evt) => ({
  ...evt,
  location: evt.location || evt.venue || "",
  venue: evt.venue || evt.location || "",
  uploadedImage: evt.image || evt.uploadedImage || null,
  uploadedFileName: evt.imageFileName || evt.uploadedFileName || "",
});

export const buildEventFormData = (fields, imageFile = null) => {
  const fd = new FormData();

  if (fields.title !== undefined) fd.append("title", fields.title);
  if (fields.description !== undefined) fd.append("description", fields.description);
  if (fields.date !== undefined) fd.append("date", fields.date);
  if (fields.type !== undefined) fd.append("type", fields.type);
  if (fields.location !== undefined) fd.append("location", fields.location);
  if (fields.organizer !== undefined) fd.append("organizer", fields.organizer);
  if (fields.startTime !== undefined) fd.append("startTime", fields.startTime);
  if (fields.endTime !== undefined) fd.append("endTime", fields.endTime);
  if (fields.isHoliday !== undefined) {
    fd.append("isHoliday", String(fields.isHoliday));
  }

  if (imageFile) {
    fd.append("image", imageFile);
  }

  return fd;
};

const multipartConfig = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const fetchAllEvents = async (params = {}) => {
  const response = await api.get("/events", { params });
  const list = response.data?.data || [];
  return {
    events: list.map(mapApiEventToUi),
    pagination: response.data?.pagination,
  };
};

export const fetchUpcomingEvents = async (params = {}) => {
  const response = await api.get("/events/upcoming", { params });
  const list = response.data?.data || [];
  return {
    events: list.map(mapApiEventToUi),
    pagination: response.data?.pagination,
  };
};

export const fetchEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return mapApiEventToUi(response.data?.data);
};

export const createEvent = async (formData) => {
  const response = await api.post("/events", formData, multipartConfig);
  return mapApiEventToUi(response.data?.data);
};

export const updateEvent = async (id, formData) => {
  const response = await api.patch(`/events/${id}`, formData, multipartConfig);
  return mapApiEventToUi(response.data?.data);
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

export const getApiErrorMessage = (error, fallback = "Something went wrong") => {
  return error?.response?.data?.message || error?.message || fallback;
};
