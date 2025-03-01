import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import Payment from "../components/Payment/Payment";

const PaymentPage = () => {
  return (
    <div className=' '>
       <Header />
       <br />
       <CheckoutSteps active={2} />
       <Payment />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage