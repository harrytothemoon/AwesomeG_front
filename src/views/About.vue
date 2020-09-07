<template>
  <div class="container text-center py-5">
    <div class="d-flex justify-content-center mt-2">
      <NavTabs />
    </div>
    <div class="mt-5">
      <h1 class="mb-0 display-4">W e l c o m e !</h1>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
export default {
  components: {
    NavTabs,
  },
};
</script>