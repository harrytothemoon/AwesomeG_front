<template>
  <div class="container py-5 text-primary" style="max-width:950px">
    <ProductM @after-submit="handleAfterSubmit" />
    <ul class="nav nav-tabs mt-1 mb-4 d-flex justify-content-center">
      <li class="nav-item w-25" style="cursor:pointer">
        <router-link :to="{name: 'user', params: {id: user.id}}" class="nav-link text-center">
          <h4>My Information</h4>
        </router-link>
      </li>
      <li class="nav-item w-25" style="cursor:pointer">
        <router-link :to="{name: 'orders', params: {id: user.id}}" class="nav-link text-center">
          <h4>My Orders</h4>
        </router-link>
      </li>
    </ul>

    <div class="row">
      <div class="col-3 mt-1 d-flex justify-content-start align-items-center">
        <img
          class="rounded-circle"
          :src="user.avatar"
          alt="Card image cap"
          width="200px"
          height="200px"
        />
      </div>
      <div class="col-4 mt-1 d-flex flex-column align-items-start justify-content-center">
        <h2>
          Role :
          <span>{{user.role}}</span>
        </h2>
        <h1 class="display-4" style="color:black">{{user.name}}</h1>
      </div>
      <div
        v-if="user.role === 'teacher'"
        class="col-5 pr-5 mt-1 d-flex flex-column align-items-end justify-content-center"
      >
        <h2>Solved Problems</h2>
        <h1 class="display-4" style="color:#c03546">{{answers}}</h1>
      </div>
      <div v-else class="col-5 pr-5 mt-1 d-flex flex-column align-items-end justify-content-center">
        <h2>Asked Problems</h2>
        <h1 class="display-4" style="color:#c03546">{{questions}}</h1>
      </div>
    </div>

    <div class="card d-flex flex-row row border-0 mt-5" style="background-color:#fffbf0">
      <div class="col-6 m-2">
        <h3>Gender</h3>
        <h5>{{user.gender}}</h5>
        <h3>Email</h3>
        <h5>{{user.email}}</h5>
        <h3>Password</h3>
        <h5>{{user.password}}</h5>
        <template v-if="user.role === 'teacher'">
          <h3>Bank Account</h3>
          <h5>{{user.bankaccount}}</h5>
        </template>
        <template v-else>
          <h3>Grade</h3>
          <h5>{{user.grade}}</h5>
        </template>
      </div>
      <div v-if="user.role === 'teacher'" class="col-5 m-2">
        <h3>About Me</h3>
        <div class="card rounded p-3" style="height:270px">
          <h5>{{user.introduction}}</h5>
        </div>
      </div>
      <div v-else class="col-5 m-2">
        <h3>Available Questions</h3>
        <h5>{{user.quantity}}</h5>
        <br />
        <button
          type="button"
          class="btn btn-success btn-lg ml-5"
          style="height:150px;max-width:350px"
          data-toggle="modal"
          data-target="#product"
        >
          <h1 class="m-0 display-3">Deposit !</h1>
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-4">
      <NavTabs />
    </div>
  </div>
</template>

<script>
import ProductM from "../components/ProductM";
import NavTabs from "../components/NavTabs";
const dummyData = {
  user: {
    id: 1,
    name: "Harry",
    email: "root@example.com",
    password: "$2a$10$6yKNPqJoqzE5wKtTrqPmrudymYafQAx.Uyu51oI/QwP/d0uE9tHCq",
    introduction: "I'm a math teacher.",
    role: "admin",
    avatar: "https://loremflickr.com/320/240/girl/?lock=20.382921098228923",
    gender: "male",
    quantity: 20,
    grade: "High School 3rd",
    bankaccount: "1000-2220-2213-2342",
    createdAt: "2020-09-05T15:12:12.000Z",
    updatedAt: "2020-09-05T16:22:25.000Z",
    Answers: [
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
          AnswerId: 1,
          createdAt: "2020-09-05T15:12:13.000Z",
          updatedAt: "2020-09-05T15:27:11.000Z",
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
          StatusId: 2,
          AnswerId: 4,
          createdAt: "2020-09-05T15:12:13.000Z",
          updatedAt: "2020-09-10T13:43:09.000Z",
        },
      },
    ],
    Questions: [
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
      },
    ],
  },
};

export default {
  name: "User",
  components: {
    ProductM,
    NavTabs,
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        email: "",
        password: "",
        introduction: "",
        role: "",
        avatar: "",
        gender: "",
        quantity: "",
        grade: "",
        bankaccount: "",
      },
      answers: "",
      questions: "",
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
  },
  methods: {
    fetchUser(userId) {
      console.log("fetchUser id: ", userId);

      this.user = {
        id: dummyData.user.id,
        name: dummyData.user.name,
        email: dummyData.user.email,
        password: dummyData.user.password,
        introduction: dummyData.user.introduction,
        role: dummyData.user.role,
        avatar: dummyData.user.avatar,
        gender: dummyData.user.gender,
        quantity: dummyData.user.quantity,
        grade: dummyData.user.grade,
        bankaccount: dummyData.user.bankaccount,
      };
      this.answers = dummyData.user.Answers.length;
      this.questions = dummyData.user.Questions.length;
    },
    handleAfterSubmit(formData) {
      // TODO: 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
  },
};
</script>

<style>
h3 {
  color: #4f86c6;
}
</style>