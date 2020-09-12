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
          <form class="w-100" v-show="!isLoading" @submit.prevent.stop="handleSubmit">
            <div class="form-group">
              <label for="subject">
                <h4>Subject</h4>
              </label>
              <select
                class="form-control w-75 mx-auto"
                id="subject"
                required
                name="subjectId"
                style="cursor:pointer"
              >
                <option value selected disabled>Please Choose</option>
                <option
                  v-for="subject in subjects"
                  :key="subject.id"
                  :value="subject.id"
                >{{subject.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="scope">
                <h4>Scope</h4>
              </label>
              <select
                class="form-control w-75 mx-auto"
                id="scope"
                required
                name="scopeId"
                style="cursor:pointer"
              >
                <option value selected disabled>Please Choose</option>
                <option v-for="scope in scopes" :key="scope.id" :value="scope.id">{{scope.name}}</option>
              </select>
            </div>
            <div class="row mt-4">
              <div class="form-group col-6">
                <label for="description">
                  <h4>Question's Description</h4>
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="7"
                  placeholder="Please describe your question..."
                  name="description"
                  v-model="description"
                ></textarea>
              </div>

              <div class="form-group col-6">
                <label for="image">
                  <h4>Question's Image</h4>
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
              style="background-color:#c03546"
            >
              <h4 class="m-0">Submit</h4>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subjectsAPI from "./../apis/subjects";
import scopesAPI from "./../apis/scopes";
import { Toast } from "./../utils/helpers";
export default {
  data() {
    return {
      subjects: [],
      scopes: [],
      subject: "",
      scope: "",
      description: "",
      image: "",
      isLoading: true,
    };
  },
  created() {
    this.fetchScopes();
    this.fetchSubjects();
  },
  methods: {
    async fetchSubjects() {
      try {
        const response = await subjectsAPI.getSubjects();
        this.subjects = response.data.subjects;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get subject data, please try again later",
        });
      }
    },
    async fetchScopes() {
      try {
        const response = await scopesAPI.getScopes();
        this.scopes = response.data.scopes;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "warning",
          title: "Can't not get Scope data, please try again later",
        });
      }
    },
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