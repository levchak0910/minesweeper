<template>
  <div>
    <h1>CLicks: {{ clicks }}</h1>

    <input
      type="button"
      value="Increment"
      @click="increment"
    >

    <button @click="decrement">
      Decrement
    </button>
  </div>
</template>

<script>
export default {
  name: "Math",

  data: () => ({
    clicks: 0,
    array: [1],
  }),

  methods: {
    increment() {
      this.clicks += 1;
      //            console.log("HAHAHDDDDA");
    },
    decrement() {
      this.clicks -= 1;
    },
  },
};
</script>
