import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    let latitude
    let longitude

    const [ position, setPosition ] = useState({  })

    const [ unitTemp, setUnitTem ] = useState(0)
    const [ isFarenheit, setFarenheit ] = useState(true)
 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
        
    },[]);

    const success = pos => {
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
        console.log(latitude, longitude);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fdd8194fdfe6de3035065fb724f9323a`)
            .then( res => {
                setPosition(res.data);
                setUnitTem((((res.data.main?.temp)-273) * (9/5)) + 32)
            })
    }
    console.log(position)

    const convertUnits = () =>{
        if(isFarenheit){
            setUnitTem((unitTemp - 32) * (5/9))
            setFarenheit(false)
        }else{
            setUnitTem((unitTemp * (9/5)) + 32);
            setFarenheit(true);
        }
    }

    return (
        <div className='weatherApp'>
            <div className='cardWeather'>

                <section className='encabezadoApp'>
                    <h5>World weather App</h5>
                    <h1>{position.name}, {position.sys?.country}</h1>
                </section>

                <div className='descriptionWeather' style={position.wether?.[0].icon}>
                    <section className='imgDescription'>
                        <img src= {`http://openweathermap.org/img/wn/${position.weather?.[0].icon}@2x.png` }  alt="imagen que ilustra el estado del tiempo"/>
                    </section>

                    <section className='weatherConditions'>
                        <h3>"{position.weather?.[0].description}"</h3>
                        <h4><i class="fa-solid fa-wind"></i>  Wind speed: {position.wind?.speed} [m/S]</h4>
                        <h4><i class="fa-solid fa-cloud"></i>  Clouds: {position.clouds?.all } [%] </h4>
                        <h4> <i class="fa-solid fa-temperature-full"></i> Preassure: {position.main?.pressure} [mb]</h4>
                    </section>
                </div>

                <section className='temperature'>
                    <h3> <i class="fa-solid fa-temperature-high"></i> <i class="fa-solid fa-temperature-list"></i> {unitTemp.toFixed(2)} {isFarenheit ? "°F" : "°C" } </h3>
                </section>

                <section className='button'>
                    <button onClick={convertUnits} > <i class="fa-solid fa-shuffle"></i> Convert to {isFarenheit ? "°C" : "°F"}  </button>
                </section>
                
            </div>
        </div>
    );
};

export default Weather;