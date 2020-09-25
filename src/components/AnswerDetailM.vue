<template>
  <div
    class="modal fade"
    id="answerD"
    tabindex="-1"
    role="dialog"
    aria-labelledby="answerDLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog text-primary text-center"
      role="document"
      style="max-width: 650px"
    >
      <div class="modal-content" style="background-color: #fffbf0">
        <div class="d-flex justify-content-end">
          <button
            type="button"
            class="close m-0 mr-3 mt-3"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mt-2">
          <div class="card mb-3 border-0">
            <img
              v-if="getQuestion.Answer.image"
              class="card-img-top"
              :src="getQuestion.Answer.image"
              alt="Card image cap"
              height="350px"
              style="cursor: zoom-in"
              v-viewer
            />
            <img
              v-else
              class="card-img-top"
              src="https://image.damanwoo.com/files/media/c/h/r/o/m/e/d/i/n/o/chrome_dino_set-2.jpg"
              alt="Card image cap"
              height="350px"
            />
            <div class="card-body">
              <h4 class="card-title mb-0 text-center" style="color: #c03546">
                Answer
              </h4>
              <p class="card-text">{{ getQuestion.Answer.answer }}</p>
            </div>
          </div>
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
          Answer: {
            answer: null,
            image: null,
          },
        };
      },
    },
  },
  data() {
    return {
      questionId: this.getQuestion.id ? this.getQuestion.id : "",
    };
  },
};
</script>