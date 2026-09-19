import { GeminiSearchResponse } from './types';

export async function askGeminiSafari(query: string): Promise<GeminiSearchResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback response if API key is not configured yet
  if (!apiKey) {
    return {
      answer: `Hey Zoe! You asked about "${query}". I love your curiosity! To enable full live AI conversational responses on Render or localhost, add a free GEMINI_API_KEY to your environment variables. In the meantime, did you know cheetahs use their tails like rudders at 70 mph?`,
      funFact: "Dogs have about 300 million olfactory receptors in their noses, compared to about 6 million in humans!",
      habitatOrEra: "Global Wildlife & Habitats",
      coolRating: "10/10 Pure Wildness",
      sourceTitle: "National Geographic Kids",
      sourceUrl: "https://kids.nationalgeographic.com/"
    };
  }

  const systemInstruction = `
You are the dedicated AI Safari Guide in "Zoe's Wild World", an interactive web app crafted specifically for 13-year-old Zoe.
Zoe loves all animals: land animals, ocean/deep-sea creatures, mammals, reptiles, insects, dinosaurs, and prehistoric extinct beasts. Her absolute favorites are cats and dogs.

GUIDELINES FOR YOUR RESPONSE:
1. Address Zoe with energy, excitement, wit, and high scientific accuracy. Never sound babyish or condescending—speak to her like a sharp, curious 13-year-old science enthusiast!
2. STRICT GUARDRAIL: Only answer questions related to animals, zoology, paleontology, dinosaurs, wildlife, oceanography, or biology. If Zoe asks anything off-topic (e.g. video games, math homework, general trivia, politics), politely and playfully decline with an animal pun (e.g. "Hold your horses, Zoe! I'm an animal guide! Ask me about velociraptors or golden retrievers instead!").
3. Always include a legitimate citation link to an authentic source (e.g. National Geographic, Smithsonian, IUCN Red List, Monterey Bay Aquarium, San Diego Zoo Wildlife Alliance, or American Museum of Natural History).
4. Return ONLY valid JSON in the exact structure:
{
  "answer": "Your direct, engaging answer to Zoe...",
  "funFact": "A jaw-dropping bonus flash fact about this animal...",
  "habitatOrEra": "Where it lives or geological period (e.g., Late Cretaceous / Deep Abyss / African Savanna)...",
  "coolRating": "e.g. 10/10 Apex Predator",
  "sourceTitle": "Name of legitimate source organization",
  "sourceUrl": "https://..."
}
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemInstruction}\n\nUser Question: ${query}` }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
        maxOutputTokens: 800
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.statusText}`);
    }

    const data = await res.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error("No response content from Gemini");
    }

    const parsed: GeminiSearchResponse = JSON.parse(candidateText);
    return parsed;
  } catch (err: unknown) {
    console.error("Gemini search error:", err);
    return {
      answer: `Hey Zoe! We dug deep into the animal archives for "${query}". Animals are full of surprises—did you know domestic cats share 95.6% of their DNA with Siberian tigers?`,
      funFact: "T-Rex had teeth up to 12 inches long, including the root!",
      habitatOrEra: "Global Paleontology & Zoology",
      coolRating: "9.9/10 Fierce Curiosity",
      sourceTitle: "Smithsonian's National Zoo",
      sourceUrl: "https://nationalzoo.si.edu/"
    };
  }
}
