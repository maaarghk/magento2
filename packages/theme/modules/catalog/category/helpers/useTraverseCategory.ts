import {
  computed, useContext, useRoute,
} from '@nuxtjs/composition-api';
import { useCategoryStore } from '~/stores/category';
import { findActiveCategory } from '~/modules/catalog/category/helpers/findActiveCategory';
import { findCategoryAncestors } from '~/modules/catalog/category/helpers/findCategoryAncestors';

/**
 * Logic for finding the current product category and its parent and grandparent categories (ancestors)
 */
export function useTraverseCategory() {
  const context = useContext();
  const categoryStore = useCategoryStore();
  const route = useRoute();

  const categoryTree = computed(() => categoryStore.categories);
  const isCategoryTreeLoaded = computed(() => categoryStore.categories !== null);
  const loadCategoryTree = () => categoryStore.load();
  const activeCategory = computed(() => {
    // on localhost the default store is localhost:3000/default/ but in a multi-store Magento instance this can change
    const slugToFind = route.value.fullPath.replace(context.app.localePath('/c'), '');
    return categoryTree.value === null ? null : findActiveCategory(categoryTree.value, slugToFind);
  });

  const categoryAncestors = computed(() => (activeCategory.value === null
    ? []
    : findCategoryAncestors(categoryTree.value, activeCategory.value)) ?? []);

  return {
    activeCategory,
    categoryAncestors,
    categoryTree,
    loadCategoryTree,
    isCategoryTreeLoaded,
  };
}