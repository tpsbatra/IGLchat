import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code: "en-US", label: "English" },
  { code: "hi-IN", label: "हिन्दी" },
  { code: "mr-IN", label: "मराठी" },
  { code: "es-ES", label: "Español" },
  { code: "fr-FR", label: "Français" },
  { code: "ar-SA", label: "العربية" },
  { code: "pt-BR", label: "Português" },
  { code: "bn-BD", label: "বাংলা" },
  { code: "de-DE", label: "Deutsch" },
  { code: "zh-CN", label: "中文" },
  { code: "sw-KE", label: "Kiswahili" },
  { code: "ur-PK", label: "اردو" },
];

const NGO = {
  name: "I Gift Life",
  tagline: "Organ Donation Awareness",
  welcome: "Welcome to I Gift Life! We're here to help and provide information on organ donation. For specific medical details, please contact an expert in your city or reach out to us directly.",
  phone: "9011032370",
  whatsapp: "9011032370",
  website: "www.igiftlife.com",
  websiteUrl: "https://www.igiftlife.com",
  botName: "Hope",
  botIntro: "Hi! I am Hope 👋 I am here to help you with information on organ donation. You can type or speak your question in any language.",
};

// ── Icons ──────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, fill = "none", stroke = "currentColor", sw = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const MicIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const SendIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const StopIcon = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2" />
  </svg>
);

const HeartIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const PhoneIcon = () => <Icon size={13} d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.41 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.93 5.93l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />;

const GlobeIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const ThumbUpIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

const ThumbDownIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
    <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
  </svg>
);

const CheckIcon = () => (
  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = `
  @keyframes pulseRing { 0% { transform:scale(1);opacity:.7; } 100% { transform:scale(1.55);opacity:0; } }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes heartbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
  @keyframes dotBounce { 0%,80%,100%{transform:scale(.55);opacity:.4} 40%{transform:scale(1);opacity:1} }
  .msg-enter { animation: fadeUp .25s ease-out; }
  .mic-btn { transition: transform .15s, background .2s; }
  .mic-btn:hover:not(:disabled) { transform: scale(1.07); }
  .mic-btn:active:not(:disabled) { transform: scale(.95); }
  .send-btn { transition: background .15s, transform .1s; }
  .send-btn:hover:not(:disabled) { background: var(--color-background-secondary) !important; }
  .send-btn:active:not(:disabled) { transform: scale(.95); }
  .chip:hover { background: #FFE8E8 !important; border-color: #FFB0B0 !important; }
  .chip { transition: background .15s, border-color .15s; cursor: pointer; }
  .fb-btn:hover { background: var(--color-background-secondary) !important; }
  .fb-btn { transition: background .15s, color .15s; }
  .contact-link { transition: opacity .15s; text-decoration: none; }
  .contact-link:hover { opacity: .7; }
  textarea:focus { outline:none; box-shadow:0 0 0 2px #FFB0B0; border-color:#FFB0B0 !important; }
  textarea { resize: none; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--color-border-secondary); border-radius: 2px; }
`;

// ── BotAvatar ──────────────────────────────────────────────────────────────────
const BotAvatar = ({ logo }) => (
  <div style={{
    width: 30, height: 30, borderRadius: "50%",
    background: logo ? "transparent" : "#FFF0F0",
    border: "0.5px solid #FFD0D0",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, overflow: "hidden", color: "#E05555",
  }}>
    {logo
      ? <img src={logo} alt="Hope" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      : <HeartIcon size={14} />}
  </div>
);

// ── FeedbackButtons ────────────────────────────────────────────────────────────
const FeedbackButtons = ({ msgId, feedback, onFeedback }) => {
  const given = feedback[msgId];
  return (
    <div style={{ display: "flex", gap: 4, marginTop: 4, justifyContent: "flex-start" }}>
      {["up", "down"].map(dir => (
        <button
          key={dir}
          className="fb-btn"
          onClick={() => onFeedback(msgId, dir)}
          title={dir === "up" ? "Helpful" : "Not helpful"}
          style={{
            background: given === dir ? (dir === "up" ? "#E8F8EE" : "#FFF0F0") : "transparent",
            border: `0.5px solid ${given === dir ? (dir === "up" ? "#A0D8B0" : "#FFB0B0") : "var(--color-border-tertiary)"}`,
            borderRadius: 6, padding: "3px 7px", cursor: "pointer",
            color: given === dir ? (dir === "up" ? "#2A7A4A" : "#C03030") : "var(--color-text-tertiary)",
            display: "flex", alignItems: "center",
          }}
        >
          {dir === "up" ? <ThumbUpIcon /> : <ThumbDownIcon />}
        </button>
      ))}
      {given && (
        <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", alignSelf: "center", marginLeft: 2 }}>
          {given === "up" ? "Thanks!" : "Sorry about that"}
        </span>
      )}
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
export default function App() {
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [suggestedQs, setSuggestedQs] = useState([]);
  const [language, setLanguage] = useState(() => {
    const bl = navigator.language || "en-US";
    return LANGUAGES.find(l => l.code.startsWith(bl.split("-")[0]))?.code || "en-US";
  });
  const [status, setStatus] = useState("idle");
  const [conversation, setConversation] = useState([
    { id: "intro", role: "bot", text: NGO.botIntro }
  ]);
  const [feedback, setFeedback] = useState({});
  const [error, setError] = useState(null);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [textInput, setTextInput] = useState("");
  const [inputMode, setInputMode] = useState("text");
  const [kbLoaded, setKbLoaded] = useState(false);
  const [logo, setLogo] = useState(null);

  const transcriptRef = useRef("");
  const recognitionRef = useRef(null);
  const conversationEndRef = useRef(null);
  const msgIdRef = useRef(1);

  const nextId = () => `msg-${msgIdRef.current++}`;

  // ── Load KB from repo on mount ───────────────────────────────────────────────
  useEffect(() => {
    const loadXlsx = () => new Promise((res) => {
      if (window.XLSX) { res(); return; }
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
      s.onload = res;
      document.head.appendChild(s);
    });

    const fetchKB = async () => {
      try {
        await loadXlsx();
        const resp = await fetch("/knowledge-base.xlsx");
        if (!resp.ok) throw new Error("KB file not found");
        const buf = await resp.arrayBuffer();
        const wb = window.XLSX.read(new Uint8Array(buf), { type: "array" });
        const allPairs = [];
        for (const sheetName of wb.SheetNames) {
          const sheet = wb.Sheets[sheetName];
          const rows = window.XLSX.utils.sheet_to_json(sheet, { header: 1 });
          if (!rows.length) continue;
          let start = 0;
          if (rows[0]) {
            const h = rows[0].map(c => String(c).toLowerCase());
            if (h[0]?.includes("q") || h[0]?.includes("question") || h[0]?.includes("ask")) start = 1;
          }
          for (let i = start; i < rows.length; i++) {
            const r = rows[i];
            if (r[0] && r[1]) allPairs.push({ category: sheetName, question: String(r[0]).trim(), answer: String(r[1]).trim() });
          }
        }
        if (!allPairs.length) throw new Error("Empty KB");
        setKnowledgeBase(allPairs);
        setSheetNames(wb.SheetNames);
        // Pick up to 4 suggested questions spread across sheets
        const picks = [];
        const perSheet = Math.max(1, Math.floor(4 / wb.SheetNames.length));
        for (const sn of wb.SheetNames) {
          const sheet = allPairs.filter(p => p.category === sn);
          picks.push(...sheet.slice(0, perSheet).map(p => p.question));
          if (picks.length >= 4) break;
        }
        setSuggestedQs(picks.slice(0, 4));
        setKbLoaded(true);
      } catch (e) {
        setError("Could not load knowledge base. Make sure knowledge-base.xlsx is in the /public folder.");
      }
    };

    fetchKB();

    // Try loading logo
    const img = new Image();
    img.onload = () => setLogo("/logo.png");
    img.onerror = () => setLogo(null);
    img.src = "/logo.png";
  }, []);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, liveTranscript, status]);

  // ── Ask Claude (with memory + semantic matching) ───────────────────────────
  const askClaude = async (question) => {
    const kbText = knowledgeBase.map(p => `[Topic: ${p.category}]\nQ: ${p.question}\nA: ${p.answer}`).join("\n\n");

    // Build conversation history for Claude (last 10 turns for memory)
    const history = conversation
      .filter(m => m.id !== "intro")
      .slice(-10)
      .map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));

    history.push({ role: "user", content: question });

    const systemPrompt = `You are Hope, a helpful and compassionate voice assistant for I Gift Life — an NGO focused on organ donation awareness. Your name is Hope.

ACCURACY RULES (very important):
- Use semantic understanding to find the closest matching answer in the knowledge base, even if the user's phrasing differs significantly from the stored question.
- If a user asks a follow-up like "tell me more", "why?", "how?", use the conversation history to understand what they're referring to.
- If multiple KB entries are relevant, synthesize a coherent answer from all of them.

STRICT GUARDRAILS:
1. ONLY answer using the knowledge base below. Do not use outside knowledge.
2. If nothing in the KB is relevant, say: "I don't have specific information on that. Please contact I Gift Life at ${NGO.phone} or visit ${NGO.websiteUrl}."
3. Politely decline off-topic questions with: "I'm only able to help with organ donation questions through I Gift Life."
4. NEVER give medical, legal, or financial advice. Say: "For medical guidance, please consult a qualified doctor or contact us to connect you with an expert in your city."
5. Always be warm, respectful, and culturally sensitive.
6. Keep responses concise — 2–4 sentences max, as they may be read aloud.
7. IMPORTANT: Detect the language the user wrote in and always reply in that same language.

KNOWLEDGE BASE:
${kbText}`;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ system: systemPrompt, messages: history }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.text;
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = language;
    utt.rate = 0.93;
    utt.pitch = 1.05;
    utt.onstart = () => setStatus("speaking");
    utt.onend = () => setStatus("idle");
    utt.onerror = () => setStatus("idle");
    synth.speak(utt);
  };

  const handleAnswer = async (question) => {
    if (!question.trim() || status !== "idle") return;
    if (!kbLoaded) { setError("Knowledge base is still loading, please wait a moment."); return; }
    const uid = nextId();
    setConversation(prev => [...prev, { id: uid, role: "user", text: question }]);
    setStatus("thinking");
    setError(null);
    try {
      const answer = await askClaude(question);
      const bid = nextId();
      setConversation(prev => [...prev, { id: bid, role: "bot", text: answer }]);
      speak(answer);
    } catch {
      setStatus("idle");
      setError("Connection error. Please try again.");
    }
  };

  const handleTextSubmit = () => {
    const q = textInput.trim();
    if (!q || status !== "idle") return;
    setTextInput("");
    handleAnswer(q);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleTextSubmit(); }
  };

  const handleMicClick = () => {
    if (status === "listening") { recognitionRef.current?.stop(); return; }
    if (status !== "idle") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setError("Speech recognition isn't supported here. Please use Chrome or Edge, or switch to text input."); return; }
    const rec = new SR();
    rec.lang = language;
    rec.continuous = false;
    rec.interimResults = true;
    rec.onstart = () => { setStatus("listening"); setLiveTranscript(""); transcriptRef.current = ""; setError(null); };
    rec.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join("");
      transcriptRef.current = t;
      setLiveTranscript(t);
    };
    rec.onend = () => {
      const q = transcriptRef.current.trim();
      setLiveTranscript("");
      if (!q) { setStatus("idle"); return; }
      handleAnswer(q);
    };
    rec.onerror = (e) => {
      setStatus("idle");
      if (e.error === "not-allowed") setError("Microphone access denied. Please use the text tab, or allow mic access in browser settings.");
      else if (e.error !== "no-speech") setError(`Mic error: ${e.error}`);
    };
    recognitionRef.current = rec;
    rec.start();
  };

  const stopSpeaking = () => { window.speechSynthesis.cancel(); setStatus("idle"); };
  const handleFeedback = (id, dir) => setFeedback(prev => ({ ...prev, [id]: dir }));

  const showSuggestions = suggestedQs.length > 0 && conversation.length <= 1 && status === "idle";

  return (
    <div style={{ fontFamily: "var(--font-sans, system-ui)", maxWidth: 620, margin: "0 auto", padding: "1.25rem 1rem", display: "flex", flexDirection: "column", gap: "1rem", minHeight: "100vh", boxSizing: "border-box" }}>
      <style>{styles}</style>

      {/* ── Header ── */}
      <div style={{ padding: "1.25rem 1.5rem", borderRadius: 12, border: "0.5px solid #FFD0D0", background: "#FFF8F8" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {logo
              ? <img src={logo} alt="I Gift Life" style={{ height: 42, width: "auto", objectFit: "contain" }} />
              : <div style={{ color: "#E05555", animation: "heartbeat 2.2s ease-in-out infinite" }}><HeartIcon size={22} /></div>
            }
            <div>
              <h1 style={{ margin: 0, fontWeight: 500, fontSize: 18, color: "#B02020", letterSpacing: "-0.3px" }}>{NGO.name}</h1>
              <p style={{ margin: 0, fontSize: 11, color: "#C05050", letterSpacing: "0.6px", textTransform: "uppercase" }}>{NGO.tagline}</p>
            </div>
          </div>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            style={{ fontSize: 12, padding: "5px 8px", borderRadius: 8, border: "0.5px solid #FFD0D0", background: "#FFF0F0", color: "#B02020", cursor: "pointer" }}
          >
            {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "#7A2020", lineHeight: 1.65 }}>{NGO.welcome}</p>
        {kbLoaded && (
          <p style={{ margin: "8px 0 0", fontSize: 11, color: "#C05050" }}>
            {knowledgeBase.length} answers ready · {sheetNames.length} topic{sheetNames.length !== 1 ? "s" : ""}: {sheetNames.join(", ")}
          </p>
        )}
      </div>

      {/* ── Error ── */}
      {error && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 14px", borderRadius: 8, background: "var(--color-background-danger, #FFF0F0)", border: "0.5px solid var(--color-border-danger, #FFB0B0)", fontSize: 13, color: "var(--color-text-danger, #C03030)", gap: 8 }}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, display: "flex", alignItems: "center", flexShrink: 0 }}><CloseIcon /></button>
        </div>
      )}

      {/* ── Conversation ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, overflowY: "auto", paddingRight: 4, minHeight: 200, maxHeight: 420 }}>
        {conversation.map((msg) => (
          <div key={msg.id} className="msg-enter">
            <div style={{ display: "flex", gap: 8, justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end" }}>
              {msg.role === "bot" && <BotAvatar logo={logo} />}
              <div style={{
                maxWidth: "78%", padding: "10px 14px",
                borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: msg.role === "user" ? "var(--color-background-info, #E8F0FF)" : "var(--color-background-secondary, #F5F5F5)",
                border: "0.5px solid var(--color-border-tertiary, #E0E0E0)",
                fontSize: 14, lineHeight: 1.65,
                color: msg.role === "user" ? "var(--color-text-info, #1040A0)" : "var(--color-text-primary, #1A1A1A)",
              }}>
                {msg.text}
              </div>
            </div>
            {msg.role === "bot" && msg.id !== "intro" && (
              <div style={{ paddingLeft: 38 }}>
                <FeedbackButtons msgId={msg.id} feedback={feedback} onFeedback={handleFeedback} />
              </div>
            )}
          </div>
        ))}

        {status === "listening" && liveTranscript && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ maxWidth: "78%", padding: "10px 14px", borderRadius: "16px 16px 4px 16px", background: "var(--color-background-info, #E8F0FF)", border: "1px dashed var(--color-border-info, #90B0F0)", fontSize: 14, color: "var(--color-text-info, #1040A0)", opacity: 0.75 }}>
              {liveTranscript}
            </div>
          </div>
        )}

        {status === "thinking" && (
          <div className="msg-enter" style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <BotAvatar logo={logo} />
            <div style={{ padding: "12px 16px", borderRadius: "16px 16px 16px 4px", background: "var(--color-background-secondary, #F5F5F5)", border: "0.5px solid var(--color-border-tertiary, #E0E0E0)", display: "flex", gap: 5, alignItems: "center" }}>
              {[0, 0.18, 0.36].map(d => (
                <div key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: "#E05555", animation: `dotBounce 1.1s ease-in-out ${d}s infinite` }} />
              ))}
            </div>
          </div>
        )}

        <div ref={conversationEndRef} />
      </div>

      {/* ── Suggested questions ── */}
      {showSuggestions && (
        <div>
          <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--color-text-secondary, #666)" }}>Suggested questions:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {suggestedQs.map((q, i) => (
              <button
                key={i}
                className="chip"
                onClick={() => handleAnswer(q)}
                style={{ fontSize: 12, padding: "5px 12px", borderRadius: 20, border: "0.5px solid #FFD0D0", background: "#FFF8F8", color: "#B02020", cursor: "pointer" }}
              >
                {q.length > 55 ? q.slice(0, 52) + "…" : q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input area ── */}
      <div style={{ border: "0.5px solid var(--color-border-tertiary, #E0E0E0)", borderRadius: 12, background: "var(--color-background-primary, #FFF)", overflow: "hidden" }}>
        <div style={{ display: "flex", borderBottom: "0.5px solid var(--color-border-tertiary, #E0E0E0)" }}>
          {[{ key: "text", label: "Type a question" }, { key: "voice", label: "Ask by voice" }].map(m => (
            <button key={m.key} onClick={() => setInputMode(m.key)} style={{ flex: 1, padding: "9px 12px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: inputMode === m.key ? 500 : 400, background: "transparent", color: inputMode === m.key ? "#B02020" : "var(--color-text-secondary, #666)", borderBottom: inputMode === m.key ? "2px solid #E05555" : "2px solid transparent", transition: "all .15s" }}>
              {m.label}
            </button>
          ))}
        </div>

        {inputMode === "text" ? (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, padding: "10px 12px" }}>
            <textarea
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. How do I register as an organ donor?"
              disabled={status !== "idle"}
              rows={2}
              style={{ flex: 1, border: "0.5px solid var(--color-border-tertiary, #E0E0E0)", borderRadius: 8, padding: "8px 12px", fontSize: 14, background: "var(--color-background-secondary, #F5F5F5)", color: "var(--color-text-primary, #1A1A1A)", lineHeight: 1.5, opacity: status !== "idle" ? 0.5 : 1 }}
            />
            <button className="send-btn" onClick={handleTextSubmit} disabled={!textInput.trim() || status !== "idle"} style={{ width: 38, height: 38, borderRadius: 8, border: "0.5px solid var(--color-border-tertiary, #E0E0E0)", background: "var(--color-background-primary, #FFF)", cursor: !textInput.trim() || status !== "idle" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: !textInput.trim() || status !== "idle" ? "var(--color-text-tertiary, #AAA)" : "var(--color-text-primary, #1A1A1A)", flexShrink: 0 }}>
              <SendIcon />
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "1.25rem" }}>
            <div style={{ position: "relative" }}>
              {status === "listening" && (
                <div style={{ position: "absolute", inset: -12, borderRadius: "50%", border: "2px solid #FFB0B0", animation: "pulseRing 1.4s ease-out infinite", pointerEvents: "none" }} />
              )}
              <button className="mic-btn" onClick={status === "speaking" ? stopSpeaking : handleMicClick} disabled={status === "thinking"} style={{ width: 64, height: 64, borderRadius: "50%", border: "0.5px solid var(--color-border-tertiary, #E0E0E0)", background: status === "listening" ? "#FFF0F0" : status === "speaking" ? "#FFF0F0" : "var(--color-background-primary, #FFF)", cursor: status === "thinking" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: ["listening", "speaking"].includes(status) ? "#E05555" : "var(--color-text-primary, #1A1A1A)", opacity: status === "thinking" ? 0.35 : 1 }}>
                {status === "speaking" ? <StopIcon /> : <div style={status === "listening" ? { animation: "heartbeat 1s ease-in-out infinite", display: "flex" } : {}}><MicIcon size={22} /></div>}
              </button>
            </div>
            <p style={{ margin: 0, fontSize: 12, textAlign: "center", minHeight: 16, lineHeight: 1.4, color: ["listening", "speaking"].includes(status) ? "#E05555" : "var(--color-text-secondary, #666)" }}>
              {status === "idle" && "Tap to speak your question"}
              {status === "listening" && (liveTranscript || "Listening — speak now...")}
              {status === "thinking" && "Finding your answer..."}
              {status === "speaking" && "Speaking — tap to stop"}
            </p>
          </div>
        )}
      </div>

      {/* ── Contact strip ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", alignItems: "center", padding: "10px 14px", border: "0.5px solid #FFD0D0", borderRadius: 12, background: "#FFF8F8" }}>
        <span style={{ fontSize: 11, color: "#C05050", marginRight: 2 }}>Contact us:</span>
        <a href={`tel:${NGO.phone}`} className="contact-link" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#B02020" }}><PhoneIcon /> {NGO.phone}</a>
        <span style={{ color: "#FFB0B0" }}>·</span>
        <a href={`https://wa.me/${NGO.whatsapp}`} target="_blank" rel="noreferrer" className="contact-link" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#B02020" }}><WhatsappIcon /> WhatsApp</a>
        <span style={{ color: "#FFB0B0" }}>·</span>
        <a href={NGO.websiteUrl} target="_blank" rel="noreferrer" className="contact-link" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#B02020" }}><GlobeIcon /> {NGO.website}</a>
      </div>

      <p style={{ margin: 0, textAlign: "center", fontSize: 11, color: "var(--color-text-tertiary, #AAA)" }}>
        Powered by I Gift Life · Voice works best in Chrome
      </p>
    </div>
  );
}
