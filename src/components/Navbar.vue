<template>
  <nav
    class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary border-0"
  >
    <router-link class="navbar-brand" to="/">Awesome G</router-link>
    <div>
      <template v-if="isAuthenticated">
        <button
          @click="logout"
          type="button"
          class="btn btn-sm btn-secondary my-2 my-sm-0 ml-4"
        >
          <h6 class="m-0">Sign out</h6>
        </button>
      </template>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarColor02"
      aria-controls="navbarColor02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarColor02" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <template v-if="!isAuthenticated">
          <button
            type="button"
            class="btn btn-sm btn-secondary my-2 my-sm-0 ml-4 mr-2"
            data-toggle="modal"
            data-target="#signin"
          >
            <h6 class="m-0">Sign in</h6>
          </button>
          <button
            type="button"
            class="btn btn-sm btn-secondary my-2 my-sm-0"
            data-toggle="modal"
            data-target="#signup"
          >
            <h6 class="m-0">Sign up</h6>
          </button>
        </template>
        <!-- is user is admin -->
        <router-link
          v-if="currentUser.role === 'admin'"
          to="#"
          class="nav-link text-white mr-1"
        >
          <button type="button" class="btn btn-sm btn-secondary my-2 my-sm-0">
            <h6 class="m-0">Back Ground</h6>
          </button>
        </router-link>

        <template v-if="isAuthenticated">
          <div
            :class="{ shake: noActivated }"
            class="mr-2"
            style="position: relative"
          >
            <button @click.stop="openNotifyBox" class="btn btn-primary m-0 p-0">
              <img
                style="cursor: pointer"
                src="../assets/icons/bell.png"
                width="30px"
                height="30px"
              />
              <span
                v-if="unRead"
                class="badge badge-pill badge-danger p-0"
                id="notify-badge"
                style="
                  border-radius: 100%;
                  width: 14px;
                  height: 14px;
                  position: absolute;
                  top: 1px;
                  right: 1px;
                "
                >{{ unRead }}</span
              >
            </button>
            <Spinner v-if="isLoading" />
            <div
              v-else
              id="notifybox"
              @click.stop
              v-show="notifyShow"
              class="card border-primary mb-3 text-primary border-0"
              style="
                width: 300px;
                position: absolute;
                right: 10px;
                background-color: #fffbf0;
                box-shadow: 3px 3px 3px #292823;
              "
            >
              <div
                class="card-body overflow-auto p-1 pr-2"
                style="max-height: 500px"
              >
                <div class="list-group">
                  <div
                    v-if="notifications.length === 0"
                    class="list-group-item list-group-item-action d-flex justify-content-center"
                  >
                    <h5 class="text-muted m-0">No new message ...</h5>
                  </div>
                  <router-link
                    v-else
                    v-for="notification in notifications"
                    :key="notification.createdAt"
                    to="/home"
                    class="list-group-item list-group-item-action d-flex"
                  >
                    <template v-if="currentUser.role === 'teacher'">
                      <div
                        class="col-4 d-flex align-items-center justify-content-center"
                      >
                        <img
                          class="rounded-circle"
                          width="60px"
                          height="60px"
                          :src="notification.avatar"
                        />
                      </div>
                      <div class="col-8">
                        <h6>
                          <span class="text-info">{{ notification.name }}</span>
                          post a new question!
                        </h6>
                        <h6 class="text-muted">
                          {{ notification.createdAt | fromNow }}
                        </h6>
                      </div>
                    </template>
                    <template v-else-if="currentUser.role === 'student'">
                      <div
                        class="col-4 d-flex align-items-center justify-content-center"
                      >
                        <img
                          class="rounded-circle"
                          width="60px"
                          height="60px"
                          :src="notification.avatar"
                        />
                      </div>
                      <div class="col-8">
                        <h6>
                          <span class="text-info">{{ notification.name }}</span>
                          {{ notification.msg }}
                        </h6>
                        <h6 class="text-muted">
                          {{ notification.createdAt | fromNow }}
                        </h6>
                      </div>
                    </template>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- is user is login -->
          <router-link
            :to="{ name: 'user', params: { id: currentUser.id } }"
            class="text-white mr-1 p-0 nav-link"
          >
            <h6 class="m-0">
              {{ currentUser.name }}
              <img
                v-if="currentUser.avatar"
                class="rounded-circle ml-2"
                :src="currentUser.avatar"
                alt="Card image cap"
                width="40px"
                height="40px"
              />
              <img
                v-else
                class="rounded-circle ml-2"
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Card image cap"
                width="40px"
                height="40px"
              />
            </h6>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
import { Filter } from "./../utils/mixins";
import Spinner from "./../components/Spinner";
import notificationsAPI from "./../apis/notifications";
export default {
  mixins: [Filter],
  props: {
    notifyShow: {
      type: Boolean,
    },
  },
  components: {
    Spinner,
  },
  data() {
    return {
      notifications: [],
      unRead: 0,
      noActivated: false,
      isLoading: false,
    };
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    openNotifyBox: function (data) {
      this.unRead = data;
    },
    postQuestions: function (userInfo) {
      if (!this.notifyShow) {
        this.noActivated = true;
        setTimeout(() => {
          this.noActivated = false;
        }, 820);
        this.unRead++;
      }
      this.notifications.unshift(userInfo);
    },
    postAnswers: function (userInfo) {
      if (!this.notifyShow) {
        this.noActivated = true;
        setTimeout(() => {
          this.noActivated = false;
        }, 820);
        this.unRead++;
      }
      this.notifications = userInfo;
    },
    putAnswers: function (userInfo) {
      if (!this.notifyShow) {
        this.noActivated = true;
        setTimeout(() => {
          this.noActivated = false;
        }, 820);
        this.unRead++;
      }
      this.notifications = userInfo;
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    async fetchNotifications() {
      try {
        const response = await notificationsAPI.getNotifications();
        if (response.data.notifications.length !== 0) {
          this.notifications = response.data.notifications;
          this.unRead = response.data.notifications[0].unRead;
        }
        this.isLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get notifications data, please try again later",
        });
        this.isLoading = false;
      }
    },
    logout() {
      this.$socket.emit(
        "userlogout",
        this.currentUser.id,
        this.currentUser.role
      );
      this.$store.commit("revokeAuthentication");
      this.$router.push("/home");
      Toast.fire({
        icon: "success",
        title: "Sign out successfully!",
      });
    },
    openNotifyBox() {
      this.$emit("showbox");
      this.$socket.emit("openNotifyBox", this.currentUser.id);
    },
  },
  watch: {
    notifyShow(newValue) {
      this.notifyShow = newValue;
    },
    isAuthenticated(newValue) {
      if (newValue === true) {
        this.$socket.emit(
          "userInfo",
          this.currentUser.id,
          this.currentUser.role
        );
      }
      if (newValue === true && this.currentUser.role === "student") {
        this.fetchNotifications();
      }
      if (newValue === true && this.currentUser.role === "teacher") {
        this.notifications = [];
      }
    },
  },
};
</script>

<style>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-2px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-2px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(2px, 0, 0);
  }
}
@media (max-width: 990px) {
  #notifybox {
    position: absolute;
    left: 10px;
  }
}
</style>