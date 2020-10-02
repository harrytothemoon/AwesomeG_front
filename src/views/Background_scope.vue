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
            v-model="newScopeName"
            type="text"
            class="form-control"
            placeholder="Create a Scope..."
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
            <th scope="col">Scope Name</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="scope in scopes" :key="scope.id" class="table-light">
            <td>
              <div v-show="!scope.isEditing" class="scope-name">
                {{ scope.name }}
              </div>
              <div v-show="scope.isEditing" class="scopeName">
                <input v-model="scope.name" type="text" class="form-control" />
                <span
                  v-show="scope.isEditing"
                  class="cancel"
                  @click="handleCancel(scope.id)"
                >
                  ✕
                </span>
              </div>
            </td>
            <td>
              <button
                v-show="!scope.isEditing"
                type="button"
                class="btn btn-info"
                @click.stop.prevent="toggleIsEditing(scope.id)"
                :disabled="editIsProcessing"
              >
                <font-awesome-icon icon="pencil-alt" />
              </button>
              <button
                v-show="scope.isEditing"
                type="button"
                class="btn btn-info"
                @click.stop.prevent="updateScope(scope.id, scope.name)"
                :disabled="editIsProcessing"
              >
                Save
              </button>
            </td>
            <td>
              <button
                @click.stop.prevent="deleteScope(scope.id)"
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
import scopeAPI from "./../apis/scopes";
import backgroundAPI from "./../apis/background";
import { Toast } from "./../utils/helpers";

export default {
  name: "Background-scope",
  components: {
    NavTabs,
    Spinner,
  },
  data() {
    return {
      scopes: [],
      isLoading: true,
      deleteIsProcessing: false,
      newIsProcessing: false,
      editIsProcessing: false,
      newScopeName: "",
    };
  },
  created() {
    this.fetchScopes();
  },
  methods: {
    async fetchScopes() {
      try {
        const response = await scopeAPI.getScopes();
        this.scopes = response.data.scopes.map((scope) => ({
          ...scope,
          isEditing: false,
          nameCached: "",
        }));
        this.isLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get scopes data, please try again later",
        });
        this.isLoading = false;
      }
    },
    async handlePostSubmit() {
      try {
        this.newIsProcessing = true;
        const { data, statusText } = await backgroundAPI.postScope({
          name: this.newScopeName,
        });
        if (statusText === "OK" || data.status === "success") {
          this.newIsProcessing = false;
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          this.newScopeName = "";
          this.fetchScopes();
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
        this.newScopeName = "";
      }
    },
    async updateScope(scopeId, name) {
      try {
        this.editIsProcessing = true;
        const { data, statusText } = await backgroundAPI.putScope(
          scopeId,
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
          this.fetchScopes();
        }
        this.toggleIsEditing(scopeId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not update Scope, please try again later",
        });
        this.editIsProcessing = false;
      }
    },
    async deleteScope(scopeId) {
      if (this.scopes.length > 13) {
        this.deleteIsProcessing = true;
        try {
          const { data, statusText } = await backgroundAPI.deleteScope({
            scopeId,
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
            this.fetchScopes();
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
          title: "Please keep at least thirteen Scopes",
        });
      }
    },
    toggleIsEditing(scopeId) {
      this.scopes = this.scopes.map((scope) => {
        if (scope.id === scopeId) {
          return {
            ...scope,
            isEditing: !scope.isEditing,
            nameCached: scope.name,
          };
        }
        return scope;
      });
    },
    handleCancel(scopeId) {
      this.scopes = this.scopes.map((scope) => {
        if (scope.id === scopeId) {
          return {
            ...scope,
            // 把原本的餐廳類別名稱還回去
            name: scope.nameCached,
          };
        }
        return scope;
      });
      this.toggleIsEditing(scopeId);
    },
  },
};
</script>

<style >
.scope-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}
.scopeName {
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