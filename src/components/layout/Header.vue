<template lang="pug">
div
  span: router-link(to="/game") Game
  span: router-link(to="/about") About
  span: router-link(to="/records") Records
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="less">
span {
  display: inline-block;
  padding: 2px 20px;
  margin: 3px 0;
  border-right: 1px solid #000;

  &:last-of-type {border: none}
}
</style>
