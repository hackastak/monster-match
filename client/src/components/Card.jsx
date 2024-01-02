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
        className={'card ' + (isInactive && 'cleared')}
        onClick={handleClick}
      >
        <div className='image-container' name={props.card.name}>
          {isFlipped ? (
            <img
              className='card-image card-front-face'
              src={props.card.image}
            />
          ) : (
            <img className='card-image card-back-face' src={monsterMatchLogo} />
          )}
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
};

export default Card;
