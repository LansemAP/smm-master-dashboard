const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1/models';

module.exports = async (req, res) => {
    // Enable CORS for localhost and local files (e.g. file://)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
        return;
    }

    try {
        const { apiKey } = req.body || {};
        const finalApiKey = apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

        if (!finalApiKey) {
            res.status(400).json({ 
                error: 'Gemini API Key is missing. Please set the GEMINI_API_KEY environment variable on Vercel or enter your API key in SMM settings.'
            });
            return;
        }

        const geminiUrl = `${GEMINI_API_BASE}/gemini-1.5-flash:generateContent?key=${finalApiKey}`;
        
        const promptText = `Perform a real-time search on Google to find the top 20 trending, viral, or highly engaging professional/business social media posts (e.g., from LinkedIn or Twitter/X) in India from the last 48 hours. Focus on real current topics: business, start-ups, AI technology, corporate culture, notice periods, IT sector, or economic shifts.

For each post, output:
1. Topic: A brief descriptive title or theme of the post.
2. Media Type: Exactly one of: "carousel", "video", "image", "text".
3. Likes: Estimated number of likes/reactions as an integer.
4. Comments: Estimated number of comments as an integer.
5. Engagement Rate: An estimated percentage string (e.g. "4.5%").
6. Excerpt: A 2-3 sentence description/preview of the post contents.

Also search for the actual trending hashtags on professional social networks (LinkedIn/Twitter) in India over three timeframes: the last 24 hours, the last 48 hours, and the last 1 week. For each tag, provide estimated growth rate (e.g. "+25%").

Generate exactly 20 posts in the 'posts' array, and 5-7 tags each for hashtags24h, hashtags48h, and hashtags1w.

You MUST respond strictly with a single JSON object. Do not write any explanations, do not add introductory text. Respond only with the raw JSON.

Output format:
{
  "hashtags24h": [
    { "tag": "#FutureOfWork", "growth": "+18%" }
  ],
  "hashtags48h": [
    { "tag": "#RatanTataLegacy", "growth": "+45%" }
  ],
  "hashtags1w": [
    { "tag": "#DigitalTransformation", "growth": "+16%" }
  ],
  "posts": [
    {
      "topic": "Hustle Culture Notice Period Debate",
      "mediaType": "image",
      "likes": 14100,
      "comments": 880,
      "engagementRate": "5.9%",
      "excerpt": "A post discussing the 90-day notice period in India's IT services sector compared to global standards went viral. It triggered hundreds of comments from engineers and HR managers debating productivity and hiring timelines."
    }
  ]
}`;

        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: promptText
                    }]
                }],
                tools: [{
                    googleSearch: {}
                }]
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            res.status(response.status).json({ 
                error: `Gemini API error: ${errText}` 
            });
            return;
        }

        const data = await response.json();
        let contentText = '';
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            contentText = data.candidates[0].content.parts[0].text.trim();
        } else {
            throw new Error('Unexpected response format from Gemini API.');
        }

        // Clean markdown code blocks if the model wrapped the JSON
        let cleanText = contentText;
        if (cleanText.includes('```')) {
            cleanText = cleanText.replace(/```json/g, '').replace(/```/g, '').trim();
        }
        
        // Extract JSON using boundary index in case of any conversational fluff
        const firstBracket = cleanText.indexOf('{');
        const lastBracket = cleanText.lastIndexOf('}');
        if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
            cleanText = cleanText.substring(firstBracket, lastBracket + 1);
        }

        try {
            const trends = JSON.parse(cleanText);
            res.status(200).json(trends);
        } catch (parseError) {
            console.error('Failed to parse Gemini trends response:', contentText);
            res.status(500).json({ 
                error: 'Failed to parse live trends data from AI response.', 
                details: parseError.message,
                raw: contentText 
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
