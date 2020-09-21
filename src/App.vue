<template>
  <div id="app" @click="closeNotifyBox">
    <Navbar :notifyShow="notifyShow" @showbox="openNotifyBox" />
    <SignInM />
    <SignUpM />
    <main role="main" class="mt-5">
      <Spinner v-if="isLoading" />
      <router-view v-else />
      <h6 class="mt-5 mb-3 text-secondary text-center">Awesome G &copy; 2020</h6>
    </main>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Navbar from "./components/Navbar";
import SignInM from "./components/SignInM";
import SignUpM from "./components/SignUpM";
import Spinner from "./components/Spinner";
export default {
  data() {
    return {
      notifyShow: false,
      isLoading: false,
    };
  },
  components: {
    Navbar,
    SignInM,
    SignUpM,
    Spinner,
  },
  methods: {
    closeNotifyBox() {
      this.notifyShow = false;
    },
    openNotifyBox() {
      this.notifyShow = !this.notifyShow;
    },
  },
  created() {
    this.isLoading = true;
  },
  mounted() {
    this.isLoading = false;
  },
};
</script>

<style>
#app {
  background-image: url("https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60");
  background-size: 50vw;
  color: azure;
  height: 1000px;
}
</style>
