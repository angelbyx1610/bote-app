import { useState, useEffect } from "react";

const theme = {
  bg: "#FFFBF7",
  bgCard: "#FFFFFF",
  bgLight: "#FFF4EC",
  bgMuted: "#F5EDE4",
  primary: "#E8803A",
  primaryDark: "#C4621C",
  text: "#1A1208",
  textMuted: "#7D6E5E",
  border: "#EDE3D8",
  success: "#2D9B6F",
  successLight: "#EDFAF3",
  danger: "#D84040",
};

const S = {
  app: {
    fontFamily: "'DM Sans', sans-serif",
    background: theme.bg,
    minHeight: "100vh",
    color: theme.text,
  },
  container: {
    maxWidth: 420,
    margin: "0 auto",
    padding: "0 20px 40px",
  },
  header: {
    padding: "24px 20px 0",
    maxWidth: 420,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 22,
    color: theme.primary,
    letterSpacing: "-0.5px",
  },
  card: {
    background: theme.bgCard,
    border: `1px solid ${theme.border}`,
    borderRadius: 20,
    padding: "20px",
    marginBottom: 12,
  },
  btn: {
    background: theme.primary,
    color: "#fff",
    border: "none",
    borderRadius: 14,
    padding: "14px 24px",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.15s",
  },
  btnOutline: {
    background: "transparent",
    color: theme.primary,
    border: `1.5px solid ${theme.primary}`,
    borderRadius: 14,
    padding: "13px 24px",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
  },
  btnSmall: {
    background: theme.primary,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "8px 16px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  input: {
    width: "100%",
    border: `1.5px solid ${theme.border}`,
    borderRadius: 12,
    padding: "13px 14px",
    fontSize: 16,
    fontFamily: "'DM Sans', sans-serif",
    background: theme.bgCard,
    color: theme.text,
    outline: "none",
    boxSizing: "border-box",
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: theme.textMuted,
    marginBottom: 6,
    display: "block",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 26,
    color: theme.text,
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 15,
    color: theme.textMuted,
    margin: "0 0 24px",
    lineHeight: 1.5,
  },
  back: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 22,
    color: theme.textMuted,
    padding: 0,
    fontFamily: "'DM Sans', sans-serif",
  },
};

function nanoid() {
  return Math.random().toString(36).slice(2, 10);
}

function ProgressBar({ meta, recaudado }) {
  const pct = Math.min(100, Math.round((recaudado / meta) * 100));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28, color: theme.text }}>
          {recaudado.toLocaleString("es-ES")}€
        </span>
        <span style={{ fontSize: 14, color: theme.textMuted, alignSelf: "flex-end", marginBottom: 4 }}>
          de {meta.toLocaleString("es-ES")}€
        </span>
      </div>
      <div style={{ background: theme.bgMuted, borderRadius: 99, height: 12, overflow: "hidden" }}>
        <div
          style={{
            background: pct >= 100 ? theme.success : theme.primary,
            height: "100%",
            borderRadius: 99,
            width: `${pct}%`,
            transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </div>
      <div style={{ textAlign: "right", marginTop: 6, fontSize: 13, color: theme.textMuted }}>
        {pct}% completado
      </div>
    </div>
  );
}

function Avatar({ nombre, size = 38 }) {
  const initials = nombre.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#E8803A", "#2D9B6F", "#5B8DEF", "#C25DE8", "#E85B5B"];
  const color = colors[nombre.charCodeAt(0) % colors.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color + "22",
        border: `2px solid ${color}33`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.35,
        color: color,
        flexShrink: 0,
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {initials}
    </div>
  );
}

// ─── SCREEN: HOME ────────────────────────────────────────────────────────────
function HomeScreen({ botes, onCreateNew, onOpenBote }) {
  return (
    <div>
      <div style={{ padding: "32px 0 24px" }}>
        <h1 style={{ ...S.title, fontSize: 32 }}>Tus botes 💸</h1>
        <p style={S.subtitle}>Juntos llega antes.</p>
      </div>

      {botes.length === 0 && (
        <div style={{ ...S.card, textAlign: "center", padding: "40px 20px", border: `1.5px dashed ${theme.border}` }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🫙</div>
          <p style={{ color: theme.textMuted, margin: 0 }}>Aún no tienes botes.<br />¡Crea el primero!</p>
        </div>
      )}

      {botes.map((b) => {
        const recaudado = b.miembros.filter((m) => m.pagado).reduce((s, m) => s + m.cantidad, 0);
        const pct = Math.min(100, Math.round((recaudado / b.meta) * 100));
        return (
          <div
            key={b.id}
            style={{ ...S.card, cursor: "pointer" }}
            onClick={() => onOpenBote(b)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 32 }}>{b.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17 }}>{b.nombre}</div>
                <div style={{ fontSize: 13, color: theme.textMuted }}>{b.miembros.length} personas · hasta {new Date(b.fecha).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}</div>
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: pct >= 100 ? theme.success : theme.primary }}>
                {pct}%
              </div>
            </div>
            <div style={{ background: theme.bgMuted, borderRadius: 99, height: 8 }}>
              <div style={{ background: pct >= 100 ? theme.success : theme.primary, height: "100%", borderRadius: 99, width: `${pct}%`, transition: "width 0.5s" }} />
            </div>
          </div>
        );
      })}

      <div style={{ marginTop: 8 }}>
        <button style={S.btn} onClick={onCreateNew}>+ Crear bote nuevo</button>
      </div>
    </div>
  );
}

// ─── SCREEN: CREATE ───────────────────────────────────────────────────────────
const EMOJIS = ["🌴", "🎁", "✈️", "🎉", "🎶", "⚽", "🍕", "🏖️", "🎂", "🚗", "🏔️", "💍"];

function CreateScreen({ onBack, onCreate }) {
  const [nombre, setNombre] = useState("");
  const [emoji, setEmoji] = useState("🎉");
  const [meta, setMeta] = useState("");
  const [fecha, setFecha] = useState("");
  const [miNombre, setMiNombre] = useState("");

  const valid = nombre.trim() && meta && Number(meta) > 0 && fecha && miNombre.trim();

  function handleSubmit() {
    if (!valid) return;
    const bote = {
      id: nanoid(),
      nombre: nombre.trim(),
      emoji,
      meta: Number(meta),
      fecha,
      token: nanoid(),
      miembros: [{ id: nanoid(), nombre: miNombre.trim(), cantidad: 0, pagado: false }],
    };
    onCreate(bote);
  }

  return (
    <div>
      <div style={{ padding: "32px 0 24px" }}>
        <h1 style={{ ...S.title, fontSize: 28 }}>Nuevo bote</h1>
        <p style={S.subtitle}>Dale un nombre, una meta y listo.</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={S.label}>Elige un emoji</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              style={{
                width: 44,
                height: 44,
                fontSize: 22,
                border: `2px solid ${emoji === e ? theme.primary : theme.border}`,
                borderRadius: 12,
                background: emoji === e ? theme.bgLight : theme.bgCard,
                cursor: "pointer",
              }}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={S.label}>Nombre del bote</label>
        <input style={S.input} placeholder="Ej: Viaje a Mallorca" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div>
          <label style={S.label}>Meta (€)</label>
          <input style={S.input} type="number" placeholder="500" value={meta} onChange={(e) => setMeta(e.target.value)} />
        </div>
        <div>
          <label style={S.label}>Fecha límite</label>
          <input style={S.input} type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={S.label}>Tu nombre</label>
        <input style={S.input} placeholder="Ej: Angel" value={miNombre} onChange={(e) => setMiNombre(e.target.value)} />
      </div>

      <button style={{ ...S.btn, opacity: valid ? 1 : 0.5 }} onClick={handleSubmit} disabled={!valid}>
        Crear bote 🎉
      </button>
      <button style={{ ...S.btnOutline, marginTop: 10 }} onClick={onBack}>Cancelar</button>
    </div>
  );
}

// ─── SCREEN: BOTE DETAIL ──────────────────────────────────────────────────────
function BoteScreen({ bote, onBack, onUpdate, onCelebrate }) {
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [copied, setCopied] = useState(false);

  const recaudado = bote.miembros.filter((m) => m.pagado).reduce((s, m) => s + m.cantidad, 0);
  const prometido = bote.miembros.reduce((s, m) => s + m.cantidad, 0);

  function togglePago(id) {
    const updated = {
      ...bote,
      miembros: bote.miembros.map((m) => m.id === id ? { ...m, pagado: !m.pagado } : m),
    };
    onUpdate(updated);
    const totalPagado = updated.miembros.filter((m) => m.pagado).reduce((s, m) => s + m.cantidad, 0);
    if (totalPagado >= bote.meta) {
      setTimeout(() => onCelebrate(updated), 400);
    }
  }

  function addMember() {
    if (!newMember.trim() || !newAmount || Number(newAmount) <= 0) return;
    const updated = {
      ...bote,
      miembros: [...bote.miembros, { id: nanoid(), nombre: newMember.trim(), cantidad: Number(newAmount), pagado: false }],
    };
    onUpdate(updated);
    setNewMember("");
    setNewAmount("");
    setShowAddMember(false);
  }

  function copyLink() {
    const link = `${window.location.origin}/unirse/${bote.token}`;
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <div style={{ padding: "32px 0 16px" }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>{bote.emoji}</div>
        <h1 style={{ ...S.title, fontSize: 26, marginBottom: 4 }}>{bote.nombre}</h1>
        <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 24 }}>
          Hasta {new Date(bote.fecha).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
        </div>
        <ProgressBar meta={bote.meta} recaudado={recaudado} />
      </div>

      {prometido < bote.meta && (
        <div style={{ background: theme.bgLight, border: `1px solid ${theme.primary}33`, borderRadius: 14, padding: "12px 16px", marginBottom: 16, fontSize: 14, color: theme.primaryDark }}>
          💡 Faltan {(bote.meta - prometido).toLocaleString("es-ES")}€ por comprometer entre todos.
        </div>
      )}

      <div style={S.card}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16 }}>
            Participantes ({bote.miembros.length})
          </span>
          <button style={S.btnSmall} onClick={() => setShowAddMember(!showAddMember)}>
            {showAddMember ? "Cancelar" : "+ Añadir"}
          </button>
        </div>

        {showAddMember && (
          <div style={{ background: theme.bgLight, borderRadius: 12, padding: 14, marginBottom: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 100px", gap: 8, marginBottom: 8 }}>
              <input style={{ ...S.input, padding: "10px 12px", fontSize: 14 }} placeholder="Nombre" value={newMember} onChange={(e) => setNewMember(e.target.value)} />
              <input style={{ ...S.input, padding: "10px 12px", fontSize: 14 }} type="number" placeholder="€" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
            </div>
            <button style={{ ...S.btn, padding: "10px", fontSize: 14 }} onClick={addMember}>Añadir al bote</button>
          </div>
        )}

        {bote.miembros.map((m) => (
          <div
            key={m.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 0",
              borderBottom: `1px solid ${theme.border}`,
              opacity: m.pagado ? 0.7 : 1,
            }}
          >
            <Avatar nombre={m.nombre} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, textDecoration: m.pagado ? "line-through" : "none", color: m.pagado ? theme.textMuted : theme.text }}>
                {m.nombre}
              </div>
              <div style={{ fontSize: 13, color: theme.textMuted }}>
                {m.cantidad > 0 ? `${m.cantidad}€ comprometidos` : "Sin cantidad definida"}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {m.cantidad > 0 && (
                <button
                  onClick={() => togglePago(m.id)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: `2px solid ${m.pagado ? theme.success : theme.border}`,
                    background: m.pagado ? theme.success : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    transition: "all 0.2s",
                  }}
                  title={m.pagado ? "Marcar como no pagado" : "Marcar como pagado"}
                >
                  {m.pagado ? "✓" : ""}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={S.card}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
          Compartir bote
        </div>
        <div style={{ background: theme.bgMuted, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: theme.textMuted, marginBottom: 10, wordBreak: "break-all", fontFamily: "monospace" }}>
          {window.location.origin}/unirse/{bote.token}
        </div>
        <button style={S.btn} onClick={copyLink}>
          {copied ? "¡Link copiado! ✓" : "Copiar link de invitación"}
        </button>
      </div>

      <button style={S.btnOutline} onClick={onBack}>← Volver</button>
    </div>
  );
}

// ─── SCREEN: JOIN ─────────────────────────────────────────────────────────────
function JoinScreen({ bote, onJoin, onBack }) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");

  const recaudado = bote.miembros.filter((m) => m.pagado).reduce((s, m) => s + m.cantidad, 0);

  function handleJoin() {
    if (!nombre.trim() || !cantidad || Number(cantidad) <= 0) return;
    const updatedBote = {
      ...bote,
      miembros: [...bote.miembros, { id: nanoid(), nombre: nombre.trim(), cantidad: Number(cantidad), pagado: false }],
    };
    onJoin(updatedBote);
  }

  return (
    <div>
      <div style={{ padding: "32px 0 24px" }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>{bote.emoji}</div>
        <h1 style={{ ...S.title, fontSize: 26 }}>Te han invitado a un bote</h1>
        <p style={S.subtitle}>{bote.nombre}</p>
        <ProgressBar meta={bote.meta} recaudado={recaudado} />
      </div>

      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 12 }}>Ya están dentro:</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {bote.miembros.map((m) => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 6, background: theme.bgMuted, borderRadius: 99, padding: "4px 12px 4px 6px" }}>
              <Avatar nombre={m.nombre} size={24} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{m.nombre}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={S.label}>Tu nombre</label>
        <input style={S.input} placeholder="Ej: Marta" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={S.label}>¿Cuánto pones? (€)</label>
        <input style={S.input} type="number" placeholder="Ej: 150" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
      </div>

      <button style={{ ...S.btn, opacity: nombre.trim() && cantidad ? 1 : 0.5 }} onClick={handleJoin}>
        Unirme al bote 🙌
      </button>
      <button style={{ ...S.btnOutline, marginTop: 10 }} onClick={onBack}>Cancelar</button>
    </div>
  );
}

// ─── SCREEN: CELEBRATE ────────────────────────────────────────────────────────
function CelebrateScreen({ bote, onBack }) {
  const shareText = `🎉 ¡El bote "${bote.nombre}" está completo! Hemos juntado ${bote.meta}€ entre ${bote.miembros.length} personas. ¡Nos vamos! 🚀`;

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
  }

  function copyShare() {
    navigator.clipboard.writeText(shareText).catch(() => {});
  }

  return (
    <div style={{ textAlign: "center", paddingTop: 48 }}>
      <div style={{ fontSize: 80, marginBottom: 16 }}>🎊</div>
      <h1 style={{ ...S.title, fontSize: 32, marginBottom: 8 }}>¡Bote completo!</h1>
      <p style={{ ...S.subtitle, marginBottom: 32 }}>
        Habéis juntado <strong>{bote.meta.toLocaleString("es-ES")}€</strong> entre {bote.miembros.length} personas.
      </p>

      <div style={{ ...S.card, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: -8, marginBottom: 16 }}>
          {bote.miembros.slice(0, 5).map((m, i) => (
            <div key={m.id} style={{ marginLeft: i > 0 ? -10 : 0, zIndex: i }}>
              <Avatar nombre={m.nombre} size={44} />
            </div>
          ))}
          {bote.miembros.length > 5 && (
            <div style={{ marginLeft: -10, width: 44, height: 44, borderRadius: "50%", background: theme.bgMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: theme.textMuted, fontWeight: 600 }}>
              +{bote.miembros.length - 5}
            </div>
          )}
        </div>
        <div style={{ fontSize: 15, color: theme.textMuted, fontStyle: "italic" }}>
          "{bote.nombre}" — {new Date(bote.fecha).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button style={S.btn} onClick={shareWhatsApp}>Compartir en WhatsApp 💬</button>
        <button style={S.btnOutline} onClick={copyShare}>Copiar mensaje</button>
        <button style={{ ...S.btnOutline, marginTop: 4 }} onClick={onBack}>Volver a mis botes</button>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  const [screen, setScreen] = useState("home"); // home | create | bote | join | celebrate
  const [botes, setBotes] = useState([
    {
      id: "demo1",
      nombre: "Viaje a Mallorca",
      emoji: "🏖️",
      meta: 800,
      fecha: "2026-07-20",
      token: "demo-token",
      miembros: [
        { id: "m1", nombre: "Angel", cantidad: 200, pagado: true },
        { id: "m2", nombre: "Marc", cantidad: 200, pagado: true },
        { id: "m3", nombre: "Júlia", cantidad: 200, pagado: false },
        { id: "m4", nombre: "Dani", cantidad: 200, pagado: false },
      ],
    },
  ]);
  const [activeBote, setActiveBote] = useState(null);

  function updateBote(updated) {
    setBotes((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    setActiveBote(updated);
  }

  function handleCreate(bote) {
    setBotes((prev) => [...prev, bote]);
    setActiveBote(bote);
    setScreen("bote");
  }

  function handleJoin(updated) {
    updateBote(updated);
    setScreen("bote");
  }

  return (
    <div style={S.app}>
      <div style={S.header}>
        <span style={S.logo}>bote.</span>
        {screen !== "home" && (
          <button style={S.back} onClick={() => setScreen("home")}>
            ×
          </button>
        )}
      </div>

      <div style={S.container}>
        {screen === "home" && (
          <HomeScreen
            botes={botes}
            onCreateNew={() => setScreen("create")}
            onOpenBote={(b) => { setActiveBote(b); setScreen("bote"); }}
          />
        )}
        {screen === "create" && (
          <CreateScreen
            onBack={() => setScreen("home")}
            onCreate={handleCreate}
          />
        )}
        {screen === "bote" && activeBote && (
          <BoteScreen
            bote={activeBote}
            onBack={() => setScreen("home")}
            onUpdate={updateBote}
            onCelebrate={(b) => { setActiveBote(b); setScreen("celebrate"); }}
          />
        )}
        {screen === "join" && activeBote && (
          <JoinScreen
            bote={activeBote}
            onJoin={handleJoin}
            onBack={() => setScreen("home")}
          />
        )}
        {screen === "celebrate" && activeBote && (
          <CelebrateScreen
            bote={activeBote}
            onBack={() => setScreen("home")}
          />
        )}
      </div>
    </div>
  );
}
