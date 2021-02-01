<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-3">
        <div class="row p-3" v-for="reminder in todoList" :key="reminder.id">
          <Note :title="reminder.title" :description="reminder.description" :date="reminder.datetime" />
        </div>
      </div>
      <div class="col-sm-6 col-md-5 col-lg-5 col-xl-4 col-xxl-3 offset-md-1 offset-lg-2 offset-xl-2 offset-xxl-2">
        <div class="row p-3" v-for="reminder in doneList" :key="reminder.id">
          <Note :title="reminder.title" :description="reminder.description" :date="reminder.datetime" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Note from "../components/Note.vue";
export default {
  components: {
    Note,
  },
  data() {
    return {
      todoList: [],
      doneList: [],
    };
  },
  mounted() {
    this.fetchReminders();
  },
  methods: {
    fetchReminders: function () {
      this.axios
        .get(
          "/reminders/" +
            sessionStorage.getItem("userId") +
            "?key=" +
            sessionStorage.getItem("key")
        )
        .then((response) => {
          response.data.filter((item) => {
            if (item.finished == true) {
              this.doneList.push(item);
            } else {
              this.todoList.push(item);
            }
          });
          console.log(this.todoList);
          console.log(this.doneList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>