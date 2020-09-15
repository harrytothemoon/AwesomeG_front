<template>
  <div class="container py-4">
    <div class="d-flex justify-content-center mt-2">
      <QestionDetailM
        :getQuestion="getQuestion"
        :isProcessing="isProcessing"
        @after-submit="handleAfterSubmitPost"
      />
      <PostAnswerM
        :uploadAnswer="uploadAnswer"
        :isProcessing="isProcessing"
        @after-submit="handleAfterSubmitPut"
      />
      <NavTabs />
    </div>
    <div class="row">
      <div class="col-3">
        <FilterBar :subjects="subjects" @after-filter="handleAfterFilter" />
      </div>
      <div class="col-5">
        <div
          class="bg-primary p-2 overflow-auto"
          style="border-radius: 0px; border:6px inset #b6b8ba; height:650px"
        >
          <h1 class="text-center">Questions</h1>
          <div
            v-for="question in fiteredQuestion"
            :key="question.id"
            class="card border-primary text-primary p-2 m-1"
            style="max-width: 450px; height: 215px; background-color: #fffbf0"
          >
            <div class="d-flex align-items-center row w-100">
              <div class="col-5">
                <img
                  v-if="question.image"
                  class="rounded"
                  :src="question.image"
                  alt="Card image cap"
                  width="150px"
                  height="150px"
                />
                <img
                  v-else
                  class="rounded"
                  src="https://image.damanwoo.com/files/media/c/h/r/o/m/e/d/i/n/o/chrome_dino_set-2.jpg"
                  alt="Card image cap"
                  width="150px"
                  height="150px"
                />
              </div>
              <div class="col-7">
                <h5 style="color:#c03546">
                  {{question.Subject.name}}
                  <span
                    style="font-size:14px;color:gray"
                  >{{question.Scope.name}}</span>
                </h5>
                <p class="mb-1" style="height:75px">{{question.description | ellipsis}}</p>
                <h6
                  class="text-right m-0"
                  style="color:#4F86C6; font-size:14px"
                >{{question.createdAt | fromNow}}.</h6>
              </div>
            </div>
            <div class="text-center">
              <button
                @click="setVisibility(question.id)"
                type="button"
                class="btn btn-secondary text-center pb-0"
                style="background-color:#c03546"
                data-toggle="modal"
                data-target="#questionD"
              >
                <h4>Solve !</h4>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div
          class="bg-primary p-2 overflow-auto"
          style="border-radius: 0px; border:6px inset #b6b8ba; height:650px"
        >
          <h1 class="text-center">Your Work</h1>
          <div
            v-for="answer in showWorkAnswer"
            :key="answer.id"
            class="card border-primary text-primary p-2 m-1"
            style="max-width: 350px;height: 150px;background-color:#fffbf0"
          >
            <div class="d-flex flex-column">
              <h4 style="color:#c03546">
                {{answer.Question.Subject.name}}
                <span
                  style="font-size:14px;color:gray"
                >{{answer.Question.Scope.name}}</span>
              </h4>
              <p class="mb-0" style="height:60px">{{answer.Question.description | ellipsis}}</p>
              <div class="d-flex justify-content-between align-items-center">
                <button
                  @click="clickUpload(answer.Question.id)"
                  type="button"
                  class="btn btn-secondary text-center pb-0 ml-2"
                  data-toggle="modal"
                  data-target="#answerUpload"
                  style="background-color:#c03546"
                >
                  <h6 class="m-0">Upload</h6>
                </button>
                <small class="d-inline text-right m-2" style="color:#4F86C6">
                  <span style="color:black">Case is taken :</span>
                  {{answer.createdAt | fromNow}}
                </small>
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
import FilterBar from "./../components/FilterBar";
import QestionDetailM from "./../components/QestionDetailM";
import PostAnswerM from "./../components/PostAnswerM";
import { Filter } from "./../utils/mixins";
import questionsAPI from "./../apis/questions";
import subjectsAPI from "./../apis/subjects";
import answersAPI from "./../apis/answers";
import { Toast } from "./../utils/helpers";
import $ from "jquery";

export default {
  name: "teacherQuestion",
  mixins: [Filter],
  components: {
    NavTabs,
    FilterBar,
    QestionDetailM,
    PostAnswerM,
  },
  data() {
    return {
      subjects: [],
      questions: [],
      answers: [],
      targetId: "",
      uploadId: "",
      subjectId: 0,
      isProcessing: false,
    };
  },
  created() {
    this.fetchQuestions();
    this.fetchSubjects();
    this.fetchAnswers();
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await questionsAPI.getTeacherQuestions();
        this.questions = response.data.questions;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get question data, please try again later",
        });
      }
    },
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
    async fetchAnswers() {
      try {
        const response = await answersAPI.getAnswers();
        this.answers = response.data.answers;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get answer data, please try again later",
        });
      }
    },

    setVisibility(id) {
      this.targetId = id;
    },
    clickUpload(id) {
      this.uploadId = id;
    },
    //TODO change to async/await
    handleAfterSubmitPost(data) {
      this.isProcessing = true;
      answersAPI
        .postAnswer({ questionId: data })
        .then((response) => {
          if (response.data.status === "success") {
            this.isProcessing = false;
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
            this.fetchQuestions();
            this.fetchAnswers();
            $("#questionD").modal("hide");
          } else if (response.data.status !== "success") {
            this.isProcessing = false;
            throw new Error(response.data.message);
          }
        })
        .catch(() => {
          this.isProcessing = false;
          Toast.fire({
            icon: "error",
            title: "Can't not post question, please try again later",
          });
        });
    },
    async handleAfterSubmitPut(formData) {
      try {
        this.isProcessing = true;
        const { data } = await answersAPI.putAnswer.create({ formData });
        if (data.status === "success") {
          this.isProcessing = false;
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          this.fetchAnswers();
          $("#answerUpload").modal("hide");
        }
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can't not post question, please try again later",
        });
      }
    },
    handleAfterFilter(subjectId) {
      this.subjectId = subjectId;
    },
  },
  computed: {
    getQuestion() {
      return this.questions.filter(
        (question) => Number(question.id) === Number(this.targetId)
      )[0];
    },
    uploadAnswer() {
      return this.answers.filter(
        (answer) => Number(answer.Question.id) === Number(this.uploadId)
      )[0];
    },
    showWorkAnswer() {
      return this.answers.filter(
        (answer) => Number(answer.Question.StatusId) === 2
      );
    },
    fiteredQuestion() {
      if (this.subjectId) {
        return this.questions.filter(
          (question) => question.SubjectId === this.subjectId
        );
      } else {
        return this.questions;
      }
    },
  },
};
</script>

<style>
</style>