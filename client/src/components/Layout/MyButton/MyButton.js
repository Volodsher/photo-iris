import PropTypes from 'prop-types';

export default function MyButton(props) {
  return (
    <button
      type={props.type}
      value={props.value}
      style={{
        border: `0.1rem solid var(${props.borderColor})`,
        borderRadius: '0.4rem',
        padding: `0.5rem 1rem`,
        // padding: `${props.padding} ${props.padding}`, // to overwrite padding
        color: `var(${props.color})`,
      }}
      className={props.className}
      onClick={props.handleClick}
      form={props.form}
    >
      {props.value}
    </button>
  );
}

MyButton.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
  borderColor: PropTypes.string,
};
