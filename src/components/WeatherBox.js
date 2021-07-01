import {useState, useEffect} from 'react'

    const WeatherBox = () => {

        const [lat, setLat] = useState(0);
        const [long, setLong] = useState(0);
        const [wea, setWea] = useState ([])
        const [fahren, setFahren] = useState('');
    
        const apiUrl = 'https://api.openweathermap.org' 
        const apiKey = '44e12c2c90e9628afb2b4912d8f26f86';

        useEffect(()  => {
            navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            });
        }, [])            //primer useEffect para obtener geoloc con mi latitud y long MDN / Sin dep

        useEffect(() => {
            const fetchData = async () => {
            await fetch(`${apiUrl}/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
            .then(res => res.json())
            .then(result => {
                setWea(result)
                console.log(result)
            });  
            }
        
            if (lat && long) {
                fetchData();
              }
        }, [lat,long])     //segundo useEffect para obtener info de la API / dep lat y long
   
        if(!wea.weather) {
            return <div className="loading"><h2>Loading...</h2></div>       //spinner
        }
        
        let toCelcious = `${((wea.main.temp) - 263.15).toFixed(0)} °C`
        const icon = `https://openweathermap.org/img/wn/${wea.weather[0].icon}@2x.png` 

        const handleClick = () => {
            let toFah = `${( (((wea.main.temp) - 263.15).toFixed(0)) * 1.8 + 32).toFixed(0) } °F`
            setFahren(toFah);
        }

        return(
        <div className = "bigbox">
            <div className="box">
            <h3>Current Weather in:</h3>
                <h1>{wea.name} - {wea.sys.country}</h1>
                <img src={icon} alt="weather"/>
                <h1>{toCelcious}</h1>
                <p>{wea.weather[0].main} - {wea.weather[0].description}</p>
                <h2>{fahren}</h2>
            <div>
                <button className="button"  onClick={handleClick} >Get Fahrenheit</button>
            </div>
            </div>
        </div>
        );  
    }
        
    export default WeatherBox