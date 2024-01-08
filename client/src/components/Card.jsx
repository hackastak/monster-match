import PropTypes from 'prop-types';
import monsterMatchLogo from '/monster-match.png';

import './component-styles.css';

const Card = (props) => {
  const { isFlipped, isDisabled, isInactive, onClick } = props;

  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(props.index);
  };

  return (
    <div className='card-container'>
      <div
        className={'card ' + (isInactive && 'cleared') + ' card-' + (isFlipped)}
        onClick={handleClick}
      >
        <div className='image-container' name={props.card.name}>
          <div className='card-front-face'>
            <img
              className='card-image' 
              src={monsterMatchLogo}
            />
          </div>
          <div className='card-back-face'>
            <img className='card-image'  src={props.card.image} />
          </div>
               
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  onClick: PropTypes.func,
  isFlipped: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isInactive: PropTypes.bool,
};

export default Card;
