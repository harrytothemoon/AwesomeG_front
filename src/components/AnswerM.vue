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
      <div class="modal-content" style="background-color:#fffbf0">
        <div class="d-flex justify-content-end">
          <button type="button" class="close m-0 mr-3 mt-3" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mt-2">
          <div class="card mb-3 border-0 d-flex flex-row rounded">
            <img
              class="rounded"
              :src="uploadAnswer.Question.image"
              alt="Card image cap"
              height="200px"
              width="300px"
            />
            <div class="card-body">
              <h4
                class="card-title mb-0"
                style="color:#c03546"
              >{{uploadAnswer.Question.Subject.name}}</h4>
              <small class="text-mute mb-3">{{uploadAnswer.Question.Scope.name}}</small>
              <p class="card-text">{{uploadAnswer.Question.description}}</p>
            </div>
          </div>
          <form class="w-100" @submit.prevent.stop="handleSubmit">
            <input name="questionId" type="hidden" :value="uploadAnswer.Question.id" />
            <div class="row mt-4">
              <div class="form-group col-6">
                <textarea
                  class="form-control"
                  id="description"
                  rows="8"
                  placeholder="Please describe your answer..."
                  name="description"
                  v-model="description"
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
              class="btn btn-primary btn-block mb-3 w-25 mx-auto"
              type="submit"
              style="background-color:#3b8686"
            >
              <h4 class="m-0">Solve it !</h4>
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
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      description: "",
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
      this.$emit("after-submit", formData);
    },
  },
};
</script>