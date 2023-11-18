import dbconnect from "@/functions/dbconnect";
import parse_avail_input from "@/functions/parse_avail_input";
import parse_gpt from "@/functions/parse_gpt";
import { makeOpenAIRequest } from "@/functions/parse_gpt";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//the submit endpoint will accept a form as a put request and add it to a database
//receive the form data from the client

//call dbconnect on 34.42.173.231


export default function handler(req, res) {

    //connect to the database
    console.log("gonna connect to the database")
    const con = dbconnect('34.42.173.231', 'root', 'BIUouwbwi739372',);
    //get the form data
    const { email, name, skill, availability } = req.body;
    //parse the availability
    console.log("gonna parse availability")
  
    makeOpenAIRequest(availability).then((parsed_availability) => {
    //insert the form data into the database
    const q = `INSERT INTO submissions (email, availability, name, skill) VALUES ('${email}', '${parsed_availability}', '${name}', '${skill}');`;
        con.query(q, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        }
        );
        //return a response
        res.status(200).json({ message: 'Form submitted successfully', });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({ message: 'Error submitting form', });
    });
}
