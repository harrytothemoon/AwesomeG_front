<template>
  <div class="container py-5 text-primary" style="max-width: 950px">
    <ProductM :userId="userId" />
    <UserEditM
      :isProcessing="isProcessing"
      :initialUser="user"
      @after-update="handleAfterUpdate"
    />
    <Spinner v-if="isLoading" />
    <template v-else>
      <ul class="nav nav-tabs mt-1 mb-4 d-flex justify-content-center">
        <li class="nav-item w-50" style="cursor: pointer">
          <router-link
            :to="{ name: 'user', params: { id: user.id } }"
            class="nav-link text-center"
          >
            <h4 id="userNav1">My Information</h4>
          </router-link>
        </li>
        <li
          v-if="user.role === 'student'"
          class="nav-item w-50"
          style="cursor: pointer"
        >
          <router-link
            :to="{ name: 'orders', params: { id: user.id } }"
            class="nav-link text-center"
          >
            <h4 id="userNav2">My Orders</h4>
          </router-link>
        </li>
      </ul>

      <div class="row">
        <div class="col-3 mt-1 d-flex justify-content-start align-items-center">
          <img
            id="userAvatar"
            v-if="user.avatar"
            class="rounded-circle images"
            :src="user.avatar"
            alt="Card image cap"
            style="cursor: zoom-in"
            v-viewer
          />
          <img
            v-else
            id="userAvatar"
            class="rounded-circle"
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Card image cap"
          />
        </div>
        <div
          class="col-5 mt-1 d-flex flex-column align-items-start justify-content-center"
        >
          <h2>
            Role :
            <span>{{ user.role }}</span>
          </h2>
          <h1 id="username" class="display-4" style="color: black">
            {{ user.name }}
          </h1>
          <span
            v-if="user.role === 'teacher'"
            class="badge"
            :class="{
              'badge-info': user.expertise === 'Math',
              'badge-success': user.expertise === 'Physical',
              'badge-secondary': user.expertise === 'Chemical',
            }"
          >
            <h6 class="m-0">{{ user.expertise }}</h6>
          </span>
        </div>
        <div
          v-if="user.role === 'teacher'"
          class="col-4 mt-1 d-flex flex-column align-items-end justify-content-center"
        >
          <h2>Solved Problems</h2>
          <h1 class="display-4" style="color: #c03546">{{ answers }}</h1>
        </div>
        <div
          v-else
          class="col-4 mt-1 d-flex flex-column align-items-end justify-content-center"
        >
          <h2>Asked Problems</h2>
          <h1 class="display-4" style="color: #c03546">{{ questions }}</h1>
        </div>
      </div>
      <div class="text-right">
        <button
          class="btn btn-outline-primary"
          type="button"
          data-toggle="modal"
          data-target="#useredit"
        >
          <font-awesome-icon icon="pencil-alt" size="2x" />
          <h6 class="d-inline">EDIT PROFILE</h6>
        </button>
      </div>
      <div
        class="card d-flex flex-row row border-0 mt-3"
        style="background-color: #fffbf0"
      >
        <div class="col-6 m-2">
          <h3 style="color: #4f86c6">Gender</h3>
          <h5 v-if="user.gender">{{ user.gender }}</h5>
          <br v-else />
          <h3 style="color: #4f86c6">Email</h3>
          <h5>{{ user.email }}</h5>
          <h3 style="color: #4f86c6">Password</h3>
          <h5>{{ user.password | filterPassword }}</h5>
          <template v-if="user.role === 'teacher'">
            <h3 style="color: #4f86c6">Bank Account</h3>
            <h5 v-if="user.bankaccount">
              {{ user.bankaccount | filterPassword }}
            </h5>
            <br v-else />
          </template>
          <template v-else-if="user.role === 'student'">
            <h3 style="color: #4f86c6">Grade</h3>
            <h5 v-if="user.grade">{{ user.grade }}</h5>
            <br v-else />
          </template>
        </div>
        <div v-if="user.role === 'teacher'" class="col-5 p-2">
          <h3 style="color: #4f86c6">About Me</h3>
          <div class="card rounded p-3" style="height: 270px">
            <h5>{{ user.introduction | ellipsis }}</h5>
          </div>
        </div>
        <div v-else-if="user.role === 'student'" class="col-5 p-2">
          <h3 style="color: #4f86c6">Available Balance</h3>
          <h5 v-if="user.quantity">{{ user.quantity }}</h5>
          <h4 class="mb-0" v-else>0</h4>
          <br />
          <button
            type="button"
            class="btn btn-success btn-lg d-flex align-items-center"
            style="max-width: 400px"
            data-toggle="modal"
            data-target="#product"
            id="depositbtn"
          >
            <h1 id="depositbtntext" class="m-0 display-3 text-center">
              Deposit !
            </h1>
          </button>
        </div>
      </div>
    </template>
    <div class="d-flex justify-content-center mt-4">
      <NavTabs />
    </div>
  </div>
</template>

<script>
import ProductM from "../components/ProductM";
import NavTabs from "../components/NavTabs";
import Spinner from "./../components/Spinner";
import UserEditM from "../components/UserEditM";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import store from "./../store";
import $ from "jquery";

export default {
  name: "User",
  components: {
    ProductM,
    NavTabs,
    Spinner,
    UserEditM,
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
        expertise: "",
      },
      answers: "",
      questions: "",
      userId: "",
      isLoading: true,
      isProcessing: false,
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
          this.isLoading = false;
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
          expertise: response.data.user.expertise,
        };
        this.answers = response.data.user.Answers.length;
        this.questions = response.data.user.Questions.length;
        this.userId = String(response.data.user.id);
        this.isLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get data, please try again later",
        });
        this.isLoading = false;
      }
    },
    async handleAfterUpdate(formData) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.putUser.update({
          id: this.userId,
          formData,
        });
        if (data.status === "success") {
          this.isProcessing = false;
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          this.fetchUser(this.userId);
          store.dispatch("fetchCurrentUser");
          $("#useredit").modal("hide");
        } else if (data.status === "warning") {
          this.isProcessing = false;
          Toast.fire({
            icon: "warning",
            title: data.message,
          });
        } else {
          this.isProcessing = false;
          $("#useredit").modal("hide");
          throw new Error(data.message);
        }
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can't not update, please try again later",
        });
      }
    },
  },
  filters: {
    filterPassword() {
      return "．．．．．．．．";
    },
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 300) {
        return value.slice(0, 300) + " ...";
      }
      return value;
    },
  },
};
</script>

<style>
@media (max-width: 380px) {
  #userAvatar {
    width: 80px;
    height: 80px;
  }
  #username {
    font-size: 1rem;
  }
  #depositbtntext {
    font-size: 1.2rem;
  }
}
@media (min-width: 380px) {
  #userAvatar {
    width: 80px;
    height: 80px;
  }
  #username {
    font-size: 1.1rem;
  }
}
@media (min-width: 570px) {
  #userAvatar {
    width: 140px;
    height: 140px;
  }
  #username {
    font-size: 1.5rem;
  }
  #depositbtntext {
    font-size: 1.2rem;
    line-height: 1.5;
  }
  #depositbtn {
    margin: 0;
  }
}
@media (min-width: 760px) {
  #userAvatar {
    width: 160px;
    height: 160px;
  }
  #depositbtntext {
    font-size: 2rem;
    height: 70px;
    line-height: 2;
  }
}
@media (min-width: 990px) {
  #userAvatar {
    width: 200px;
    height: 200px;
  }
  #depositbtntext {
    font-size: 3rem;
    height: 80px;
    line-height: 2;
  }
}
@media (min-width: 1000px) {
  #depositbtntext {
    height: 100px;
    line-height: 2;
  }
}
</style>