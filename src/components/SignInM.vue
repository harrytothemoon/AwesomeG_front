<template>
  <div
    class="modal fade"
    id="signin"
    tabindex="-1"
    role="dialog"
    aria-labelledby="signinLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog text-primary text-center" role="document">
      <div class="modal-content" style="background-color:#fffbf0">
        <div class="d-flex justify-content-end">
          <button type="button" class="close m-0 mr-3 mt-3" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <h1 class="modal-title" id="signinLabel" style="color:#c03546">Sign In</h1>
        <div class="modal-body mt-2">
          <form class="w-100" @submit.prevent.stop="handleSubmit">
            <div class="form-label-group mb-2">
              <label for="email">
                <h4>E-mail</h4>
              </label>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                class="form-control w-75 mx-auto"
                placeholder="email"
                autocomplete="username"
                required
                autofocus
              />
            </div>

            <div class="form-label-group mb-3">
              <label for="password">
                <h4>Password</h4>
              </label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                class="form-control w-75 mx-auto"
                placeholder="Password"
                autocomplete="current-password"
                required
              />
            </div>

            <button
              class="btn btn-primary btn-block mt-4 mb-3 w-25 mx-auto"
              type="submit"
              :disabled="isProcessing"
            >
              <h4 class="m-0">Submit</h4>
            </button>

            <div class="ext-center mt-4">
              <h5 class="d-inline mr-3">Not a member yet ?</h5>
              <button
                type="button"
                class="btn btn-sm btn-info my-2 my-sm-0"
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#signup"
              >
                <h6 class="m-0">Sign up</h6>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    handleSubmit() {
      if (!this.email || !this.password) {
        Toast.fire({
          icon: "warning",
          title: "Please Enter Email and Password",
        });
        return;
      }
      this.isProcessing = true;

      authorizationAPI
        .signIn({
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          const { data } = response;
          if (data.status !== "success") {
            throw new Error(data.message);
          }
          localStorage.setItem("token", data.token);
          if (data.user.role === "teacher") {
            this.$router.push("/teacher/questions");
          } else if (data.user.role === "student") {
            this.$router.push("/student/questions");
          } else {
            this.$router.push("/home");
          }
        })
        .catch(() => {
          //顯示錯誤訊息
          this.password = "";
          this.isProcessing = false;
          Toast.fire({
            icon: "warning",
            title: "Email or Password Incorrect!",
          });
        });
    },
  },
};
</script>