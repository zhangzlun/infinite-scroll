<script setup lang="ts">
import {ref, onMounted, onUnmounted, watchEffect, defineProps} from 'vue';
import type {Ref} from 'vue';

const props = defineProps({
  items: Array,
  hasMore: Boolean,
  fetchData: {
    type: Function,
    required: true
  }
});
// infinite element;
const infinite: Ref<Element | null> = ref(null);
// 是否正在加载
const isLoading = ref(true);
// 下一頁
let nextPage = 0;

// 監聽滾動事件
const handleScroll = () => {
  const infiniteElement = infinite.value || document.body;
  const scrollTop = infiniteElement.scrollTop || document.body.scrollTop;
  const windowHeight = infiniteElement.clientHeight;
  const fullHeight = infiniteElement.scrollHeight;

  if (scrollTop + windowHeight >= fullHeight - 100 && !isLoading.value) {
    isLoading.value = true;
  }
};

watchEffect(async () => {
  if (isLoading.value && props.hasMore) {
    await props.fetchData(nextPage += 1);
  }
  isLoading.value = false;
})

onMounted(() => {
  const infiniteElement = infinite.value || window;
  infiniteElement.addEventListener('scroll', handleScroll);
});

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
