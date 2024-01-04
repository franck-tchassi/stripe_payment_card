import React from 'react'
import { CardNumberElement, CardExpiryElement,CardCvcElement , Elements, useElements, useStripe} from '@stripe/react-stripe-js'
import axios from 'axios'
import Products from '../Assets/Produits'



const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    
    
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card: elements.getElement(CardNumberElement, CardExpiryElement, CardCvcElement),
        });
        if(!error){
            console.log("token génerate:", paymentMethod);

            //envoie du token au backend
            try{
                const {id} = paymentMethod;
                const response = await axios.post("http://localhost:8080/stripe/charge",
                {
                    amount: 100,
                    id: id,
                });
                if(response.data.success){
                    console.log("Payment réussi")
                }
            }
            catch(error){
                console.log("errreur", error);
            }
        }
        else{
            console.log(error.message);
        }
    }
  return (

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
            {/* Section d'informations du client */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="mb-4 block">
                    Adresse e-mail
                    <input
                        type="email"
                        name="email"
                        placeholder="Entrez votre adresse e-mail"
                        className="w-full p-2 border rounded mt-1"
                        
                    />
                </label>

                <label className="mb-4 block">
                    Nom sur la carte
                    <input
                        type="text"
                        name="user"
                        placeholder="Entrez votre nom sur la carte"
                        className="w-full p-2 border rounded mt-1"
      
                    />
                </label>
            </div>

            {/* Section de la carte de crédit */}
            <div className="mb-6">
                <label className="mb-4 block">
                    Numéro de carte
                    <CardNumberElement
                        options={{
                            hidePostalCode: true,
                        }}
                        className="p-4 border rounded w-full"
                    />
                </label>

                <div className="grid grid-cols-2 gap-4">
                    <label className="mb-4 block">
                        Date d'expiration (MM/AA)
                        <CardExpiryElement
                            options={{
                                hidePostalCode: true,
                            }}
                            className="p-4 border rounded  "
                        />
                    </label>

                    <label className="mb-4 block">
                        CVC
                        <CardCvcElement
                            options={{
                                hidePostalCode: true,
                            }}
                            className="p-4 border rounded "
                        />
                    </label>
                </div>
            </div>

            {/* Adresse */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <label className="mb-4 block">
                    Adresse
                    <input
                        type='text'
                        name='adresse'
                        className="w-full p-2 border rounded mt-1"
      
                    />
                </label>

                <label className="mb-4 block">
                    Ville
                    <input
                        type='text'
                        name='ville'
                        className="w-full p-2 border rounded mt-1"
      
                    />
                </label>

                <label className="mb-4 block">
                    État/Province
                    <input
                        type='text'
                        name='etat'
                        className="w-full p-2 border rounded mt-1"
      
                    />
                </label>
    

                <label className="mb-4 block">
                    Code Postal
                    <input
                        type='number'
                        name='codePostal'
                        className="w-full p-2 border rounded mt-1"
      
                    />
                </label>
            </div>

            {/* Bouton de paiement */}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full "
            >
            Payer
            </button>
        </form>
  )
}

export default CheckoutForm
