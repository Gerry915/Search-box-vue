<template>
  <div>
    <h1>Data Table</h1>
    <div style="width: 33%; margin: auto; background-color:#94ECBE; color: black; font-weight: bold; border: 2px solid black;">
      <div class="element">
        <p>Name</p>
        <p>Parent Role</p>
      </div>
    </div>

    <ul v-for="(item, index) in sampleData" :key="index">
      <li>
        <div class="element">
          <p>{{ item.name }}</p>
          <p>{{ item.parent_role ? item.parent_role : `Null` }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["sampleData"],
  data() {
    return {
      myData: this.sampleData,
    };
  },
};
</script>

<style scoped>
ul {
  width: 33%;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  background-color: gray;
  color: white;
}

li {
  border: 2px solid #077187;
  font-weight: bold;
}
.element {
  display: flex;
  flex-direction: row;
}
.element > p {
  width: 50%;
}
</style>
