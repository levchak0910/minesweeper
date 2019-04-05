<template lang="pug">
div

  q-select.q-mx-auto.q-my-md(
    v-model="filter.date"
    :options="allDates"
    style="width: 250px"
  )

  q-select.q-mx-auto.q-my-md(
    v-model="filter.result"
    :options="resultSelection"
    style="width: 250px"
  )

  q-table(
    title="Records"
    :data="filteredRecords"
    :columns="columns"
    row-key="name"
  )


</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Records",
  data: () => ({
    columns: [
      {
        name: "date",
        label: "Date",
        field: "date",
        align: "center",
        sortable: true,
        format: val => (new Date(val)).toLocaleString(),
      },
      {
        name: "win",
        label: "Result",
        field: "win",
        align: "center",
        sortable: true,
        sort: (a, b) => Number(a) - Number(b),
        format: win => (win ? "win" : "lose"),
      },
      {
        name: "area",
        label: "Area",
        field: "config",
        align: "center",
        format: ({ rows, columns }) => `${rows} ✖ ${columns}`,
      },
      {
        name: "bombs",
        label: "Bombs",
        field: "config",
        align: "center",
        format: ({ rows, columns, complexity }) => Math.ceil(complexity * rows * columns),
      },
      {
        name: "time",
        label: "Time",
        field: "time",
        align: "center",
        sortable: true,
        format: time => `${time}s`,
      },
      {
        name: "steps",
        label: "Steps",
        field: "steps",
        align: "center",
        sortable: true,
      },
    ],
    filter: {
      date: null,
      result: "all",
    },
    resultSelection: [
      { label: "All results", value: "all" },
      { label: "Wins", value: "win" },
      { label: "Loses", value: "lose" },
    ],
  }),
  computed: {
    ...mapGetters({
      records: "record/records",
    }),
    allDates() {
      let dates = this.records.map(record => record.localeDate);
      dates = [...new Set(dates)];
      dates = dates.map(date => ({ label: date, value: date }));

      return [
        { value: null, label: "All days" },
        ...dates,
      ];
    },
    filteredRecords() {
      let { records } = this;

      if (this.filter.date) {
        records = records.filter(record => record.localeDate == this.filter.date);
      }
      if (this.filter.result != "all") {
        records = records.filter(record => record.resultTmpl == this.filter.result);
      }

      return records;
    },
  },
};
</script>
