<template>
  <div class="container py-5">
    <div class="d-flex justify-content-center mt-2">
      <NavTabs />
    </div>
    <h1 class="mb-5 text-center mt-5">T e a c h e r s</h1>
    <div class="row">
      <div class="col-3">
        <FilterBar :subjects="subjects" />
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
const dummyData1 = {
  teachers: [
    {
      id: 2,
      name: "Mrs. Charlie Ziemann",
      email: "user0@example.com",
      password: "$2a$10$Mo0bW8u7DwtZumm1gilQlePqbG2nRFVzVdfz1dkgjanoyZIagzCxu",
      introduction: null,
      role: "teacher",
      avatar: "https://loremflickr.com/320/240/people/?lock=98.20944520224917",
      gender: null,
      quantity: null,
      grade: null,
      bankaccount: null,
      createdAt: "2020-09-05T15:12:12.000Z",
      updatedAt: "2020-09-05T15:12:12.000Z",
      Answers: [],
    },
    {
      id: 3,
      name: "Patricia Swift",
      email: "user1@example.com",
      password: "$2a$10$5kmj6S2ZBuFa8uuPMVbNfO7HBlWE1QdSwX/7/nXYzeomqoLgaoqCy",
      introduction: null,
      role: "teacher",
      avatar: "https://loremflickr.com/320/240/people/?lock=26.34556946379614",
      gender: null,
      quantity: null,
      grade: null,
      bankaccount: null,
      createdAt: "2020-09-05T15:12:12.000Z",
      updatedAt: "2020-09-05T15:12:12.000Z",
      Answers: [],
    },
    {
      id: 4,
      name: "Yvonne King",
      email: "user2@example.com",
      password: "$2a$10$zSKk9Rc4Wm2t9zwLESl4X.rmxpGW2gadfEdSpVH40M4NLVmyZohN.",
      introduction: null,
      role: "teacher",
      avatar: "https://loremflickr.com/320/240/people/?lock=12.575275831175459",
      gender: null,
      quantity: null,
      grade: null,
      bankaccount: null,
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
      Answers: [],
    },
    {
      id: 5,
      name: "Orlando Steuber PhD",
      email: "user3@example.com",
      password: "$2a$10$M89tguOMO1fSNoSqUWki3uyGeUIBmR14cY2./jZU57kptqJSLeD2S",
      introduction: null,
      role: "teacher",
      avatar: "https://loremflickr.com/320/240/people/?lock=98.62510707357808",
      gender: null,
      quantity: null,
      grade: null,
      bankaccount: null,
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
      Answers: [],
    },
    {
      id: 6,
      name: "Nathan Fritsch",
      email: "user4@example.com",
      password: "$2a$10$qVQrhvS6ncTPLekwmaIu2uDBlREAXXBx0wnJyfnUgjNl/PEbXDm2y",
      introduction: null,
      role: "teacher",
      avatar: "https://loremflickr.com/320/240/people/?lock=35.812801490384835",
      gender: null,
      quantity: null,
      grade: null,
      bankaccount: null,
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
      Answers: [],
    },
    {
      id: 7,
      name: "Mona Wuckert",
      email: "user5@example.com",
      password: "$2a$10$cy8Wf9VETCHtI3zZ8.7fZO4zJxoT.3ZPM5grdP5mX/BYsRlAtYVtC",
      introduction: null,
      role: "teacher",
      avatar: "https://loremflickr.com/320/240/people/?lock=28.029738370507594",
      gender: null,
      quantity: null,
      grade: null,
      bankaccount: null,
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
      Answers: [],
    },
  ],
};
const dummyData2 = {
  subjects: [
    {
      id: 1,
      name: "Math",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 2,
      name: "Physical",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
    {
      id: 3,
      name: "Chemical",
      createdAt: "2020-09-05T15:12:13.000Z",
      updatedAt: "2020-09-05T15:12:13.000Z",
    },
  ],
};
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
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    fetchFeeds() {
      this.teachers = dummyData1.teachers;
      this.subjects = dummyData2.subjects;
    },
  },
};
</script>