<template lang="pug">
p.flex.justify-center
  q-icon.q-ml-md.flex-icon(
    name="arrow_downward"
    size="30px"
    @click.native="decreaseValue"
  )
  q-input.q-my-md(
    type="number"
    :value.number="value"
    @change="changeProperty"
    align="center"
    style="width: 70px"
  )
  q-icon.flex-icon(
    name="arrow_upward"
    size="30px"
    @click.native="increaseValue"
  )
</template>

<script>
export default {
  name: "ConfigNumberField",
  props: {
    value: { type: Number, required: true },
  },
  methods: {
    changeProperty(value) {
      this.$emit("update", value);
    },
    increaseValue() {
      this.changeProperty(this.value + 1);
    },
    decreaseValue() {
      this.changeProperty(this.value - 1);
    },
  },
};
</script>

<style lang="less" scoped>
.flex-icon {
  display: flex !important;
}
</style>
