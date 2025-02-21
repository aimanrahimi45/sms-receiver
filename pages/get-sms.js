export default async function handler(req, res) {
    const { id } = req.query;
    const API_KEY = process.env.SMSHUB_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: "API key is missing from environment variables" });
    }

    if (!id) {
        return res.status(400).json({ error: "Missing order ID" });
    }

    try {
        const url = `https://smshub.org/stubs/handler_api.php?api_key=${API_KEY}&action=getStatus&id=${id}`;
        const response = await fetch(url);
        const data = await response.text();

        if (data.startsWith("STATUS_OK")) {
            const [, code] = data.split(":");
            res.status(200).json({ code });
        } else {
            res.status(400).json({ error: "SMS not received yet", details: data });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
