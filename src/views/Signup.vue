<template>
  <div class="form">
    <h2 class="sr-only">Sign Up</h2>
    <div class="form-group">
      <input
        id="emailInput"
        v-model="user.email"
        autocomplete="off"
        class="form-control"
        type="text"
        placeholder="Email"
        @keyup.enter="signup"
        @input="checkEmail"
      />
    </div>
    <div class="form-group">
      <input
        id="passwordInput"
        v-model="user.password"
        autocomplete="off"
        class="form-control"
        type="password"
        name="password"
        placeholder="Password"
        @keyup.enter="signup"
        @input="checkPassword"
      />
      <p id="errorText">Error</p>
    </div>
    <div class="form-group">
      <button class="btn btn-primary btn-block" @click="signup">Create account</button>
    </div>
    <a class="links" href="login">Already have an account? Log in!</a>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errorBorder: null,
      errorBorder2: null,
      errorText: null,
      validEmail: false,
      validPassword: false,
    };
  },
  mounted() {
    this.errorBorder = document.getElementById("emailInput");
    this.errorBorder2 = document.getElementById("passwordInput");
    this.errorText = document.getElementById("errorText");
  },
  methods: {
    checkEmail: function () {
      this.errorText.style.visibility = "hidden";
      this.axios
        .post("/users/check", this.user)
        .then(() => {
          if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
              this.user.email
            )
          ) {
            this.errorBorder.style.borderBottom = "1px solid green";
            this.validEmail = true;
          } else {
            this.errorBorder.style.borderBottom = "1px solid red";
            this.validEmail = false;
          }
        })
        .catch(() => {
          this.errorBorder.style.borderBottom = "1px solid red";
          this.validEmail = false;
        });
    },
    checkPassword: function () {
      this.errorText.style.visibility = "hidden";
      if (this.user.password.length > 9) {
        this.errorBorder2.style.borderBottom = "1px solid green";
        this.validPassword = true;
      } else {
        this.errorBorder2.style.borderBottom = "1px solid red";
        this.validPassword = false;
      }
    },
    signup: function () {
      if (this.validEmail && this.validPassword) {
        this.axios
          .post("/users", this.user)
          .then(() => {
            this.$router.push("login");
          })
          .catch((error) => {
            this.errorBorder.style.borderBottom = "1px solid red";
            this.errorBorder2.style.borderBottom = "1px solid red";
            this.errorText.style.visibility = "visible";
            if (error.response.status == 409) {
              this.errorText.innerHTML = "Email is already taken!";
            } else if (error.response.status == 500) {
              this.errorText.innerHTML = "Internal server error...";
            } else {
              this.errorText.innerHTML = "An error has occured...";
            }
          });
      } else {
        this.user.password = "";
        this.errorText.innerHTML = "Enter valid credentials!";
        if (!this.validEmail) {
          this.errorBorder.style.borderBottom = "1px solid red";
          this.errorBorder2.style.borderBottom = "1px solid red";
        }
        this.errorText.style.visibility = "visible";
      }
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
    p {
      text-align: center;
      margin: 0;
      color: red;
      visibility: hidden;
    }
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
