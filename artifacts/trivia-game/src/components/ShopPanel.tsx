import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { SHOP_ITEMS } from "../data/shopItems";
import { audio } from "../utils/audio";
import { useBreakpoint } from "../hooks/useBreakpoint";

interface Props { isOpen: boolean; onClose: () => void }

export function ShopPanel({ isOpen, onClose }: Props) {
  const { coins, shop, purchaseItem } = useGameStore();
  const { isMobile } = useBreakpoint();
  const [justBought, setJustBought] = useState<string | null>(null);
  const [errorItem, setErrorItem]   = useState<string | null>(null);

  const isOwned = (id: string) => id !== "shield" && shop[id as keyof typeof shop] === true;
  const getStack = (id: string) => id === "shield" ? shop.shieldCount : 0;

  const canBuy = (item: typeof SHOP_ITEMS[number]) => {
    if (item.type === "permanent" && isOwned(item.id)) return false;
    if (item.id === "shield" && shop.shieldCount >= (item.maxStack ?? 3)) return false;
    return coins >= item.price;
  };

  const getLabel = (item: typeof SHOP_ITEMS[number]) => {
    if (item.type === "permanent" && isOwned(item.id))  return "✓ Obtenido";
    if (item.id === "shield" && shop.shieldCount >= 3)  return "Máximo ×3";
    if (coins < item.price) return `Faltan ${item.price - coins} 🪙`;
    return `Comprar`;
  };

  const handleBuy = (item: typeof SHOP_ITEMS[number]) => {
    if (!canBuy(item)) {
      if (!isOwned(item.id) && item.id !== "shield") {
        audio.purchaseError();
        setErrorItem(item.id);
        setTimeout(() => setErrorItem(null), 650);
      }
      return;
    }
    const result = purchaseItem(item.id);
    if (result === "ok") {
      audio.purchase();
      setJustBought(item.id);
      setTimeout(() => setJustBought(null), 900);
    } else if (result === "no_coins") {
      audio.purchaseError();
      setErrorItem(item.id);
      setTimeout(() => setErrorItem(null), 650);
    }
  };

  const panelStyle: React.CSSProperties = isMobile
    ? { bottom: 0, left: 0, right: 0, borderRadius: "24px 24px 0 0", maxHeight: "88vh" }
    : { top: 0, right: 0, bottom: 0, width: 440, borderRadius: "24px 0 0 24px" };

  const panelMotion = isMobile
    ? { hidden: { y: "100%" }, visible: { y: 0 }, exit: { y: "100%" } }
    : { hidden: { x: "100%" }, visible: { x: 0 }, exit: { x: "100%" } };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 500, backdropFilter: "blur(5px)" }}
          />

          {/* Panel */}
          <motion.div
            variants={panelMotion}
            initial="hidden" animate="visible" exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed", ...panelStyle,
              background: "rgba(10,18,36,0.97)",
              backdropFilter: "blur(24px)",
              border: "1.5px solid rgba(255,255,255,0.10)",
              zIndex: 501,
              display: "flex", flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "20px 22px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", gap: "10px", flexShrink: 0,
            }}>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.35rem", fontWeight: 900, color: "#fff", flex: 1, letterSpacing: "-0.02em" }}>
                🛒 Tienda
              </h2>
              {/* Coin balance */}
              <motion.div
                animate={{ scale: justBought ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 0.35 }}
                style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  padding: "5px 13px", borderRadius: "999px",
                  background: "rgba(250,204,21,0.12)",
                  border: "1.5px solid rgba(250,204,21,0.35)",
                }}
              >
                <span style={{ fontSize: "1rem" }}>🪙</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", fontWeight: 900, color: "#fde68a" }}>
                  {coins.toLocaleString()}
                </span>
              </motion.div>
              <button
                onClick={onClose}
                style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: "0.95rem" }}
              >✕</button>
            </div>

            {/* Items list */}
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {SHOP_ITEMS.map((item, i) => {
                const owned   = isOwned(item.id);
                const stack   = getStack(item.id);
                const buying  = justBought === item.id;
                const errring = errorItem === item.id;
                const buyable = canBuy(item);
                const label   = getLabel(item);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.22 }}
                    style={{
                      borderRadius: "16px", padding: "14px 14px",
                      background: buying
                        ? "rgba(74,222,128,0.12)"
                        : errring
                        ? "rgba(248,113,113,0.10)"
                        : owned
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(255,255,255,0.06)",
                      border: `1.5px solid ${
                        buying ? "rgba(74,222,128,0.45)"
                        : errring ? "rgba(248,113,113,0.40)"
                        : owned ? "rgba(255,255,255,0.07)"
                        : "rgba(255,255,255,0.11)"
                      }`,
                      display: "flex", gap: "12px", alignItems: "center",
                      transition: "background 0.25s, border 0.25s",
                    }}
                  >
                    {/* Icon badge */}
                    <div style={{
                      width: 48, height: 48, borderRadius: "13px", flexShrink: 0,
                      background: owned ? "rgba(74,222,128,0.10)" : "rgba(255,255,255,0.07)",
                      border: `1.5px solid ${owned ? "rgba(74,222,128,0.28)" : "rgba(255,255,255,0.10)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.5rem",
                    }}>{item.icon}</div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "2px" }}>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", fontWeight: 800, color: owned ? "rgba(255,255,255,0.4)" : "#fff", lineHeight: 1 }}>
                          {item.name}
                        </p>
                        <span style={{
                          padding: "1px 6px", borderRadius: "999px", fontSize: "0.58rem", fontWeight: 800,
                          textTransform: "uppercase", letterSpacing: "0.07em",
                          background: item.type === "permanent" ? "rgba(96,165,250,0.15)" : "rgba(167,139,250,0.18)",
                          color: item.type === "permanent" ? "#93c5fd" : "#c4b5fd",
                          border: `1px solid ${item.type === "permanent" ? "rgba(96,165,250,0.25)" : "rgba(167,139,250,0.28)"}`,
                        }}>
                          {item.type === "permanent" ? "permanente" : `×${stack}/3`}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.45 }}>
                        {item.desc}
                      </p>
                    </div>

                    {/* Buy button */}
                    <motion.button
                      whileTap={buyable ? { scale: 0.92 } : errring ? { x: [-4, 4, -3, 3, 0] } : {}}
                      onClick={() => handleBuy(item)}
                      style={{
                        padding: "7px 12px", borderRadius: "11px", flexShrink: 0,
                        fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", fontWeight: 800,
                        border: "none", cursor: buyable ? "pointer" : "default",
                        background: buying
                          ? "linear-gradient(135deg,#16a34a,#4ade80)"
                          : errring
                          ? "rgba(248,113,113,0.25)"
                          : owned
                          ? "rgba(255,255,255,0.06)"
                          : buyable
                          ? "linear-gradient(135deg,#0369a1,#0ea5e9)"
                          : "rgba(255,255,255,0.07)",
                        color: buying ? "#fff" : (owned || !buyable) ? "rgba(255,255,255,0.30)" : "#fff",
                        whiteSpace: "nowrap", minWidth: 88, textAlign: "center",
                        transition: "background 0.22s, color 0.22s",
                      }}
                    >
                      {buying ? "✓ ¡Listo!" : label}
                    </motion.button>
                  </motion.div>
                );
              })}

              {/* Footer hint */}
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.22)", textAlign: "center", padding: "6px 0 2px", lineHeight: 1.6 }}>
                Ganás 🪙 por cada respuesta correcta.<br />
                Los ítems permanentes duran para siempre.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
