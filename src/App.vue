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
  name: "Minesweeper",
  components: {
    Header,
    Footer,
  },
    mounted() {
      console.log("some");
    }
};
</script>
