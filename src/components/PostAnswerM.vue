<template>
  <div
    class="modal fade"
    id="answerUpload"
    tabindex="-1"
    role="dialog"
    aria-labelledby="answerUploadLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog text-primary text-center"
      role="document"
      style="max-width: 650px"
    >
      <div
        id="postanswer"
        class="modal-content"
        style="background-color: #fffbf0"
      >
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
          <div class="card border-0 row d-flex flex-row align-items-center">
            <div class="questionpic rounded col-6">
              <img
                v-if="uploadAnswer.Question.image"
                class="rounded"
                :src="uploadAnswer.Question.image"
                alt="Card image cap"
                style="cursor: zoom-in"
                v-viewer
              />
              <img
                v-else
                class="rounded"
                src="https://image.damanwoo.com/files/media/c/h/r/o/m/e/d/i/n/o/chrome_dino_set-2.jpg"
                alt="Card image cap"
              />
            </div>
            <div
              class="card-body d-flex flex-column align-items-start col-6 flex-wrap"
            >
              <h4 class="card-title mb-0" style="color: #c03546">
                {{ uploadAnswer.Question.Subject.name }}
              </h4>
              <p class="text-mute mb-3">
                {{ uploadAnswer.Question.Scope.name }}
              </p>
              <p class="card-text">{{ uploadAnswer.Question.description }}</p>
            </div>
          </div>
          <form class="w-100" @submit.prevent.stop="handleSubmit">
            <input
              name="questionId"
              type="hidden"
              :value="uploadAnswer.Question.id"
            />
            <div class="row mt-4">
              <div class="form-group col-6">
                <h4>Answer's Description</h4>
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
                <h4>Answer's Image</h4>
                <div
                  class="img-upload-block btn btn-outline-secondary d-flex justify-content-center align-items-center"
                  style="border: 3px dashed"
                >
                  <input
                    id="img-file"
                    type="file"
                    name="image"
                    accept="image/*"
                    class="form-control-file"
                    @change="handleFileChange"
                    style="cursor: pointer"
                  />
                  <img
                    v-if="image"
                    :src="image"
                    id="custom-img"
                    class="d-block rounded"
                    style="cursor: pointer"
                  />
                  <img
                    v-else
                    src="../assets/upload3.png"
                    id="custom-img-default"
                    class="d-block"
                    width="70px"
                    height="70px"
                    style="cursor: pointer"
                  />
                </div>
              </div>
            </div>
            <button
              :disabled="isProcessing"
              class="btn btn-primary btn-block mb-3 w-25 mx-auto"
              type="submit"
              style="background-color: #c03546"
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
.img-upload-block {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
#img-file {
  position: absolute;
  top: 10;
  left: 0;
  opacity: 0;
  margin: 0;
  direction: rtl;
  font-size: 10px; /*make image file area large enough to click or set height and width*/
  height: 180px;
  cursor: pointer;
}
@media (min-width: 370px) {
  #postanswer .questionpic img {
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
  .img-upload-block {
    width: 140px;
    height: 170px;
    margin-top: 15px;
  }
  #custom-img {
    width: 100px;
    height: 100px;
  }
}
@media (min-width: 570px) {
  #postanswer .questionpic img {
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
  .img-upload-block {
    width: 230px;
    height: 190px;
  }
  #custom-img {
    width: 130px;
    height: 130px;
  }
}
@media (min-width: 760px) {
  #postanswer .questionpic img {
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
  .img-upload-block {
    width: 280px;
    height: 180px;
  }
  #custom-img {
    width: 160px;
    height: 150px;
  }
}
</style>