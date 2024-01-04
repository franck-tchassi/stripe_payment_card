import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';

const PUBLIC_KEY = "pk_test_51ONECYAkgFpt9TxPOnKlOPVc0pQSn82R5bvGGiuohJpcF2Fs5YczQ1XxDcF2pnwXgonH7UNDMbIY2QV7fufj4xLs00e6GPiOpV";
const stripePromise = loadStripe(PUBLIC_KEY)

const stripe = () => {
  return (
    <Elements stripe={stripePromise} >
        <CheckoutForm />
    </Elements>
  )
}

export default stripe;
