import axios from 'axios';

const N8N_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

export const triggerN8N = async (event: string, data: any) => {
    if (!N8N_URL || N8N_URL.includes('placeholder')) {
        console.warn(`n8n webhook URL not configured. Event "${event}" not sent.`, data);
        return;
    }

    try {
        const response = await axios.post(N8N_URL, {
            event,
            data,
            source: 'bdm_headless_core',
            timestamp: new Date().toISOString()
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to trigger n8n event: ${event}`, error);
        // We don't throw here to avoid breaking the UI flow for an optional automation
    }
};
