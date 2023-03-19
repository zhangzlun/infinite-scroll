<script setup lang="ts">
import {computed} from "vue";

import InfiniteScroll from "@/components/InfiniteScroll.vue";
import {useReposStore} from "@/stores/repos";


const repo = useReposStore();
const items = computed(() => repo.items);
</script>

<template>

  <main class="infinite">
    <!-- 標題 -->
    <h1>Zhang Repo List:</h1>
    <!-- 無限滾動Component -->
    <InfiniteScroll v-slot="{item}"
                    :items="items"
                    :has-more="repo.hasMore"
                    :fetch-data="repo.fetchRepos">
      <li :key="item.id" class="item">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
        <a :href="item.link">{{ item.link }}</a>
      </li>
    </InfiniteScroll>
  </main>
</template>

<style scoped>
.infinite {
  padding: 0 20vw;
  height: 660px;
}

.item {
  display: flex;
  height: 100px;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background-color: #FFFFFF;
}

.item :is(h2, p) {
  margin: 0;
}

.item h2 {
  font-size: 20px;
}
</style>
