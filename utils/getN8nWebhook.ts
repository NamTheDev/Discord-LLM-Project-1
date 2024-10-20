export function getN8nWebhook(path: string) {
    return `http://${Bun.env.N8N_HOST_IP}:5678/webhook/${path}`;
}