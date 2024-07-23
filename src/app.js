import Utils from "./lib/utils.js";
import { data } from "./data/data.js";
import { filterByAnimalsName , updateNamesWithCounts} from "./fx.js";

try {

    // Store the data in a local var to update the dataset if previously filtered
    let workingData = data;

    // Get the arguments
    const argvs = Utils.getArgv()

    // Check if filter argument is provided
    const hasFilter = (argvs.hasOwnProperty("filter") && argvs["filter"].type === "argv" && argvs["filter"].value !== undefined);
    if (hasFilter){
        workingData = filterByAnimalsName(workingData, argvs["filter"].value);
        console.log(JSON.stringify(workingData,null,2));
    }

    // Check if count flag is provided
    const hasCount = (argvs.hasOwnProperty("count") && argvs["count"].type === "flag");
    if (hasCount){
        workingData = updateNamesWithCounts(workingData);
        console.log(JSON.stringify(workingData,null,2));
    }

} catch (error) {

    console.error("Error: ", error.code,error.message);
    process.exit(1)

}