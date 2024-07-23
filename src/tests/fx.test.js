import assert from 'assert';
import { suite, test } from 'node:test';
import { filterByAnimalsName, updateNamesWithCounts } from "../fx.js";
import { data } from "../data/data.js";

suite("Filter by animals name", () => {

    let animalName = "Duck";
    const filterResult = filterByAnimalsName(data, animalName);
    const filterResultAllPeople = filterResult.reduce((accumulator, current) => accumulator.concat(current.people), []);

    test("Countries Test'", () => {

        // Number of countries with people who have Duck
        assert.strictEqual(filterResult.length, 3);

        assert.strictEqual(filterResult[0].name, "Dillauti");
        assert.strictEqual(filterResult[1].name, "Tohabdal");
        assert.strictEqual(filterResult[2].name, "Uzuzozne");
    })

    test("Peoples Test", () => {

        // Number of people who have Duck
        assert.strictEqual(filterResultAllPeople.length, 4);

        assert.strictEqual(filterResultAllPeople[0].name, "Winifred Graham");
        assert.strictEqual(filterResultAllPeople[1].name, "Louise Pinzauti");
        assert.strictEqual(filterResultAllPeople[2].name, "Alexander Fleury");
        assert.strictEqual(filterResultAllPeople[3].name, "Lina Allen");

    })

    test("Every people has right animal", () => {

        const everyoneHasDuck = filterResultAllPeople.every(person =>
            person.animals.some(animal => animal.name === animalName)
        );

        assert.strictEqual(everyoneHasDuck, true);

    })

})

suite("Update names with counts", () => {

    const updateNamesResult = updateNamesWithCounts(data);

    test("Countries Test", () => {

        assert.strictEqual(updateNamesResult.length, 5);

        assert.strictEqual(updateNamesResult[0].name, "Dillauti [5]");
        assert.strictEqual(updateNamesResult[1].name, "Tohabdal [8]");
        assert.strictEqual(updateNamesResult[2].name, "Uzuzozne [7]");
        assert.strictEqual(updateNamesResult[3].name, "Zuhackog [7]");
        assert.strictEqual(updateNamesResult[4].name, "Satanwi [5]");


    })

    test("Peoples Test", () => {

        const updateNamesResultAllPeople = updateNamesResult.reduce((accumulator, current) => accumulator.concat(current.people), []);

        assert.strictEqual(updateNamesResultAllPeople.length, 32);

        assert.strictEqual(updateNamesResultAllPeople[0].name, "Winifred Graham [6]");
        assert.strictEqual(updateNamesResultAllPeople[1].name, "Blanche Viciani [8]");
        assert.strictEqual(updateNamesResultAllPeople[2].name, "Philip Murray [7]");
        assert.strictEqual(updateNamesResultAllPeople[3].name, "Bobby Ristori [9]");
        assert.strictEqual(updateNamesResultAllPeople[4].name, "Louise Pinzauti [5]");
        assert.strictEqual(updateNamesResultAllPeople[5].name, "Effie Houghton [7]");
        assert.strictEqual(updateNamesResultAllPeople[6].name, "Essie Bennett [7]");
        assert.strictEqual(updateNamesResultAllPeople[7].name, "Owen Bongini [5]");
        assert.strictEqual(updateNamesResultAllPeople[8].name, "Alexander Fleury [7]");
        assert.strictEqual(updateNamesResultAllPeople[9].name, "Curtis Fuchs [6]");
        assert.strictEqual(updateNamesResultAllPeople[10].name, "Maud Lorenzo [7]");
        assert.strictEqual(updateNamesResultAllPeople[11].name, "Linnie Lamb [7]");
        assert.strictEqual(updateNamesResultAllPeople[12].name, "Randall Benoît [5]");
        assert.strictEqual(updateNamesResultAllPeople[13].name, "Harold Patton [8]");
        assert.strictEqual(updateNamesResultAllPeople[14].name, "Millie Lapini [8]");
        assert.strictEqual(updateNamesResultAllPeople[15].name, "Lillian Calamandrei [8]");
        assert.strictEqual(updateNamesResultAllPeople[16].name, "Lina Allen [7]");
        assert.strictEqual(updateNamesResultAllPeople[17].name, "Georgia Hooper [8]");
        assert.strictEqual(updateNamesResultAllPeople[18].name, "Lillie Abbott [6]");
        assert.strictEqual(updateNamesResultAllPeople[19].name, "Philip Davis [8]");
        assert.strictEqual(updateNamesResultAllPeople[20].name, "Elva Baroni [6]");
        assert.strictEqual(updateNamesResultAllPeople[21].name, "Johnny Graziani [7]");
        assert.strictEqual(updateNamesResultAllPeople[22].name, "Herman Christensen [7]");
        assert.strictEqual(updateNamesResultAllPeople[23].name, "Fannie Ancillotti [8]");
        assert.strictEqual(updateNamesResultAllPeople[24].name, "Lawrence Camiciottoli [9]");
        assert.strictEqual(updateNamesResultAllPeople[25].name, "Marion Landi [6]");
        assert.strictEqual(updateNamesResultAllPeople[26].name, "Lou de Bruin [5]");
        assert.strictEqual(updateNamesResultAllPeople[27].name, "Elmer Kinoshita [7]");
        assert.strictEqual(updateNamesResultAllPeople[28].name, "Cora Howell [7]");
        assert.strictEqual(updateNamesResultAllPeople[29].name, "Ernest Conte [5]");
        assert.strictEqual(updateNamesResultAllPeople[30].name, "Dennis Franci [9]");
        assert.strictEqual(updateNamesResultAllPeople[31].name, "Anthony Bruno [6]");








    })

})