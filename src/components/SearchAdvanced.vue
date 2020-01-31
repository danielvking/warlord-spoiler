<template>
  <div>
    <b-row>
      <!-- Basic Fields -->
      <b-col class="my-1" cols="12" md="6">
        <b-form-group label-cols="6" label="Name:">
          <b-form-input v-model="name" @keypress.enter="onSearch" />
        </b-form-group>
        <b-form-group label-cols="6" label="Text:">
          <b-form-input v-model="text" @keypress.enter="onSearch" />
        </b-form-group>
        <b-form-group label-cols="6" label="Traits:" label-class="my-1">
          <v-select multiple v-model="traits" :options="traitList" />
        </b-form-group>
        <b-form-group label-cols="6" label="Artist:">
          <b-form-input v-model="artist" @keypress.enter="onSearch" />
        </b-form-group>
        <b-form-group label-cols="6" label="Type:">
          <b-form-select v-model="type" :options="typeList">
            <template v-slot:first>
              <b-form-select-option :value="null" />
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group label-cols="6" label="Alignment:">
          <b-form-select v-model="alignment" :options="alignmentList">
            <template v-slot:first>
              <b-form-select-option class="text-muted" :value="null" />
            </template>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6">
        <!-- Extended -->
        <b-form-group label-cols="6" label="Extended:" class="my-1">
          <b-form-checkbox v-model="include4ex" stacked>Include 4Ex</b-form-checkbox>
        </b-form-group>

        <!-- Class -->
        <b-form-group label-cols="6" label="Class:" class="my-1">
          <b-form-checkbox-group v-model="classes" :options="classList" stacked />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <!-- Faction -->
      <b-col class="my-1" cols="12" md="6">
        <b-form-group label-cols="6" label="Faction:">
          <b-form-checkbox-group v-model="factions" :options="factionList" stacked />
        </b-form-group>
      </b-col>

      <!-- Stats -->
      <b-col class="my-1" cols="12" md="6">
        <b-form-group label-cols="6" label="LVL:" label-for="txtLvl">
          <b-input-group>
            <b-input-group-prepend>
              <b-form-select
                class="font-default radius-right-0"
                v-model="levelOp"
                :options="[ '≥', '=', '≤' ]"
              />
            </b-input-group-prepend>
            <b-form-input
              id="txtLvl"
              type="number"
              v-model.number="level"
              @keypress.enter="onSearch"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="6" label="Number of Attacks:" label-for="txtNoAtks">
          <b-input-group>
            <b-input-group-prepend>
              <b-form-select
                class="font-default radius-right-0"
                v-model="numAttacksOp"
                :options="[ '≥', '=', '≤' ]"
              />
            </b-input-group-prepend>
            <b-form-input
              id="txtNoAtks"
              type="number"
              v-model.number="numAttacks"
              @keypress.enter="onSearch"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="6" label="ATK (First):" label-for="txtAtk">
          <b-input-group>
            <b-input-group-prepend>
              <b-form-select
                class="font-default radius-right-0"
                v-model="attackOp"
                :options="[ '≥', '=', '≤' ]"
              />
            </b-input-group-prepend>
            <b-form-input
              id="txtAtk"
              type="number"
              v-model.number="attack"
              @keypress.enter="onSearch"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="6" label="AC:" label-for="txtAc">
          <b-input-group>
            <b-input-group-prepend>
              <b-form-select
                class="font-default radius-right-0"
                v-model="armorClassOp"
                :options="[ '≥', '=', '≤' ]"
              />
            </b-input-group-prepend>
            <b-form-input
              id="txtAc"
              type="number"
              v-model.number="armorClass"
              @keypress.enter="onSearch"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="6" label="SK:" label-for="txtSk">
          <b-input-group>
            <b-input-group-prepend>
              <b-form-select
                class="font-default radius-right-0"
                v-model="skillOp"
                :options="[ '≥', '=', '≤' ]"
              />
            </b-input-group-prepend>
            <b-form-input
              id="txtSk"
              type="number"
              v-model.number="skill"
              @keypress.enter="onSearch"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="6" label="HP:" label-for="txtHp">
          <b-input-group>
            <b-input-group-prepend>
              <b-form-select
                class="font-default radius-right-0"
                v-model="hitPointsOp"
                :options="[ '≥', '=', '≤' ]"
              />
            </b-input-group-prepend>
            <b-form-input
              id="txtHp"
              type="number"
              v-model.number="hitPoints"
              @keypress.enter="onSearch"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <!-- Unusual Fields -->
      <b-col class="my-1" cols="12" md="6">
        <b-form-group label-cols="6" label="Set:">
          <b-form-select v-model="set" :options="setList">
            <template v-slot:first>
              <b-form-select-option :value="null" />
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group label-cols="6" label="Rarity:">
          <b-form-select v-model="rarity" :options="rarityList">
            <template v-slot:first>
              <b-form-select-option :value="null" />
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group label-cols="6" label="Edition:">
          <b-form-select v-model="edition" :options="editionList">
            <template v-slot:first>
              <b-form-select-option :value="null">Open</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group label-cols="6" label="Flavor Text:">
          <b-form-input v-model="flavorText" @keypress.enter="onSearch" />
        </b-form-group>
        <b-form-group label-cols="6" label="Flavor Traits:" label-class="my-1">
          <v-select multiple v-model="flavorTraits" :options="flavorTraitList" />
        </b-form-group>
      </b-col>
    </b-row>

    <b-button
      variant="primary"
      class="w-100 my-1"
      :disabled="!canSearch"
      @click.prevent="onSearch"
    >Search</b-button>
  </div>
</template>

<script>
import utility from "@/utility.js";

export default {
  name: "SearchAdvanced",
  props: {
    cards: Array,
    referenceLists: Object
  },
  data() {
    return {
      name: null,
      text: null,
      traits: [],
      artist: null,
      type: null,
      alignment: null,
      include4ex: false,
      includeML: false,
      classes: [],
      factions: [],
      levelOp: "≥",
      level: null,
      numAttacksOp: "≥",
      numAttacks: null,
      attackOp: "≥",
      attack: null,
      armorClassOp: "≥",
      armorClass: null,
      skillOp: "≥",
      skill: null,
      hitPointsOp: "≥",
      hitPoints: null,
      set: null,
      rarity: null,
      edition: null,
      flavorText: null,
      flavorTraits: [],
      isBusy: false
    };
  },
  computed: {
    canSearch() {
      return this.cards && !this.isBusy;
    },
    typeList() {
      return (this.referenceLists && this.referenceLists.typeList) || [];
    },
    alignmentList() {
      return (this.referenceLists && this.referenceLists.alignmentList) || [];
    },
    classList() {
      return (this.referenceLists && this.referenceLists.classList) || [];
    },
    factionList() {
      return (this.referenceLists && this.referenceLists.factionList) || [];
    },
    traitList() {
      if (!this.referenceLists || !this.referenceLists.traitList) return [];
      return this.referenceLists.traitList.filter(
        t => !this.traits.includes(t)
      );
    },
    editionList() {
      return (this.referenceLists && this.referenceLists.editionList) || [];
    },
    setList() {
      return (this.referenceLists && this.referenceLists.setList) || [];
    },
    rarityList() {
      return (this.referenceLists && this.referenceLists.rarityList) || [];
    },
    flavorTraitList() {
      if (!this.referenceLists || !this.referenceLists.flavorTraitList) return [];
      return this.referenceLists.flavorTraitList.filter(
        t => !this.flavorTraits.includes(t)
      );
    }
  },
  methods: {
    onSearch() {
      if (this.isBusy) return;
      this.isBusy = true;
      this.$emit("search-started");

      let name = this.name && this.name.toLowerCase();
      let text = this.text && this.text.toLowerCase();
      let flavorText = this.flavorText && this.flavorText.toLowerCase();
      let artist = this.artist && this.artist.toLowerCase();

      let searchResults = [];
      let filter = x => {
        if (!this.include4ex || this.set) {
          let sets = x.printInfos.map(y => y.set).filter(y => y);
          // Include 4Ex
          let _4exSets = ["4EX", "AMH", "RttA"];
          if (
            !this.include4ex &&
            sets[0] &&
            !sets.filter(s => !_4exSets.includes(s))[0]
          )
            return false;

          // Set
          if (this.set && !sets.includes(this.set)) return false;
        }
        // Name
        if (name && (!x.name || !x.name.toLowerCase().includes(name))) {
          return false;
        }
        // Text
        if (text && (!x.text || !x.text.toLowerCase().includes(text))) {
          return false;
        }
        // Traits
        if (this.traits[0]) {
          if (!x.traits) return false;
          let traits = x.traits.split("/");
          if (this.traits.filter(t => !traits.includes(t))[0]) return false;
        }
        // Artist
        if (
          artist &&
          !x.printInfos.filter(
            y => y.artist && y.artist.toLowerCase().includes(artist)
          )[0]
        ) {
          return false;
        }
        // Type
        if (this.type && x.type !== this.type) {
          return false;
        }
        // Alignment
        if (this.alignment && x.alignment !== this.alignment) {
          return false;
        }
        // Class
        if (this.classes[0]) {
          if (!x.class) return false;
          let classes = x.class.split("/");
          if (this.classes.filter(c => !classes.includes(c))[0]) return false;
        }
        // Faction
        if (this.factions[0]) {
          if (!x.faction) return false;
          let factions = x.faction.split("/");
          if (this.factions.filter(f => !factions.includes(f))[0]) return false;
        }
        // Level
        if (typeof this.level === "number") {
          if (x.level == null) return false;
          if (this.levelOp === "≥") {
            if (this.level > x.level) return false;
          } else if (this.levelOp === "≤") {
            if (this.level < x.level) return false;
          } else {
            if (this.level != x.level) return false;
          }
        }
        if (
          typeof this.numAttacks === "number" ||
          typeof this.attack === "number"
        ) {
          let attacks = x.attack == null ? [] : x.attack.split("/");
          // Number of Attacks
          if (typeof this.numAttacks === "number") {
            if (this.numAttacksOp === "≥") {
              if (this.numAttacks > attacks.length) return false;
            } else if (this.numAttacksOp === "≤") {
              if (this.numAttacks < attacks.length) return false;
            } else {
              if (this.numAttacks != attacks.length) return false;
            }
          }
          // Attack (First)
          if (typeof this.attack === "number") {
            if (attacks[0] == null) return false;
            if (this.attackOp === "≥") {
              if (this.attack > +attacks[0]) return false;
            } else if (this.attackOp === "≤") {
              if (this.attack < +attacks[0]) return false;
            } else {
              if (this.attack != +attacks[0]) return false;
            }
          }
        }
        // Armor Class
        if (typeof this.armorClass === "number") {
          if (x.armorClass == null) return false;
          if (this.armorClassOp === "≥") {
            if (this.armorClass > x.armorClass) return false;
          } else if (this.armorClassOp === "≤") {
            if (this.armorClass < x.armorClass) return false;
          } else {
            if (this.armorClass != x.armorClass) return false;
          }
        }
        // Skill
        if (typeof this.skill === "number") {
          if (x.skill == null) return false;
          if (this.skillOp === "≥") {
            if (this.skill > x.skill) return false;
          } else if (this.skillOp === "≤") {
            if (this.skill < x.skill) return false;
          } else {
            if (this.skill != x.skill) return false;
          }
        }
        // Hit Points
        if (typeof this.hitPoints === "number") {
          if (x.hitPoints == null) return false;
          if (this.hitPointsOp === "≥") {
            if (this.hitPoints > x.hitPoints) return false;
          } else if (this.hitPointsOp === "≤") {
            if (this.hitPoints < x.hitPoints) return false;
          } else {
            if (this.hitPoints != x.hitPoints) return false;
          }
        }
        // Rarity
        if (this.rarity) {
          let rarities = x.printInfos.map(y => y.rarity).filter(y => y);
          if (!rarities.includes(this.rarity)) return false;
        }
        // Edition
        if (this.edition) {
          if (!x.editions.includes(this.edition)) return false;
        }
        // Flavor Text
        if (
          flavorText &&
          !x.printInfos.filter(
            y => y.flavorText && y.flavorText.toLowerCase().includes(flavorText)
          )[0]
        ) {
          return false;
        }
        // Flavor Traits
        if (this.flavorTraits[0]) {
          let allFlavorTraits = x.printInfos
            .map(x => x.flavorTraits)
            .filter(y => y);
          let flavorTraits = new Set(
            allFlavorTraits.map(y => y.split("/")).flat()
          );
          if (this.flavorTraits.filter(t => !flavorTraits.has(t))[0])
            return false;
        }
        return true;
      };

      utility
        .forEachAsync(this.cards, x => {
          if (filter(x)) searchResults.push(x);
        })
        .then(() => {
          searchResults.sort((a, b) => {
            if (a.name < b.name) return -1;
            else if (a.name > b.name) return 1;
            else return 0;
          });

          this.isBusy = false;
          this.$emit("search-completed", searchResults);
        });
    }
  }
};
</script>

<style scoped>
.radius-right-0 {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>