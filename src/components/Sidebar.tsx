import { CharacterList } from "./CharacterList";
import { useCharacterContext } from "../context/CharacterContext";

export const Sidebar = () => {
  const { otherCharacters, starredCharacters, addStarred, removeStarred } =
    useCharacterContext();

  const handleStarToggle = (id: string, isStarred: boolean) => {
    isStarred ? removeStarred(id) : addStarred(id);
  };

  return (
    <aside className="w-1/4 bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">Rick and Morty list</h1>
      <CharacterList
        characters={otherCharacters}
        starredList={starredCharacters}
        handleClick={handleStarToggle}
      />
    </aside>
  );
};
