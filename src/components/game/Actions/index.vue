<template lang="pug">
div

    q-field.text-center
      q-btn.q-ma-md(
        label="New game"
        @click="startGame"
      )
      q-btn.q-ma-md(
        v-if="playing"
        label="Stop game"
        @click="stopGame"
      )
      br
      q-btn.q-ma-md(
        v-if="playing"
        label="Show bombs"
        @click="showBombs"
      )
      q-btn.q-ma-md(
        v-if="playing"
        label="Show all cells"
        @click="hintArea"
      )

</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "GameActions",
  computed: {
    ...mapGetters({
      playing: "config/playing",
    }),
  },
  methods: {
    ...mapActions({
      _startGame: "area/startGame",
      _setConfig: "config/updateProperty",
      _endGame: "area/endGame",
    }),
    startGame() {
      this._startGame();
    },
    showBombs() {
      this._setConfig({ property: "show.bombs" });
    },
    hintArea() {
      this._setConfig({ property: "show.hints" });
    },
    stopGame() {
      this._endGame({ save: false });
    },
  },
};
</script>
