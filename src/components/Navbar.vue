<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary border-0">
    <router-link class="navbar-brand" to="/">Awesome G</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is admin -->
        <router-link
          v-if="currentUser.role === 'admin'"
          to="#"
          class="nav-link text-white mr-3 border-bottom border-dark"
        >
          <h6 class="m-0">Back Ground</h6>
        </router-link>
        <template v-if="isAuthenticated">
          <!-- is user is login -->
          <router-link to="#" class="text-white mr-3 nav-link">
            <h6 class="m-0">Hello, {{currentUser.name || '訪客'}} !</h6>
          </router-link>
          <button type="button" class="btn btn-sm btn-secondary my-2 my-sm-0">
            <h6 class="m-0">Sign out</h6>
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
/* eslint-disable */
const dummyUser = {
  currentUser: {
    id: 1,
    name: "Harry",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    role: "admin",
  },
  isAuthenticated: true,
};
export default {
  // Vue 會在沒有資料時使用此預設值
  data() {
    return {
      currentUser: {
        id: -1,
        name: "",
        email: "",
        image: "",
        role: "",
      },
      isAuthenticated: false,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser,
      };
      this.isAuthenticated = dummyUser.isAuthenticated;
    },
  },
};
</script>