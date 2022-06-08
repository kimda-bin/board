<template>
  <div class="root" v-if="board != null">
    <mjc-header></mjc-header>
    <div class="board">
      <div class="title">{{ board.title }}</div>
      <div class="writer" v-if="board.writeUser">
        작성자:{{ board.writeUser.name }}
      </div>
      <div class="body">{{ board.body }}</div>
      <div class="text-center">
        <v-btn color="primary" @click="modifyBoard">수정</v-btn>
        <v-btn color="error" @click="removeBoard">삭제</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import MjcHeader from "@/components/MjcHeader";
export default {
  components: {
    MjcHeader: MjcHeader,
  },
  data() {
    return {
      board: null,
    };
  },
  mounted() {
    console.log(this.$route);
    this.getBoardItem();
  },
  methods: {
    modifyBoard() {
      this.$router.push("/board/modify/" + this.$route.params.id);
    },
    removeBoard() {
      this.axios
        .post("/api/board/remove", {
          id: this.$route.params.id,
        })
        .then((result) => {
          if (result.data.result == "ok") {
            this.$router.push("/board");
          } else {
            alert(result.data.msg);
          }
          this.$router.push("/board");
        });
    },
    getBoardItem() {
      this.axios
        .post("/api/board/item", { id: this.$route.params.id })
        .then((result) => {
          console.log(result);
          this.board = result.data.board;
        });
    },
  },
};
</script>

<style>
</style>