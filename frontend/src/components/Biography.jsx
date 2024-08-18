import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h2>About us</h2>
        <p>Ayush Care Medical Institute is a premier healthcare facility dedicated to providing comprehensive medical services with a patient-centered approach. Our institute is committed to delivering the highest quality of care across various medical specialties, ensuring that every patient receives personalized and compassionate treatment</p>
        <p> With a team of experienced doctors, skilled nurses, and state-of-the-art technology, we offer a wide range of healthcare services, from routine check-ups to complex surgical procedures.</p>
        <p>At Ayush Care, we prioritize patient safety, comfort, and well-being, striving to create a healing environment that fosters recovery and promotes overall health. </p>
        <p>Our mission is to make world-class healthcare accessible to all, and we continually invest in our facilities and staff to stay at the forefront of medical advancements. Trust Ayush Care Medical Institute for your healthcare needs, where we are committed to excellence in every aspect of patient care.</p>
       
      </div>
    </div>
  )
}

export default Biography