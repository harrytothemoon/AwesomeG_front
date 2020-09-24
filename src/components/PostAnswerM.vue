<template>
  <div
    class="modal fade"
    id="answerUpload"
    tabindex="-1"
    role="dialog"
    aria-labelledby="answerUploadLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog text-primary text-center" role="document" style="max-width:650px">
      <div id="postanswer" class="modal-content" style="background-color:#fffbf0">
        <div class="d-flex justify-content-end">
          <button type="button" class="close m-0 mr-3 mt-3" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mt-2">
          <div class="card border-0 row d-flex flex-row align-items-center">
            <div class="rounded col-6">
              <img
                v-if="uploadAnswer.Question.image"
                class="rounded"
                :src="uploadAnswer.Question.image"
                alt="Card image cap"
              />
              <img
                v-else
                class="rounded"
                src="https://image.damanwoo.com/files/media/c/h/r/o/m/e/d/i/n/o/chrome_dino_set-2.jpg"
                alt="Card image cap"
              />
            </div>
            <div class="card-body d-flex flex-column align-items-start col-6 flex-wrap">
              <h4
                class="card-title mb-0"
                style="color:#c03546"
              >{{uploadAnswer.Question.Subject.name}}</h4>
              <p class="text-mute mb-3">{{uploadAnswer.Question.Scope.name}}</p>
              <p class="card-text">{{uploadAnswer.Question.description}}</p>
            </div>
          </div>
          <form class="w-100" @submit.prevent.stop="handleSubmit">
            <input name="questionId" type="hidden" :value="uploadAnswer.Question.id" />
            <div class="row mt-4">
              <div class="form-group col-6">
                <textarea
                  class="form-control"
                  id="answer"
                  rows="8"
                  placeholder="Please describe your answer..."
                  name="answer"
                  v-model="answer"
                ></textarea>
              </div>

              <div class="form-group col-6">
                <label for="image">
                  <h4>Answer's Image</h4>
                </label>
                <input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  class="form-control-file"
                  @change="handleFileChange"
                  style="cursor:pointer"
                />
                <img
                  v-if="image"
                  :src="image"
                  class="d-block img-thumbnail mb-3"
                  width="120px"
                  height="120px"
                />
              </div>
            </div>
            <button
              :disabled="isProcessing"
              class="btn btn-primary btn-block mb-3 w-25 mx-auto"
              type="submit"
              style="background-color:#c03546"
            >
              <h4 class="m-0 text-center">Solve it !</h4>
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
    uploadAnswer: {
      type: Object,
      default: () => {
        return {
          id: null,
          answer: null,
          image: null,
          Question: {
            id: null,
            description: null,
            image: null,
            StatusId: null,
            UserId: null,
            Subject: {
              name: null,
            },
            Scope: {
              name: null,
            },
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
      answer: "",
      image: "",
    };
  },
  methods: {
    handleFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.image = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.image = imageURL;
      }
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-submit", formData, this.uploadAnswer.Question.UserId);
      this.answer = "";
    },
  },
};
</script>

<style >
@media (min-width: 370px) {
  #postanswer img {
    width: 150px;
    height: 150px;
  }
  #postanswer p {
    font-size: 0.8rem;
    max-width: 140px;
  }
  #postanswer h4 {
    font-size: 0.8rem;
  }
}
@media (min-width: 570px) {
  #postanswer img {
    width: 180px;
    height: 180px;
  }
  #postanswer p {
    font-size: 0.9rem;
    max-width: 240px;
  }
  #postanswer h4 {
    font-size: 1.2rem;
  }
}
@media (min-width: 760px) {
  #postanswer img {
    width: 200px;
    height: 200px;
  }
  #postanswer p {
    font-size: 0.9rem;
    max-width: 280px;
  }
  #postanswer h4 {
    font-size: 1.5rem;
  }
}
</style>