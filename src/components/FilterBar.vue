<template>
  <div class="card text-white mx-auto mb-3" style="max-width: 18rem;background-color:#c9d6de">
    <h2 id="filterbartitle" class="card-header text-center">Subject</h2>
    <div class="card-body m-auto">
      <ul id="filterbar" class="nav nav-pills">
        <li class="nav-item" style="cursor:pointer">
          <a class="nav-link" :class="{ active: subjectId === 0}" @click="setVisibility(0)">
            <span>All</span>
          </a>
        </li>
        <li v-for="subject in subjects" :key="subject.id" class="nav-item" style="cursor:pointer">
          <a
            class="nav-link"
            :class="{ active: subjectId === subject.id}"
            @click="setVisibility(subject.id)"
          >
            <span>{{ subject.name }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subjects: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      subjectId: 0,
    };
  },
  methods: {
    setVisibility(subjectId) {
      this.subjectId = subjectId;
      this.$emit("after-filter", this.subjectId);
    },
  },
};
</script>

<style>
@media (min-width: 370px) {
  #filterbartitle {
    font-size: 1.1rem;
  }
  #filterbar span {
    font-size: 0.8rem;
  }
}
@media (min-width: 576px) {
  #filterbartitle {
    font-size: 1.1rem;
  }
  #filterbar span {
    font-size: 0.8rem;
  }
  #filterbar {
    display: flex;
    flex-direction: column;
  }
}
@media (min-width: 768px) {
  #filterbartitle {
    font-size: 1.5rem;
  }
  #filterbar span {
    font-size: 1.3rem;
  }
}
</style>