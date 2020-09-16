<template>
  <div class="container text-center py-5">
    <div class="d-flex justify-content-center mt-2">
      <NavTabs />
    </div>
    <div class="mt-5">
      <div class="card bg-dark text-white border-0">
        <img
          class="card-img"
          src="https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1667&q=80"
          alt="Card image"
          style="filter: blur(1px)"
        />
        <div class="card-img-overlay">
          <h5 class="card-title display-4">W e l c o m e !</h5>
          <h6
            class="card-text mt-4"
            style="letter-spacing:2px"
          >This is an online Q & A platform about mathematics, physics and chemistry.</h6>
          <br />
          <div class="text-left w-75 mx-auto">
            <h4 class="card-text mt-4 ml-5" style="letter-spacing:2px">
              What is
              <span style="color:#F6B352">Awesome G ?</span>
            </h4>
            <h6 class="card-text mt-3 ml-5" style="letter-spacing:1.5px ;line-height: 2">
              " Awesome G " means awesome logic.
              <br />We hope to help students who have problems in mathematics, physics and chemistry all over the world through this website.
              <br />After getting the answer, hope you will say
              <span
                style="color:#F6B352"
              >" Awesome Logic ! ".</span>
            </h6>
            <h4 class="card-text mt-5 ml-5" style="letter-spacing:2px">
              Who is the
              <span style="color:#F6B352">founder</span> of the website ?
            </h4>
            <div class="row mt-2">
              <div class="col-3 ml-4">
                <img
                  class="rounded ml-5 my-4"
                  src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                  alt="Card image cap"
                  width="150px"
                  height="150px"
                />
              </div>
              <div class="col-6 ml-3 my-5">
                <h6 style="letter-spacing:1.5px">
                  Name :
                  <span style="color:#F6B352">Harry</span>
                </h6>
                <h6 style="letter-spacing:1.5px">Title : Website Founder</h6>
                <h6 style="letter-spacing:1.5px">Interests : Ask the great question.</h6>
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