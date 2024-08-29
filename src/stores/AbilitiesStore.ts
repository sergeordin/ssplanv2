import { makeAutoObservable } from "mobx";
import { abilities, AbilityType } from "../data/abilities";
import { HeroType } from "../data/heroes";

class AbilitiesStore {
  constructor() {
    makeAutoObservable(this);
    this.setAbilities(abilities);
  }

  abilitiesMap: Map<string, AbilityType> = new Map();
  weapons: AbilityType[] = [];
  skills: AbilityType[] = [];

  isVisibleIcons: { [key: string]: boolean } = {
    buffs: false,
    debuffs: false,
    traits: false,
    types: false,
  };

  private setAbilities(abilities: AbilityType[]) {
    this.abilitiesMap.clear();

    abilities.forEach((ability) => {
      this.abilitiesMap.set(ability.name, { ...ability, selected: false });
    });
  }
  toggleChecked = (abilityName: string) => {
    const ability = this.abilitiesMap.get(abilityName) as AbilityType;
    if (!ability) return;
    ability.selected = !ability.selected;
  };

  toggleVisibleIcons(type: "buffs" | "debuffs" | "traits" | "types") {
    this.isVisibleIcons[type] = !this.isVisibleIcons[type];
  }

  setCurrentAbilities(hero: HeroType) {
    this.weapons = [];
    this.skills = [];

    const currentHeroWeapons = hero.weapons;
    for (const weapon of currentHeroWeapons) {
      this.weapons.push(this.abilitiesMap.get(weapon) as AbilityType);
    }

    const currentHeroSkills = hero.skills;
    for (const skill of currentHeroSkills) {
      this.skills.push(this.abilitiesMap.get(skill) as AbilityType);
    }
  }
}

export default new AbilitiesStore();
