<script>
    export let item;
    console.log(item);
</script>
    
<div class="d-flex justify-content-between">
    <div>
        <h6>{item.product_name}</h6>
        <p>Quantity: {item.quantity}</p>
    </div>
    <p>{item.line_total.formatted_with_symbol}</p>
</div>


