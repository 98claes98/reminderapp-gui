<template>
  <div class="container-fluid">
    <div id="noteBox" class="row square">
      <div class="col">
        <div class="row text-center">
          <div class="col">
            <h2>{{title}}</h2>
          </div>
        </div>
        <div v-if="description" class="row text-center">
          <div class="col">
            <p>{{description}}</p>
          </div>
        </div>
        <div v-if="date" class="row text-center">
          <div class="col">
            <p id="date">{{date}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    description: String,
    date: String,
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
</style>