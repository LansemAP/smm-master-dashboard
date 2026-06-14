const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

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
        const { name, strategy, profileText, limit, apiKey } = req.body || {};

        if (!name) {
            res.status(400).json({ error: 'Missing target name.' });
            return;
        }

        const finalApiKey = apiKey || process.env.ANTHROPIC_API_KEY;

        if (!finalApiKey) {
            res.status(400).json({ 
                error: 'Anthropic API Key is missing. Please set the ANTHROPIC_API_KEY environment variable on Vercel or enter your API key in SMM Connection Agent settings.' 
            });
            return;
        }

        // Construct strategy description
        let strategyDesc = '';
        if (strategy === 'credentials') {
            strategyDesc = 'Focus on the target\'s impressive credentials and professional achievements. Compliment them sincerely without being salesy.';
        } else if (strategy === 'networking') {
            strategyDesc = 'Soft industry networking approach. Express interest in sharing ideas, connecting as peers, and staying in touch.';
        } else {
            strategyDesc = 'Focus on capacity scaling, workflows, ledger automation, or addressing operations bottlenecks without a hard pitch.';
        }

        // System prompt instructing Claude to return EXACTLY 3 JSON options
        const systemPrompt = `You are a professional B2B LinkedIn outreach copywriter. Your task is to write high-converting, personalized, non-salesy LinkedIn connection request notes for Arnab Pati (Global Account Owner at SMM Master).
The target's name is ${name}.
The outreach strategy description is: ${strategyDesc}.
The target's profile copy/headline/details are: "${profileText || 'None provided'}".
The maximum character limit for each note is strictly ${limit} characters (including spaces, punctuation, and 'Hi [Name]' and 'Best, Arnab').

You MUST output exactly three distinct options, formatted as a JSON array of objects, where each object has:
- 'title': A short descriptive title for this option (e.g., 'Appreciation of Credentials', 'Soft Industry Networking', 'Workflow Capacity Focus').
- 'text': The actual connection note text, which must be strictly under ${limit} characters.

Example response format:
[
  {
    "title": "Option Title 1",
    "text": "Hi [FirstName], came across..."
  },
  {
    "title": "Option Title 2",
    "text": "Hi [FirstName], noticed your..."
  },
  {
    "title": "Option Title 3",
    "text": "Hi [FirstName], hope you..."
  }
]

Do not include any introductory or concluding text, markdowns (like \`\`\`json), or explanation outside of the raw JSON array. Respond ONLY with the raw JSON array. Make sure the texts are diverse and represent the chosen strategy well. Keep the tone friendly, human, and professional.`;

        const response = await fetch(ANTHROPIC_API_URL, {
            method: 'POST',
            headers: {
                'x-api-key': finalApiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1000,
                temperature: 0.7,
                messages: [
                    {
                        role: 'user',
                        content: `Generate 3 LinkedIn connection note options for target "${name}" (limit ${limit} chars) using the strategy "${strategy}".`
                    }
                ],
                system: systemPrompt
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            res.status(response.status).json({ 
                error: `Anthropic API error: ${errText}` 
            });
            return;
        }

        const data = await response.json();
        let contentText = '';
        if (data.content && data.content[0] && data.content[0].text) {
            contentText = data.content[0].text.trim();
        } else {
            throw new Error('Unexpected response format from Anthropic API.');
        }

        // Clean markdown backticks if Claude returns it as a block
        if (contentText.startsWith('```')) {
            contentText = contentText.replace(/^```[a-zA-Z]*\n/, '').replace(/\n```$/, '').trim();
        }

        try {
            const options = JSON.parse(contentText);
            res.status(200).json(options);
        } catch (parseError) {
            console.error('Failed to parse Claude response:', contentText);
            // Fallback: send as a single custom option
            res.status(200).json([
                {
                    title: 'Generated Outreach Option',
                    text: contentText.length > limit ? contentText.slice(0, limit - 3) + '...' : contentText
                }
            ]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
