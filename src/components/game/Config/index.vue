<template lang="pug">
div
    p.q-headline.text-center Config
    div.text-center
      p Width ✖ Height
      p.flex.justify-center
        ConfigNumberField(
          :value="rows"
          @update="setConfig('rows', $event)"
        )
        ConfigNumberField(
          :value="columns"
          @update="setConfig('columns', $event)"
        )

      p Complexity
        q-slider.q-my-md.q-mx-auto(
          :value.number="complexity"
          @change="setConfig('complexity', $event)"
          :min="0.02"
          :max="0.4"
          :step="0.02"
          color="grey"
          style="width: 80%"
        )

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ConfigNumberField from "./Field";

export default {
  name: "GameConfig",
  components: {
    ConfigNumberField,
  },
  computed: {
    ...mapGetters({
      rows: "config/rows",
      columns: "config/columns",
      complexity: "config/complexity",
    }),
  },
  methods: {
    ...mapActions({
      _setConfig: "config/updateProperty",
    }),
    setConfig(property, value) {
      this._setConfig({ property, value: Number(value) });
    },
  },
};
</script>
