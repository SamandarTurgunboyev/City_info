import React from 'react'
import Navbar from '../navbar/Navbar'
import City from '../city/City'

const Home = () => {
    return (
        <div>
            <Navbar search={true} city={"All City"}/>
            <City />
        </div>
    )
}

export default Home