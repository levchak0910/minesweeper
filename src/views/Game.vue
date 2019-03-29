<template lang="pug">
div
  h1 Minesweeper

  h3 size of area:
    p width:
      input(
        type="number"
        v-model="rows"
      )
    p height:
      input(
        type="number"
        v-model="columns"
      )
    p height:
      input(
        type="number"
        step="0.05"
        min="0"
        max="1"
        v-model="complexity"
      )
    button(
      @click="fillArea"
    ) Fill the table
    button(
      @click="showMines=!showMines"
    ) Show mines
    button(
      @click="showMinesAround"
    ) Show mines around

  p(v-if="totalBombAmount!=0") Total amount of bombs: {{totalBombAmount}}

  table(
    cellpadding="0"
    cellspacing="0"
  )
    tr(
      v-for="(row, rowIndex) in area"
    )
      td(
        v-for="(cell, columnIndex) in row"
        :class="getClass(cell)"

        @dblclick="openArea(rowIndex, columnIndex)"
        @click.right.prevent="signAsBomb(rowIndex, columnIndex)"
        @click="checkBomb(rowIndex, columnIndex)"
      ) {{cell.text}}


</template>

<script>
export default {
  name: "Game",
  data: () => ({
    rows: 10,
    columns: 10,
    complexity: 0.1,
    area: [],
    showMines: false,
    totalBombAmount: 0,
  }),
  methods: {
    showMinesAround() {
      this.area.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          if (!cell.isBomb) {
            // eslint-disable-next-line no-param-reassign
            cell.text = this.getBombsAmountAround(rowIndex, columnIndex);
          }
        });
      });
    },
    getSurroundedPositions([row, column]) {
      const positions = [
        [row + 1, column],
        [row, column + 1],
        [row + 1, column + 1],
        [row - 1, column],
        [row, column - 1],
        [row - 1, column - 1],
        [row + 1, column - 1],
        [row - 1, column + 1],
      ];
      return positions.filter(([r, c]) => r < this.rows && r >= 0 && c < this.columns && c >= 0);
    },
    fillArea() {
      this.totalBombAmount = 0;
      for (let row = 0; row < this.rows; row += 1) {
        this.$set(this.area, row, Array(10));

        for (let column = 0; column < this.columns; column += 1) {
          const isBomb = this.getRandom();
          const cell = {
            status: isBomb ? "bomb" : "unknown",
            text: "",
            bombsNear: 0,
            isBomb,
          };

          this.totalBombAmount += isBomb ? 1 : 0;

          this.$set(this.area[row], column, cell);
        }
      }
    },

    checkPosition(arrayOfPositions, [row, column]) {
      return arrayOfPositions.some(([r, c]) => r == row && c == column);
    },

    openArea(rowIndex, columnIndex, checkedPositions = []) {
      const bombs = this.getBombsAmountAround(rowIndex, columnIndex);
      const flags = this.getFlagsAmountAround(rowIndex, columnIndex);
      if (bombs != flags && checkedPositions.length == 0) return alert("denied");

      const positionsToOpen = this.getSurroundedPositions([rowIndex, columnIndex]);

      while (positionsToOpen.length > 0) {
        const [row, column] = positionsToOpen.pop();

        if (this.is("flag", row, column)) continue;
        if (this.is("bomb", row, column) && bombs != flags) continue;


        this.checkBomb(row, column);

        if (this.checkPosition(checkedPositions, [row, column])) {
          continue;
        }

        console.log("Step");

        if (this.getBombsAmountAround(row, column) == 0) {
          checkedPositions.push([row, column]);
          this.openArea(row, column, checkedPositions);
        }
      }
    },

    signAsBomb(rowIndex, columnIndex) {
      const cell = this.area[rowIndex][columnIndex];
      if (cell.status == "demined") return;
      cell.status = cell.status == "flag" ? "unknown" : "flag";
    },

    checkBomb(rowIndex, columnIndex) {
      const cell = this.area[rowIndex][columnIndex];

      if (cell.isBomb) {
        alert("Game over!");
        setTimeout(this.fillArea, 200);
        return;
      }

      const bombs = this.getBombsAmountAround(rowIndex, columnIndex);
      cell.status = "demined";
      cell.text = bombs == 0 ? "" : bombs;

      // eslint-disable-next-line no-shadow
      if (!this.area.some(row => row.some(cell => cell.status == "unknown"))) {
        alert("You win!");
        setTimeout(this.fillArea, 200);
      }
    },

    isBomb(rowIndex, columnIndex) {
      try {
        const cell = this.area[rowIndex][columnIndex];
        if (!cell) return 0;
        if (cell.isBomb) return 1;
        return 0;
      } catch (e) {
        return 0;
      }
    },
    isFlag(rowIndex, columnIndex) {
      return this.area[rowIndex][columnIndex].status == "flag" ? 1 : 0;
    },
    isUnknown(rowIndex, columnIndex) {
      return this.area[rowIndex][columnIndex].status == "unknown" ? 1 : 0;
    },
    isDemined(rowIndex, columnIndex) {
      return this.area[rowIndex][columnIndex].status == "demined" ? 1 : 0;
    },
    is(type, rowIndexOrCell, columnIndex) {
      if (typeof rowIndexOrCell == "number") {
        const method = type[0].toUpperCase() + type.slice(1);
        return this[`is${method}`](rowIndexOrCell, columnIndex);
      }
      return rowIndexOrCell.status == type;
    },

    getBombsAmountAround(row, column) {
      const positions = this.getSurroundedPositions([row, column]);
      return positions.reduce((amount, [rowIndex, columnIndex]) => amount + this.isBomb(rowIndex, columnIndex), 0);
    },

    getFlagsAmountAround(row, column) {
      const positions = this.getSurroundedPositions([row, column]);
      return positions.reduce((amount, [rowIndex, columnIndex]) => amount + this.isFlag(rowIndex, columnIndex), 0);
    },


    getRandom() {
      return !(Math.random() > this.complexity);
    },
    getClass(cell) {
      if (cell.status === "unknown") return "gray";
      if (cell.status === "flag") return "red";
      if (cell.status === "demined") return "white";
      if (cell.status === "bomb") return this.showMines ? "green" : "gray";
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
