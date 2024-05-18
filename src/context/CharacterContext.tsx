import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useQuery, gql, ApolloError } from "@apollo/client";

interface Character {
  id: string;
  name: string;
  species: string;
  image: string;
  starred?: boolean;
}

interface CharacterContextProps {
  loading: boolean;
  error: ApolloError | undefined;
  starredCharacters: Character[];
  otherCharacters: Character[];
  addStarred: (id: string) => void;
  removeStarred: (id: string) => void;
}

interface CharacterProviderProps {
  children: ReactNode;
}

const GET_CHARACTERS = gql`
  query {
    characters(page: 1, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        id
        name
        species
        image
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`;

const getInitialStarred = () => {
  const starredStorage = sessionStorage.getItem("starred");
  return starredStorage ? JSON.parse(starredStorage) : [];
};

const CharacterContext = createContext<CharacterContextProps | null>(null);

export const CharacterProvider = ({ children }: CharacterProviderProps) => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [starred, setStarred] = useState<string[]>(getInitialStarred);

  useEffect(() => {
    sessionStorage.setItem("starred", JSON.stringify(starred));
  }, [starred]);

  const addStarred = (id: string) => {
    const oldList = getInitialStarred();
    const newList = oldList ? [...oldList, id] : [id];
    localStorage.setItem("starred", JSON.stringify(newList));
    setStarred(newList);
  };

  const removeStarred = (id: string) => {
    const oldList = getInitialStarred();
    const newList = oldList
      ? oldList.filter((item: string) => item !== id)
      : [id];
    localStorage.setItem("starred", JSON.stringify(newList));
    setStarred(newList);
  };

  const characters = data?.characters.results;

  const starredCharacters = Array.isArray(characters)
    ? characters
        .filter((character: Character) => starred.includes(character.id))
        .map((character: Character) => ({ ...character, starred: true }))
    : [];

  const otherCharacters = Array.isArray(characters)
    ? characters.filter(
        (character: Character) => !starred.includes(character.id)
      )
    : [];

  const contextValue: CharacterContextProps = {
    loading,
    error,
    starredCharacters,
    otherCharacters,
    addStarred,
    removeStarred,
  };

  return (
    <CharacterContext.Provider value={contextValue}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = (): CharacterContextProps => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(
      "useCharacterContext must be used within a CharacterProvider"
    );
  }
  return context;
};
