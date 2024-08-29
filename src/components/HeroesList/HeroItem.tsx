import { Tooltip } from "@mui/material";
import { HeroType } from "../../data/heroes";
import HeroesStore from "../../stores/HeroesStore";
import styles from "./style.module.scss";
import { observer } from "mobx-react";

const HeroItem: React.FC<HeroType> = observer((hero) => {
  const handleClick = () => {
    HeroesStore.selectHero(hero);
  };

  const selected = HeroesStore?.currentHero?.name === hero.name;
  const outline = selected ? styles.selectedOutline : styles.baseOutline;

  return (
    <div style={{ margin: "10px", cursor: "pointer" }} onClick={handleClick}>
      <Tooltip
        placement="top"
        title={
          <span className="tooltipInfo">
            {hero.name.charAt(0).toUpperCase() + hero.name.slice(1)}
          </span>
        }
        followCursor
      >
        <div>
          <img
            className={outline}
            src={`/img/heroes/${hero.name}.webp`}
            alt={hero.name}
          />
        </div>
      </Tooltip>
    </div>
  );
});

export default HeroItem;
