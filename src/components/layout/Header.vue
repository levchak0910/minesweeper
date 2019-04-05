<template lang="pug">
q-layout-header(reveal)
    q-toolbar(
      color="primary"
      :glossy="$q.theme === 'mat'"
      :inverted="$q.theme === 'ios'"
    )
      q-btn(
          flat
          dense
          round
          aria-label="Menu"
          icon="menu"
          @click="toggleNavigation"
      )
      q-toolbar-title
        | Minesweeper
        div(slot="subtitle")
          a.text-white(href="https://github.com/levchak0910/minesweeper") Opensourse project
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      showNavigation: this.$q.platform.is.desktop,
    };
  },
  methods: {
    ...mapActions({
      _setConfig: "config/updateProperty",
    }),
    toggleNavigation() {
      this._setConfig({ property: "show.navigation" });
    },
  },

};
</script>
