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
          <!-- is user is login -->
          <router-link
            :to="{name: 'user', params: {id: currentUser.id}}"
            class="text-white mr-1 p-0 nav-link"
          >
            <h6 class="m-0">
              Hello, {{currentUser.name || 'Guest'}} !
              <img
                v-if="currentUser.image"
                class="rounded-circle ml-2"
                :src="currentUser.image"
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
  },
};
</script>