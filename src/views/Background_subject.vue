<template>
  <div class="container py-5 text-primary" style="max-width: 950px">
    <ul class="nav nav-tabs mt-1 mb-4 d-flex justify-content-center">
      <li class="nav-item w-25" style="cursor: pointer">
        <router-link
          to="/admin/background/products"
          class="nav-link text-center"
        >
          <h4>Products</h4>
        </router-link>
      </li>
      <li class="nav-item w-25" style="cursor: pointer">
        <router-link
          to="/admin/background/subjects"
          class="nav-link text-center"
        >
          <h4>Subjects</h4>
        </router-link>
      </li>
      <li class="nav-item w-25" style="cursor: pointer">
        <router-link to="/admin/background/scopes" class="nav-link text-center">
          <h4>Scopes</h4>
        </router-link>
      </li>
    </ul>
    <form class="my-4">
      <div class="form-row d-flex justify-content-center">
        <div class="col-auto">
          <input
            v-model="newSubjectName"
            type="text"
            class="form-control"
            placeholder="Create a Subject..."
          />
        </div>
        <div class="col-auto">
          <button
            @click.prevent.stop="handlePostSubmit"
            type="button"
            class="btn btn-success"
            :disabled="newIsProcessing"
          >
            <h5 class="m-0 text-center">Create</h5>
          </button>
        </div>
      </div>
    </form>
    <Spinner v-if="isLoading" />
    <div v-else class="overflow-auto" style="height: 500px">
      <table
        class="table table-hover text-center overflow-auto w-75 mx-auto"
        style="max-height: 500px"
      >
        <thead>
          <tr class="table-warning">
            <th scope="col">Subject Name</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in subjects" :key="subject.id" class="table-light">
            <td>
              <div v-show="!subject.isEditing" class="subject-name">
                {{ subject.name }}
              </div>
              <div v-show="subject.isEditing" class="subjectName">
                <input
                  v-model="subject.name"
                  type="text"
                  class="form-control"
                />
                <span
                  v-show="subject.isEditing"
                  class="cancel"
                  @click="handleCancel(subject.id)"
                >
                  ✕
                </span>
              </div>
            </td>
            <td>
              <button
                v-show="!subject.isEditing"
                type="button"
                class="btn btn-info"
                @click.stop.prevent="toggleIsEditing(subject.id)"
                :disabled="editIsProcessing"
              >
                <font-awesome-icon icon="pencil-alt" />
              </button>
              <button
                v-show="subject.isEditing"
                type="button"
                class="btn btn-info"
                @click.stop.prevent="updateSubject(subject.id, subject.name)"
                :disabled="editIsProcessing"
              >
                Save
              </button>
            </td>
            <td>
              <button
                @click.stop.prevent="deleteSubject(subject.id)"
                type="button"
                class="btn btn-danger"
                :disabled="deleteIsProcessing"
              >
                <font-awesome-icon icon="trash-alt" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-center mt-4">
      <NavTabs />
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs";
import Spinner from "./../components/Spinner";
import subjectAPI from "./../apis/subjects";
import backgroundAPI from "./../apis/background";
import { Toast } from "./../utils/helpers";

export default {
  name: "Background-subject",
  components: {
    NavTabs,
    Spinner,
  },
  data() {
    return {
      subjects: [],
      isLoading: true,
      deleteIsProcessing: false,
      newIsProcessing: false,
      editIsProcessing: false,
      subjectEdit: {},
      newSubjectName: "",
    };
  },
  created() {
    this.fetchSubjects();
  },
  methods: {
    async fetchSubjects() {
      try {
        const response = await subjectAPI.getSubjects();
        this.subjects = response.data.subjects.map((subject) => ({
          ...subject,
          isEditing: false,
          nameCached: "",
        }));
        this.isLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get subjects data, please try again later",
        });
        this.isLoading = false;
      }
    },
    async handlePostSubmit() {
      try {
        this.newIsProcessing = true;
        const { data, statusText } = await backgroundAPI.postSubject({
          name: this.newSubjectName,
        });
        if (statusText === "OK" || data.status === "success") {
          this.newIsProcessing = false;
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          this.newSubjectName = "";
          this.fetchSubjects();
        } else if (statusText !== "OK" || data.status === "error") {
          this.newIsProcessing = false;
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
      } catch (error) {
        this.newIsProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can't not submit, please try again later",
        });
        this.newSubjectName = "";
      }
    },
    async updateSubject(subjectId, name) {
      try {
        this.editIsProcessing = true;
        const { data, statusText } = await backgroundAPI.putSubject(
          subjectId,
          name
        );
        if (statusText !== "OK" || data.status !== "success") {
          this.editIsProcessing = false;
          throw new Error(statusText);
        }
        if (statusText === "OK" || data.status === "success") {
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          this.editIsProcessing = false;
          this.fetchSubjects();
        }
        this.toggleIsEditing(subjectId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not updata Subject, please try again later",
        });
        this.editIsProcessing = false;
      }
    },
    async deleteSubject(subjectId) {
      if (this.subjects.length > 3) {
        this.deleteIsProcessing = true;
        try {
          const { data, statusText } = await backgroundAPI.deleteSubject({
            subjectId,
          });
          if (statusText !== "OK" || data.status !== "success") {
            this.deleteIsProcessing = false;
            throw new Error(statusText);
          }
          if (statusText === "OK" || data.status === "success") {
            Toast.fire({
              icon: "success",
              title: data.message,
            });
            this.deleteIsProcessing = false;
            this.fetchSubjects();
          }
        } catch (error) {
          this.deleteIsProcessing = false;
          Toast.fire({
            icon: "error",
            title: "Can't not delete data, please try again later",
          });
        }
      } else {
        Toast.fire({
          icon: "warning",
          title: "Please keep at least three Subjects",
        });
      }
    },
    toggleIsEditing(subjectId) {
      this.subjects = this.subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            isEditing: !subject.isEditing,
            nameCached: subject.name,
          };
        }
        return subject;
      });
    },
    handleCancel(subjectId) {
      this.subjects = this.subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            // 把原本的餐廳類別名稱還回去
            name: subject.nameCached,
          };
        }
        return subject;
      });
      this.toggleIsEditing(subjectId);
    },
  },
};
</script>

<style >
.subject-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}
.subjectName {
  position: relative;
}
.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 15px;
}
@media (min-width: 370px) {
  table {
    font-size: 0.6rem;
  }
}
@media (min-width: 576px) {
  table {
    font-size: 0.8rem;
  }
}
@media (min-width: 760px) {
  table {
    font-size: 1rem;
  }
}
@media (min-width: 1200px) {
  table {
    font-size: 1.3rem;
  }
}
</style>