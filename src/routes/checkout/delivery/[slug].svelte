<script>
    import {
      commerce,
      checkoutToken,
      live,
      shippingMethods,
      deliveryForm
    } from "../../../store/store";
    import { stores } from "@sapper/app";
    import { onMount } from "svelte";

    const { page } = stores();
    const { slug } = $page.params;

    let location = {
      countries: {},
      states: {}
    };

    let shippingMethodsStatus = "No shipping methods available";

    commerce.services
      .localeListCountries(slug)
      .then(res => {
        location.countries = { "": "Select a country", ...res.countries };
      })
      .catch(err => console.log(err));

    commerce.services
      .localeListSubdivisions("US")
      .then(res => {
        location.states = { "": "Select a state", ...res.subdivisions };
      })
      .catch(err => console.log(err));

    const onSubmit = e => {
      e.preventDefault();

      console.log($deliveryForm);
      return;
    };
    const onChange = e => {
      deliveryForm.set({ ...$deliveryForm, [e.target.name]: e.target.value });
      updateCheckoutSubtotal();
      if (e.target.name === "shipping_method") {
        setShippingMethod();
      }
    };
    const updateCheckoutSubtotal = () => {
      if ($deliveryForm.country) {
        const { country, zip_code, state } = $deliveryForm;
        if (country === "US" && zip_code && state) {
          checkShippingAndTax(country, zip_code, state);
        } else {
          checkShippingAndTax(country);
        }
      }
    };

    const checkShippingAndTax = (country, zip_code = "", state = "") => {
      commerce.checkout
        .setTaxZone(slug, {
          postal_zip_code: zip_code,
          country: country,
          region: state
        })
        .then(response => {
          live.set(response.live);
        })
        .catch(err => console.log(err));

      commerce.checkout
        .getShippingOptions(slug, {
          country: country,
          region: state
        })
        .then(response => {
          console.log(country, response);
          shippingMethods.set(response);
        })
        .catch(err => {
          shippingMethods.set([]);
          console.log(err);
        });
    };

    const setShippingMethod = () => {
      commerce.checkout
        .checkShippingOption(slug, {
          shipping_option_id: $deliveryForm.shipping_method,
          country: $deliveryForm.country,
          region: $deliveryForm.state
        })
        .then(response => {
          live.set(response.live);
        })
        .catch(err => {
          console.log(err);
        });
    };
</script>

<style>
</style>

<h1>Delivery form</h1>

<form name="deliveryForm" on:submit={onSubmit}>
    <h3>Customer</h3>
    <div class="form-group row">
      <label for="checkout-email" class="col-sm-2 col-form-label">
        Email address
      </label>
      <input
        type="email"
        class="form-control col-sm-10"
        id="checkout-email"
        name="email"
        on:change={onChange}
        required
        value={$deliveryForm.email}
      />
    </div>
    <div class="form-group row">
      <div class="col">
        <label for="checkout-firstname">
            First name
        </label>
        <input
          type="text"
          class="form-control"
          name="firstname"
          required
          on:change={onChange}
          value={$deliveryForm.firstname}
        />
      </div>
      <div class="col">
        <label for="checkout-lastname">Last name</label>
        <input
          type="text"
          class="form-control"
          name="lastname"
          required
          on:change={onChange}
          value={$deliveryForm.lastname}
        />
      </div>
    </div>

    <h3>Delivery</h3>
    <div class="form-group row">
      <label for="checkout-recipient" class="col-sm-2 col-form-label">
        Recipient Name
      </label>
      <input
        type="text"
        class="form-control col-sm-10"
        id="checkout-recipient"
        name="recipient"
        on:change={onChange}
        required
        value={$deliveryForm.recipient}
      />
    </div>
    <div class="form-group row">
      <label for="checkout-street" class="col-sm-2 col-form-label">
        Street Address
      </label>
      <input
        type="text"
        class="form-control col-sm-10"
        id="checkout-street"
        name="street"
        on:change={onChange}
        required
        value={$deliveryForm.street}
      />
    </div>
    <div class="form-group row">
      <label for="checkout-optionalAddress" class="col-sm-2 col-form-label">
        Apt, Suite, etc. (Optional)
      </label>
      <input
        type="text"
        class="form-control col-sm-10"
        id="checkout-optionalAddress"
        name="optionalAddress"
        on:change={onChange}
        value={$deliveryForm.optionalAddress}
      />
    </div>
    <div class="form-group row">
      <label for="checkout-town_city" class="col-sm-2 col-form-label">Town/City</label>
      <input
        type="text"
        class="form-control col-sm-10"
        id="checkout-town_city"
        name="town_city"
        on:change={onChange}
        required
        value={$deliveryForm.town_city}
      />
    </div>
    <div class="form-group row">
      <label for="checkout-zip_code" class="col-sm-2 col-form-label">
        Zip Code
      </label>
      <input
        type="text"
        class="form-control col-sm-10"
        id="checkout-zip_code"
        name="zip_code"
        on:change={onChange}
        required
        value={$deliveryForm.zip_code}
      />
    </div>
    <div class="form-group row">
      <label for="checkout-states" class="col-sm-2 col-form-label">State</label>
      <select
        class="form-control col-sm-10"
        id="checkout-states"
        name="state"
        on:blur={onChange}
        required
        disabled={$deliveryForm.country !== 'US'}
        value={$deliveryForm.state}
      >
      
      {#each Object.keys(location.states) as state, i }
            <option selected={state === $deliveryForm.state} value={state} key={i}>
                {location.states[state]}
            </option>
      {/each}
      </select>
    </div>
    <div class="form-group row">
      <label for="checkout-country" class="col-sm-2 col-form-label">
        Country
      </label>
      <select
        class="form-control col-sm-10"
        id="checkout-country"
        name="country"
        on:blur={onChange}
        required
        value={$deliveryForm.country}
      >
        {#each Object.keys(location.countries) as country, i }
            <option selected={country === $deliveryForm.country} value={country} key={i}>
                {location.countries[country]}
            </option>
        {/each}
      </select>
    </div>
    <div class="form-group row">
      <label for="checkout-number" class="col-sm-2 col-form-label">Phone Number</label>
      <input
        type="text"
        class="form-control col-sm-10"
        id="checkout-number"
        name="number"
        on:change={onChange}
        required
        value={$deliveryForm.number}
      />
    </div>
    <h5 v-if="shippingMethods.length > 0">Shipping Method</h5>
    <div class="form-check">
        {#if $shippingMethods.length > 0 }
            {#each $shippingMethods as method}
                <label for="checkout-number" class="col-sm-2 col-form-label">{method.description}</label>
                <input
                    class="form-check-input"
                    type="radio"
                    name="shipping_method"
                    on:change={onChange}
                    value={method.id}
                    required
                    checked={$deliveryForm.shipping_method === method.id}
                />
            {/each}
        {:else}
             <h5>{shippingMethodsStatus}</h5>
        {/if}
    </div>
    <a href={`/checkout/payment/${slug}`}><button class="btn btn-primary">Continue to Payment</button></a>
  </form>
