<template lang="pug">
div

  table#stat(
    v-if="totalAmount.bombs"
    cellpadding="0"
    cellspacing="0"
  )
    tr
      td Bombs amount: {{totalAmount.bombs}}
      td Flags amount: {{totalAmount.flags}}
      td Time: {{time}}s
      td Steps: {{steps}}


  div#area
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
      totalAmount: "area/totalAmount",
      time: "record/time",
      steps: "record/steps",
      config: "config/config",
    }),
  },
};
</script>


<style lang="less" scoped>

#area {
  width: 100%;
  overflow-x: scroll;
  margin: 0;
  padding: 0;

  table {
    border: 1px solid #000;
    margin: 20px auto;
    width: max-content;

    tr {
      margin: 0;
      padding: 10px;
      border: 0.5px solid #000;
    }
}


}

#stat {
  border: 1px solid #000;
  margin: 10px auto;
  width: 80%;

  td {
    padding: 10px;
    border-right: 1px solid #000;
    text-align: center;

    &:last-of-type {border: none}
  }
}

</style>
