<script>
	import { products, commerce, cart } from "../../store/store";
	import { beforeUpdate } from "svelte";
	import { stores } from "@sapper/app";

	const { page } = stores();
	const { slug } = $page.params;

	let product;
	let status = "";

	beforeUpdate(() => {
	  product = $products[slug];
	});

	const handleAddToCart = () => {
	  commerce.cart
	    .add(product.id)
	    .then(response => {
	      status = `${response.product_name} successfully added to the cart.`;
	      cart.set(response.cart);
	    })
	    .catch(error => {
	      console.log(error);
	    });
	};
</script>

<style>
</style>

{#if product}
<section>
	{#if status}
	<h3>{status}</h3>
	{/if}
	<div class="card mb-3" style="max-width: 540px;">
		<div class="row no-gutters">
			<div class="col-md-4">
				<img src={product.media.source} class="card-img" alt={product.name}>
			</div>
			<div class="col-md-8">
				<div class="card-body">
					<h5 class="card-title">{product.name}</h5>
					<h5>{product.price.formatted_with_symbol}</h5>
					<p>{product.description.slice(3, product.description.length - 4)}</p>
					<button on:click={handleAddToCart} type="button" class="btn btn-outline-dark" >Add to Cart</button>
				</div>
			</div>
		</div>
	</div>
</section>
{/if}
