<template>
  <div class="container py-5">
    <h1 class="mt-5">Teachers</h1>
    <div class="d-flex justify-content-center mt-5">
      <NavTabs />
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