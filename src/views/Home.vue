<template>
  <div class="container py-5">
    <div class="d-flex justify-content-center mt-2">
      <NavTabs />
    </div>
    <div class="d-flex justify-content-center mt-5 flex-wrap">
      <div class="card bg-dark border-0 rounded" style="max-width:550px;max-height:500px;" id="ask">
        <router-link to="/student/questions">
          <img
            src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&h=700&q=60"
            class="card-img"
            alt="#"
            height="100%"
            style="filter: blur(1px)"
          />
          <div
            class="card-img-overlay d-flex flex-column justify-content-center align-items-center"
          >
            <h3 class="card-text display-3 text-center" style="color:#353866">I'm a student</h3>
            <br />
            <h1 class="card-text display-4" style="color:#353866">Ask</h1>
            <br />
            <h4 class="card-text">Math / Chemical / Physical</h4>
          </div>
        </router-link>
      </div>
      <div
        class="card bg-dark border-0 rounded"
        style="max-width:550px;max-height:500px"
        id="solve"
      >
        <router-link to="/teacher/questions">
          <img
            src="https://images.unsplash.com/photo-1532007271951-c487760934ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&h=700&q=60"
            class="card-img"
            alt="#"
            style="height:100%;filter: blur(1px)"
            id="img1"
          />
          <div
            class="card-img-overlay d-flex flex-column justify-content-center align-items-center"
          >
            <h3 class="card-text display-3 text-center" style="color:#F6B352">I'm a teacher</h3>
            <br />
            <h1 class="card-text display-4" style="color:#F6B352">Solve</h1>
            <br />
            <h4 class="card-text" style="color:azure">Math / Chemical / Physical</h4>
          </div>
        </router-link>
      </div>
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

<style>
#ask,
#solve {
  max-width: 1000px;
  max-height: 500px;
  overflow: hidden;
  margin: 0 auto;
}

#ask img,
#solve img {
  width: 100%;
  transition: 0.2s all ease-in-out;
}
#ask:hover img,
#solve:hover img {
  transform: scale(1.3);
}
</style>