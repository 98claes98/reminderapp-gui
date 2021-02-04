<template>
  <div>
    <div id="addReminderOverlay">
      <NewNote @added="newReminderAdded" @closed="hideAddReminderBox" />
    </div>
    <div id="updateReminderOverlay">
      <EditNote
        :id="clickedReminder.id"
        :title="clickedReminder.title || ''"
        :description="clickedReminder.description || ''"
        :datetime="clickedReminder.datetime || ''"
        :userId="clickedReminder.userId"
        @updated="reminderUpdated"
        @closed="hideUpdateReminderBox"
      />
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
        <div class="col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-4">
          <div class="listTitle text-center"><h2>Todo</h2></div>
          <div
            class="row p-3 reminderBox"
            v-for="reminder in todoList"
            :key="reminder.id"
          >
            <Note
              @clickUpdate="showUpdateReminderBox"
              @changedFinished="fetchReminders"
              @deletedReminder="fetchReminders"
              :id="reminder.id"
              :title="reminder.title"
              :description="reminder.description"
              :date="reminder.datetime"
              :finished="reminder.finished"
            />
          </div>
        </div>
        <div
          class="col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-4 offset-lg-2 offset-xl-2 offset-xxl-2"
        >
          <div class="listTitle text-center"><h2>Done</h2></div>
          <div
            class="row p-3 reminderBox"
            v-for="reminder in doneList"
            :key="reminder.id"
          >
            <Note
              @clickUpdate="showUpdateReminderBox"
              @changedFinished="fetchReminders"
              @deletedReminder="fetchReminders"
              :id="reminder.id"
              :title="reminder.title"
              :description="reminder.description"
              :date="reminder.datetime"
              :finished="reminder.finished"
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
import EditNote from "../components/EditNote.vue";
export default {
  components: {
    Note,
    NewNote,
    EditNote,
  },
  data() {
    return {
      todoList: [],
      doneList: [],
      addReminderOverlay: null,
      updateReminderOverlay: null,
      clickedReminder: {},
    };
  },
  mounted() {
    this.addReminderOverlay = document.getElementById("addReminderOverlay");
    this.updateReminderOverlay = document.getElementById(
      "updateReminderOverlay"
    );
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newReminderAdded: function () {
      this.hideAddReminderBox();
      this.fetchReminders();
    },
    reminderUpdated: function () {
      this.hideUpdateReminderBox();
      this.fetchReminders();
    },
    showAddReminderBox: function () {
      this.addReminderOverlay.style.visibility = "visible";
    },
    hideAddReminderBox: function () {
      this.addReminderOverlay.style.visibility = "hidden";
    },
    showUpdateReminderBox: function (id) {
      let reminder = this.todoList
        .concat(this.doneList)
        .find((e) => e.id == id);
      this.clickedReminder = reminder;
      this.updateReminderOverlay.style.visibility = "visible";
    },
    hideUpdateReminderBox: function () {
      this.clickedReminder = {};
      this.updateReminderOverlay.style.visibility = "hidden";
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
  transition: background-color 0.6s ease, transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
    background: darken(#fc6e51, 10%);
  }
}

#addReminderOverlay {
  visibility: hidden;
  position: fixed;
  display: block;
  z-index: 9999;
}

#updateReminderOverlay {
  visibility: hidden;
  position: fixed;
  display: block;
  z-index: 9999;
}

.listTitle {
  color: whitesmoke;
}

.reminderBox {
  transition: transform 0.1s ease-in-out;
  &:hover {
    color: rgb(0, 0, 0);
    transform: scale(1.05);
  }
}
</style>