/* eslint-disable no-shadow, no-param-reassign */
import _ from "lodash";

class Cell {
  constructor({ bomb, status, position }) {
    this.bomb = bomb;
    this.status = status;
    this.position = position;
    this.surroundedCells = null;
  }

  static setConfig(config) {
    this.config = config;
  }

  get surroundedPositions() {
    const [row, column] = this.position;
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
    return positions.filter(([row, column]) => (
      row < Cell.config.rows && row >= 0
      && column < Cell.config.columns && column >= 0
    ));
  }

  get isBomb() { return this.bomb; }

  get isFlag() { return this.status == "flag"; }

  get isUnknown() { return this.status == "unknown"; }

  get isDemined() { return this.status == "demined"; }

  setSurroundedCells(area) {
    this.surroundedCells = this.surroundedPositions.map(([row, column]) => area[row][column]);
  }

  get around() {
    return {
      bombs: this.surroundedCells.filter(cell => cell.isBomb).length,
      flags: this.surroundedCells.filter(cell => cell.isFlag).length,
    };
  }

  get text() {
    const { bombs } = this.around;
    let text = "";
    if (this.isBomb || this.isUnknown) text = "";
    if (this.isDemined) text = bombs == 0 ? "" : bombs;
    if (Cell.config.show.hints) text = bombs;
    return text;
  }

  setFlag() {
    if (this.isDemined) return;
    const status = this.isFlag ? "unknown" : "flag";
    this.setStatus(status);
  }

  setStatus(value) {
    if (value == "bomb") this.bomb = true;
    else this.status = value;
  }

  checkBomb(gameOverCallback) {
    if (this.isBomb) {
      gameOverCallback();
      return;
    }

    this.setStatus("demined");
  }
}


const state = {
  area: [],
};

export const getters = {

  config: (s, g, rs, rootGetters) => rootGetters["config/config"],
  area: state => state.area,

  win: (state) => {
    const cells = _.flattenDeep(state.area);
    const deminedAmount = cells.filter(c => c.isDemined).length;
    const bombAmount = cells.filter(c => c.isBomb).length;
    const cellsAmount = cells.length;

    return deminedAmount + bombAmount == cellsAmount;
  },

  totalBombAmount(state) {
    return state.area.reduce((amount1, row) => (
      amount1 + row.reduce((amount2, cell) => (
        amount2 + Number(cell.isBomb)
      ), 0)
    ), 0);
  },

};

export const mutations = {

  clearArea(state) {
    state.area = [];
  },

  fillArea(state, config) {
    Cell.setConfig(config);

    const area = [];
    for (let row = 0; row < config.rows; row += 1) {
      area.push([]);

      for (let column = 0; column < config.columns; column += 1) {
        const cell = new Cell({
          bomb: false,
          status: "unknown",
          position: [row, column],
        });
        area[row].push(cell);
      }
    }

    area.forEach(row => row.forEach(cell => cell.setSurroundedCells(area)));
    state.area = area;
  },

  setBombs(state, positions) {
    positions.forEach(([row, column]) => {
      state.area[row][column].setStatus("bomb");
    });
  },

  checkBomb(state, { row, column, callback }) {
    state.area[row][column].checkBomb(callback);
  },

};

export const actions = {

  async fillArea({ commit, getters, dispatch }) {
    commit("clearArea");
    commit("fillArea", getters.config);
    const positions = await dispatch("generatePositions");
    commit("setBombs", positions);
    dispatch("record/startTimer", null, { root: true });
  },

  generatePositions({ getters }) {
    const { rows, columns, complexity } = getters.config;
    let bombAmount = rows * columns * complexity;
    const bombPositions = [];
    const getPosition = () => [Math.floor(Math.random() * rows), Math.floor(Math.random() * columns)];

    while (bombAmount > 0) {
      const [currentRow, currentColumn] = getPosition();

      const positionExist = bombPositions.some(([row, column]) => (
        row == currentRow && column == currentColumn
      ));
      if (positionExist) continue;

      bombPositions.push([currentRow, currentColumn]);
      bombAmount -= 1;
    }

    return bombPositions;
  },

  checkBomb({ commit, dispatch }, [row, column]) {
    commit("checkBomb", {
      row,
      column,
      callback: () => dispatch("gameOver"),
    });
    dispatch("checkWin");
  },

  startGame({ dispatch }) {
    dispatch("config/updateProperty", { property: "show.bombs", value: false }, { root: true });
    dispatch("config/updateProperty", { property: "playing", value: true }, { root: true });
    dispatch("fillArea");
  },
  gameOver({ dispatch }) {
    alert("Game over!");
    dispatch("endGame");
  },
  gameWon({ dispatch }) {
    setTimeout(() => alert("You win!"), 200);
    dispatch("endGame");
  },
  endGame({ dispatch }) {
    dispatch("config/updateProperty", { property: "playing", value: false }, { root: true });
    dispatch("config/updateProperty", { property: "show.bombs", value: true }, { root: true });
    dispatch("record/stopTimer", { save: true }, { root: true });
  },

  checkWin({ getters, dispatch }) {
    if (getters.win) {
      dispatch("gameWon");
    }
  },

  openArea({ dispatch, getters }, [row, column]) {
    const cell = getters.area[row][column];
    if (cell.around.bombs != cell.around.flags) return alert("denied");

    const cells = cell.surroundedCells;
    const correclyPutFlags = cells.every(cell => (
      cell.isBomb ? cell.isBomb && cell.isFlag : true
    ));
    if (!correclyPutFlags) return dispatch("gameOver");

    cells.forEach((cell) => {
      if (cell.isUnknown) {
        dispatch("checkBomb", cell.position);
        if (cell.around.bombs == 0) {
          dispatch("openArea", cell.position);
        }
      }
    });
  },

};

export const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
