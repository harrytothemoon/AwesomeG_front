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
    <div class="row mt-4">
      <div class="col-12 col-sm-3 col-lg-2 m-0">
        <Spinner v-if="subjectisLoading" />
        <FilterBar
          v-else
          :subjects="subjects"
          @after-filter="handleAfterFilter"
        />
      </div>
      <div id="teacherquestioncard" class="col-6 col-sm-5 col-lg-6">
        <div
          class="bg-primary p-3 overflow-auto"
          style="border-radius: 0px; border: 6px inset #b6b8ba; height: 650px"
          v-viewer
        >
          <h1 class="text-center">Questions</h1>
          <Spinner v-if="questionsisLoading" />
          <div
            v-else
            v-for="question in fiteredQuestion"
            :key="question.id"
            class="card border-primary text-primary p-2 m-1 d-flex justify-content-center mx-auto"
            style="
              max-width: 450px;
              max-height: 215px;
              background-color: #fffbf0;
            "
          >
            <div class="d-flex justify-content-center align-items-center row">
              <div
                class="col-12 col-md-5 d-flex justify-content-center align-items-center my-auto"
              >
                <img
                  v-if="question.image"
                  class="rounded"
                  :src="question.image"
                  alt="Card image cap"
                  width="150px"
                  height="150px"
                  style="cursor: zoom-in"
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
              <div class="col-12 col-md-7">
                <h5 style="color: #c03546">{{ question.Subject.name }}</h5>
                <span style="color: gray">{{ question.Scope.name }}</span>
                <p class="m-0 pr-2" style="max-height: 80px">
                  {{ question.description | ellipsis }}
                </p>
                <div class="text-right mr-2">
                  <span class="m-0" style="color: #4f86c6"
                    >{{ question.createdAt | fromNow }}.</span
                  >
                </div>
              </div>
            </div>
            <div class="text-center mt-2">
              <button
                @click="setVisibility(question.id)"
                type="button"
                class="btn btn-secondary text-center pb-0"
                style="background-color: #c03546"
                data-toggle="modal"
                data-target="#questionD"
              >
                <h4>Solve !</h4>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="teacherquestionwork" class="col-6 col-sm-4 col-lg-4">
        <div
          class="bg-primary p-3 overflow-auto"
          style="border-radius: 0px; border: 6px inset #b6b8ba; height: 650px"
        >
          <h1 class="text-center">Your Work</h1>
          <Spinner v-if="workisLoading" />
          <div
            v-else
            v-for="answer in showWorkAnswer"
            :key="answer.id"
            class="card border-primary text-primary p-2 m-1"
            style="
              max-width: 350px;
              max-height: 170px;
              background-color: #fffbf0;
            "
          >
            <div class="d-flex flex-column">
              <h4 style="color: #c03546">{{ answer.Question.Subject.name }}</h4>
              <span style="color: gray">{{ answer.Question.Scope.name }}</span>
              <p class="mb-0" style="max-height: 60px">
                {{ answer.Question.description | ellipsis }}
              </p>
              <p class="mt-2 mb-0 text-right" style="color: #4f86c6">
                <span style="color: black">Taken :</span>
                {{ answer.createdAt | fromNow }}
              </p>
              <div class="d-flex justify-content-center align-items-center">
                <button
                  @click="clickUpload(answer.Question.id)"
                  type="button"
                  class="btn btn-secondary text-center pb-0"
                  data-toggle="modal"
                  data-target="#answerUpload"
                  style="background-color: #c03546"
                >
                  <h6 class="m-0">Upload</h6>
                </button>
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
import Spinner from "./../components/Spinner";
import PostAnswerM from "./../components/PostAnswerM";
import { Filter } from "./../utils/mixins";
import questionsAPI from "./../apis/questions";
import subjectsAPI from "./../apis/subjects";
import answersAPI from "./../apis/answers";
import { Toast } from "./../utils/helpers";
import store from "./../store";
import $ from "jquery";

export default {
  name: "teacherQuestion",
  mixins: [Filter],
  components: {
    NavTabs,
    FilterBar,
    QestionDetailM,
    PostAnswerM,
    Spinner,
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
      subjectisLoading: true,
      questionsisLoading: true,
      workisLoading: true,
    };
  },
  created() {
    this.fetchQuestions();
    this.fetchSubjects();
    this.fetchAnswers();
  },
  sockets: {
    postQuestions: function () {
      this.fetchQuestions();
    },
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await questionsAPI.getTeacherQuestions();
        this.questions = response.data.questions;
        this.questionsisLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get question data, please try again later",
        });
        this.questionsisLoading = false;
      }
    },
    async fetchSubjects() {
      try {
        const response = await subjectsAPI.getSubjects();
        this.subjects = response.data.subjects;
        this.subjectisLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get subject data, please try again later",
        });
        this.subjectisLoading = false;
      }
    },
    async fetchAnswers() {
      try {
        const response = await answersAPI.getAnswers();
        this.answers = response.data.answers;
        this.workisLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get answer data, please try again later",
        });
        this.workisLoading = false;
      }
    },

    setVisibility(id) {
      this.targetId = id;
    },
    clickUpload(id) {
      this.uploadId = id;
    },
    //TODO change to async/await
    handleAfterSubmitPost(questionId, UserId) {
      this.isProcessing = true;
      answersAPI
        .postAnswer({ questionId: questionId })
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
            //socket通知
            this.$socket.emit(
              "postAnswers",
              store.state.currentUser.id,
              UserId
            );
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
    async handleAfterSubmitPut(formData, UserId) {
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
          //socket通知
          this.$socket.emit("putAnswers", store.state.currentUser.id, UserId);
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
@media (max-width: 370px) {
  #teacherquestioncard img {
    width: 50px;
    height: 50px;
  }
  #teacherquestioncard p {
    font-size: 0.6rem;
    height: 60px;
    text-align: justify;
  }
  #teacherquestioncard h1 {
    font-size: 1.2rem;
  }
  #teacherquestioncard h6,
  #teacherquestioncard h5,
  #teacherquestioncard h4 {
    font-size: 0.7rem;
  }
  #teacherquestioncard {
    font-size: 0.5rem;
  }
  #teacherquestionwork h1 {
    font-size: 1.2rem;
  }
  #teacherquestionwork p {
    font-size: 0.6rem;
  }
  #teacherquestionwork h1 {
    font-size: 1.2rem;
  }
  #teacherquestionwork {
    font-size: 0.5rem;
  }
}
@media (min-width: 370px) {
  #teacherquestioncard img {
    width: 50px;
    height: 50px;
  }
  #teacherquestioncard p {
    font-size: 0.6rem;
    height: 60px;
    text-align: justify;
  }
  #teacherquestioncard h1 {
    font-size: 1.2rem;
  }
  #teacherquestioncard h6,
  #teacherquestioncard h5,
  #teacherquestioncard h4 {
    font-size: 0.7rem;
  }
  #teacherquestioncard {
    font-size: 0.5rem;
  }
  #teacherquestionwork h1 {
    font-size: 1.2rem;
  }
  #teacherquestionwork p {
    font-size: 0.6rem;
  }
  #teacherquestionwork {
    font-size: 0rem;
  }
}
@media (min-width: 570px) {
  #teacherquestioncard img {
    width: 60px;
    height: 60px;
  }
  #teacherquestioncard p {
    font-size: 0.6rem;
    height: 60px;
    text-align: justify;
  }
  #teacherquestioncard h1 {
    font-size: 1.2rem;
  }
  #teacherquestioncard h6,
  #teacherquestioncard h5,
  #teacherquestioncard h4 {
    font-size: 0.7rem;
  }
  #teacherquestioncard {
    font-size: 0.5rem;
  }
  #teacherquestionwork h1 {
    font-size: 1.2rem;
  }
  #teacherquestionwork p {
    font-size: 0.6rem;
  }
  #teacherquestionwork {
    font-size: 0.5rem;
  }
}
@media (min-width: 760px) {
  #teacherquestioncard img {
    width: 75px;
    height: 75px;
  }
  #teacherquestioncard p {
    font-size: 0.6rem;
    height: 60px;
    text-align: justify;
  }
  #teacherquestioncard h1 {
    font-size: 1.5rem;
  }
  #teacherquestioncard h5,
  #teacherquestioncard h6,
  #teacherquestioncard h4 {
    font-size: 1rem;
  }
  #teacherquestioncard {
    font-size: 0.5rem;
  }
  #teacherquestionwork h1 {
    font-size: 1.5rem;
  }
  #teacherquestionwork p {
    font-size: 0.6rem;
  }
  #teacherquestionwork {
    font-size: 0.5rem;
  }
}
@media (min-width: 990px) {
  #teacherquestioncard img {
    width: 130px;
    height: 130px;
  }
  #teacherquestioncard p {
    font-size: 1rem;
    height: 60px;
    text-align: justify;
  }
  #teacherquestioncard h1 {
    font-size: 2.5rem;
  }
  #teacherquestioncard span {
    font-size: 0.8rem;
  }
  #teacherquestioncard h5,
  #teacherquestioncard h6,
  #teacherquestioncard h4 {
    font-size: 1.5rem;
  }
  #teacherquestionwork h1 {
    font-size: 2.5rem;
  }
  #teacherquestionwork span {
    font-size: 0.7rem;
  }
  #teacherquestionwork p {
    font-size: 0.7rem;
  }
}
</style>