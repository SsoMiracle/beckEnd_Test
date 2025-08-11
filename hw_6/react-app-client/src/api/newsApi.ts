import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getAllNews = () => api.get('/newsposts');
export const getNewsById = (id: string) => api.get(`/newsposts/${id}`);
export const createNews = (data: { title: string; text: string }) =>
  api.post('/newsposts', data);
export const updateNews = (id: string, data: { title?: string; text?: string }) =>
  api.put(`/newsposts/${id}`, data);
export const deleteNews = (id: string) => api.delete(`/newsposts/${id}`);
