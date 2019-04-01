<template lang="pug">
div
  h1 Minesweeper

  GameConfig

  GameActions

  GameArea

</template>

<script>
import GameConfig from "@/components/game/Config";
import GameActions from "@/components/game/Actions";
import GameArea from "@/components/game/Area";

export default {
  name: "Game",
  components: {
    GameConfig,
    GameActions,
    GameArea,
  },
};
</script>
