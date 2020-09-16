<template>
  <div class="container py-5">
    <div class="d-flex justify-content-center mt-2">
      <NavTabs />
    </div>
    <div class="d-flex flex-column justify-content-center align-items-center">
      <ul class="mt-5 nav nav-tabs w-75">
        <li class="nav-item w-50">
          <a class="nav-link active text-center" data-toggle="tab" href="#student">
            <h4>About the Student</h4>
          </a>
        </li>
        <li class="nav-item w-50">
          <a class="nav-link text-center" data-toggle="tab" href="#teacher">
            <h4>About the Teacher</h4>
          </a>
        </li>
      </ul>
      <div class="rounded pb-5 pt-4" style="background-color:#202020 ;width:1000px">
        <div id="myTabContent" class="tab-content text-light w-75 rounded-bottom mx-auto">
          <div class="tab-pane fade active show text-center" id="student">
            <h2 class="mt-2 text-left" style="color:#F6B352">Q1: How do I start asking questions ?</h2>
            <h5
              class="my-4 text-left"
            >If you have an available balance in your account, please follow the instructions below.</h5>
            <img class="mb-5" src="../../public/Q&A2.png" alt="Q&A" width="750px" />
            <h2 class="mt-3 text-left" style="color:#F6B352">Q2: How do I buy credits ?</h2>
            <h5 class="my-4 text-left">Please follow the instructions below.</h5>
            <img src="../../public/Q&A1.png" alt="Q&A" width="750px" />
          </div>
          <div class="tab-pane fade text-center" id="teacher">
            <h2 class="mt-2 text-left" style="color:#F6B352">Q1: How do I answer the question ?</h2>
            <h5 class="my-4 text-left">Please follow the instructions below.</h5>
            <img src="../../public/Q&A3.png" alt="Q&A" width="750px" />
          </div>
        </div>
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