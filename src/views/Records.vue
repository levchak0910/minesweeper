<template>
  <div>
    <h1>Records</h1>
    <button @click="$store.state.record.records=[]">
      remove records
    </button>
    <RecordRow
      v-for="(record, index) in sortedRecords"
      :key="index"
      :win="record.win"
      :time="record.time"
      :steps="record.steps"
      :date="record.date"
      :config="record.config"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RecordRow from "@/components/record/Row";

export default {
  name: "Records",
  components: {
    RecordRow,
  },
  computed: {
    ...mapGetters({
      records: "record/records",
    }),
    sortedRecords() {
      // eslint-disable-next-line
      return this.records.sort((r1, r2) => r1.time - r2.time);
    },
  },
};
</script>
