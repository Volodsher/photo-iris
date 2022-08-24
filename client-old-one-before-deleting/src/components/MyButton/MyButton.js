import PropTypes from 'prop-types';
//import styles from './MyButton.module.scss';

export default function MyButton (props) {

    return (
      <div 
        style={{
          width: '130px',
          border: `2px solid ${props.borderColor}`,
          borderRadius: '4px',
          textAlign: 'center',
          padding: 10,
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
  handleCklick: PropTypes.func,
  borderColor: PropTypes.string,
}
