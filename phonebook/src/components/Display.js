import Person from "./Person.js"

const Display = ({namesToShow, removePerson}) => {
    return (
        <>
            <ul>
                {namesToShow.map( person => 
                    <Person key={person.name} person={person} removePerson={removePerson}/>
                )}
            </ul>
        </>
    )
}

export default Display