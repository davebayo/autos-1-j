export const IS_DEMO_MODE = true;

export const OPERATOR_DETAILS = {
  name: "Modfem Autos Canada",
  location: "Vaughan, Ontario, Canada",
  whatsapp: "+1 (437) 776-5303",
  whatsappUrl: "https://wa.me/14377765303",
  secondaryWhatsApp: "+234 807 42961", // Note: 11th digit missing intentionally in spec? "flagged for 11th-digit verification" - we'll leave as is
  email: "Modfemtidings@yahoo.com"
};

export function getWhatsAppUrl(contextMessage: string) {
  const encodedMessage = encodeURIComponent(contextMessage);
  return `https://wa.me/14377765303?text=${encodedMessage}`;
}
