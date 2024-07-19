function filterByAnimalsName(dataset,animalsNameFilter){

    console.log("Filtering by animals name: ", animalsNameFilter);

    return dataset
        // Loop through each country
        .map(country => {

            const filteredPeople = country.people

                // Loop through each person
                .map(person => {

                    // Filter the person animals list according to the filter
                    const filteredAnimals = person.animals.filter(animal => animal.name.includes(animalsNameFilter));
                    
                    // Return the person as is except for the animals list that is filtered
                    return {
                        ...person,
                        animals: filteredAnimals
                    };

                })
                // Filter person who has animals remaining after filtering
                .filter(person => person.animals.length > 0); 

            return {

                // Return the country as is except for the people list that is filtered
                ...country,
                people: filteredPeople
            };
        })
        // Filter countries that have people remaining after filtering
        .filter(country => country.people.length > 0);

}

function updateNamesWithCounts(dataset){

    console.log("Updating names with counts");

    return dataset.map(country => {
        const updatedPeople = country.people.map(person => {
            const animalCount = person.animals.length;
            return {
                ...person,
                name: `${person.name} [${animalCount}]`
            };
        });

        const personCount = updatedPeople.length;
        return {
            ...country,
            name: `${country.name} [${personCount}]`,
            people: updatedPeople
        };
    });

}

export { filterByAnimalsName, updateNamesWithCounts };