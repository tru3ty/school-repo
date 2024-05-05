import { useState } from 'react'
import './App.css'
import fetchWeatherData from './api/weatherRequest'
import getWindDirection from './api/getWindDirection'
import { Button } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";

const CITIES = [
    { key: "khabarovsk", label: "Хабаровск" },
    { key: "moscow", label: "Москва" },
    { key: "novosibirsk", label: "Новосибирск" },
    { key: "ekaterinburg", label: "Екатеринбург" },
    { key: "nizhniy-novgorod", label: "Нижний Новгород" },
    { key: "kazan", label: "Казань" },
    { key: "chelyabinsk", label: "Челябинск" },
    { key: "omsk", label: "Омск" },
    { key: "rostov-na-donu", label: "Ростов-на-Дону" },
    { key: "krasnoyarsk", label: "Красноярск" },
    { key: "perm", label: "Пермь" },
    { key: "voronezh", label: "Воронеж" },
    { key: "volgograd", label: "Волгоград" },
];
type weatherDataType = {
    resolvedAddress: string
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
    const [location, setLocation] = useState('')
    const [weather, setWeather] = useState<weatherDataType>()
    const [error, setError] = useState('')
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);

    const onSelectionChange = (key: React.Key) => {
        const city = CITIES.find((city) => city.key === key)?.label
        if (city) {
            setLocation(city)
        }
    };
    const onInputChange = (value: string) => { setLocation(value) };

    const getWeatherHandler = async () => {
        setLoading(() => true)
        setWeather(undefined)
        const data = await fetchWeatherData(location)
        if (data) {
            setTimeout(() => {
                setWeather(data)
                setError('')
                console.log('data set')
                setLoading(() => false)
            }, 1200);
        } else {
            setError('Ошибка получения погоды!')
            setLoading(() => false)
        }
    }

    return (
        <div className='flex flex-col items-center gap-2 text-white '>
            <h1 className={'font-bold mb-2'}>Погода</h1>
            <div className='max-w-80 w-80'>
                {loading ? (
                    // TODO: Add spinner
                    <p>Загрузка...</p>
                ) : error ? (
                    <p className='text-red-500'> {error} </p>
                ) : weather ? (
                    <div className='grid grid-cols-2 gap-2 oddeven'>
                        <p className='col-span-2 mb-2 text-lg font-semibold'> {weather.resolvedAddress} </p>
                        <p>Температура: </p>
                        <p>{weather.currentConditions.temp}℃</p>
                        <p className='col-span-2'>{weather.currentConditions.conditions}</p>
                        {isAdvancedMode ? (
                            <>
                                <p>Ощущается как: </p>
                                <p>{weather.currentConditions.feelslike}℃</p>
                                <p>Давление:</p>
                                <p>{weather.currentConditions.pressure ? weather.currentConditions.pressure * 0.75 : 0} мм рт. ст.</p>
                                <p>Ветер: </p>
                                <p>{weather.currentConditions.windspeed} м/с, {getWindDirection(weather.currentConditions.windspeed)}</p>

                            </>
                        ) : null}
                    </div>


                ) : null}
            </div>
            <div className="card">
                <div className='flex flex-col gap-1 mt-4 max-w-80 w-80'>
                    <Autocomplete
                        label="Выберите город"
                        defaultItems={CITIES}
                        className="max-w-xs"
                        allowsCustomValue={true}
                        onSelectionChange={onSelectionChange}
                        onInputChange={onInputChange}
                        size='sm'
                    >
                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                    {/* TODO: Change button color */}
                    <Button color='primary' onClick={getWeatherHandler}>
                        Получить погоду
                    </Button>
                    <div className="flex items-center gap-2 text-white">
                        {/* TODO: Change switch color */}
                        <Switch color='secondary' checked={isAdvancedMode} onChange={e => setIsAdvancedMode(e.target.checked)} />
                        Расширенный режим
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App