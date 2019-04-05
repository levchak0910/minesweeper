<template lang="pug">
div
  h1.q-display-1.text-center Minesweeper

  GameConfig(v-if="!playing")

  GameActions

  GameArea

</template>

<script>
import GameConfig from "@/components/game/Config";
import GameActions from "@/components/game/Actions";
import GameArea from "@/components/game/Area";
import { mapGetters } from "vuex";

export default {
  name: "Game",
  components: {
    GameConfig,
    GameActions,
    GameArea,
  },
  computed: {
    ...mapGetters({
      playing: "config/playing",
    }),
  },

};
</script>
