const axios = require('axios');

export async function makeOpenAIRequest(user_input) {
    const data = {
        max_tokens: 800,
        messages: [
            {
                role: "user",
                content: "Parse the following user input into a JSON object so that it represents their availability from Monday to Sunday in that order, set the time intervals to be between 8 AM to 8 PM, I want these to be in 1 hour intervals. Each time interval should be represented as either: true if they are available; false if they are not. I want you to assume that they are not available by default at the specified time unless mentioned otherwise. Only repsond with the JSON string containing the availability. User input: " +
                user_input +
                '\n Expected JSON Format: {\n  "Monday": {\n    "8:00 AM": false,\n} {\n "Monday": {\n	"8:00 AM": false,\n	"9:00 AM": false,\n		"10:00 AM": false,\n	"11:00 AM": false,\n 	"12:00 PM": false,\n	"1:00 PM": false,\n		"2:00 PM": false, \n	"3:00 PM": false, \n	"4:00 PM": false,\n		"5:00 PM": false,\n    "6:00 PM": false,\n    "7:00 PM": false,\n    "8:00 PM": false\n		},\n // Continue for each day of the week with the same structure\n}',
                content: "Parse the following user input into a JSON object representing their availability from Monday to Sunday, with time intervals between 8 AM and 8 PM in 3-hour intervals. Each interval should be represented as either true or false for availability. Assume they are not available by default at a specific time unless mentioned. Only respond with a JSON string containing the availability. User Input: " + user_input + "\n Expected JSON Format: {\n  \"Monday\": {\n    \"8:00 AM\": true,\n    \"11:00 AM\": false,\n    \"2:00 PM\": true,\n    \"5:00 PM\": false,\n    \"8:00 PM\": false\n  },\n  // Continue for each day of the week with the same structure\n}"
            }
        ],
        model: "gpt-3.5-turbo-16k-0613"
    };

    const headers = {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer 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`
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}}`
    };
    console.log("API KEY: " + process.env.OPENAI_API_KEY)

    // Return the promise chain
    return axios.post('https://api.openai.com/v1/chat/completions', data, { headers: headers })
        .then((response) => {
            console.log(response.data['choices'][0]['message']['content']);
            return response.data['choices'][0]['message']['content'];
        }).catch((error) => {
            console.log(error);
            return "error";
        });
}
