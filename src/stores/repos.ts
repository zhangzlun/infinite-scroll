import {ref} from 'vue';
import {defineStore} from 'pinia';
import type {Ref} from 'vue';
import type {ReposDTO} from "@/models/DTO/ReposDTO";
import type {ReposViewData} from "@/models/ViewData/ReposViewData";

export const useReposStore = defineStore('counter', () => {
    const items: Ref<ReposViewData[]> = ref([]);
    const hasMore = ref(true);

    async function fetchRepos(page = 1, perPage = 6) {
        const response = await fetch(`https://api.github.com/users/zhangzlun/repos?per_page=${perPage}&page=${page}`);
        const data: ReposDTO[] = await response.json();
        if (data.length > 0) {
            const list: ReposViewData[] = data.map(item => {
                return {
                    id: item.id,
                    title: item.name,
                    link: item.html_url,
                    description: item.description
                }
            });
            items.value = [...items.value, ...list];
            hasMore.value = true;
        } else {
            hasMore.value = false;
        }
        console.log(data);
    }

    return {
        items,
        hasMore,
        fetchRepos
    }
})
