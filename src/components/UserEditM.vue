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
        <h1 class="modal-title" id="usereditLabel" style="color: #c03546">
          User Edit
        </h1>
        <div id="usereditbody" class="modal-body mt-2">
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
            <div v-if="user.role === 'teacher'" class="form-label-group mb-2">
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
              <fieldset class="form-group mt-3">
                <h5 class="text-center">Expertise</h5>
                <div class="form-check d-inline px-0">
                  <label class="form-check-label">
                    <input
                      v-model="user.expertise"
                      class="form-check-input"
                      type="radio"
                      name="expertise"
                      value="Math"
                    />
                    Math
                  </label>
                </div>
                <div class="form-check d-inline">
                  <label class="form-check-label">
                    <input
                      v-model="user.expertise"
                      class="form-check-input"
                      type="radio"
                      name="expertise"
                      value="Physical"
                    />
                    Physical
                  </label>
                </div>
                <div class="form-check d-inline">
                  <label class="form-check-label">
                    <input
                      v-model="user.expertise"
                      class="form-check-input"
                      type="radio"
                      name="expertise"
                      value="Chemical"
                    />
                    Chemical
                  </label>
                </div>
              </fieldset>
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
            <div v-if="user.role === 'teacher'" class="row">
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
                <h4>User's Avatar</h4>
                <div
                  class="avatar-upload-block btn btn-outline-secondary d-flex justify-content-center align-items-center"
                  style="border: 3px dashed"
                >
                  <input
                    id="avatar-file"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    class="form-control-file"
                    @change="handleFileChange"
                    style="cursor: pointer"
                  />
                  <img
                    v-if="user.avatar"
                    :src="user.avatar"
                    id="custom-avatar"
                    class="d-block rounded"
                    style="cursor: pointer"
                  />
                  <img
                    v-else
                    src="../assets/upload3.png"
                    id="custom-avatar-default"
                    class="d-block"
                    width="70px"
                    height="70px"
                    style="cursor: pointer"
                  />
                </div>
              </div>
            </div>
            <template v-else>
              <h5 class="my-3">User's Avatar</h5>
              <div
                class="mx-auto avatar-upload-block btn btn-outline-secondary d-flex justify-content-center align-items-center"
                style="border: 3px dashed"
              >
                <input
                  id="avatar-file"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  class="form-control-file"
                  @change="handleFileChange"
                  style="cursor: pointer"
                />
                <img
                  v-if="user.avatar"
                  :src="user.avatar"
                  id="custom-avatar"
                  class="d-block rounded"
                  style="cursor: pointer"
                />
                <img
                  v-else
                  src="../assets/upload3.png"
                  id="custom-avatar-default"
                  class="d-block"
                  width="70px"
                  height="70px"
                  style="cursor: pointer"
                />
              </div>
            </template>
            <button
              class="btn btn-primary btn-block mt-4 mb-3 w-25 mx-auto"
              type="submit"
              :disabled="isProcessing"
            >
              <h4 class="m-0">Update</h4>
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
          expertise: "",
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

<style>
.avatar-upload-block {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
#avatar-file {
  position: absolute;
  top: 10;
  left: 0;
  opacity: 0;
  margin: 0;
  direction: rtl;
  font-size: 10px; /*make image file area large enough to click or set height and width*/
  height: 180px;
  cursor: pointer;
}
@media (min-width: 370px) {
  #usereditbody h5 {
    font-size: 2rem;
  }
  .avatar-upload-block {
    width: 140px;
    height: 170px;
    margin-top: 15px;
  }
  #custom-avatar {
    width: 100px;
    height: 100px;
  }
  @media (min-width: 570px) {
    .avatar-upload-block {
      width: 220px;
      height: 190px;
    }
    #custom-avatar {
      width: 130px;
      height: 130px;
    }
  }
  @media (min-width: 760px) {
    .avatar-upload-block {
      width: 210px;
      height: 170px;
    }
    #custom-avatar {
      width: 130px;
      height: 120px;
    }
  }
}
</style>
