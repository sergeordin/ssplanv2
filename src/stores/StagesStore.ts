import { makeAutoObservable } from "mobx";
import { AbilityType } from "../data/abilities";
import AbilitiesStore from "./AbilitiesStore";

class StageStore {
  constructor() {
    makeAutoObservable(this);
  }

  stageSize: number = 6;
  rune: {
    skill: string | null;
    isSelected: boolean;
  } = {
    skill: null,
    isSelected: false,
  };

  stages: AbilityType[][] = [[], [], [], []];
  banish: AbilityType[] = [];

  private checkIsAbilityUsed(ability: AbilityType) {
    return (
      this.stages.some((stage) => stage.some((a) => a.name === ability.name)) ||
      this.banish.some((a) => a.name === ability.name)
    );
  }

  changeStageSize(size: number, skill: string) {
    if (this.rune.isSelected) {
      window.alert("Rune already selected!");
      return;
    }
    this.stageSize = size;
    this.rune.isSelected = !this.rune.isSelected;
    this.rune.skill = skill;
  }

  addAbilityToStage(ability: AbilityType) {
    if (this.checkIsAbilityUsed(ability)) {
      window.alert("Ability already used!");
      return;
    }

    const targetStage = this.stages.find((stage) => stage.length < this.stageSize);

    if (targetStage) {
      targetStage.push(ability);
      AbilitiesStore.toggleChecked(ability.name);
    } else {
      window.alert("All stages are full!");
      return;
    }
  }

  addAbilityToBanish(ability: AbilityType) {
    if (this.checkIsAbilityUsed(ability)) {
      window.alert("Ability already used!");
      return;
    }
    if (this.banish.length < this.stageSize) {
      this.banish.push(ability);
      AbilitiesStore.toggleChecked(ability.name);
    } else {
      window.alert("Banish list is full!");
      return;
    }
  }

  removeAbilityFromStage(name: string) {
    for (const stage of this.stages) {
      const index = stage.findIndex((ability) => ability.name === name);
      if (index > -1) {
        stage.splice(index, 1);
        break;
      }
    }

    for (const ability of this.banish) {
      if (ability.name === name) {
        this.banish.splice(this.banish.indexOf(ability), 1);
        break;
      }
    }
    AbilitiesStore.abilitiesMap.get(name)!.selected = false;
  }

  clearStages() {
    this.stages = [[], [], [], []];
    this.banish = [];
    this.rune = {
      skill: null,
      isSelected: false,
    };
    this.stageSize = 6;

    for (const ability of AbilitiesStore.abilitiesMap.values()) {
      ability.selected = false;
    }
  }
}

export default new StageStore();
