<template>
  <div>
    <form>
      <h2 class="sr-only">Recover Account</h2>
      <div class="form-group">
        <input
          v-model="user.email"
          autocomplete="off"
          class="form-control"
          type="text"
          placeholder="Email"
          @keyup.enter="recoverAccount"
        />
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block" @click="recoverAccount">
          Recover account
        </button>
      </div>
      <a class="links" href="login">Remember your details? Log in!</a>
    </form>
  </div>
</template>

<script>
export default {
  name: "Forgot",
  data() {
    return {
      user: {
        email: "",
      },
    };
  },
  methods: {
    recoverAccount: function () {
      this.axios
        .post("/users/recover", this.user)
        .then(() => {
          this.$router.push("login");
        })
        .catch((error) => {
          if (error.response.status == 404) {
            console.log("That email doesn't exist");
          } else if (error.response.status == 500) {
            console.log("Internal server error");
          } else {
            console.log(error.response);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 320px;
  height: 443px;
  width: 90%;
  background-color: #1e2833;
  padding: 60px;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);

  h2 {
    text-align: center;
    padding-bottom: 40px;
  }
  .form-group {
    padding-bottom: 15px;
  }
  .form-control {
    text-align: center;
    background: none;
    border: none;
    border-bottom: 1px solid #434a52;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    color: inherit;
  }
  .btn-primary {
    background: #214a80;
    border: none;
    border-radius: 4px;
    padding: 11px;
    box-shadow: none;
    margin-top: 26px;
    text-shadow: none;
    outline: none;
    width: 100%;
  }

  .btn-primary:hover,
  .btn-primary:active {
    background: #214a80;
    outline: none;
  }

  .links {
    display: block;
    text-align: center;
    font-size: 12px;
    color: #6f7a85;
    opacity: 0.9;
    text-decoration: none;
    padding-top: 50px;
  }

  .links:hover,
  .links:active {
    opacity: 1;
    text-decoration: none;
  }

  .btn-primary:active {
    transform: translateY(1px);
  }
}
</style>
