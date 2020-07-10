<script>
	import { cart, commerce } from "../store/store";
	export let product;

	let quantity = product.quantity;

	const handleSetQuantity = e => {
	  quantity = e.target.value;
	};

	const handleEditItemQuantity = () => {
	  commerce.cart
	    .update(product.id, { quantity })
	    .then(response => {
	      console.log(response);
	      cart.set(response.cart);
	      quantity = response.quantity;
	    })
	    .catch(error => {
	      console.log(error);
	    });
	};

	const handleRemoveItem = () => {
	  commerce.cart
	    .remove(product.id)
	    .then(response => {
	      console.log(response);
	      cart.set(response.cart);
	    })
	    .catch(error => {
	      console.log(error);
	    });
	};
</script>

<style>
    .card {
      width: 250px;
      border: none;
    }
    .card-title-price {
      display: flex;
      justify-content: space-between;
    }

    .card-img-top {
      height: 200px;
      width: 200px;
    }
</style>

<div class="card">
    <img src={product.media.source} class="card-img-top" alt={product.name} />
    <div class="card-body">
        <div class="card-title-price">
            <h5 class="card-title">{product.name}</h5>
            <p>${product.price.formatted_with_symbol}</p>
        </div>
        <p>Current quantity: {product.quantity}</p>
        <input on:change={handleSetQuantity} type="number" name="quantity" min="1" value={quantity}>
        <button on:click={handleEditItemQuantity} name={product.id} type="button" class="btn btn-outline-dark" >Update cart</button>
        <button on:click={handleRemoveItem} name={product.id} type="button" class="btn btn-dark" >Remove item</button>
    </div>
</div>
