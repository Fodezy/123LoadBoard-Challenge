import dbconnect from "@/functions/dbconnect";
import { makeOpenAIRequest } from "@/functions/parse_gpt";
import { promisify } from 'util'; // Import promisify

export default async function handler(req, res) {
    try {
        // Connect to the database
        console.log("Gonna connect to the database");
        const con = dbconnect('34.42.173.231', 'root', 'BIUouwbwi739372');

        // Get the form data
        const { email, name, skill, availability } = req.body;

        // Parse the availability using GPT
        // console.log("Gonna parse availability");
        const parsed_availability = await makeOpenAIRequest(availability);

        // console.log("Parsed Availability: " + String(parsed_availability));
        console.log("Gonna insert into database");

        // Insert the form data into the database
        const q = `INSERT INTO submissions (email, availability, name, skill) VALUES (?, ?, ?, ?)`;
        // const q = `INSERT INTO submissions (email, availability, name, skill) VALUES (?, ?, ?, ?)`;
        
        // Promisify the query function
        const queryPromise = promisify(con.query).bind(con);
        await queryPromise(q, [email, parsed_availability, name, 'empty']);

        console.log("1 record inserted");
        //resolve the promise
     
        

        con.end();
    } catch (error) {
        console.error("Error in handler: ", error);
        // con.end();
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    } finally {
        // Close the database connection
        
        //resolve the promise
        res.status(200).json({ status: 'success', message: 'Form submitted successfully' });
    }

}
