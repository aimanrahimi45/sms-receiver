export default async function handler(req, res) {
    const { id } = req.query;
    const API_KEY = process.env.SMSHUB_API_KEY;

    if (!id) {
        return res.status(400).json({ error: "Missing order ID" });
    }

    const url = `https://smshub.org/stubs/handler_api.php?api_key=${API_KEY}&action=getStatus&id=${id}`;

    const response = await fetch(url);
    const data = await response.text();

    if (data.startsWith("STATUS_OK")) {
        const [, code] = data.split(":");
        res.json({ code });
    } else {
        res.status(500).json({ error: "SMS not received yet", details: data });
    }
}
