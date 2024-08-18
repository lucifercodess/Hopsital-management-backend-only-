import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Departments from '../components/Departments'
import MessageForm from '../components/MessageForm'

const Home = () => {
  let title = "Ayush Care Medical Institute | Your Health Buddy"
  return (
    <div>
      <Hero title={title} imageUrl={'/hero.png'}/>
      <Biography imageUrl={'/about.png'}/>
      <Departments/>
      <MessageForm/>
    </div>
  )
}

export default Home