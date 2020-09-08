<template>
  <div class="card text-white mb-3" style="max-width: 15rem;background-color:#c9d6de">
    <h2 class="card-header">Subject</h2>
    <div class="card-body">
      <ul class="nav nav-pills flex-column">
        <li class="nav-item">
          <router-link class="nav-link active" :to="{ name: 'teachers' }">
            <h4>All</h4>
          </router-link>
        </li>
        <li v-for="subject in subjects" :key="subject.id" class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'teachers', query: { subjectId: subject.id } }"
          >
            <h4>{{ subject.name }}</h4>
          </router-link>
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
};
</script>