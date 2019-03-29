<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default {
  name: "MinesweeperApp",
  components: {
    Header,
    Footer,
  },
  mounted() {
    console.log("a");
  }
};
</script>
