import Header from '../../components/header/Header';
//import Footer from '../../components/footer/Footer';
import PaymentForm from '../../components/paymentForm/PaymentForm';

const PaymentPage = () => {
  return (
    <div className="flex flex-col min-h-screen"
    style={{marginTop: '4rem'}}>
      <Header />
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">Payment</h1>
        <PaymentForm />
      </main>
      {/*<Footer />*/}
    </div>
  );
};

export default PaymentPage;