<script>
    import CreditCard from "creditcard.js";
    import {
      commerce,
      checkoutToken,
      paymentForm,
      deliveryForm,
      live,
      cart
    } from "../../../store/store";
    import { goto } from "@sapper/app";
    import { stores } from "@sapper/app";

    const { page } = stores();
    const { slug } = $page.params;

    const validator = new CreditCard();
    let status = "";

    const onSubmit = e => {
      e.preventDefault();
      const isValidated = validator.isValid($paymentForm.number);
      if (isValidated) {
        status = "";
        const splitExpire = $paymentForm.expire.split("/");
        handleCapture($paymentForm.number, splitExpire[0], splitExpire[1]);
      } else {
        status = "The card number you entered is invalid";
      }
    };

    const handleCapture = (number, month, year) => {
      let line_items = {};
      $live.line_items.forEach(item => {
        line_items[item.id] = { quantity: item.quantity };
      });
      const d = $deliveryForm;
      const p = $paymentForm;
      const data = {
        line_items,
        customer: {
          firstname: d.firstname,
          lastname: d.lastname,
          email: d.email
        },
        shipping: {
          name: d.recipient,
          street: d.street,
          town_city: d.town_city,
          county_state: d.state,
          postal_zip_code: d.zip_code,
          country: d.country
        },
        fulfillment: {
          shipping_method: d.shipping_method
        },
        payment: {
          gateway: "test_gateway",
          card: {
            number: number,
            expiry_month: month,
            expiry_year: year,
            cvc: p.cvc,
            postal_zip_code: d.zip_code
          }
        }
      };
      commerce.checkout
        .capture(slug, data)
        .then(response => {
          console.log(response);
          cart.set({});
        })
        .catch(err => {
          console.log(err);
        });
    };

    const onChange = e => {
      paymentForm.set({ ...$paymentForm, [e.target.name]: e.target.value });
    };
</script>

<style>
    form {
      margin: 20px 0;
    }
    button {
      margin: 20px 0;
    }
</style>

<form name="paymentForm" on:submit={onSubmit}>
    <h3>Payment Method</h3>
    {#if status}<h3>{status}</h3>{/if}
    <div class="form-group">
        <label for="checkout-number">Card Number</label>
        <input
            type="text"
            class="form-control"
            id="checkout-number"
            name="number"
            required
            on:change={onChange}
            value={$paymentForm.number}
        >
    </div>
    <div class="row">
        <div class="col">
        <label for="checkout-cardNumber">Expiration Date MM/YY</label>
        <input
            type="text"
            class="form-control"
            name="expire"
            required
            on:change={onChange}
            pattern={"([0-9]{2}[/]?){2}"}
            value={$paymentForm.expire}
        >
        </div>
        <div class="col">
        <label for="checkout-cardNumber">CVC ###</label>
        <input
            type="text"
            class="form-control"
            name="cvc"
            required
            on:change={onChange}
            pattern={"([0-9]{3})"}
            value={$paymentForm.cvc}
        >
        </div>
    </div>
    <button class="btn btn-primary">Submit Order</button>
</form>