<template lang="pug">
  p
    span Result: {{ result }}
    span Time: {{ timeTmpl }}
    span Steps: {{ steps }}
    span Date: {{ dateTmpl }}

    span(@click="toggleConfig")
      span(v-if="!showConfig") Game complexity: {{ complexityTmpl }}
      pre(v-else) Config: {{ config }}

</template>

<script>
export default {
  name: "RecordRow",
  props: {
    win: { type: Boolean, required: true },
    time: { type: Number, required: true },
    steps: { type: Number, required: true },
    date: { type: Number, required: true },
    config: { type: Object, required: true },
  },
  data: () => ({
    showConfig: false,
  }),
  computed: {
    result() {
      return this.win ? "win" : "lose";
    },
    timeTmpl() {
      return `${this.time} seconds`;
    },
    dateTmpl() {
      return `${(new Date(this.date)).toLocaleString().slice(0, -3)}`.replace(",", "");
    },
    complexityTmpl() {
      return `${this.config.complexity * 100}%`;
    },
  },
  methods: {
    toggleConfig() {
      this.showConfig = !this.showConfig;
    },
  },
};
</script>

<style lang="less" scoped>
p {
  display: flex;
  border: 1px solid #000;
  margin: 10px;

  span {
    flex: 1 1 20%;
    padding: 5px 10px;
    border-right: 1px solid #000;
    &:last-of-type {border-right: none};
  }
}
</style>
