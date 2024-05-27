import PropTypes from 'prop-types';

export default function MyButton({
  type,
  value,
  color,
  className,
  handleClick,
  form,
  borderColor,
}) {
  return (
    <button
      type={type}
      value={value}
      style={{
        border: `0.1rem solid var(${borderColor})`,
        borderRadius: '0.4rem',
        padding: `0.5rem 1rem`,
        // padding: `${padding} ${padding}`, // to overwrite padding
        color: `var(${color})`,
      }}
      className={className}
      onClick={handleClick}
      form={form}
    >
      {value}
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
