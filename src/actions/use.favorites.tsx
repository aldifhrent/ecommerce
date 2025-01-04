import { create } from "zustand";

interface FavoriteState {
  favorites: string[]; // Menyimpan ID item favorit
  addFavorite: (id: string) => void; // Menambahkan item ke favorit
  removeFavorite: (id: string) => void; // Menghapus item dari favorit
  toggleFavorite: (id: string) => void; // Menambahkan/Menghapus berdasarkan status saat ini
  isFavorite: (id: string) => boolean; // Mengecek apakah item favorit
}

export const getFavorites = create<FavoriteState>((set, get) => ({
  favorites: [],
  addFavorite: (id) =>
    set((state) => ({
      favorites: [...state.favorites, id],
    })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav !== id),
    })),
  toggleFavorite: (id) => {
    const { favorites } = get();
    if (favorites.includes(id)) {
      get().removeFavorite(id);
    } else {
      get().addFavorite(id);
    }
  },
  isFavorite: (id) => get().favorites.includes(id),
}));
