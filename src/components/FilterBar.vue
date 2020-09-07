<template>
  <div class="card text-white mb-3" style="max-width: 20rem;background-color:#a3a1a1">
    <h1 class="card-header">Subject</h1>
    <div class="card-body">
      <ul class="nav nav-pills flex-column">
        <li class="nav-item">
          <router-link class="nav-link active" :to="{ name: 'teachers' }">
            <h3>All</h3>
          </router-link>
        </li>
        <li v-for="subject in subjects" :key="subject.id" class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'teachers', query: { subjectId: subject.id } }"
          >
            <h3>{{ subject.name }}</h3>
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