/* eslint-disable no-shadow, no-param-reassign */

const state = {
  area: [],
};

export const getters = {

  config: (s, g, rs, rootGetters) => rootGetters["config/config"],

  getSurroundedPositions: (state, { config }) => ([row, column]) => {
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
      row < config.rows && row >= 0
      && column < config.columns && column >= 0
    ));
  },

  getThing: (state, getters) => (type, row, column) => {
    const capitalizedType = `is${type[0].toUpperCase() + type.slice(1)}`;
    return getters.area[row][column][capitalizedType];
  },

  getThingsAmountAround: (state, getters) => (type, row, column) => {
    const positions = getters.getSurroundedPositions([row, column]);
    return positions.reduce((amount, [rowIndex, columnIndex]) => (
      amount + Number(getters.getThing(type, rowIndex, columnIndex))
    ), 0);
  },

  area(state) {
    return state.area.map(row => row.map(cell => ({
      status: cell.status,
      isBomb: cell.bomb,
      isFlag: cell.status == "flag",
      isUnknown: cell.status == "unknown",
      isDemined: cell.status == "demined",
    })));
  },
  calculatedArea(state, getters) {
    return getters.area.map((row, rowIndex) => row.map((cell, columenIndex) => {
      const bombs = getters.getThingsAmountAround("bomb", rowIndex, columenIndex);
      const flags = getters.getThingsAmountAround("flag", rowIndex, columenIndex);

      let text = "";
      if (cell.isBomb || cell.isUnknown) text = "";
      if (cell.isDemined) text = bombs == 0 ? "" : bombs;
      if (getters.config.show.hints) text = bombs;

      return {
        ...cell,
        around: { bombs, flags },
        text: String(text),
      };
    }));
  },

  totalBombAmount(state, getters) {
    return getters.area.reduce((amount1, row) => (
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
    for (let row = 0; row < config.rows; row += 1) {
      state.area.push([]);

      for (let column = 0; column < config.columns; column += 1) {
        state.area[row].push({ bomb: false, status: "unknown" });
      }
    }
  },

  setBombs(state, cells = []) {
    cells.forEach(cell => cell.setStatus("bomb"));
  },

  setFlag(state, cell) {
    if (cell.isDemined) return;
    const status = cell.isFlag ? "unknown" : "flag";
    cell.setStatus(status);
  },

  checkBomb(state, cell) {
    if (cell.isBomb) {
      alert("Game over!");
      // this.hideArea();
      return;
    }

    cell.setStatus("demined");
  },

  checkWin(state, cells) {
    const deminedAmount = cells.filter(c => c.isDemined).length;
    const bombAmount = cells.filter(c => c.isBomb).length;
    const cellsAmount = cells.length;

    if (deminedAmount + bombAmount == cellsAmount) {
      setTimeout(() => alert("You win!"), 200);
      // this.hideArea();
    }
  },

};

export const actions = {

  async fillArea({ commit, getters, dispatch }) {
    commit("clearArea");
    commit("fillArea", getters.config);
    const bombsPositions = await dispatch("generatePositions");
    const cells = await dispatch("getCells", bombsPositions);
    commit("setBombs", cells);
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

  async setFlag({ commit, dispatch }, position) {
    const cell = await dispatch("getCell", position);
    commit("setFlag", cell);
  },

  async checkBomb({ commit, dispatch }, position) {
    const cell = await dispatch("getCell", position);
    commit("checkBomb", cell);

    const cells = await dispatch("getCells");
    commit("checkWin", cells);
  },

  async openArea({ dispatch, getters }, position) {
    const cell = await dispatch("getCell", position);
    const { bombs, flags } = cell.around;
    if (bombs != flags) return alert("denied");

    const positions = getters.getSurroundedPositions(position);

    const cells = await dispatch("getCells", positions);
    const correclyPutFlags = cells.every(cell => (
      cell.isBomb ? cell.isBomb && cell.isFlag : true
    ));
    if (!correclyPutFlags) return alert("Game over!");

    // eslint-disable-next-line no-restricted-syntax
    for await (const position of positions) {
      const cell = await dispatch("getCell", position);
      if (cell.isUnknown) {
        await dispatch("checkBomb", position);
        if (cell.around.bombs == 0) {
          await dispatch("openArea", position);
        }
      }
    }
  },

  getCell({ state, getters }, [row, column]) {
    const cell = getters.calculatedArea[row][column];
    cell.setStatus = (value) => {
      if (value == "bomb") state.area[row][column].bomb = true;
      else state.area[row][column].status = value;
    };
    return {
      ...cell,
      position: [row, column],
    };
  },
  async getCells({ dispatch }, positions = null) {
    if (positions) {
      const cellPromises = positions.map(position => dispatch("getCell", position));
      const cells = await Promise.all(cellPromises);
      return cells;
    }

    const cellPromises = [];
    state.area.forEach((r, rowIndex) => r.forEach((c, columnIndex) => {
      cellPromises.push(dispatch("getCell", [rowIndex, columnIndex]));
    }));
    const cells = await Promise.all(cellPromises);
    return cells;
  },

};

export const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
