<template lang="pug">
div
    button(
      @click="fillArea"
      data-cy="fillArea"
    ) Fill the table
    button(
      @click="showBombs"
      data-cy="showMines"
    ) Show bombs
    button(
      @click="hintArea"
      data-cy="showMinesAround"
    ) Show all cells

</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "GameActions",
  methods: {
    ...mapActions({
      _fillArea: "area/fillArea",
      _setConfig: "config/updateProperty",
    }),
    fillArea() {
      this._fillArea();
    },
    showBombs() {
      this._setConfig({ property: "show.bombs" });
    },
    hintArea() {
      this._setConfig({ property: "show.hints" });
    },
  },
};
</script>

<style lang="less">
table {
  border: 1px solid #000;

  tr, td {
    margin: 0;
    padding: 10px;
    border: 0.5px solid #000;
  }

  td {
    width: 20px;
    height: 20px;
    display: inline-flex;
    justify-content: center;

  }
}

.gray {background: gray;}
.white {background: white;}
.red {background: red;}
.green {background: green;}


* {
  cursor: default;
  user-select: none;
}
</style>
