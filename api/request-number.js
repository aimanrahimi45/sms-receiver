export default async function handler(req, res) {
    const API_KEY = process.env.SMSHUB_API_KEY;
    const COUNTRY_CODE = 6; // Malaysia
    const SERVICE_CODE = "zus"; // Zus Coffee

    const url = `https://smshub.org/stubs/handler_api.php?api_key=${API_KEY}&action=getNumber&service=${SERVICE_CODE}&country=${COUNTRY_CODE}`;

    const response = await fetch(url);
    const data = await response.text();

    if (data.startsWith("ACCESS_NUMBER")) {
        const [, id, phone] = data.split(":");
        res.json({ id, phone });
    } else {
        res.status(500).json({ error: "Failed to get a phone number", details: data });
    }
}
