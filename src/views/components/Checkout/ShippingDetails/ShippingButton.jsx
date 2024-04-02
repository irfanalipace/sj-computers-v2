import Button from '@common/Button/Button';

function ShippingButton({ handleClick, children, id, ...rest }) {
  return (
    <Button
      type='submit'
      clickHandler={e => handleClick(e, true, id)}
      className={'form-button'}
      {...rest}>
      {children}
    </Button>
  );
}

export default ShippingButton;
