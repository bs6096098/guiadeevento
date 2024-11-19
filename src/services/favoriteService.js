const FAVORITES_KEY = 'event_favorites';

export const favoriteService = {
  getFavorites() {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  },

  addFavorite(eventId) {
    const favorites = this.getFavorites();
    if (!favorites.includes(eventId)) {
      favorites.push(eventId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  },

  removeFavorite(eventId) {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(id => id !== eventId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  },

  isFavorite(eventId) {
    const favorites = this.getFavorites();
    return favorites.includes(eventId);
  }
}; 