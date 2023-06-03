import Details from "./Details"

const Display = ({countryList, setCountry}) => {


    if (countryList.length > 10){
        return <p>Too many matches, specify another filter</p>
    }
    else if (countryList.length > 1){
        return (
            <ul>
                { countryList.map( country =>
                    <li key={country.name.official}>{country.name.common}
                        <button key={`${country.cca2}btn`} onClick={ () => setCountry([country])}>show</button>
                    </li>
                    )

                }
            </ul>
        )
    }
    else if (countryList.length === 1) {
        return <Details country={countryList[0]} />
    }

    return null
}

export default Display