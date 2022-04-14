import type { Ref, DeepReadonly } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { Wishlist, ProductInterface } from '~/modules/GraphQL/types';

/**
 * Errors that occured in the `useWishlist` composable
 */
export interface UseWishlistErrors {
  addItem: Error | null;
  removeItem: Error | null;
  load: Error | null;
  clear: Error | null;
  loadItemsCount: Error | null;
}

/**
 * Parameters accepted by the `loadItemsCount` method in the `useWishlist` composable
 */
export type UseWishlistLoadItemsCountParams = ComposableFunctionArgs<{
  // TODO: Add type
}>;

/**
 * Parameters accepted by the `isInWishlist` method in the `useWishlist` composable
 */
export type UseWishlistIsInWishlistParams = { product: ProductInterface };

/**
 * Parameters accepted by the `addItem` method in the `useWishlist` composable
 */
export type UseWishlistAddItemParams = ComposableFunctionArgs<{
  product: any; // TODO: add product interface
}>;

/**
 * Parameters accepted by the `load` method in the `useWishlist` composable
 */
export type UseWishlistLoadParams = ComposableFunctionArgs<{
  searchParams?: Partial<{
    currentPage: number;
    pageSize: number;
  }>
}>;

/**
 * Parameters accepted by the `removeItem` method in the `useWishlist` composable
 */
export type UseWishlistRemoveItemParams = ComposableFunctionArgs<{
  product: any; // TODO: add product interface
}>;

/**
 * Parameters accepted by the `clear` method in the `useWishlist` composable
 */
export type UseWishlistClearParams = {
  currentWishlist: any; // TODO: Add type
};

/**
 * Represents the data returned from and functions available in the `useWishlist()` composable.
 */
export interface UseWishlistInterface {
  /**
   * Returns a total number of items added to the wishlist of the current user
   */
  loadItemsCount(params: UseWishlistLoadItemsCountParams): Promise<number | null>;

  /**
   * Checks if given product is in the wishlist of the current user
   */
  isInWishlist(params: UseWishlistIsInWishlistParams): boolean;

  /**
   * Adds product to the wishlist of the current user
   */
  addItem(params: UseWishlistAddItemParams): Promise<void>;

  /**
   * Fetches wishlist of the current customer
   */
  load(params: UseWishlistLoadParams): Promise<Wishlist | void>; // TODO: Why this method returns a Wishlist but others dont?

  /**
   * Removes product from the wishlist of the current user
   */
  removeItem(params: UseWishlistRemoveItemParams): Promise<void>;

  /**
   * Removes all products from the wishlist of the current user
   */
  clear(params: UseWishlistClearParams): Promise<any>;

  /**
   * Overrides the wishlist of the current user
   */
  setWishlist(newWishlist: Wishlist): void;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: DeepReadonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods
   */
  error: DeepReadonly<Ref<UseWishlistErrors>>;
}