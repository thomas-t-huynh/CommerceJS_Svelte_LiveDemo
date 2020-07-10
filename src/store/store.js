import { writable } from "svelte/store";
import Commerce from "@chec/commerce.js";

const deliveryFormFields = {
  firstname: "",
  lastname: "",
  recipient: "",
  optionalAddress: "",
  email: "",
  street: "",
  town_city: "",
  state: "",
  zip_code: "",
  country: "",
  number: "",
  shipping_method: ""
};

const paymentFormFields = {
  number: "4242424242424242",
  expire: "03/20",
  cvc: "407"
};

export const products = writable({});
export const cart = writable({});
export const checkoutToken = writable({});
export const commerce = new Commerce(
  "pk_test_17958b576e2ba6850e3191cf217db928655e7e63d4c7b"
);
export const deliveryForm = writable(deliveryFormFields);
export const paymentForm = writable(paymentFormFields);
export const live = writable({});
export const shippingMethods = writable([]);

commerce.cart
  .retrieve()
  .then(response => {
    // console.log('store.js',response)
    cart.set(response);
  })
  .catch(error => console.log(error));
