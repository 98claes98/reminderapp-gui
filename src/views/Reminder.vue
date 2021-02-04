<template>
  <div>
    <div id="addReminderOverlay">
      <NewNote @added="newReminderAdded" @closed="hideAddReminderBox" />
    </div>
    <div class="container">
      <nav class="navbar pt-4">
        <div class="container-fluid justify-content-center">
          <button type="button" class="btn" @click="showAddReminderBox">
            New reminder...
          </button>
        </div>
      </nav>
      <div class="row justify-content-center pt-2">
        <div class="col-sm-6 col-md-6 col-lg-5 col-xl-5 col-xxl-4">
          <div class="listTitle text-center"><h2>Todo</h2></div>
          <div class="row p-3" v-for="reminder in todoList" :key="reminder.id">
            <Note
              :title="reminder.title"
              :description="reminder.description"
              :date="reminder.datetime"
            />
          </div>
        </div>
        <div
          class="col-sm-6 col-md-6 col-lg-5 col-xl-5 col-xxl-4 offset-lg-2 offset-xl-2 offset-xxl-2"
        >
          <div class="listTitle text-center"><h2>Done</h2></div>
          <div class="row p-3" v-for="reminder in doneList" :key="reminder.id">
            <Note
              :title="reminder.title"
              :description="reminder.description"
              :date="reminder.datetime"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Note from "../components/Note.vue";
import NewNote from "../components/NewNote.vue";
export default {
  components: {
    Note,
    NewNote,
  },
  data() {
    return {
      todoList: [],
      doneList: [],
      addReminderOverlay: null,
    };
  },
  mounted() {
    this.addReminderOverlay = document.getElementById("addReminderOverlay");
    this.fetchReminders();
  },
  methods: {
    fetchReminders: function () {
      this.todoList = [];
      this.doneList = [];
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
    newReminderAdded: function () {
      this.hideAddReminderBox();
      this.fetchReminders();
    },
    showAddReminderBox: function () {
      this.addReminderOverlay.style.visibility = "visible";
    },
    hideAddReminderBox: function () {
      this.addReminderOverlay.style.visibility = "hidden";
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  padding: 16px 42px;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  line-height: 1.25;
  background: #fc6e51;
  color: white;
  font-size: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: background-color 0.6s ease;
  &:hover {
    background: darken(#fc6e51, 10%);
  }
}

#addReminderOverlay {
  visibility: hidden;
  position: fixed;
  display: block;
  z-index: 9999;
}

.listTitle {
  color: whitesmoke;
}
</style>