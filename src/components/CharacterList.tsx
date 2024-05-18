import { CharacterCard } from "./CharacterCard";

interface CharacterListProps {
  characters: any[];
  handleClick: (id: string, isStarred: boolean) => void;
  starredList: any[];
}

export const CharacterList = ({
  characters,
  handleClick,
  starredList,
}: CharacterListProps) => {
  return (
    <div>
      <h2 className="px-4 py-2 text-xs text-slate-500">
        StARRED CHARACTERS ({starredList.length})
      </h2>
      {starredList.map((character: any) => (
        <CharacterCard
          key={character.id}
          character={character}
          isStarred
          handleClick={handleClick}
        />
      ))}
      <h2 className="px-4 py-2 text-xs text-slate-500">
        CHARACTERS ({characters.length})
      </h2>
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};
