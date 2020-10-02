<template>
  <div
    class="modal fade"
    id="signup"
    tabindex="-1"
    role="dialog"
    aria-labelledby="signupLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog text-primary text-center" role="document">
      <div class="modal-content" style="background-color: #fffbf0">
        <div class="d-flex justify-content-end">
          <button
            type="button"
            class="close m-0 mr-3 mt-3"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <h1 class="modal-title" id="signupLabel" style="color: #c03546">
          Sign Up
        </h1>
        <div class="modal-body mt-2">
          <form class="w-100" @submit.prevent.stop="handleSubmit">
            <fieldset class="form-group">
              <div class="form-label-group mb-2 d-flex justify-content-around">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    v-model="role"
                    type="radio"
                    name="role"
                    id="gridRadios1"
                    value="student"
                    required
                  />
                  <label class="form-check-label pl-3" for="gridRadios1">
                    <h5>Student</h5>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    v-model="role"
                    type="radio"
                    name="role"
                    id="gridRadios2"
                    value="teacher"
                  />
                  <label class="form-check-label pl-3" for="gridRadios2">
                    <h5>Teacher</h5>
                  </label>
                </div>
              </div>
            </fieldset>
            <div class="form-label-group mb-2">
              <label for="name">
                <h5>Name</h5>
              </label>
              <input
                id="name"
                v-model="name"
                name="name"
                type="text"
                class="form-control w-75 mx-auto"
                placeholder="name"
                autocomplete="username"
                required
                autofocus
              />
            </div>
            <div class="form-label-group mb-2">
              <label for="email">
                <h5>E-mail</h5>
              </label>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                class="form-control w-75 mx-auto"
                placeholder="email"
                autocomplete="email"
                required
                autofocus
              />
            </div>

            <div class="form-label-group mb-3">
              <label for="password">
                <h5>Password</h5>
              </label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                class="form-control w-75 mx-auto"
                placeholder="Password"
                autocomplete="new-password"
                required
              />
            </div>
            <div class="form-label-group mb-3">
              <label for="password-check">
                <h5>Password Check</h5>
              </label>
              <input
                id="password-check"
                v-model="passwordCheck"
                name="passwordCheck"
                type="password"
                class="form-control w-75 mx-auto"
                placeholder="Password"
                autocomplete="new-password"
                required
              />
            </div>

            <button
              class="btn btn-primary btn-block mt-4 mb-3 w-25 mx-auto"
              type="submit"
              :disabled="isProcessing"
            >
              <h5 class="m-0 text-center">Submit</h5>
            </button>

            <div class="ext-center mt-4">
              <h5 class="d-inline mr-3">Already a member ?</h5>
              <button
                type="button"
                class="btn btn-sm btn-info my-2 my-sm-0"
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#signin"
              >
                <h6 class="m-0 text-center">Sign in</h6>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import $ from "jquery";
export default {
  data() {
    return {
      role: "",
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false,
    };
  },
  methods: {
    //TODO change to async/await
    handleSubmit() {
      this.isProcessing = true;
      usersAPI
        .signUp({
          role: this.role,
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck,
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.isProcessing = false;
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
            $("#signup").modal("hide");
            $("#signin").modal("show");
            this.name = "";
            this.email = "";
            this.password = "";
            this.passwordCheck = "";
          } else if (response.data.status === "warning") {
            this.isProcessing = false;
            Toast.fire({
              icon: "warning",
              title: response.data.message,
            });
          } else if (response.data.status === "error") {
            this.isProcessing = false;
            Toast.fire({
              icon: "error",
              title: response.data.message,
            });
          }
        })
        .catch(() => {
          this.isProcessing = false;
          Toast.fire({
            icon: "error",
            title: "Can't not sign up, please try again later",
          });
          this.role = "";
          this.name = "";
          this.email = "";
          this.password = "";
          this.passwordCheck = "";
        });
    },
  },
};
</script>