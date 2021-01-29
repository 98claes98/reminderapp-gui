<template>
  <div class="form">
    <h2 class="sr-only">Login</h2>
    <div class="form-group">
      <input
        v-model="user.username"
        autocomplete="off"
        class="form-control"
        type="text"
        name="text"
        placeholder="Username"
        @keyup.enter="login"
      />
    </div>
    <div class="form-group">
      <input
        v-model="user.password"
        autocomplete="off"
        class="form-control"
        type="password"
        name="password"
        placeholder="Password"
        @keyup.enter="login"
      />
    </div>
    <div class="form-group">
      <button class="btn btn-primary btn-block" @click="login">Log In</button>
    </div>
    <a class="links" href="signup">Don't have an account yet? Sign up!</a>
    <a class="links" href="forgot">Forgot your username or password?</a>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login: function () {
      this.axios
        .post("/users/authenticate", this.user)
        .then((response) => {
          sessionStorage.setItem("userId", response.data.userId);
          sessionStorage.setItem("key", response.data.key);
          sessionStorage.setItem("authenticated", true);
          this.$router.push("reminder");
        })
        .catch((error) => {
          this.user.username = "";
          this.user.password = "";
          if (error.response.status == 401) {
            console.log("Wrong username or password!");
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
.form {
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
    padding-top: 10px;
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
