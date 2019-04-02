<template lang="pug">

td(
    :class="className"

    @dblclick="openArea"
    @click.right.prevent="setFlag"
    @click="checkBomb(row, column)"
) {{cell.text}}

</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AriaCell",
  props: {
    row: { type: Number, required: true },
    column: { type: Number, required: true },
    cell: { type: Object, required: true },
  },
  computed: {
    ...mapGetters({
      config: "config/config",
    }),

    className() {
      if (this.cell.isFlag && this.cell.isBomb && !this.config.playing) return "green";
      if (this.cell.isFlag) return "red";
      if (this.cell.isBomb) return this.config.show.bombs ? "orange" : "gray";
      if (this.cell.isUnknown) return "gray";
      if (this.cell.isDemined) return "white";
      return "";
    },

    position() {
      return [this.row, this.column];
    },

    actionDisallowed() {
      return this.config.playing === false;
    },
  },
  methods: {
    ...mapActions({
      _checkBomb: "area/checkBomb",
      _openArea: "area/openArea",
      _addStep: "record/addStep",
    }),

    setFlag() {
      if (this.actionDisallowed) return;
      this._addStep();
      this.cell.setFlag();
    },

    checkBomb() {
      if (this.actionDisallowed) return;
      if (this.cell.isFlag || this.cell.isDemined) return;
      this._addStep();
      this._checkBomb(this.position);
    },

    openArea() {
      if (this.actionDisallowed) return;
      if (this.cell.isFlag) return;
      this._addStep();
      this._openArea(this.position);
    },
  },
};
</script>

<style lang="less">
td {

    margin: 0;
    padding: 10px;
    border: 0.5px solid #000;
    width: 20px;
    height: 20px;
    display: inline-flex;
    justify-content: center;

}

.gray {background: gray;}
.white {background: white;}
.red {background: red;}
.green {background: green;}
.orange {background: orange}
</style>
