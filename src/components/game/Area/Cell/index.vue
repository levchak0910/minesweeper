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
      if (this.cell.isFlag) return "red";
      if (this.cell.isBomb) return this.config.show.bombs ? "green" : "gray";
      if (this.cell.isUnknown) return "gray";
      if (this.cell.isDemined) return "white";
      return "";
    },

    position() {
      return [this.row, this.column];
    },
  },
  methods: {
    ...mapActions({
      _checkBomb: "area/checkBomb",
      _openArea: "area/openArea",
    }),

    setFlag() {
      this.cell.setFlag();
    },

    checkBomb() {
      this._checkBomb(this.position);
    },

    openArea() {
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
</style>
