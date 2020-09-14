<template>
  <div class="container py-5 text-primary" style="max-width:950px">
    <ProductM :userId="userId" />
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
      <div class="col-3 pl-0 mt-1 d-flex justify-content-start align-items-center">
        <img
          v-if="user.avatar"
          class="rounded-circle"
          :src="user.avatar"
          alt="Card image cap"
          width="200px"
          height="200px"
        />
        <img
          v-else
          class="rounded-circle"
          src="https://www.kpsq.org/wp-content/uploads/2019/07/Community-hour-blank-face.jpg"
          alt="Card image cap"
          width="200px"
          height="200px"
        />
      </div>
      <div class="col-5 mt-1 d-flex flex-column align-items-start justify-content-center">
        <h2>
          Role :
          <span>{{user.role}}</span>
        </h2>
        <h1 class="display-4" style="color:black">{{user.name}}</h1>
      </div>
      <div
        v-if="user.role === 'teacher'"
        class="col-4 mt-1 d-flex flex-column align-items-end justify-content-center"
      >
        <h2>Solved Problems</h2>
        <h1 class="display-4" style="color:#c03546">{{answers}}</h1>
      </div>
      <div v-else class="col-4 mt-1 d-flex flex-column align-items-end justify-content-center">
        <h2>Asked Problems</h2>
        <h1 class="display-4" style="color:#c03546">{{questions}}</h1>
      </div>
    </div>

    <div class="card d-flex flex-row row border-0 mt-5" style="background-color:#fffbf0">
      <div class="col-6 m-2">
        <h3 style="color: #4f86c6">Gender</h3>
        <h5 v-if="user.gender">{{user.gender}}</h5>
        <br v-else />
        <h3 style="color: #4f86c6">Email</h3>
        <h5>{{user.email}}</h5>
        <h3 style="color: #4f86c6">Password</h3>
        <h5>{{user.password | filterPassword}}</h5>
        <template v-if="user.role === 'teacher'">
          <h3 style="color: #4f86c6">Bank Account</h3>
          <h5 v-if="user.bankaccount">{{user.bankaccount}}</h5>
          <br v-else />
        </template>
        <template v-else-if="user.role === 'student'">
          <h3 style="color: #4f86c6">Grade</h3>
          <h5 v-if="user.grade">{{user.grade}}</h5>
          <br v-else />
        </template>
      </div>
      <div v-if="user.role === 'teacher'" class="col-5 m-2">
        <h3 style="color: #4f86c6">About Me</h3>
        <div class="card rounded p-3" style="height:270px">
          <h5>{{user.introduction}}</h5>
        </div>
      </div>
      <div v-else-if="user.role === 'student'" class="col-5 m-2">
        <h3 style="color: #4f86c6">Available Balance</h3>
        <h5 v-if="user.quantity">{{user.quantity}}</h5>
        <h4 class="mb-0" v-else>0</h4>
        <br />
        <button
          type="button"
          class="btn btn-success btn-lg ml-5 mb-3"
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
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

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
      userId: "",
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
  },
  methods: {
    async fetchUser(userId) {
      try {
        const response = await usersAPI.getUser({ userId });
        if (response.status === "error") {
          throw new Error(response.message);
        }
        this.user = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          password: response.data.user.password,
          introduction: response.data.user.introduction,
          role: response.data.user.role,
          avatar: response.data.user.avatar,
          gender: response.data.user.gender,
          quantity: response.data.user.quantity,
          grade: response.data.user.grade,
          bankaccount: response.data.user.bankaccount,
        };
        this.answers = response.data.user.Answers.length;
        this.questions = response.data.user.Questions.length;
        this.userId = response.data.user.id;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get data, please try again later",
        });
      }
    },
  },
  filters: {
    filterPassword() {
      return "．．．．．．．．";
    },
  },
};
</script>