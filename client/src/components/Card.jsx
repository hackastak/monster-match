import {useState} from 'react'
import PropTypes from 'prop-types'

import "./component-styles.css"



const Card = (props) => {
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
  }

  return (
    <div className="card-container">
      <div className="card" onClick={flipCard}>
        <div className="image-container" name={props.name}>
          {flipped ? (
              <img className="card-image" src={props.image} />
            ) : (
              <p>Monster Match</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
}

export default Card

