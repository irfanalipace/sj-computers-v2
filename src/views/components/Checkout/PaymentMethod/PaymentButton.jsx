import Button from '@common/Button/Button';

function PaymentButton({ isLoading, clickHandler, disabled, children }) {
  return (
    <Button
      isLoading={isLoading}
      className='payment-btn'
      clickHandler={clickHandler}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default PaymentButton;
