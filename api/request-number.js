const axios = require("axios");

export default async function handler(req, res) {
    const apiKey = process.env.SMSHUB_API_KEY; 
    const country = "7";  // Malaysia
    const service = "aik"; // Zus Coffee

    try {
        const response = await axios.get(
            `https://smshub.org/stubs/handler_api.php?api_key=${apiKey}&action=getNumber&service=${service}&country=${country}`
        );

        if (response.data.includes("ACCESS_NUMBER")) {
            const parts = response.data.split(":");
            const id = parts[1]; 
            const number = parts[2]; 
            res.status(200).json({ id, number });
        } else {
            res.status(400).json({ error: "Failed to get a phone number", details: response.data });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
