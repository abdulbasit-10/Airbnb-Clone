const { GoogleGenerativeAI } = require ("@google/generative-ai");


const ai = new GoogleGenerativeAI("AIzaSyCwHvqQw5JKrNZHBp_kWU5pe15k7g74a_k");

const blockedKeywords = ["harassment", "violence", "hack", "self-harm", "abuse", "love"];

function containsBlockedKeyword(input) {
  const lowerInput = input.toLowerCase();
  return blockedKeywords.some(keyword => lowerInput.includes(keyword));
}

async function geminiChatResponse(userQuery , res) {
  try {
    if (containsBlockedKeyword(userQuery)) {
      return [
        {
          name: "Blocked",
          description: "Unsafe query detected, request rejected.",
          url: "https://upload.wikimedia.org/wikipedia/commons/1/19/Cross_mark.png"
        }
      ];
    }

const prompt = `
Return EXACTLY 10 AI tools as a valid JavaScript array. 
EVERY OBJECT MUST FOLLOW THIS STRUCTURE STRICTLY:

{
  name: "Tool Name",                   // must start with name:
  description: "One short line only",  // must start with description:
  url: "HTTPS IMAGE LOGO link"         // must be a DIRECT IMAGE URL (.png / .jpg / .svg)
}

RULES — DO NOT BREAK THESE:
- Keys MUST be exactly: name, description, url (lowercase only)
- URL MUST BE A DIRECT LOGO IMAGE LINK (NOT a webpage)
- NO missing keys
- NO extra keys
- NO description":
- NO name":
- NO quotes before the key
- NO commentary. NO explanation. NO backticks.
Return ONLY a VALID JavaScript array.
The tools must be related to: "${userQuery}"
`;


const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const {response} = await model.generateContent({
      contents: [
    { role: "user", parts: [{ text: prompt }] }
  ]
    });

    let rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text ;

    rawText = rawText
      .replace(/```(json|javascript)?/g, "")
      .replace(/```/g, "")
      .replace(/(\w)"\s*:/g, '$1:')      
      .trim();    

      console.log(rawText)
    let tools = [];
    try {
      tools = Function(`return ${rawText}`)(); 
    } catch (err) {
      console.error("Parsing failed:", err);
    }

    res.status(200).json(tools);
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return [];
  }
}

module.exports = geminiChatResponse ;
