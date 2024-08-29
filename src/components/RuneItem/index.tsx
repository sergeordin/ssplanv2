import { Tooltip } from "@mui/material";
import StagesStore from "../../stores/StagesStore";
import styles from "./style.module.scss";
type Props = {
  name: string;
  skill: string;
  size: number;
};
const RuneItem: React.FC<Props> = ({
  name: runeName,
  skill: runeSkill,
  size: runeSize,
}) => {
  const { rune: currentRune } = StagesStore;

  const handleClick = () => StagesStore.changeStageSize(runeSize, runeSkill);

  return (
    <Tooltip title={<span className="tooltipInfo">{runeName}</span>} followCursor>
      <div
        className={currentRune.skill === runeSkill ? styles.runeActive : styles.rune}
        onClick={handleClick}
      >
        <img src={`/img/runes/${runeSkill}.png`} alt={runeName} />
      </div>
    </Tooltip>
  );
};

export default RuneItem;
