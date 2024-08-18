import React from 'react'

const Hero = ({title,imageUrl}) => {
  return (
    <div className='hero container'>
      <div className="banner">
        <h1>{title}</h1>
        <p>Ayush Care medical institute is a state of the art medical facility dedicated to providing world class health care services. Every doctor that works here treats every patient with love and compassion and we always wish for the betterment of our patients</p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className='animated-image'/>
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  )
}

export default Hero