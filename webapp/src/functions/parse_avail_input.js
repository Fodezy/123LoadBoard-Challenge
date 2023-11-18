//function that takes in user availibility input as a string and makes an api request to openai with the availibility string as the prompt
//return a json object with the availibility string and the response from openai
//   "content": "Parse the following user input into a JSON object representing their availability from Monday to Sunday, with time intervals between 8 AM and 8 PM in 3-hour intervals. Each interval should be represented as either true or false for availability. In this instance, set all intervals to false. Assume they are not available by default at a specific time unless mentioned. Only respond with a JSON string containing the availability. User Input: \""+availibility+"\" Expected JSON Format: {\\n  \\\"Monday\\\": {\\n    \\\"8:00 AM\\\": false,\\n    \\\"11:00 AM\\\": false,\\n    \\\"2:00 PM\\\": false,\\n    \\\"5:00 PM\\\": false,\\n    \\\"8:00 PM\\\": false\\n  },\\n  // Continue for each day of the week with the same structure\\n}"
export default function parse_avail_input(availability) {
    var axios = require('axios');

    var data = JSON.stringify({
      "prompt": "say hello world",
      "model": "davinci",
      "max_tokens": 400
    });

    var config = {
      method: 'post',
      url: 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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' // Replace with your actual API key
      },
      data: data
    };

    console.log("Making the request");
    return axios(config)
      .then(function (response) {
        try {
          var json = JSON.parse(response.data.choices[0].text);
          return json;
        } catch (error) {
          console.log("Error parsing JSON:", error);
        }
      })
      .catch(function (error) {
        console.log("Error in request:", error);
      });
}
