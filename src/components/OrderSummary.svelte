<script>
import OrderSummaryItem from "./OrderSummaryItem.svelte";
import { live } from "../store/store";
</script>

<style>
    .orderSummary-card {
      margin: 20px 0;
    }
</style>
{#if $live.line_items}
    <div class="card orderSummary-card">
      <div class="card-body">
        <h4 class="card-title">Order Summary</h4>
        <hr>
        {#each $live.line_items as item}
            <OrderSummaryItem item={item} />
        {/each}
        <hr>
        <div class="d-flex justify-content-between">
          <p>Subtotal</p>
          <p>{$live.subtotal.formatted_with_symbol}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p>Shipping</p>
          <p>{$live.shipping.price.formatted_with_symbol}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p>Tax</p>
          <p>{$live.tax.amount.formatted_with_symbol}</p>
        </div>
        <hr>
        <div class="d-flex justify-content-between">
          <h5>Total with Tax</h5>
          <h5>{$live.total_with_tax.formatted_with_symbol}</h5>
        </div>
      </div>
    </div>
{/if}
  