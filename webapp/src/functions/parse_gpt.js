const axios = require('axios');

export async function makeOpenAIRequest(user_input) {
  const data = {
    max_tokens: 400,
    messages: [
      {
        role: "user",
        content: "Parse the following user input into a JSON object representing their availability from Monday to Sunday, with time intervals between 8 AM and 8 PM in 3-hour intervals. Each interval should be represented as either true or false for availability. Assume they are not available by default at a specific time unless mentioned. Only respond with a JSON string containing the availability. User Input: "+user_input+"\n Expected JSON Format: {\n  \"Monday\": {\n    \"8:00 AM\": true,\n    \"11:00 AM\": false,\n    \"2:00 PM\": true,\n    \"5:00 PM\": false,\n    \"8:00 PM\": false\n  },\n  // Continue for each day of the week with the same structure\n}"
      }
    ],
    model:"gpt-3.5-turbo-16k-0613"

  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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' 
  };


  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, { headers: headers });
    console.log(response.data['choices'][0]['message']['content']);
    
    return response.data['choices'][0]['message']['content'];
  } catch (error) {
    console.error(error);
    return error;
  }
}

// makeOpenAIRequest("Im free monday at noon, thursday evening, and night, and friday morning");
