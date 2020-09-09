<template>
  <div class="container py-4">
    <div class="d-flex justify-content-center mt-2">
      <NavTabs />
    </div>
    <div class="row">
      <div class="col-3">
        <FilterBar :subjects="subjects" />
      </div>
      <div class="col-5">
        <div
          class="bg-primary p-2 overflow-auto"
          style="border-radius: 0px; border:6px inset #b6b8ba; height:650px"
        >
          <h1 class="text-center">Questions</h1>
          <div
            v-for="question in questions"
            :key="question.id"
            class="card border-primary text-primary p-2 m-1"
            style="max-width: 450px; height: 215px; background-color: #fffbf0"
          >
            <div class="d-flex align-items-center row w-100">
              <div class="col-5">
                <img
                  class="rounded"
                  :src="question.image"
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
                type="button"
                class="btn btn-secondary text-center pb-0"
                style="background-color:#c03546"
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
            v-for="answer in answers"
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
              <p style="height:60px">{{answer.Question.description | ellipsis}}</p>
              <h6 class="text-right" style="color:#4F86C6">
                <span style="color:black">Case is taken :</span>
                {{answer.createdAt | fromNow}}
              </h6>
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
import moment from "moment";
const dummyData1 = {
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
const dummyData2 = {
  questions: [
    {
      id: 1,
      description:
        "Sequi odio minus qui. Perferendis dicta fugiat voluptas sit et. Excepturi unde reprehenderit consequatur.",
      image:
        "https://loremflickr.com/320/240/question/?lock=26.667716872704084",
      UserId: 13,
      SubjectId: 2,
      ScopeId: 2,
      StatusId: 1,
      AnswerId: null,
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
      Subject: {
        id: 2,
        name: "Physical",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Scope: {
        id: 2,
        name: "primary school 2nd",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Status: {
        id: 1,
        name: "wait for teacher ...",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
    },
    {
      id: 2,
      description:
        "Consequatur ad velit incidunt eius. Nulla id qui aliquam autem sunt quaerat ipsam. Ad repellat labore. Est nisi rem enim.",
      image:
        "https://loremflickr.com/320/240/question/?lock=43.627739661444465",
      UserId: 12,
      SubjectId: 1,
      ScopeId: 4,
      StatusId: 1,
      AnswerId: null,
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
      Subject: {
        id: 1,
        name: "Math",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Scope: {
        id: 4,
        name: "primary school 4th",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Status: {
        id: 1,
        name: "wait for teacher ...",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
    },
    {
      id: 3,
      description: "nisi",
      image: "https://loremflickr.com/320/240/question/?lock=86.3827434347628",
      UserId: 13,
      SubjectId: 2,
      ScopeId: 3,
      StatusId: 1,
      AnswerId: null,
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
      Subject: {
        id: 2,
        name: "Physical",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Scope: {
        id: 3,
        name: "primary school 3rd",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Status: {
        id: 1,
        name: "wait for teacher ...",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
    },
    {
      id: 4,
      description:
        "Aut facilis consequatur alias velit. Maxime consequuntur facere at. Est officiis consectetur quos asperiores. Dolor qui itaque aperiam nemo culpa consectetur ut.",
      image: "https://loremflickr.com/320/240/question/?lock=40.08937818432135",
      UserId: 10,
      SubjectId: 3,
      ScopeId: 2,
      StatusId: 1,
      AnswerId: null,
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
      Subject: {
        id: 3,
        name: "Chemical",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Scope: {
        id: 2,
        name: "primary school 2nd",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
      Status: {
        id: 1,
        name: "wait for teacher ...",
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
      Status: {
        id: 1,
        name: "wait for teacher ...",
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
      },
    },
  ],
};
const dummyData3 = {
  answers: [
    {
      id: 1,
      answer: "postman first solve test",
      image: "https://i.imgur.com/eZv9Bya.jpeg",
      UserId: 1,
      QuestionId: 5,
      createdAt: "2020-09-05T15:26:38.000Z",
      updatedAt: "2020-09-05T15:27:11.000Z",
      Question: {
        id: 5,
        description:
          "Voluptatibus in dolor dolor minus sequi aliquam quidem omnis. Odio perferendis laudantium rerum quia quod. Non voluptas reprehenderit molestias consectetur autem et atque aut est. Voluptates sunt sequi totam.\n \rQuaerat id ea id error. Ea eum possimus. Sunt dignissimos in. Quasi voluptas cum et. Consequatur sit omnis omnis eligendi.\n \rDeserunt nesciunt aspernatur sed totam. Sed fugiat at eum illo. Dicta et praesentium nihil est. Voluptates quidem rerum optio dicta incidunt nulla dolor veniam.",
        image:
          "https://loremflickr.com/320/240/question/?lock=50.938774552393994",
        UserId: 14,
        SubjectId: 2,
        ScopeId: 1,
        StatusId: 3,
        AnswerId: null,
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:27:11.000Z",
        Subject: {
          id: 2,
          name: "Physical",
          createdAt: "2020-09-05T15:12:13.000Z",
          updatedAt: "2020-09-05T15:12:13.000Z",
        },
        Scope: {
          id: 1,
          name: "primary school 1st",
          createdAt: "2020-09-05T15:12:13.000Z",
          updatedAt: "2020-09-05T15:12:13.000Z",
        },
      },
    },
    {
      id: 4,
      answer: "",
      image: "",
      UserId: 1,
      QuestionId: 4,
      createdAt: "2020-09-05T17:26:38.000Z",
      updatedAt: "2020-09-05T17:26:38.000Z",
      Question: {
        id: 4,
        description:
          "Aut facilis consequatur alias velit. Maxime consequuntur facere at. Est officiis consectetur quos asperiores. Dolor qui itaque aperiam nemo culpa consectetur ut.",
        image:
          "https://loremflickr.com/320/240/question/?lock=40.08937818432135",
        UserId: 10,
        SubjectId: 3,
        ScopeId: 2,
        StatusId: 1,
        AnswerId: null,
        createdAt: "2020-09-05T15:12:13.000Z",
        updatedAt: "2020-09-05T15:12:13.000Z",
        Subject: {
          id: 3,
          name: "Chemical",
          createdAt: "2020-09-05T15:12:13.000Z",
          updatedAt: "2020-09-05T15:12:13.000Z",
        },
        Scope: {
          id: 2,
          name: "primary school 2nd",
          createdAt: "2020-09-05T15:12:13.000Z",
          updatedAt: "2020-09-05T15:12:13.000Z",
        },
      },
    },
  ],
};
export default {
  name: "teacher question",
  components: {
    NavTabs,
    FilterBar,
  },
  data() {
    return {
      subjects: [],
      questions: [],
      answers: [],
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    fetchFeeds() {
      this.subjects = dummyData1.subjects;
      this.questions = dummyData2.questions;
      this.answers = dummyData3.answers;
    },
  },
  filters: {
    fromNow(datetime) {
      if (!datetime) {
        return "-";
      }
      // 使用 moment 提供的 fromNow 方法
      return moment(datetime).fromNow();
    },
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 80) {
        return value.slice(0, 80) + " ...";
      }
      return value;
    },
  },
};
</script>

<style>
</style>