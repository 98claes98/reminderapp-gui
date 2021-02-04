<template>
  <div class="background">
    <div class="container-fluid d-flex flex-column">
      <div class="row text-center py-3">
        <div class="col">
          <input
            spellcheck="false"
            autocomplete="off"
            id="editTitleBox"
            maxlength="20"
            v-model="dtitle"
            type="text"
            class="form-control"
            aria-describedby="titleInput"
            placeholder="Title"
          />
          <span id="titleCount">{{ dtitle.length }}/20</span>
        </div>
      </div>
      <div class="row text-center py-1">
        <div class="col">
          <textarea
            spellcheck="false"
            autocomplete="off"
            maxlength="100"
            v-model="ddescription"
            type="text"
            class="form-control"
            aria-describedby="descriptionInput"
            placeholder="Description (not required)"
          />
          <span id="descriptionCount">{{ ddescription.length }}/100</span>
        </div>
      </div>
      <div class="row text-center py-3">
        <div class="col">
          <datetime
            type="datetime"
            v-model="ddatetime"
            placeholder="Select date (not required)"
            auto-continue
          ></datetime>
        </div>
      </div>
      <div class="row text-center mt-auto pb-4">
        <div class="col">
          <button type="button" class="btn" @click="updateReminder">
            Update reminder
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
  props: ["id", "title", "description", "datetime", "userId"],

  data() {
    return {
      did: this.id,
      dtitle: this.title,
      ddescription: this.description,
      ddatetime: this.datetime,
      duserId: this.userId,
      timeInit: this.datetime,
    };
  },
  watch: {
    id: function (value) {
      this.did = value;
      this.update();
    },
    title: function (value) {
      this.dtitle = value;
    },
    description: function (value) {
      this.ddescription = value;
    },
    datetime: function (value) {
      this.ddatetime = value;
    },
    userId: function (value) {
      this.duserId = value;
    },
  },
  methods: {
    update() {
      this.dtitle = this.title;
      this.ddescription = this.description;
      this.ddatetime = this.datetime;
      this.duserId = this.userId;
    },
    updateReminder: function () {
      if (this.titleIsValid) {
        this.axios
          .put("/reminders?key=" + sessionStorage.getItem("key"), {
            id: this.did,
            title: this.dtitle,
            description: this.ddescription,
            datetime: this.ddatetime,
            userId: this.duserId,
          })
          .then(() => {
            this.$emit("updated");
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        document.getElementById("editTitleBox").style.border =
          "2px solid #ff0000";
      }
    },
    close: function () {
      this.$emit("closed");
    },
  },
  computed: {
    titleIsValid: function () {
      return this.dtitle != "";
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

#editTitleBox {
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