<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <!-- <input type="text" name="message" id="message" v-model="msg" /> -->
      <SearchBox
        :searchTerm="msg"
        :searchData="sampleData"
        @clicked="handleChildClicked"
      />
      <hr style="margin: 2rem auto; width: 33%;" />
      <DataTable
        :sampleData="resultList.length == 0 ? sampleData : resultList"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import DataTable from "@/components/DataTable.vue";
import SearchBox from "@/components/SearchBox.vue";

export default {
  name: "Home",
  components: {
    DataTable,
    SearchBox,
  },
  data() {
    return {
      resultList: [],
      searchTerm: "",
      sampleData: [
        {
          name: "root",
          parent_role: null,
        },
        {
          name: "unknown",
          parent_role: "root",
        },
        {
          name: "未分配",
          parent_role: "Niki_1",
        },
        {
          name: "oot",
          parent_role: "root",
        },
        {
          name: "Gerry",
          parent_role: null,
        },
        {
          name: "Leo",
          parent_row: "Gerry",
        },
        {
          name: "李老板",
          parent_role: "root",
        },
        {
          name: "老板li",
          parent_role: "李老板",
        },
        {
          name: "Testing",
          parent_role: "李老板",
        },
        {
          name: "Hello World",
          parent_role: "Gerry",
        },
        {
          name: "Nikki",
          parent_role: "oot",
        },
      ],
      msg: "",
    };
  },
  methods: {
    handleChildClicked(term) {
      this.resultList = [];
      this.sampleData.forEach((item) => {
        if (
          item.name.search(term) != -1 ||
          (item.parent_role != null && item.parent_role.search(term) != -1)
        ) {
          this.resultList.push(item);
        }
      });
      this.msg = "";
    },
  },
  mounted() {},
  computed: {
  },
};
</script>

<style>
#message {
  line-height: 1.5rem;
  width: 20vw;
}
</style>
