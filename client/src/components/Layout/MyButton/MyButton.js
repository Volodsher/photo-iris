import PropTypes from 'prop-types';

export default function MyButton(props) {
  return (
    <button
      type={props.type}
      value={props.value}
      style={{
        border: `0.1rem solid ${props.borderColor}`,
        borderRadius: '0.4rem',
      }}
      className={props.className}
      onClick={props.handleCklick}
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
  handleCklick: PropTypes.func,
  borderColor: PropTypes.string,
};
