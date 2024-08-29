import { makeAutoObservable } from "mobx";
import { heroes, HeroType } from "../data/heroes";
import AbilitiesStore from "./AbilitiesStore";

class HeroesStore {
  constructor() {
    makeAutoObservable(this);
  }

  heroes: HeroType[] = heroes;

  currentHero: HeroType | undefined = undefined;

  selectHero(hero: HeroType) {
    this.currentHero = hero;
    AbilitiesStore.setCurrentAbilities(hero);
  }
}

export default new HeroesStore();
