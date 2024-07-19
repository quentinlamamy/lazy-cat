/**
 * Filter the dataset by the animals name
 * @param {Object[]} dataset 
 * @param {String} animalsNameFilter 
 * @returns {Object[]} Updated dataset
 */
function filterByAnimalsName(dataset, animalsNameFilter) {

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

/**
 * Update the names of the people and countries with the count of animals they have
 * @param {Object[]} dataset 
 * @returns {Object[]} Updated dataset
 */
function updateNamesWithCounts(dataset) {

    console.log("Updating names with counts");

    // Loop through each country
    return dataset.map(country => {

        // Loop through each person of the country
        const updatedPeople = country.people.map(person => {

            // Get the count of animals
            const animalCount = person.animals.length;

            // Return the person as is except for the name that is updated with animal count
            return {
                ...person,
                name: `${person.name} [${animalCount}]`
            };

        });

        // Get the count of people
        const personCount = updatedPeople.length;

        // Return the country as is except for the name that is updated with person count and the people list that is updated with animal count
        return {
            ...country,
            name: `${country.name} [${personCount}]`,
            people: updatedPeople
        };
    });

}

export { filterByAnimalsName, updateNamesWithCounts };