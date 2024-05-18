import GreenHeart from "../assets/GreenHeart.svg";
import GrayHeart from "../assets/GrayHeart.svg";

interface CharacterCardProps {
  character: any;
  isStarred?: boolean;
  handleClick: (id: string, isStarred: boolean) => void;
}

export const CharacterCard = ({
  character,
  isStarred = false,
  handleClick,
}: CharacterCardProps) => {
  const { id, name, species, image } = character;

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:border-none hover:cursor-pointer hover:bg-fuchsia-200 hover:rounded-md">
      <div className="flex items-center">
        <img src={image} alt={name} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-600">{species}</div>
        </div>
      </div>
      <button onClick={() => handleClick(id, isStarred)}>
        <img
          src={isStarred ? GreenHeart : GrayHeart}
          alt="Heart"
          className="min-w-6 min-h-6"
        />
      </button>
    </div>
  );
};
