import { observer } from "mobx-react";
import AbilitiesStore from "../../stores/AbilitiesStore";

const StackList = () => {
  const {
    debuffs: debuffsVisible,
    buffs: buffsVisible,
    traits: traitsVisible,
    types: typesVisible,
  } = AbilitiesStore.isVisibleIcons;

  return (
    <div className="stack">
      <label className="iconsLabel">
        <input
          type="checkbox"
          checked={debuffsVisible}
          onChange={() => AbilitiesStore.toggleVisibleIcons("debuffs")}
        />
        <span>Debuffs</span>
      </label>
      <label className="iconsLabel">
        <input
          type="checkbox"
          checked={buffsVisible}
          onChange={() => AbilitiesStore.toggleVisibleIcons("buffs")}
        />
        <span>Stackable Buffs</span>
      </label>
      <label className="iconsLabel">
        <input
          type="checkbox"
          checked={traitsVisible}
          onChange={() => AbilitiesStore.toggleVisibleIcons("traits")}
        />
        <span>Traits</span>
      </label>
      <label className="iconsLabel">
        <input
          type="checkbox"
          checked={typesVisible}
          onChange={() => AbilitiesStore.toggleVisibleIcons("types")}
        />
        <span>Skill Types</span>
      </label>
    </div>
  );
};

const ObservedAbilitiesList = observer(StackList);
export default ObservedAbilitiesList;
