import { Context, Logger } from '@vue-storefront/core';
import { Cart, UpdateCartItemsInput } from '@vue-storefront/magento-api';

export const updateItemQtyCommand = {
  execute: async (context: Context, {
    currentCart,
    product,
    quantity,
    customQuery = { updateCartItems: 'updateCartItems' },
  }) => {
    Logger.debug('[Magento]: Update product quantity on cart', {
      product,
      quantity,
      currentCart,
    });

    const updateCartParams: UpdateCartItemsInput = {
      cart_id: currentCart.id,
      cart_items: [
        {
          cart_item_uid: product.uid,
          quantity,
        },
      ],
    };

    const { data } = await context.$magento.api.updateCartItems(updateCartParams, customQuery);

    Logger.debug('[Result]:', { data });

    return data
      .updateCartItems
      .cart as unknown as Cart;
  },
};