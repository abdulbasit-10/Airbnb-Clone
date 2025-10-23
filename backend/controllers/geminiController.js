const { GoogleGenerativeAI } = require ("@google/generative-ai");


const ai = new GoogleGenerativeAI({ apiKey: "AIzaSyCwHvqQw5JKrNZHBp_kWU5pe15k7g74a_k" });

const blockedKeywords = ["harassment", "violence", "hack", "self-harm", "abuse", "love"];

function containsBlockedKeyword(input) {
  const lowerInput = input.toLowerCase();
  return blockedKeywords.some(keyword => lowerInput.includes(keyword));
}

async function geminiChatResponse(userQuery) {
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

    // ✅ Ask Gemini to return EXACTLY 10 TOOLS in correct JS array format
    const prompt = `
Return EXACTLY 10 AI tools as a valid JavaScript array.
Each item MUST be in this format:
{
  name: "Tool Name",
  description: "1 line description only",
  url: "REAL official logo image URL"
}
DO NOT explain. DO NOT add extra text. DO NOT wrap in quotes or JSON.stringify.
The tools must be related to: "${userQuery}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        { role: "user", parts: [{ text: prompt }] }
      ]
    });

    const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // ✅ Try to safely evaluate Gemini JS array response
    let tools = [];
    try {
      tools = eval(rawText); // Careful: Gemini will output plain JS array
    } catch (err) {
      console.error("Eval parsing error:", err);
    }

    return Array.isArray(tools) ? tools : [];
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return [];
  }
}

module.exports = geminiChatResponse ;
