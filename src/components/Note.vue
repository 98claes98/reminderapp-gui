<template>
  <div class="container-fluid" id="noteBox">
    <div class="row text-center py-3">
      <div class="col">
        <h2 class="noselect">
          <u>{{ title }}</u>
        </h2>
      </div>
    </div>
    <div v-if="description" class="row text-center px-4">
      <div class="col">
        <p class="noselect">{{ description }}</p>
      </div>
    </div>
    <div v-if="date" class="row text-center">
      <div class="col">
        <p class="noselect" id="date">
          {{ localDate }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    title: String,
    description: String,
    date: String,
  },
  computed: {
    localDate: function () {
      return moment.utc(this.date).local().format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>
<style lang="scss" scoped>
#date {
  font-size: 0.7rem;
}
#noteBox {
  background-color: rgb(255, 255, 67);
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>