<template>
  <div class="container py-5">
    <div class="d-flex justify-content-center mt-2">
      <PostQuestionM :subjects="subjects" :scopes="scopes" @after-submit="handleAfterSubmit" />
      <NavTabs />
    </div>
    <div class="d-flex flex-column justify-content-center mt-5">
      <!-- navtag -->
      <ul class="nav nav-tabs">
        <li class="nav-item w-50" style="cursor:pointer">
          <a
            class="nav-link text-center"
            @click="setVisibility('unSolved')"
            :class="{active:visibility === 'unSolved'}"
          >
            <h3>My Questions</h3>
          </a>
        </li>
        <li class="nav-item w-50" style="cursor:pointer">
          <a
            class="nav-link text-center"
            @click="setVisibility('Solved')"
            :class="{active:visibility === 'Solved'}"
          >
            <h3>Solved Questions</h3>
          </a>
        </li>
      </ul>
      <div
        class="jumbotron bg-primary pt-1 overflow-auto"
        style="border-radius: 0px; border:6px inset #b6b8ba;height:650px"
      >
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
          class="card border-primary mt-3 text-primary"
          style="max-width: 80vw;height: 15vw;background-color:#fffbf0"
        >
          <div class="card-body row p-0 pl-2 pr-2">
            <div class="left-side d-flex align-items-center col-6 border-right">
              <div class="row w-100">
                <div class="col-5 mt-1">
                  <img
                    class="rounded"
                    :src="question.image"
                    alt="Card image cap"
                    width="180px"
                    height="180px"
                  />
                </div>
                <div class="col-7">
                  <h3 style="color:#c03546">
                    {{question.Subject.name}}
                    <span
                      style="font-size:14px;color:gray"
                    >{{question.Scope.name}}</span>
                  </h3>
                  <p style="height:80px">{{question.description | ellipsis}}</p>
                  <br />
                  <h6 class="text-right" style="color:#4F86C6">{{question.createdAt | fromNow}}.</h6>
                </div>
              </div>
            </div>
            <div class="right-side text-center col-6">
              <h3 class="border-bottom" style="color:#004e66">Status</h3>
              <div class="row">
                <div v-if="question.Answer.User.avatar" class="col-3 mt-2 ml-4">
                  <img
                    class="rounded-circle"
                    :src="question.Answer.User.avatar"
                    alt="Card image cap"
                    width="100px"
                    height="100px"
                  />
                </div>
                <div v-else class="col-3 mt-2 ml-4">
                  <img
                    class="rounded-circle"
                    src="https://i.imgflip.com/213ss9.jpg"
                    alt="Card image cap"
                    width="100px"
                    height="100px"
                  />
                </div>
                <div v-if="question.Answer.User.name" class="col-8">
                  <h4 class="text-left">{{question.Answer.User.name}}</h4>
                  <h1 style="color:#c03546">{{question.Status.name}}</h1>
                </div>
                <div v-else class="col-8">
                  <br />
                  <h1 class="mt-2" style="color:#c03546">{{question.Status.name}}</h1>
                </div>
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
import PostQuestionM from "./../components/PostQuestionM";
import { Filter } from "./../utils/mixins";
const dummyData1 = {
  questions: [
    {
      id: 6,
      description: "This is postman first test.",
      image: "https://i.imgur.com/ndwUsWvb.jpg",
      UserId: 1,
      SubjectId: 3,
      ScopeId: 8,
      StatusId: 2,
      AnswerId: 2,
      createdAt: "2020-09-05T15:17:54.000Z",
      updatedAt: "2020-09-05T15:17:54.000Z",
      Status: {
        id: 2,
        name: "working on it !",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Answer: {
        id: 2,
        answer: "",
        image: "",
        UserId: 4,
        QuestionId: 6,
        createdAt: "2020-09-05T15:26:38.000Z",
        updatedAt: "2020-09-05T15:27:11.000Z",
        User: {
          id: 4,
          name: "Yvonne King",
          email: "user2@example.com",
          password:
            "$2a$10$zSKk9Rc4Wm2t9zwLESl4X.rmxpGW2gadfEdSpVH40M4NLVmyZohN.",
          introduction: null,
          role: "teacher",
          avatar:
            "https://loremflickr.com/320/240/people/?lock=12.575275831175459",
          gender: null,
          quantity: null,
          grade: null,
          bankaccount: null,
          createdAt: "2020-09-05T15:12:13.000Z",
          updatedAt: "2020-09-05T15:12:13.000Z",
        },
      },
      Subject: {
        id: 3,
        name: "Chemical",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Scope: {
        id: 8,
        name: "middle school 2nd",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
    },
    {
      id: 7,
      description: "This is postman second test.",
      image: "https://i.imgur.com/VXEzRi4.png",
      UserId: 1,
      SubjectId: 2,
      ScopeId: 10,
      StatusId: 3,
      AnswerId: 3,
      createdAt: "2020-09-05T16:22:36.000Z",
      updatedAt: "2020-09-05T16:22:36.000Z",
      Status: {
        id: 3,
        name: "done",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Answer: {
        id: 3,
        answer: "postman solve test",
        image: "https://i.imgur.com/eZv9Bya.jpeg",
        UserId: 5,
        QuestionId: 7,
        createdAt: "2020-09-05T15:26:38.000Z",
        updatedAt: "2020-09-05T15:27:11.000Z",
        User: {
          id: 5,
          name: "Orlando Steuber PhD",
          email: "user3@example.com",
          password:
            "$2a$10$M89tguOMO1fSNoSqUWki3uyGeUIBmR14cY2./jZU57kptqJSLeD2S",
          introduction: null,
          role: "teacher",
          avatar:
            "https://loremflickr.com/320/240/people/?lock=98.62510707357808",
          gender: null,
          quantity: null,
          grade: null,
          bankaccount: null,
          createdAt: "2020-09-05T15:12:13.000Z",
          updatedAt: "2020-09-05T15:12:13.000Z",
        },
      },
      Subject: {
        id: 2,
        name: "Physical",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Scope: {
        id: 10,
        name: "high school 1st",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
    },
    {
      id: 8,
      description: "This is postman third test.",
      image: "https://i.imgur.com/zZlGXCDb.jpg",
      UserId: 1,
      SubjectId: 1,
      ScopeId: 12,
      StatusId: 1,
      AnswerId: null,
      createdAt: "2020-09-05T16:22:36.000Z",
      updatedAt: "2020-09-05T16:22:36.000Z",
      Status: {
        id: 1,
        name: "wait for teacher ...",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Answer: {
        id: null,
        answer: null,
        image: null,
        UserId: null,
        QuestionId: null,
        createdAt: null,
        updatedAt: null,
        User: {
          id: null,
          name: null,
          email: null,
          password: null,
          introduction: null,
          role: null,
          avatar: null,
          gender: null,
          quantity: null,
          grade: null,
          bankaccount: null,
          createdAt: null,
          updatedAt: null,
        },
      },
      Subject: {
        id: 1,
        name: "Math",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Scope: {
        id: 12,
        name: "high school 3rd",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
    },
  ],
};
const dummyData2 = {
  subjects: [
    {
      id: 1,
      name: "Math",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 2,
      name: "Physical",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 3,
      name: "Chemical",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
  ],
};
const dummyData3 = {
  scopes: [
    {
      id: 1,
      name: "primary school 1st",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 2,
      name: "primary school 2nd",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 3,
      name: "primary school 3rd",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 4,
      name: "primary school 4th",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 5,
      name: "primary school 5th",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 6,
      name: "primary school 6th",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 7,
      name: "middle school 1st",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 8,
      name: "middle school 2nd",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 9,
      name: "middle school 3rd",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 10,
      name: "high school 1st",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 11,
      name: "high school 2nd",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 12,
      name: "high school 3rd",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 13,
      name: "university or others",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
  ],
};
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
  },
  data() {
    return {
      questions: [],
      subjects: [],
      scopes: [],
      visibility: "unSolved",
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    fetchFeeds() {
      this.questions = dummyData1.questions;
      this.subjects = dummyData2.subjects;
      this.scopes = dummyData3.scopes;
    },
    handleAfterSubmit(formData) {
      // TODO: 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
    setVisibility(visibility) {
      console.log(visibility);
      this.visibility = visibility;
    },
  },
  computed: {
    filteredQuestions() {
      return filters[this.visibility](this.questions);
    },
  },
};
</script>

<style>
</style>