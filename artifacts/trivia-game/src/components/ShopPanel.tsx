import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Check, ShoppingBag } from "lucide-react";
import { useGameStore } from "../engine/gameStore";
import { SHOP_ITEMS } from "../data/shopItems";
import { audio } from "../utils/audio";
import { CoinBadge, GameButton } from "./GameUI";

export function ShopPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { coins, shop, purchaseItem } = useGameStore();
  const [message, setMessage] = useState("");
  const opener = useRef<HTMLElement | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!isOpen) setMessage("");
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [isOpen]);
  const buy = (id: string, name: string) => {
    const result = purchaseItem(id);
    if (timeout.current) clearTimeout(timeout.current);
    if (result === "ok") {
      audio.purchase();
      setMessage(`Compraste ${name}.`);
    } else {
      audio.purchaseError();
      setMessage(
        result === "no_coins"
          ? "Necesitás más monedas."
          : "Ya tenés esta mejora.",
      );
    }
    timeout.current = setTimeout(() => setMessage(""), 3000);
  };
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="shop-overlay" />
        <Dialog.Content
          className="shop-dialog"
          onOpenAutoFocus={() => {
            opener.current =
              document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (opener.current?.isConnected) opener.current.focus();
          }}
        >
          <div className="shop-header">
            <Dialog.Title>
              <ShoppingBag aria-hidden="true" />
              Tienda
            </Dialog.Title>
            <Dialog.Close asChild>
              <GameButton
                className="icon-button secondary"
                aria-label="Cerrar tienda"
              >
                <X aria-hidden="true" />
              </GameButton>
            </Dialog.Close>
          </div>
          <Dialog.Description>
            Usá las monedas que ganás jugando para mejorar tu próxima partida.
          </Dialog.Description>
          <CoinBadge value={coins} />
          <p role="status" className="shop-message">
            {message}
          </p>
          <div className="shop-items">
            {SHOP_ITEMS.map((item) => {
              const owned =
                item.type === "permanent" &&
                Boolean(shop[item.id as keyof typeof shop]);
              const full = item.id === "shield" && shop.shieldCount >= 3;
              const afford = coins >= item.price;
              return (
                <article className="shop-item" key={item.id}>
                  <span aria-hidden="true" className="category-icon">
                    {item.icon}
                  </span>
                  <div>
                    <h3>
                      {item.name}
                      {item.id === "shield" ? ` (${shop.shieldCount}/3)` : ""}
                    </h3>
                    <p>{item.desc}</p>
                  </div>
                  <GameButton
                    className={owned || full ? "purchased" : ""}
                    disabled={owned || full || !afford}
                    onClick={() => buy(item.id, item.name)}
                    aria-label={
                      owned
                        ? `${item.name}: obtenido`
                        : full
                          ? `${item.name}: máximo alcanzado`
                          : `Comprar ${item.name} por ${item.price} monedas`
                    }
                  >
                    {owned ? (
                      <>
                        <Check aria-hidden="true" />
                        Obtenido
                      </>
                    ) : full ? (
                      "Máximo ×3"
                    ) : afford ? (
                      `Comprar · ${item.price}`
                    ) : (
                      `Faltan ${item.price - coins}`
                    )}
                  </GameButton>
                </article>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
