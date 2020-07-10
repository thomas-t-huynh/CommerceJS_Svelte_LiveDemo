<script>
    import { live, commerce } from "../../store/store";
    import OrderSummary from "../../components/OrderSummary.svelte";
    import { onMount } from "svelte";
    import { stores } from "@sapper/app";

    const { page } = stores();
    const { slug } = $page.params;

    onMount(() => {
      console.log($live);
      if (Object.keys($live).length < 1) {
        commerce.checkout.getLive(slug).then(response => live.set(response));
      }
    });
</script>

<style>
	main {
	  position: relative;
	  max-width: 56em;
	  background-color: white;
	  padding: 2em;
	  margin: 0 auto;
	  box-sizing: border-box;
	}
</style>


<main>
    <h1>Checkout page</h1>
    <OrderSummary />
    <slot></slot>
</main>