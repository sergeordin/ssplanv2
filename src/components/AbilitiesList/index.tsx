import { observer } from "mobx-react-lite";
import { AbilityType } from "../../data/abilities";
import AbilityItem from "./AbilityItem";

const AbilitiesList: React.FC<{ items: AbilityType[] }> = ({ items }) => {
  return (
    <div style={{ marginBottom: "10px" }} className="items">
      {items.map((item, index) => (
        <AbilityItem key={index} {...item} />
      ))}
    </div>
  );
};

const ObservedAbilitiesList = observer(AbilitiesList);
export default ObservedAbilitiesList;
