<template>
  <div>
    <mjc-header></mjc-header>
    <div class="root">
      <v-text-field v-model="form.title" label="글제목"></v-text-field>
      <v-textarea v-model="form.body" label="내용"></v-textarea>
      <div class="text-center">
        <v-btn color="primary" @click="submit">수정</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import MjcHeader from "@/components/MjcHeader";
export default {
  components: {
    MjcHeader,
  },
  data() {
    return {
      form: {
        title: "",
        body: "",
      },
    };
  },
  mounted() {
    this.getBoardItem();
  },
  methods: {
    getBoardItem() {
      this.axios
        .post("/api/board/item", { id: this.$route.params.id })
        .then((result) => {
          this.form = result.data.board;
        });
    },
    submit() {
      if (this.form.title == "") {
        window.alert("제목을 입력해주세요");
        return;
      }
      if (this.form.body == "") {
        window.alert("내용을 입력해주세요");
        return;
      }

      //TODO:서버에 전송해서 게시글 수정하기
      this.axios.post("/api/board/modify", this.form).then((result) => {
        if (result.data.result == "ok") {
          window.alert("글이 수정되었습니다.");
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