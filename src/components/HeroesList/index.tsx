import { HeroType } from "../../data/heroes";
import HeroesStore from "../../stores/HeroesStore";
import HeroItem from "./HeroItem";

const CharacterList: React.FC = () => {
  return (
    <div className="cList">
      {HeroesStore.heroes.map((hero: HeroType) => {
        return <HeroItem key={hero.name} {...hero} />;
      })}
    </div>
  );
};

export default CharacterList;
