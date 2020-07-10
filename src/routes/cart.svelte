<script>
    import { cart, commerce, checkoutToken, live } from "../store/store";
    import CartItemCard from "../components/CartItemCard.svelte";
    import { goto } from "@sapper/app";

    const handleMoveToCheckout = () => {
      commerce.checkout
        .generateToken($cart.id, { type: "cart" })
        .then(response => {
          // console.log(response)
          checkoutToken.set(response.id);
          goto(`/checkout/delivery/${response.id}`);
        })
        .catch(error => {
          console.log(error);
        });
    };
</script>

<style>
</style>

{#if $cart.line_items}
    {#if $cart.total_items > 0}
        {#each $cart.line_items as product}
            <CartItemCard product={product} />
        {/each}
    {:else}
        <h3>No items in cart</h3>
    {/if}
{/if}
<hr>
<h3>Cart total: {$cart.subtotal ? $cart.subtotal.formatted_with_symbol : '$0.00'}</h3>
<button on:click={handleMoveToCheckout} type="button" class="btn btn-outline-dark" >Checkout cart</button>