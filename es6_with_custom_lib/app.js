import Utils from "./lib/utils.js";
import { data } from "./data/data.js";
import { filterByAnimalsName , updateNamesWithCounts} from "./fx.js";

console.clear();

try {

    // Store the data in a local var to update the dataset if previously filtered
    let workingData = data;

    // Get the arguments
    const argvs = Utils.getArgv()

    console.log(argvs);

    // Check if filter argument is provided
    const hasFilter = (argvs.hasOwnProperty("filter") && argvs["filter"].type === "argv" && argvs["filter"].value !== undefined);
    if (hasFilter){
        workingData = filterByAnimalsName(workingData, argvs["filter"].value);
        console.log(workingData);
    }

    // Check if count flag is provided
    const hasCount = (argvs.hasOwnProperty("count") && argvs["count"].type === "flag");
    if (hasCount){
        workingData = updateNamesWithCounts(workingData);
        console.log(workingData);
    }

} catch (error) {

    console.log("Error: ", error.message);
    process.exit(1)

}