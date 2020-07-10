<script>
export let product;
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
            <p>{product.price.formatted_with_symbol}</p>
        </div>
        <a href={`item/${product.id}`}><button type="button" class="btn btn-outline-dark" >View Product</button></a>
    </div>
</div>
