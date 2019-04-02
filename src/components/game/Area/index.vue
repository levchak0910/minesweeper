<template lang="pug">
div

  p(
    v-if="config.playing"
    data-cy="totalBombAmount"
  ) Total amount of bombs: {{totalBombAmount}}
  p(
    v-if="config.playing"
  ) Time: {{time}}
  p(
    v-if="config.playing"
  ) Steps: {{steps}}

  table(
    cellpadding="0"
    cellspacing="0"
  )
    tr(
      v-for="(row, rowIndex) in area"
      :key="rowIndex"
    )
      AreaCell(
        v-for="(cell, columnIndex) in row"
        :key="`${rowIndex}${columnIndex}`"
        :row="rowIndex"
        :column="columnIndex"
        :cell="cell"
      )

</template>

<script>
import { mapGetters } from "vuex";
import AreaCell from "./Cell";

export default {
  name: "GameArea",
  components: {
    AreaCell,
  },
  computed: {
    ...mapGetters({
      area: "area/area",
      totalBombAmount: "area/totalBombAmount",
      time: "record/time",
      steps: "record/steps",
      config: "config/config",
    }),
  },
};
</script>

<style lang="less">
table {
  border: 1px solid #000;

  tr {
    margin: 0;
    padding: 10px;
    border: 0.5px solid #000;
  }
}
</style>
