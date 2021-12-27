import PropTypes from 'prop-types';


export default function MyButton (props) {

    return (
      <div 
        style={{
          width: '120px',
          borderRadius: '4px',
          textAlign: 'center',
          padding: 5,
          cursor: 'pointer',
        }}
        className={props.className}
        onClick={props.handleCklick}
      >
        {props.name}
      </div>
    )
}

MyButton.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  handleCklick: PropTypes.func
}
