<template>
  <div class="container-fluid" id="noteBox">
    <div id="upperBody" @click="sendUpdateEmit">
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
    <div class="row p-3 buttonsPart">
      <div class="col deleteButton">
        <div class="leftright"></div>
        <div class="rightleft"></div>
        <label id="deleteLabel" class="close">Delete</label>
        <div id="clickableDelete" @click="deleteReminder"></div>
      </div>
      <div class="col finishedButton">
        <input type="checkbox" :id="id" />
        <label id="finishedLabel" data-content="Not done?">Not done?</label>
        <div id="clickableFinished" @click="changeFinishedState"></div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["id", "title", "description", "date", "finished"],
  computed: {
    localDate: function () {
      return moment.utc(this.date).local().format("YYYY-MM-DD HH:mm");
    },
    isFinished: function () {
      return this.checkBox.checked;
    },
  },
  data() {
    return {
      checkBox: null,
    };
  },
  methods: {
    sendUpdateEmit: function () {
      this.$emit("clickUpdate", this.id);
    },
    deleteReminder: function () {
      this.axios
        .delete(
          "/reminders/" + this.id + "?key=" + sessionStorage.getItem("key")
        )
        .then(() => {
          this.$emit("deletedReminder");
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    changeFinishedState: function () {
      this.checkBox.checked = !this.checkBox.checked;
      this.axios
        .put("/reminders?key=" + sessionStorage.getItem("key"), {
          id: this.id,
          userId: sessionStorage.getItem("userId"),
          finished: this.checkBox.checked,
        })
        .then(() => {
          this.$emit("changedFinished");
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  mounted() {
    this.checkBox = document.getElementById(this.id);
    this.checkBox.checked = this.finished;
  },
};
</script>
<style lang="scss" scoped>
#clickableDelete {
  position: absolute;
  width: 100px;
  height: 30px;
  top: -3px;
  left: 6px;
  cursor: pointer;
}

#clickableFinished {
  position: absolute;
  width: 130px;
  height: 40px;
  top: -8px;
  left: 0px;
  cursor: pointer;
}

#date {
  font-size: 0.7rem;
}
#noteBox {
  background-color: rgb(255, 255, 67);
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
}

#upperBody {
  cursor: pointer;
}

.noselect {
  overflow-wrap: break-word;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

$softorange: #f4a259;
$tomatored: #f25c66;
$mediumblu: #1e272d;

.buttonsPart {
  border-top: 2px solid black;
}

.deleteButton {
  position: relative;
  width: 20px;
  height: 20px;
}

.finishedButton {
  position: relative;
  width: 20px;
  height: 20px;
}

.leftright {
  height: 4px;
  width: 25px;
  position: absolute;
  top: 10px;
  background-color: $softorange;
  border-radius: 2px;
  transform: rotate(45deg);
  transition: all 0.3s ease-in;
}

.rightleft {
  height: 4px;
  width: 25px;
  position: absolute;
  top: 10px;
  background-color: $softorange;
  border-radius: 2px;
  transform: rotate(-45deg);
  transition: all 0.3s ease-in;
}

#deleteLabel {
  top: 3px;
  color: rgb(0, 0, 0);
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 0.3s ease-in;
  opacity: 1;
  left: 45px;
  position: absolute;
}

.deleteButton:hover .leftright {
  transform: rotate(-45deg);
  background-color: $tomatored;
}
.deleteButton:hover .rightleft {
  transform: rotate(45deg);
  background-color: $tomatored;
}

$black: #363839;
$lightgray: #9c9e9f;
$white: #fff;
$green: #06842c;

input[type="checkbox"] {
  position: relative;
  width: 24px;
  height: 24px;
  color: $black;
  border: 1px solid $black;
  border-radius: 4px;
  appearance: none;
  outline: 0;
  transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
  &::before {
    position: absolute;
    content: "";
    display: block;
    top: 2px;
    left: 7px;
    width: 8px;
    height: 14px;
    border-style: solid;
    border-color: $white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
  &:checked {
    color: $white;
    border-color: $green;
    background: $green;
    &::before {
      opacity: 1;
    }
    ~ label::before {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
}

label {
  position: relative;
  font-weight: 600;
  top: -5px;
  left: 8px;
  user-select: none;
  &::before {
    position: absolute;
    content: attr(data-content);
    clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
    text-decoration: line-through;
    text-decoration-thickness: 3px;
    text-decoration-color: $lightgray;
    transition: clip-path 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
}
</style>