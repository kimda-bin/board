<template>
  <div class="root">
    <v-text-field v-model="form.title" label="글제목"></v-text-field>
    <v-textarea v-model="form.body" label="내용"></v-textarea>
    <div class="text-center">
      <v-btn color="primary" @click="submit">글쓰기</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    submit() {
      if (this.form.title == "") {
        window.alert("제목을 입력해주세요");
        return;
      }
      if (this.form.body == "") {
        window.alert("내용을 입력해주세요");
        return;
      }

      //TODO:서버에 전송해서 글쓰기 시키기
      this.axios.post("/api/board/write", this.form).then((result) => {
        if (result.data.result == "ok") {
          window.alert("글이 작성되었습니다.");
          this.$router.go(-1);
        }
      });

      //this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.root {
  width: 700px;
  margin: 0 auto;
}
</style>