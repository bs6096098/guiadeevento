import axios from 'axios';

const API_BASE_URL = 'sua_api_url_aqui';

export const eventService = {
  async getEvents(filters = {}) {
    try {
      // Simular chamada API (substitua pelo endpoint real)
      const response = await axios.get(`${API_BASE_URL}/events`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      throw error;
    }
  },

  async getEventById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/events/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar evento:', error);
      throw error;
    }
  },

  async searchEvents(query) {
    try {
      const response = await axios.get(`${API_BASE_URL}/events/search`, { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error('Erro ao pesquisar eventos:', error);
      throw error;
    }
  }
}; 