<template lang="pug">
div
    h3 size of area:
    p width:
        input(
            type="number"
            :value.number="rows"
            @change="setConfig('rows', $event.target.value)"
            data-cy="width"
        )
    p height:
        input(
            type="number"
            :value.number="columns"
            @change="setConfig('columns', $event.target.value)"
            data-cy="height"
        )
    p complexity:
        input(
            type="number"
            step="0.05"
            min="0"
            max="1"
            :value.number="complexity"
            @change="setConfig('complexity', $event.target.value)"
            data-cy="complexity"
        )

</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "GameConfig",
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
