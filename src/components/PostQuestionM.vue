<template>
  <div
    class="modal fade"
    id="postQ"
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
        <h1 class="modal-title" id="postQLabel" style="color:#c03546">Ask your question</h1>
        <div class="modal-body mt-2">
          <form class="w-100" @submit.prevent.stop="handleSubmit">
            <div class="form-group">
              <label for="exampleSelect1">
                <h4>Subject</h4>
              </label>
              <select
                class="form-control w-75 mx-auto"
                id="exampleSelect1"
                required
                name="subject"
                v-model="subject"
                style="cursor:pointer"
              >
                <option value selected disabled>Please Choose</option>
                <option v-for="subject in subjects" :key="subject.id">{{subject.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleSelect1">
                <h4>Scope</h4>
              </label>
              <select
                class="form-control w-75 mx-auto"
                id="exampleSelect1"
                required
                name="scope"
                v-model="scope"
                style="cursor:pointer"
              >
                <option value selected disabled>Please Choose</option>
                <option v-for="scope in scopes" :key="scope.id">{{scope.name}}</option>
              </select>
            </div>
            <div class="row mt-5">
              <div class="form-group col-6">
                <textarea
                  class="form-control"
                  id="exampleTextarea"
                  rows="7"
                  placeholder="Please describe your question..."
                  name="description"
                  v-model="description"
                ></textarea>
              </div>

              <div class="form-group col-6">
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
            <button class="btn btn-primary btn-block mb-3 w-25 mx-auto" type="submit">
              <h4 class="m-0">Submit</h4>
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
    subjects: {
      type: Array,
      required: true,
    },
    scopes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      subject: "",
      scope: "",
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