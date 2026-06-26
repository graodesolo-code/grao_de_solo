import { contact } from "@/data/site";

/** Access key do Web3Forms (gratuito, sem backend). Definir em `.env` como VITE_WEB3FORMS_KEY. */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
  /** Honeypot anti-bot - tem de ficar sempre vazio. */
  company?: string;
}

export type ContactResult =
  | { status: "sent" }
  | { status: "mailto" }
  | { status: "error"; message: string };

/** Constrói um link mailto pré-preenchido como fallback de entrega. */
function buildMailto(data: ContactInput): string {
  const subject = `Novo contacto do site: ${data.name}`;
  const body = [
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Telefone: ${data.phone}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function openMailto(data: ContactInput): void {
  window.location.href = buildMailto(data);
}

/**
 * Envia uma mensagem de contacto.
 * - Com Web3Forms configurado: faz POST para a API deles (entrega por email, sem backend).
 * - Sem key, ou em falha: abre o cliente de email pré-preenchido (nunca perde o lead).
 */
export async function submitContact(data: ContactInput): Promise<ContactResult> {
  // Bot apanhado pelo honeypot - finge sucesso, não envia nada.
  if (data.company && data.company.trim() !== "") {
    return { status: "sent" };
  }

  if (!WEB3FORMS_KEY) {
    openMailto(data);
    return { status: "mailto" };
  }

  try {
    // As chaves (exceto as reservadas) viram as labels do email — por isso em PT.
    // `email` mantém-se assim para o Web3Forms o usar como reply-to.
    const payload: Record<string, string> = {
      access_key: WEB3FORMS_KEY,
      subject: `Novo contacto do site: ${data.name}`,
      from_name: "Grão de Solo - Site",
      Nome: data.name,
      email: data.email,
      Mensagem: data.message,
      botcheck: data.company ?? "", // honeypot lido também pelo Web3Forms
    };
    if (data.phone?.trim()) payload["Telefone"] = data.phone.trim();

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Web3Forms ${res.status}`);
    return { status: "sent" };
  } catch {
    // Falha de rede/serviço → não perder o contacto.
    openMailto(data);
    return { status: "mailto" };
  }
}
