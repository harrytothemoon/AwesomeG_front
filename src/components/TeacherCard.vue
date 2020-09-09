<template>
  <div class="row overflow-auto" style="height:600px">
    <div v-for="teacher in teachers" :key="teacher.id" class="col-md-4 col-lg-4">
      <div class="card mb-3 text-center align-items-center" style="background-color:#fffbf0">
        <img
          class="rounded-circle mt-3"
          :src="teacher.avatar"
          alt="Card image cap"
          width="100px"
          height="100px"
        />
        <div class="card-body">
          <h5 class="card-text title-wrap" style="color:black">{{teacher.name}}</h5>
          <span class="badge badge-pill badge-secondary m-1" style="cursor:default">Math</span>
          <span class="badge badge-pill badge-info m-1" style="cursor:default">Chemical</span>
        </div>
        <div class="card-footer w-75" style="background-color:#fffbf0">
          <!-- <button type="button" class="btn btn-danger like mr-2">Unlike</button>
          <button type="button" class="btn btn-primary like mr-2">Like</button>-->
          <span class="badge badge-info" style="cursor:default; background-color:#c03546">
            <h5>Solved: {{teacher.Answers.length}}</h5>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teachers: {
      type: Array,
      required: true,
    },
  },
};
</script>