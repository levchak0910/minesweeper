<template lang="pug">
q-layout-footer.bg-grey-4(reveal)
  q-item.flex.justify-between.items-center
    span.flex.items-center
      q-icon(name="person" size="23px")
      span Created by Levcsák Sándor
    span.text-right.flex.items-center
      q-icon(name="copyright" size="23px")
      span 2019

</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
footer {
  border-top: 1px solid #000;
  margin-top: 15px;
  padding-top: 5px;
}
</style>
