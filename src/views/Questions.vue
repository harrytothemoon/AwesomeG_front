<template>
  <div class="container py-4">
    <div class="d-flex justify-content-center mt-2">
      <NavTabs />
    </div>
    <div class="row">
      <div class="col-3">
        <FilterBar :subjects="subjects" />
      </div>
      <div class="col-5">
        <div
          class="bg-primary p-2"
          style="border-radius: 0px; border:6px inset #b6b8ba; height:650px"
        >
          <h1 class="text-center">Questions</h1>
          <div
            class="card border-primary text-primary p-2"
            style="max-width: 450px; height: 215px; background-color: #fffbf0"
          >
            <div class="d-flex align-items-center row">
              <div class="col-5">
                <img
                  class="rounded"
                  src="https://i.imgur.com/Z2Y73FUb.jpg"
                  alt="Card image cap"
                  width="150px"
                  height="150px"
                />
              </div>
              <div class="col-7">
                <h3 style="color:#c03546">
                  Math
                  <span style="font-size:16px">10th</span>
                </h3>
                <p
                  class="mb-1"
                >This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <h5 class="text-right m-0" style="color:#4F86C6; font-size:16px">2 minutes ago.</h5>
              </div>
            </div>
            <div class="text-center">
              <button
                type="button"
                class="btn btn-secondary text-center pb-0"
                style="background-color:#c03546"
              >
                <h4>Solve !</h4>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div
          class="bg-primary p-2"
          style="border-radius: 0px; border:6px inset #b6b8ba; height:650px"
        >
          <h1 class="text-center">Your Work</h1>
          <div
            class="card border-primary mb-3 text-primary p-2"
            style="max-width: 350px;height: 170px;background-color:#fffbf0"
          >
            <div class="d-flex flex-column">
              <h3 style="color:#c03546">
                Math
                <span style="font-size:16px">10th</span>
              </h3>
              <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
              <h5 class="text-right" style="color:#4F86C6">2 minutes ago.</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import FilterBar from "./../components/FilterBar";
const dummyData2 = {
  subjects: [
    {
      id: 1,
      name: "Math",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 2,
      name: "Physical",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 3,
      name: "Chemical",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
  ],
};
export default {
  components: {
    NavTabs,
    FilterBar,
  },
  data() {
    return {
      subjects: [],
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    fetchFeeds() {
      this.subjects = dummyData2.subjects;
    },
  },
};
</script>

<style>
</style>