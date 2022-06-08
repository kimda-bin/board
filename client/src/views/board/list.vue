<template>
  <div class="root">
    <mjc-header></mjc-header>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th width="80px">글번호</th>
            <th>제목</th>
            <th width="100px">작성자</th>
            <th width="80px">조회수</th>
            <th width="120px">작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="board in boardList"
            :key="board.id"
            @click="clickBoardItem(board)"
          >
            <td class="text-center">{{ board.id }}</td>
            <td>{{ board.title }}</td>
            <td class="text-center">
              <div v-if="board.writeUser">
                {{ board.writeUser.name }}
              </div>
            </td>
            <td class="text-center">{{ board.viewCount }}</td>
            <td class="text-center">{{ board.writeTime | dateFormat }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <v-pagination
      v-model="page"
      @input="changePage"
      :length="pageCount"
    ></v-pagination>
    <div class="text-right mt-2">
      <v-btn color="primary" @click="moveWrite">글쓰기</v-btn>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import MjcHeader from "@/components/MjcHeader";
export default {
  components: {
    MjcHeader: MjcHeader,
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      boardList: [],
    };
  },
  filters: {
    dateFormat(dateStr) {
      return moment(dateStr).format("YYYY-MM-DD HH:mm");
    },
  },
  mounted() {
    //TODO:서버에서 게시물 목록 가져와서 넣기
    //for (var i = 0; i < 10; i++) {
    // this.boardList.push({
    //   id: i,
    //   title: "제목" + i,
    //   writer: "작성자" + i,
    //   viewCount: i,
    //   writeDate: "2020-01-01",
    // });
    // }
    this.axios.post("/api/board/list").then((result) => {
      console.log(result);
      this.boardList = result.data.boardList;
      this.pageCount = result.data.pageCount;
    });
  },
  methods: {
    clickBoardItem(board) {
      console.log(board);
      this.$router.push("/board/item/" + board.id);
    },
    changePage(page) {
      console.log(page);
      this.axios.post("/api/board/list", { page: page }).then((result) => {
        this.boardList = result.data.boardList;
        this.pageCount = result.data.pageCount;
      });
    },
    moveWrite() {
      this.$router.push("/board/write");
    },
    dateFormat(dateStr) {
      return moment(dateStr).format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>

<style scoped>
.table-container {
  width: 700px;
  margin: 0 auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table th,
td {
  border-bottom: 1px solid #ccc;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>