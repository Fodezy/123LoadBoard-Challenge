import dbconnect from "@/functions/dbconnect";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//the submit endpoint will accept a form as a put request and add it to a database
//receive the form data from the client

//call dbconnect on 34.42.173.231


export default function handler(req, res) {
    //connect to the database
    const con = dbconnect('34.42.173.231', 'root', 'BIUouwbwi739372',);
    //get the form data
    const { email, name, skill, availability } = req.body;
    //insert the form data into the database
   const q = `INSERT INTO submissions (email, availability, name, skill) VALUES ('${email}', '${JSON.stringify(availability)}', '${name}', '${skill}');`;
    con.query(q, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    }
    );
    //return a response
    res.status(200).json({ message: 'Form submitted successfully', });
}
