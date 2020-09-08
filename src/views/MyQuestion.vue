<template>
  <div class="container py-5">
    <div class="d-flex justify-content-center mt-2">
      <NavTabs />
    </div>
    <div class="d-flex flex-column justify-content-center mt-5">
      <!-- navtag -->
      <ul class="nav nav-tabs">
        <li class="nav-item w-50">
          <router-link class="nav-link text-center" data-toggle="tab" to="#myquestions">
            <h3>My Questions</h3>
          </router-link>
        </li>
        <li class="nav-item w-50">
          <router-link class="nav-link text-center" data-toggle="tab" to="#solvedquestions">
            <h3>Solved Questions</h3>
          </router-link>
        </li>
      </ul>
      <!-- <div id="myTabContent" class="tab-content">
        <div class="tab-pane fade active show" id="home">
          <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
        </div>
        <div class="tab-pane fade" id="profile">
          <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
        </div>
      </div>-->
      <!-- card -->
      <div class="jumbotron bg-primary" style="border-radius: 0px; border:6px inset #b6b8ba">
        <div
          class="card border-primary mb-3 text-primary"
          style="max-width: 80vw;height: 15vw;background-color:#fffbf0"
        >
          <div class="card-body row p-0 pl-2 pr-2">
            <div class="left-side d-flex align-items-center col-6 border-right">
              <div class="row">
                <div class="col-5">
                  <img
                    class="rounded"
                    src="https://i.imgur.com/Z2Y73FUb.jpg"
                    alt="Card image cap"
                    width="180px"
                    height="180px"
                  />
                </div>
                <div class="col-7">
                  <h3 style="color:#c03546">
                    Math
                    <span style="font-size:16px">10th</span>
                  </h3>
                  <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                  <br />
                  <h5 class="text-right" style="color:#4F86C6">2 minutes ago.</h5>
                </div>
              </div>
            </div>
            <div class="right-side text-center col-6">
              <h1 class="border-bottom">Status</h1>
              <div class="row">
                <div class="col-3 mt-2 ml-4">
                  <img
                    class="rounded-circle"
                    src="https://i.imgur.com/r9XLQNIb.jpg"
                    alt="Card image cap"
                    width="100px"
                    height="100px"
                  />
                </div>
                <div class="col-8">
                  <h4 class="text-left">Ｍr. Harry</h4>
                  <h1 style="color:#c03546">Working on it !</h1>
                </div>
              </div>
            </div>
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

<style>
</style>