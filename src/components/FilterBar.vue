<template>
  <div class="card text-white mb-3" style="max-width: 15rem;background-color:#c9d6de">
    <h2 class="card-header">Subject</h2>
    <div class="card-body">
      <ul class="nav nav-pills flex-column">
        <li class="nav-item" style="cursor:pointer">
          <a class="nav-link" :class="{ active: subjectId === 0}" @click="setVisibility(0)">
            <h4>All</h4>
          </a>
        </li>
        <li v-for="subject in subjects" :key="subject.id" class="nav-item" style="cursor:pointer">
          <a
            class="nav-link"
            :class="{ active: subjectId === subject.id}"
            @click="setVisibility(subject.id)"
          >
            <h4>{{ subject.name }}</h4>
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
      subjectId: "",
    };
  },
  methods: {
    setVisibility(subjectId) {
      console.log(subjectId);
      this.subjectId = subjectId;
      this.$emit("after-filter", this.subjectId);
    },
  },
};
</script>