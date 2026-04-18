import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

export const api = {
  setToken(token) {
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  },
  async login(payload) {
    const { data } = await axiosInstance.post('/auth/login', payload);
    return data;
  },
  async getCategories() {
    const { data } = await axiosInstance.get('/categories');
    return data;
  },
  async createCategory(payload) {
    const { data } = await axiosInstance.post('/categories', payload);
    return data;
  },
  async updateCategory(id, payload) {
    const { data } = await axiosInstance.put(`/categories/${id}`, payload);
    return data;
  },
  async deleteCategory(id) {
    const { data } = await axiosInstance.delete(`/categories/${id}`);
    return data;
  },
  async getMenu() {
    const { data } = await axiosInstance.get('/menu');
    return data;
  },
  async createMenuItem(payload) {
    const { data } = await axiosInstance.post('/menu', payload);
    return data;
  },
  async updateMenuItem(id, payload) {
    const { data } = await axiosInstance.put(`/menu/${id}`, payload);
    return data;
  },
  async deleteMenuItem(id) {
    const { data } = await axiosInstance.delete(`/menu/${id}`);
    return data;
  },
  async resetMenu() {
    const { data } = await axiosInstance.delete('/menu/reset');
    return data;
  },
  async lookupTable(tableName) {
    const { data } = await axiosInstance.get(`/tables/lookup/${tableName}`);
    return data;
  },
  async getTables() {
    const { data } = await axiosInstance.get('/tables');
    return data;
  },
  async createTable(payload) {
    const { data } = await axiosInstance.post('/tables', payload);
    return data;
  },
  async updateTable(id, payload) {
    const { data } = await axiosInstance.put(`/tables/${id}`, payload);
    return data;
  },
  async deleteTable(id) {
    const { data } = await axiosInstance.delete(`/tables/${id}`);
    return data;
  },
  async getTableQr(id) {
    const { data } = await axiosInstance.get(`/tables/${id}/qr`);
    return data;
  },
  async createOrder(payload) {
    const { data } = await axiosInstance.post('/orders', payload);
    return data;
  },
  async getOrders() {
    const { data } = await axiosInstance.get('/orders');
    return data;
  },
  async getOrder(id) {
    const { data } = await axiosInstance.get(`/orders/${id}`);
    return data;
  },
  async updateOrderStatus(id, status) {
    const { data } = await axiosInstance.patch(`/orders/${id}/status`, { status });
    return data;
  },
  async getAnalyticsSummary() {
    const { data } = await axiosInstance.get('/analytics/summary');
    return data;
  }
};
