<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary border-0">
    <router-link class="navbar-brand" to="/">Awesome G</router-link>
    <div>
      <template v-if="isAuthenticated">
        <button @click="logout" type="button" class="btn btn-sm btn-secondary my-2 my-sm-0 ml-4">
          <h6 class="m-0">Sign out</h6>
        </button>
      </template>
      <template v-else>
        <button
          type="button"
          class="btn btn-sm btn-secondary my-2 my-sm-0 ml-4 mr-2"
          data-toggle="modal"
          data-target="#signin"
        >
          <h6 class="m-0">Sign in</h6>
        </button>
        <button
          type="button"
          class="btn btn-sm btn-secondary my-2 my-sm-0"
          data-toggle="modal"
          data-target="#signup"
        >
          <h6 class="m-0">Sign up</h6>
        </button>
      </template>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarColor02"
      aria-controls="navbarColor02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarColor02" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is admin -->
        <router-link v-if="currentUser.role === 'admin'" to="#" class="nav-link text-white mr-1">
          <button type="button" class="btn btn-sm btn-secondary my-2 my-sm-0">
            <h6 class="m-0">Back Ground</h6>
          </button>
        </router-link>

        <template v-if="isAuthenticated">
          <div class="mr-2" style="position: relative">
            <button @click.stop="openNotifyBox" class="btn btn-primary m-0 p-0">
              <img style="cursor:pointer" src="../assets/icons/bell.png" width="30px" height="30px" />
              <span
                class="badge badge-pill badge-danger p-0"
                id="notify-badge"
                style="border-radius:100%;width:14px;height:14px;position: absolute;top:1px;right:1px"
              >2</span>
            </button>
            <div
              @click.stop
              v-show="notifyShow"
              class="card border-primary mb-3 text-primary border-0"
              style="width:300px;position:absolute;right:10px; background-color:#fffbf0;box-shadow:3px 3px 3px #292823;"
            >
              <div class="card-body overflow-auto p-1 pr-2" style="max-height:500px;">
                <div class="list-group">
                  <a href="#" class="list-group-item list-group-item-action d-flex">
                    <div class="col-4 d-flex align-items-center justify-content-center">
                      <img
                        class="rounded-circle"
                        width="60px"
                        height="60px"
                        src="https://i.imgur.com/H37kxPH.jpg"
                      />
                    </div>
                    <div class="col-8">
                      <h6>Harry post a new question!</h6>
                      <h6 class="text-muted">a few minute age</h6>
                    </div>
                  </a>
                  <a href="#" class="list-group-item list-group-item-action d-flex">
                    <div class="col-4 d-flex align-items-center justify-content-center">
                      <img
                        class="rounded-circle"
                        width="60px"
                        height="60px"
                        src="https://i.imgur.com/H37kxPH.jpg"
                      />
                    </div>
                    <div class="col-8">
                      <h6>Harry post a new question!</h6>
                      <h6 class="text-muted">a few minute age</h6>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- is user is login -->
          <router-link
            :to="{name: 'user', params: {id: currentUser.id}}"
            class="text-white mr-1 p-0 nav-link"
          >
            <h6 class="m-0">
              {{currentUser.name}}
              <img
                v-if="currentUser.avatar"
                class="rounded-circle ml-2"
                :src="currentUser.avatar"
                alt="Card image cap"
                width="40px"
                height="40px"
              />
              <img
                v-else
                class="rounded-circle ml-2"
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Card image cap"
                width="40px"
                height="40px"
              />
            </h6>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
export default {
  props: {
    notifyShow: {
      type: Boolean,
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/home");
      Toast.fire({
        icon: "success",
        title: "Sign out successfully!",
      });
    },
    openNotifyBox() {
      this.$emit("showbox");
    },
  },
  watch: {
    notifyShow(newValue) {
      this.notifyShow = newValue;
    },
  },
};
</script>