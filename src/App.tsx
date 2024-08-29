import { Button } from "@mui/material";
import CharacterList from "./components/HeroesList";
import RuneItem from "./components/RuneItem";
import { observer } from "mobx-react-lite";
import AbilitiesList from "./components/AbilitiesList";
import StackList from "./components/StackList";
import AbilitiesStore from "./stores/AbilitiesStore";
import StagesStore from "./stores/StagesStore";
import { useEffect } from "react";
import HeroesStore from "./stores/HeroesStore";

const App: React.FC = observer(() => {
  const { weapons, skills } = AbilitiesStore;
  const { stages, banish, stageSize, rune } = StagesStore;

  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }, []);

  return (
    <>
      <div className="mainTitle" style={{ textAlign: "center" }}>
        Soulstone Survivors The Unholy Cathedral Build Planner by Solxnx
      </div>

      <div className="parent">
        <div className="left">
          <CharacterList />
          {HeroesStore.currentHero && (
            <div className="rList">
              <RuneItem name="Improved Repetory" skill="extraSkill" size={7} />
              <RuneItem name="Focused Mind" skill="minusSkill" size={3} />
            </div>
          )}
        </div>

        <div className="center">
          {!AbilitiesStore.weapons.length ? (
            <h2 style={{ textAlign: "center" }}>Choose your character</h2>
          ) : (
            <>
              <StackList />
              <AbilitiesList items={weapons} />
              <AbilitiesList items={skills} />
            </>
          )}
        </div>
        <div className="right">
          {stages.map((stage, index) => (
            <div key={index}>
              <div className="title">
                Stage {index + 1} ({stage.length} / {stageSize})
              </div>
              <div className="stages">
                <AbilitiesList items={stage} />
              </div>
            </div>
          ))}

          <div className="title">
            Banished ({banish.length} / {stageSize})
          </div>
          <div className="stages">
            <AbilitiesList items={banish} />
          </div>
          {stages.some((stage) => stage.length > 0) || rune.isSelected ? (
            <div>
              <Button
                style={{ marginTop: "10px" }}
                color="error"
                onClick={() =>
                  window.confirm("Are you sure?") && StagesStore.clearStages()
                }
                variant="contained"
              >
                RESET BUILD
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
});

export default App;
