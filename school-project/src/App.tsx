import { useState } from 'react'
import './App.css'
import fetchWeatherData from './api/weatherRequest'
import getWindDirection from './api/getWindDirection'
import { Button } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";

type weatherDataType = {
    currentConditions: {
        moonphase: string
        conditions: string
        temp: number
        datetime: string
        feelslike: number
        windspeed: number
        pressure: number
        sunrise: string
        sunset: string
    }
}

function App() {
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState('Хабаровск')
    const [weather, setWeather] = useState<weatherDataType>()
    const [error, setError] = useState('')
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);

    // const getWeatherHandler = async () => {
    //     setLoading(prev => true);
    //     setWeather(undefined);
    //     setError('');

    //     try {
    //         const data = await fetchWeatherData(location);
    //         if (data) {
    //             setTimeout(() => {
    //                 setWeather(data);
    //                 setLoading(prev => false);
    //             }, 2000);
    //         } else {
    //             setError('Ошибка получения погоды!');
    //             setLoading(prev => false);
    //         }
    //     } catch (error) {
    //         setError('Ошибка получения погоды!');
    //         setLoading(prev => false);
    //     }
    // };
    const getWeatherHandler = async () => {
        setLoading(prev => true)
        setWeather(undefined)
        const data = await fetchWeatherData(location)
        if (data) {
            setTimeout(() => {
                setWeather(data)
                setError('')
                console.log('data set')
                setLoading(prev => false)
            }, 2000);
        } else {
            setError('Ошибка получения погоды!')
            setLoading(prev => false)
        }
    }

    return (
        <>
            <h1 className={'font-bold mb-4'}>Погода</h1>
            <div className=''>
                {loading ? (
                    <p> Загрузка... </p>
                ) : error ? (
                    <p className='text-red-500'> {error} </p>
                ) : weather ? (
                    <>
                        {isAdvancedMode ? (
                            <>
                                <p>Температура: {weather.currentConditions.temp}℃</p>
                                <p>Ощущается как: {weather.currentConditions.feelslike}℃</p>
                                <p>Давление: {weather.currentConditions.pressure ? weather.currentConditions.pressure * 0.75 : 0} мм рт. ст.</p>
                                <p>Ветер: {weather.currentConditions.windspeed} м/с, {getWindDirection(weather.currentConditions.windspeed)}</p>
                                <p>{weather.currentConditions.conditions}</p>
                            </>
                        ) : (
                            <>
                                <p>Температура: {weather.currentConditions.temp}℃</p>
                                <p>{weather.currentConditions.conditions}</p>
                            </>
                        )}
                    </>


                ) : null}
            </div>
            <div className="card">
                <p className='text-2xl font-semibold'> Ваш город: </p>
                <div className='flex flex-col gap-2 mt-4'>
                    <Autocomplete allowsCustomValue label="Введите название города" value={location} onChange={e => setLocation(e.target.value)}>
                    </Autocomplete>
                    <Button color='secondary' onClick={getWeatherHandler}>
                        Получить погоду
                    </Button>
                    <div className="flex flex-col gap-2">
                        <Switch checked={isAdvancedMode} onChange={e => setIsAdvancedMode(e.target.checked)}>
                            Расширенный режим
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App