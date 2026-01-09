import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroProps {
  //state
  favorites: Hero[];
  favoriteCount: number;
  //Methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext<FavoriteHeroProps>(
  {} as FavoriteHeroProps
);

//Guardar en el LocalStorage los favoritos

const getFavortiesFromLocalStorage = (): Hero[] => {
  const favoriteHeroes = localStorage.getItem("favoritesHeroes");
  return favoriteHeroes ? JSON.parse(favoriteHeroes) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavortiesFromLocalStorage
  );
  const toggleFavoriteFunction = (hero: Hero) => {
    const heroExist = favorites.find((h) => h.id === hero.id);
    if (heroExist) {
      const newFavorites = favorites.filter((h) => h.id !== hero.id);
      setFavorites(newFavorites);
      return; //Se termina
    }

    setFavorites([...favorites, hero]); //Añadir el nuevo Hero
  };

  const isFavoriteFunction = (hero: Hero) => {
    return favorites.some((h) => h.id === hero.id);
  };

  useEffect(() => {
    localStorage.setItem("favoritesHeroes", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        favorites: favorites,
        favoriteCount: favorites.length,
        isFavorite: isFavoriteFunction,
        toggleFavorite: toggleFavoriteFunction,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
