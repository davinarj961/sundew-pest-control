import { businessInfo } from "@/lib/BusinessInfo";

export default function WhatsappFab() {
  // Strip spaces/symbols so it works as a wa.me link
  const cleanNumber = businessInfo.whatsapp.replace(/[^0-9]/g, "");

  return (
    <a
      href={`https://wa.me/${cleanNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-7 right-7 z-[100] w-[58px] h-[58px] rounded-full bg-forest-950 flex items-center justify-center shadow-[0_8px_24px_rgba(11,43,33,0.35)]"
      aria-label="Chat with us on WhatsApp"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
          stroke="#F7F5EF"
          strokeWidth="1.6"
        />
      </svg>
    </a>
  );
}