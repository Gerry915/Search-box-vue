<template>
  <div class="container">
    <div class="input-wrapper">
      <input type="text" name="message" id="message" v-model="msg" @keyup.enter="renderTable(msg)" />
      <button v-if="msg !== ''" class="clear-btn" @click="clearInput()"></button>
    </div>
    <button @click="renderTable(msg)">Search</button>
    <div class="content-wrapper" v-if="msg !== ''" style="margin-top: 2.0rem;">
      <ul class="result-container" v-if="filterList.length === 0">
        <li>No Match Found</li>
      </ul>
      <ul
        v-else
        class="result-container"
        v-for="(item, index) in filterList"
        :key="index"
      >
        <li @click="renderTable(item.name)">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["searchTerm", "searchData"],
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    renderTable(value) {
      this.msg = "";
      this.$emit("clicked", value);
    },
    clearInput() {
      this.msg= "";
    }
  },
  computed: {
    filterList() {
      const temp = [];
      this.searchData.forEach((item) => {
        if (
          item.name.search(this.msg) != -1 ||
          (item.parent_role != null && item.parent_role.search(this.msg) != -1)
        ) {
          temp.push(item);
        }
      });

      return temp;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 20vw;
  margin: 0.5rem auto;
}
.content-wrapper {
  line-height: 1.5rem;
  margin: 0 auto;
  background-color: whitesmoke;
  width: inherit;
  border: 1px solid black;
  position: absolute;
}

.result-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 0;
  list-style: none;
}

.result-container > li {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.25rem 0.25rem;
  transition: all 0.25s ease-in-out;
}

.result-container > li:hover {
  background-color: aqua;
  cursor: pointer;
}

.input-wrapper {
  display: flex;
  flex-direction: row;
}

.clear-btn {
  margin-left: -3rem;
  width: 48px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: rgba(0, 0, 0, 0.6);
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIwIiB5MT0iMjU4IiB4Mj0iNTEyIiB5Mj0iMjU4IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgNTE0KSI+DQoJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzgwRDhGRiIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuMTYiIHN0eWxlPSJzdG9wLWNvbG9yOiM4OEQxRkYiLz4NCgk8c3RvcCAgb2Zmc2V0PSIwLjQxMyIgc3R5bGU9InN0b3AtY29sb3I6IzlGQkVGRSIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuNzI1IiBzdHlsZT0ic3RvcC1jb2xvcjojQzRBMEZEIi8+DQoJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0VBODBGQyIvPg0KPC9saW5lYXJHcmFkaWVudD4NCjxwYXRoIHN0eWxlPSJmaWxsOnVybCgjU1ZHSURfMV8pOyIgZD0iTTI1NiwwQzExNC41MDgsMCwwLDExNC40OTcsMCwyNTZjMCwxNDEuNDkzLDExNC40OTcsMjU2LDI1NiwyNTYNCgljMTQxLjQ5MiwwLDI1Ni0xMTQuNDk3LDI1Ni0yNTZDNTEyLDExNC41MDcsMzk3LjUwMywwLDI1NiwweiBNMjU2LDQ3MmMtMTE5LjM4NCwwLTIxNi05Ni42MDctMjE2LTIxNmMwLTExOS4zODUsOTYuNjA3LTIxNiwyMTYtMjE2DQoJYzExOS4zODQsMCwyMTYsOTYuNjA3LDIxNiwyMTZDNDcyLDM3NS4zODUsMzc1LjM5Myw0NzIsMjU2LDQ3MnogTTM0My41ODYsMTk2LjY5OEwyODQuMjg0LDI1Nmw1OS4zMDIsNTkuMzAyDQoJYzcuODExLDcuODExLDcuODEyLDIwLjQ3NCwwLjAwMSwyOC4yODRjLTcuODExLDcuODExLTIwLjQ3Niw3LjgxLTI4LjI4NCwwTDI1NiwyODQuMjg0bC01OS4zMDMsNTkuMzAyDQoJYy03LjgwOCw3LjgwOS0yMC40NzEsNy44MTItMjguMjg0LDBjLTcuODExLTcuODExLTcuODEtMjAuNDc0LDAuMDAxLTI4LjI4NEwyMjcuNzE2LDI1NmwtNTkuMzAyLTU5LjMwMg0KCWMtNy44MTEtNy44MTEtNy44MTItMjAuNDc0LTAuMDAxLTI4LjI4NHMyMC40NzYtNy44MTEsMjguMjg0LDBMMjU2LDIyNy43MTZsNTkuMzAzLTU5LjMwMmM3LjgxLTcuODEsMjAuNDczLTcuODExLDI4LjI4NCwwDQoJQzM1MS4zOTcsMTc2LjIyNSwzNTEuMzk2LDE4OC44ODgsMzQzLjU4NiwxOTYuNjk4eiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=);
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position: center center;
}
</style>
