<script>
	import ItemCard from "../components/ItemCard.svelte";
	import { products, commerce } from "../store/store";
	import { onMount } from "svelte";

	onMount(() => {
	  commerce.products
	    .list()
	    .then(result => {
	      const productsTable = {};
	      for (const product of result.data) {
	        productsTable[product.id] = product;
	      }
	      products.set(productsTable);
	    })
	    .catch(err => {
	      console.log(err);
	    });
	});
</script>

<style>
				.container {
				  display: flex;
				  width: 800px;
				  justify-content: space-between;
				  flex-wrap: wrap;
				  font-family: "Roboto Mono", monospace;
				}
</style>

<section class="container">
	{#each Object.keys($products) as productId}
		<ItemCard product={$products[productId]} />
	{/each}
</section>