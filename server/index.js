const expess = require('express');
const app = expess();
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const cors = require('cors');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.post("/stripe/charge", cors(), async(req, res)=>{
    let {amount, id} = req.body;
    console.log("amount & id :", amount, id);

    try{
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "EUR",
            description: "You Company Description",
            payment_method: id,
            confirm: true,
            return_url: 'https://www.banderolestop.fr/paiement-reussi',
        });
        res.json({
            message: "Payment réussi",
            success: true,
        })
    }
    catch(error){
        console.log("erreur...", error);
        res.json({
            message: "Payment échoué",
            success: false,
        })
    }
});






app.listen(process.env.PORT || 8080, ()=>{
    console.log("server démaré....")
});









