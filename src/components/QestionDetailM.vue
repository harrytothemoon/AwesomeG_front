<template>
  <div
    class="modal fade"
    id="questionD"
    tabindex="-1"
    role="dialog"
    aria-labelledby="postQLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog text-primary text-center" role="document" style="max-width:650px">
      <div class="modal-content" style="background-color:#fffbf0">
        <div class="d-flex justify-content-end">
          <button type="button" class="close m-0 mr-3 mt-3" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mt-2">
          <div class="card mb-3 border-0">
            <img
              v-if="getQuestion.image"
              class="card-img-top"
              :src="getQuestion.image"
              alt="Card image cap"
              height="350px"
            />
            <img
              v-else
              class="card-img-top"
              src="https://image.damanwoo.com/files/media/c/h/r/o/m/e/d/i/n/o/chrome_dino_set-2.jpg"
              alt="Card image cap"
              height="350px"
            />
            <div class="card-body">
              <h4 class="card-title mb-0" style="color:#c03546">{{getQuestion.Subject.name}}</h4>
              <small class="text-mute mb-3">{{getQuestion.Scope.name}}</small>
              <p class="card-text">{{getQuestion.description}}</p>
            </div>
          </div>
          <form class="w-100" @submit.prevent.stop="handleSubmit">
            <div class="row mt-4"></div>
            <button
              :disabled="isProcessing"
              class="btn btn-primary btn-block mb-3 w-25 mx-auto"
              type="submit"
              style="background-color:#c03546"
            >
              <h4 class="m-0">Get a Question!</h4>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    getQuestion: {
      type: Object,
      default: () => {
        return {
          id: null,
          description: null,
          UserId: null,
          StatusId: null,
          image: null,
          Subject: {
            name: null,
          },
          Scope: {
            name: null,
          },
        };
      },
    },
    isProcessing: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      questionId: this.getQuestion.id ? this.getQuestion.id : "",
    };
  },
  methods: {
    handleSubmit() {
      this.$emit(
        "after-submit",
        this.getQuestion.id,
        this.getQuestion.UserId,
        this.getQuestion.StatusId
      );
    },
  },
};
</script>