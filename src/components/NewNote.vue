<template>
  <div class="background">
    <div class="container-fluid d-flex flex-column">
      <div class="row text-center py-3">
        <div class="col">
          <input
            autocomplete="off"
            id="titleBox"
            maxlength="20"
            v-model="reminder.title"
            type="text"
            class="form-control"
            aria-describedby="titleInput"
            placeholder="Title"
          />
          <span id="titleCount">{{ reminder.title.length }}/20</span>
        </div>
      </div>
      <div class="row text-center py-1">
        <div class="col">
          <textarea
            autocomplete="off"
            maxlength="100"
            v-model="reminder.description"
            type="text"
            class="form-control"
            aria-describedby="descriptionInput"
            placeholder="Description (not required)"
          />
          <span id="descriptionCount"
            >{{ reminder.description.length }}/100</span
          >
        </div>
      </div>
      <div class="row text-center py-3">
        <div class="col">
          <datetime
            type="datetime"
            v-model="reminder.datetime"
            placeholder="Select date (not required)"
            auto-continue
          ></datetime>
        </div>
      </div>
      <div class="row text-center mt-auto pb-4">
        <div class="col">
          <button type="button" class="btn" @click="addReminder">
            Add reminder
          </button>
        </div>
        <div class="col">
          <button type="button" class="btn" @click="close">Close box</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      reminder: {
        title: "",
        description: "",
        datetime: "",
        finished: "false",
        userId: sessionStorage.getItem("userId"),
      },
    };
  },
  methods: {
    addReminder: function () {
      if (this.titleIsValid) {
        this.axios
          .post(
            "/reminders?key=" + sessionStorage.getItem("key"),
            this.reminder
          )
          .then(() => {
            this.reminder.title = "";
            this.reminder.description = "";
            this.reminder.datetime = "";
            this.$emit("added");
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        document.getElementById("titleBox").style.border = "2px solid #ff0000";
      }
    },
    close: function () {
      this.reminder.title = "";
      this.reminder.description = "";
      this.reminder.datetime = "";
      this.$emit("closed");
    },
  },
  computed: {
    titleIsValid: function () {
      return this.reminder.title != "";
    },
  },
};
</script>
<style lang="scss" scoped>
.container-fluid {
  z-index: 10;
  display: block;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 320px;
  background-color: rgb(255, 255, 67);
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
}
.background {
  z-index: 0;
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
}
.btn {
  color: rgb(66, 66, 66);
  transition: transform 0.1s ease-in-out;
  &:focus {
    box-shadow: none;
  }
  &:hover {
    color: rgb(0, 0, 0);
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1.1);
  }
}

#titleBox {
  text-align: center;
  box-shadow: none;
}

textarea {
  height: 120px;
  text-align: center;
  resize: none;
  box-shadow: none !important;
}

#titleCount {
  text-align: right;
  position: absolute;
  margin-top: -23px;
  margin-left: 123px;
  width: 60px;
}

#descriptionCount {
  text-align: right;
  position: absolute;
  margin-top: -23px;
  margin-left: 123px;
  width: 60px;
}
</style>