<template>
  <div class="container py-5">
    <div class="d-flex justify-content-center mt-2">
      <NavTabs />
    </div>
    <h1 class="mb-5 text-center mt-5">T e a c h e r s</h1>
    <div class="row">
      <div class="col-3">
        <FilterBar :subjects="subjects" @after-filter="handleAfterFilter" />
      </div>
      <div class="col-9">
        <TeacherCard :teachers="teachers" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import FilterBar from "./../components/FilterBar";
import TeacherCard from "./../components/TeacherCard";
import subjectsAPI from "./../apis/subjects";
import teachersAPI from "./../apis/teachers";
import { Toast } from "./../utils/helpers";
export default {
  name: "teachers",
  components: {
    NavTabs,
    FilterBar,
    TeacherCard,
  },
  data() {
    return {
      teachers: [],
      subjects: [],
      subjectId: 0,
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
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get data, please try again later",
        });
      }
    },
    async fetchTeachers() {
      try {
        const response = await teachersAPI.getTeachers();
        this.teachers = response.data.teachers;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Can't not get data, please try again later",
        });
      }
    },
    handleAfterFilter(subjectId) {
      this.subjectId = subjectId;
    },
  },
  computed: {
    //TODO 老師新增教學科目
    fiteredTeacher() {
      if (this.subjectId) {
        return this.teachers.filter((teacher) =>
          [teacher.SubjectId].includes(this.subjectId)
        );
      } else {
        return this.teachers;
      }
    },
  },
};
</script>