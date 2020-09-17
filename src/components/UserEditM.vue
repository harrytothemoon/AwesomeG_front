<template>
  <div
    class="modal fade"
    id="useredit"
    tabindex="-1"
    role="dialog"
    aria-labelledby="usereditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog text-primary text-center" role="document">
      <div class="modal-content" style="background-color:#fffbf0">
        <div class="d-flex justify-content-end">
          <button type="button" class="close m-0 mr-3 mt-3" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <h1 class="modal-title" id="usereditLabel" style="color:#c03546">User Edit</h1>
        <div class="modal-body mt-2">
          <form class="w-100" @submit.prevent.stop="handleSubmit">
            <fieldset class="form-group">
              <div class="form-label-group mb-2 d-flex justify-content-around">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    v-model="user.gender"
                    type="radio"
                    name="gender"
                    id="gridRadios1"
                    value="Male"
                  />
                  <label class="form-check-label pl-3" for="gridRadios1">
                    <h5>Male</h5>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    v-model="user.gender"
                    type="radio"
                    name="gender"
                    id="gridRadios2"
                    value="Female"
                  />
                  <label class="form-check-label pl-3" for="gridRadios2">
                    <h5>Female</h5>
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
                v-model="user.name"
                name="name"
                type="text"
                class="form-control w-75 mx-auto"
                placeholder="name"
                required
              />
            </div>
            <div class="form-label-group mb-3">
              <label for="password">
                <h5>Password</h5>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                class="form-control w-75 mx-auto"
                placeholder="Password"
                autocomplete="new-password"
              />
            </div>
            <div class="form-label-group mb-3">
              <label for="password-check">
                <h5>Password Check</h5>
              </label>
              <input
                id="password-check"
                name="passwordCheck"
                type="password"
                class="form-control w-75 mx-auto"
                placeholder="Password"
                autocomplete="new-password"
              />
            </div>
            <div v-if="user.role ==='teacher'" class="form-label-group mb-2">
              <label for="bankaccount">
                <h5>Bank Account</h5>
              </label>
              <input
                id="bankaccount"
                v-model="user.bankaccount"
                name="bankaccount"
                type="text"
                class="form-control w-75 mx-auto"
                placeholder="bankaccount"
              />
            </div>
            <div v-else class="form-label-group mb-2">
              <label for="grade">
                <h5>Grade</h5>
              </label>
              <input
                id="grade"
                v-model="user.grade"
                name="grade"
                type="text"
                class="form-control w-75 mx-auto"
                placeholder="grade"
              />
            </div>
            <div v-if="user.role ==='teacher'" class="row">
              <div class="form-label-group col-6">
                <label for="introduction">
                  <h4>Introduction</h4>
                </label>
                <textarea
                  class="form-control"
                  id="introduction"
                  rows="7"
                  placeholder=" Please introduce yourself..."
                  name="introduction"
                  v-model="user.introduction"
                ></textarea>
              </div>
              <div class="form-label-group mb-3 col-6">
                <label for="avatar">
                  <h5>User's Avatar</h5>
                </label>
                <input
                  id="avatar"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  class="form-control-file"
                  @change="handleFileChange"
                  style="cursor:pointer"
                />
                <img
                  v-if="user.avatar"
                  :src="user.avatar"
                  class="d-block img-thumbnail mb-3"
                  width="120px"
                  height="120px"
                />
              </div>
            </div>
            <template v-else>
              <label class="mt-3" for="avatar">
                <h5 class="m-0">User's Avatar</h5>
              </label>
              <div class="form-label-group my-4 px-5 d-flex align-items-center">
                <input
                  id="avatar"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  class="form-control-file ml-3"
                  @change="handleFileChange"
                  style="cursor:pointer"
                />
                <img
                  v-if="user.avatar"
                  :src="user.avatar"
                  class="d-block img-thumbnail mr-5"
                  width="120px"
                  height="120px"
                />
              </div>
            </template>
            <button
              class="btn btn-primary btn-block mt-4 mb-3 w-25 mx-auto"
              type="submit"
              :disabled="isProcessing"
            >
              <h5 class="m-0">Update</h5>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from "./../utils/helpers";

export default {
  props: {
    initialUser: {
      type: Object,
      default: () => {
        return {
          id: "",
          name: "",
          password: "",
          indroduction: "",
          avatar: "",
          gender: "",
          grade: "",
          bankaccount: "",
        };
      },
    },
    isProcessing: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      user: {
        ...this.initialUser,
      },
    };
  },
  methods: {
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.user.avatar = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.avatar = imageURL;
      }
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-update", formData);
    },
  },
  watch: {
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
      };
    },
  },
};
</script>