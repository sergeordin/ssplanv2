import { Button, Tooltip } from "@mui/material";
import { AbilityType } from "../../data/abilities";
import StagesStore from "../../stores/StagesStore";
import AbilitiesStore from "../../stores/AbilitiesStore";
import { observer } from "mobx-react";

const AbilityItem: React.FC<AbilityType> = (props) => {
  const { name, abilityType, types, debuffs, traits, buffs, selected } = props;
  const {
    buffs: buffsIsVisible,
    debuffs: debuffsIsVisible,
    traits: traitsIsVisible,
    types: typesIsVisible,
  } = AbilitiesStore.isVisibleIcons;

  const onClickHandler = () => {
    if (
      selected ||
      StagesStore.stages.some((s) => s.some((a) => a.name === name)) ||
      StagesStore.banish.some((a) => a.name === name)
    ) {
      StagesStore.removeAbilityFromStage(name);
    } else {
      StagesStore.addAbilityToStage(props);
    }
  };

  const imageName = name.replace(/\s/g, "");

  const renderTypeElements = () => {
    if (!types || types.length === 0) return null;

    return (
      <div style={{ position: "absolute", right: "-15%", top: "-15%" }}>
        {types.map((type, index) => (
          <img
            key={index}
            width="25px"
            height="25px"
            src={`/img/types/${type}.png`}
            title={type}
            alt="Type"
          />
        ))}
      </div>
    );
  };

  const renderBuffElement = (buffsType: string[], sourcePath: string) => {
    if (!buffsType || buffsType.length === 0) return null;

    return (
      <div className="buffDiv">
        {buffsType.map((buff, index) => (
          <img
            key={index}
            width="60px"
            height="60px"
            src={`/img/${sourcePath}/${buff}.png`}
            title={buff}
            alt={buff}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginRight: "10px",
        marginBottom: "5px",
        opacity: selected ? "0.2" : "1",
      }}
    >
      <Tooltip
        title={<span className="tooltipInfo">{name}</span>}
        followCursor
        placement="top"
      >
        <Button
          variant="text"
          size="medium"
          className="allImgs"
          style={{
            backgroundImage: `url('/img/${abilityType}/${imageName}.webp')`,
            backgroundSize: "cover",
            height: "65px",
          }}
          onClick={() => onClickHandler()}
          onContextMenu={
            selected ? () => null : () => StagesStore.addAbilityToBanish(props)
          }
        >
          {typesIsVisible && renderTypeElements()}
        </Button>
      </Tooltip>
      {debuffsIsVisible && renderBuffElement(debuffs, "debuffs")}
      {buffsIsVisible && renderBuffElement(buffs, "buffs")}
      {traitsIsVisible && renderBuffElement(traits, "traits")}
    </div>
  );
};

const ObservedAbilityItem = observer(AbilityItem);
export default ObservedAbilityItem;
