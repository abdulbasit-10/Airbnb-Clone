import React, { useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Hero from './pages/hero'
import Listings from './pages/listings'
import SignInPage from "./pages/signIn";
import SignUpPage from './pages/signUp'
import Categories from './pages/categories'
import AdvertisePage from './pages/advertise'
import Launches from './pages/Launches'
import News from './pages/news';

const App = () => {
  const [View, setView] = useState("home")
  return (
    <div className="relative ">
      <Header setView={setView}/> 
      {View === "launches" ? (
        <Launches />
      ) : (
          View === "advertise" ? (
            <AdvertisePage />
          ) : (
            <></>
          )
        )}
        {
          View === "News" || View === "news" ? <News /> 
          : <></>
        }
      {View === "home" && (
        <>
          <Hero/>
          <Listings />
          <Categories />
          {/* <News /> */}
          <Footer />
        </>
      )}
      {View === "signin" && <SignInPage setView={setView}/>} 
      {View === "signup" && <SignUpPage setView={setView} />}
    </div>
  )
}

export default App
