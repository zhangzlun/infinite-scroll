<script setup lang="ts">
import {ref, onMounted, onUnmounted, watchEffect, defineProps} from 'vue';
import type {Ref} from 'vue';

const props = defineProps({
  items: Array,     // 資料陣列
  hasMore: Boolean, // 是否還有資料
  fetchData: {      // 取得資料的方法
    type: Function,
    required: true
  }
});
// infinite element;
const infinite: Ref<Element | null> = ref(null);
// 是否正在加载
const isLoading = ref(true);
// 頁數
let nextPage = 0;

// 監聽滾動事件
const handleScroll = () => {
  const infiniteElement = infinite.value || document.body;
  const scrollTop = infiniteElement.scrollTop || document.body.scrollTop;
  const windowHeight = infiniteElement.clientHeight;
  const fullHeight = infiniteElement.scrollHeight;

  // 滾動到底部時觸發isLoading
  if (scrollTop + windowHeight >= fullHeight - 100 && !isLoading.value) {
    isLoading.value = true;
  }
};

// 查看isLoading或是hasMore是否有變化
watchEffect(async () => {
  if (isLoading.value && props.hasMore) {
    await props.fetchData(nextPage += 1);
  }
  // 資料載入完畢後就算沒有新資料也要會把isLoading設為false
  isLoading.value = false;
})

// 監聽infinite元素
onMounted(() => {
  const infiniteElement = infinite.value || window;
  infiniteElement.addEventListener('scroll', handleScroll);
});

// 移除監聽
onUnmounted(() => {
  const infiniteElement = infinite.value || window;
  infiniteElement.removeEventListener('scroll', handleScroll);
});
</script>
<template>
  <ul class="infinite-scroll" ref="infinite">
    <template v-for="item in props.items">
      <slot :item="item"></slot>
    </template>
    <div v-show="isLoading">
      <slot name="loading" >
        <p class="load">Loading...</p>
      </slot>
    </div>
  </ul>

</template>

<style scoped>
.infinite-scroll {
  overflow: auto;
  list-style: none;
  padding-left: 0;
  padding-bottom: 50px;
  height: 100%;
}

.load {
  margin: 0;
}
</style>
