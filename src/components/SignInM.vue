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

            <button class="btn btn-primary btn-block mt-4 mb-3 w-25 mx-auto" type="submit">
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
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      const data = JSON.stringify({
        email: this.email,
        password: this.password,
      });

      // TODO: 向後端驗證使用者登入資訊是否合法
      console.log("data", data);
    },
  },
};
</script>