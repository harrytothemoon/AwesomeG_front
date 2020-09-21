<template>
  <div class="container py-5">
    <div class="d-flex justify-content-center mt-2">
      <NavTabs />
    </div>
    <h1 class="mb-5 text-center mt-5">T e a c h e r s</h1>
    <div class="row">
      <div class="col-3">
        <Spinner v-if="subjectisLoading" />
        <FilterBar v-else :subjects="subjects" @after-filter="handleAfterFilter" />
      </div>
      <div class="col-9">
        <Spinner v-if="teacherCardisLoading" />
        <TeacherCard v-else :fiteredTeachers="fiteredTeachers" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import FilterBar from "./../components/FilterBar";
import TeacherCard from "./../components/TeacherCard";
import Spinner from "./../components/Spinner";
import subjectsAPI from "./../apis/subjects";
import teachersAPI from "./../apis/teachers";
import { Toast } from "./../utils/helpers";
export default {
  name: "teachers",
  components: {
    NavTabs,
    FilterBar,
    TeacherCard,
    Spinner,
  },
  data() {
    return {
      teachers: [],
      subjects: [],
      subjectId: 0,
      subjectisLoading: true,
      teacherCardisLoading: true,
    };
  },
  created() {
    this.fetchSubjects();
    this.fetchTeachers();
  },
  methods: {
    async fetchSubjects() {
      try {
        const response = await subjectsAPI.getSubjects();
        this.subjects = response.data.subjects;
        this.subjectisLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get data, please try again later",
        });
        this.subjectisLoading = false;
      }
    },
    async fetchTeachers() {
      try {
        const response = await teachersAPI.getTeachers();
        this.teachers = response.data.teachers;
        this.teacherCardisLoading = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get data, please try again later",
        });
        this.teacherCardisLoading = false;
      }
    },
    handleAfterFilter(subjectId) {
      this.subjectId = subjectId;
    },
  },
  computed: {
    fiteredTeachers() {
      if (this.subjectId) {
        return this.teachers.filter((teacher) => {
          if (Number(this.subjectId) === 1) return teacher.expertise === "Math";
          if (Number(this.subjectId) === 2)
            return teacher.expertise === "Physical";
          if (Number(this.subjectId) === 3)
            return teacher.expertise === "Chemical";
        });
      } else {
        return this.teachers;
      }
    },
  },
};
</script>