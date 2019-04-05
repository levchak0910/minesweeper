<template lang="pug">
q-layout(view="lHh Lpr lFf")

  Navigation

  Header

  q-page-container
    router-view

  Footer

</template>

<script>
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default {
  name: "App",
  components: {
    Header,
    Navigation,
    Footer,
  },
};
</script>

<style>
* {
  cursor: default;
  user-select: none;
}
</style>
