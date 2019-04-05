<template lang="pug">
  q-layout-drawer(
    v-model="show.navigation"
    :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
  )

    q-list(no-border link inset-delimiter)
      q-list-header Navigation

      q-item(to="/game" exact)
          q-item-side(icon="play_circle_filled")
          q-item-main(label="Game")

      q-item(to="/about" exact)
          q-item-side(icon="info_outline")
          q-item-main(label="About")

      q-item(to="/records" exact)
          q-item-side(icon="view_list")
          q-item-main(label="Records")

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  computed: {
    ...mapGetters({
      show: "config/show",
    }),
  },
};
</script>
