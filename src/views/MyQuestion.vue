<template>
  <div class="container py-4">
    <div class="d-flex justify-content-center mt-2">
      <PostQuestionM :isProcessing="isProcessing" @after-submit="handleAfterSubmit" />
      <AnswerDetailM :getQuestion="getQuestion" />
      <NavTabs />
    </div>
    <div class="d-flex flex-column justify-content-center mt-4">
      <!-- navtag -->
      <ul class="nav nav-tabs">
        <li class="nav-item w-50" style="cursor:pointer">
          <a
            class="nav-link text-center"
            @click="setVisibility('unSolved')"
            :class="{active:visibility === 'unSolved'}"
          >
            <h3>UnSolved</h3>
          </a>
        </li>
        <li class="nav-item w-50" style="cursor:pointer">
          <a
            class="nav-link text-center"
            @click="setVisibility('Solved')"
            :class="{active:visibility === 'Solved'}"
          >
            <h3>Solved</h3>
          </a>
        </li>
      </ul>
      <div
        class="jumbotron bg-primary pt-1 overflow-auto"
        style="border-radius: 0px; border:6px inset #b6b8ba;height:650px"
      >
        <Spinner v-if="isLoading" />
        <template v-else>
          <div class="text-center mt-2">
            <button
              type="button"
              class="btn btn-info btn-lg"
              data-toggle="modal"
              data-target="#postQ"
            >
              <h2 class="m-0">+ Ask more</h2>
            </button>
          </div>
          <div
            v-for="question in filteredQuestions"
            :key="question.id"
            class="card border-primary mt-3 text-primary mx-auto"
            style="max-width: 80vw;background-color:#fffbf0"
          >
            <div id="myquestioncard" class="card-body row p-2">
              <div class="left-side d-flex align-items-center text-center col-6 border-right">
                <div class="row w-100 m-0 d-flex align-items-center">
                  <div class="col-12 col-sm-5 col-md-4 mt-1">
                    <img
                      v-if="question.image"
                      class="rounded"
                      :src="question.image"
                      alt="Card image cap"
                      width="180px"
                      height="180px"
                    />
                    <img
                      v-else
                      class="rounded"
                      src="https://image.damanwoo.com/files/media/c/h/r/o/m/e/d/i/n/o/chrome_dino_set-2.jpg"
                      alt="Card image cap"
                      width="180px"
                      height="180px"
                    />
                  </div>
                  <div class="col-12 col-sm-7 col-md-8">
                    <h3 class="mb-0" style="color:#c03546">{{question.Subject.name}}</h3>
                    <span style="color:gray">{{question.Scope.name}}</span>
                    <p style="max-height:80px">{{question.description | ellipsis}}</p>
                    <h6 style="color:#4F86C6">{{question.createdAt | fromNow}}.</h6>
                  </div>
                </div>
              </div>
              <div class="right-side text-center col-6">
                <h3 class="border-bottom mb-0" style="color:#004e66">Status</h3>
                <div class="row">
                  <div class="col-12 col-md-4 my-2">
                    <img
                      v-if="question.Answer.User.avatar"
                      class="rounded-circle"
                      :src="question.Answer.User.avatar"
                      alt="Card image cap"
                      width="100px"
                      height="100px"
                    />
                    <img
                      v-else
                      class="rounded-circle"
                      src="https://i.imgflip.com/213ss9.jpg"
                      alt="Card image cap"
                      width="100px"
                      height="100px"
                    />
                  </div>
                  <div
                    v-if="question.StatusId === 2"
                    class="col-12 col-md-8 d-flex flex-column align-items-center justify-content-center"
                  >
                    <h4 class="text-left">{{question.Answer.User.name}}</h4>
                    <h2 style="color:#c03546">{{question.Status.name}}</h2>
                  </div>
                  <div
                    v-else-if="question.StatusId === 3 ||question.StatusId === 4"
                    class="col-12 col-md-8 d-flex flex-column align-items-center justify-content-center"
                  >
                    <h4 class="text-left">{{question.Answer.User.name}}</h4>
                    <h2 style="color:#c03546">{{question.Status.name}}</h2>
                    <button
                      @click="showAnswerDetail(question.id)"
                      type="button"
                      class="btn btn-primary text-center pb-0"
                      data-toggle="modal"
                      data-target="#answerD"
                    >
                      <h4>Review Answer</h4>
                    </button>
                  </div>
                  <div
                    v-else
                    class="col-12 col-md-8 d-flex flex-column align-items-center justify-content-center"
                  >
                    <h2 style="color:#c03546">{{question.Status.name}}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import PostQuestionM from "./../components/PostQuestionM";
import AnswerDetailM from "./../components/AnswerDetailM";
import Spinner from "./../components/Spinner";
import { Filter } from "./../utils/mixins";
import questionsAPI from "./../apis/questions";
import { Toast } from "./../utils/helpers";
import $ from "jquery";
import store from "./../store";

const filters = {
  unSolved: (questions) =>
    questions.filter(
      (question) => question.StatusId === 1 || question.StatusId === 2
    ),
  Solved: (questions) =>
    questions.filter(
      (question) => question.StatusId === 3 || question.StatusId === 4
    ),
};
export default {
  mixins: [Filter],
  components: {
    NavTabs,
    PostQuestionM,
    AnswerDetailM,
    Spinner,
  },
  data() {
    return {
      questions: [],
      visibility: "unSolved",
      targetId: "",
      isProcessing: false,
      isLoading: true,
    };
  },
  created() {
    this.fetchQuestions();
  },
  sockets: {
    postAnswers: function () {
      this.fetchQuestions();
    },
    putAnswers: function () {
      this.fetchQuestions();
    },
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await questionsAPI.getStudentQuestions();
        this.questions = response.data.questions;
        this.isLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get questions data, please try again later",
        });
        this.isLoading = false;
      }
    },
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        const { data } = await questionsAPI.postQuestion.create({ formData });
        if (data.status === "success") {
          this.isProcessing = false;
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          this.fetchQuestions();
          $("#postQ").modal("hide");
          //socket通知
          this.$socket.emit(
            "postQuestions",
            store.state.currentUser.id,
            store.state.currentUser.role,
            store.state.currentUser.name,
            store.state.currentUser.avatar,
            Date.now()
          );
        } else if (data.status === "warning") {
          this.isProcessing = false;
          Toast.fire({
            icon: "warning",
            title: data.message,
          });
          $("#postQ").modal("hide");
          this.$router.push(`/users/${store.state.currentUser.id}`);
        }
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can't not post question, please try again later",
        });
      }
    },
    setVisibility(visibility) {
      this.visibility = visibility;
    },
    showAnswerDetail(id) {
      this.targetId = id;
    },
  },
  computed: {
    filteredQuestions() {
      return filters[this.visibility](this.questions);
    },
    getQuestion() {
      return this.questions.filter(
        (question) => Number(question.id) === Number(this.targetId)
      )[0];
    },
  },
};
</script>

<style>
@media (max-width: 370px) {
  #myquestioncard img {
    width: 50px;
    height: 50px;
  }
  #myquestioncard h3,
  #myquestioncard h2,
  #myquestioncard h4 {
    font-size: 0.7rem;
  }
  #myquestioncard {
    font-size: 0.5rem;
  }
}
@media (min-width: 370px) {
  #myquestioncard img {
    width: 50px;
    height: 50px;
  }
  #myquestioncard h3,
  #myquestioncard h2,
  #myquestioncard h4 {
    font-size: 0.7rem;
  }
  #myquestioncard p,
  #myquestioncard span {
    font-size: 0.5rem;
  }
}
@media (min-width: 570px) {
  #myquestioncard img {
    width: 70px;
    height: 70px;
  }
  #myquestioncard h3,
  #myquestioncard h2,
  #myquestioncard h4 {
    font-size: 1rem;
  }
  #myquestioncard p,
  #myquestioncard span,
  #myquestioncard h6 {
    font-size: 0.6rem;
  }
}
@media (min-width: 760px) {
  #myquestioncard img {
    width: 80px;
    height: 80px;
  }
  #myquestioncard h3,
  #myquestioncard h2,
  #myquestioncard h4 {
    font-size: 1rem;
  }
  #myquestioncard p,
  #myquestioncard span,
  #myquestioncard h6 {
    font-size: 0.7rem;
  }
}
@media (min-width: 990px) {
  #myquestioncard img {
    width: 100px;
    height: 100px;
  }
  #myquestioncard h3,
  #myquestioncard h2,
  #myquestioncard h4 {
    font-size: 1.3rem;
  }
  #myquestioncard p,
  #myquestioncard span,
  #myquestioncard h6 {
    font-size: 0.9rem;
  }
}
@media (min-width: 1100px) {
  #myquestioncard img {
    width: 120px;
    height: 120px;
  }
  #myquestioncard h3,
  #myquestioncard h2,
  #myquestioncard h4 {
    font-size: 1.4rem;
  }
  #myquestioncard p,
  #myquestioncard span,
  #myquestioncard h6 {
    font-size: 1rem;
  }
}
</style>