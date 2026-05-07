export interface ShopItem {
  id: string;
  icon: string;
  name: string;
  desc: string;
  price: number;
  type: "permanent" | "consumable";
  maxStack?: number;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "doubleCoins",
    icon: "💰",
    name: "Doble Monedas",
    desc: "Ganás 2× monedas por cada respuesta correcta",
    price: 80,
    type: "permanent",
  },
  {
    id: "timerPro",
    icon: "⏱️",
    name: "Timer Pro",
    desc: "Cada pregunta arranca con 4 segundos extra",
    price: 60,
    type: "permanent",
  },
  {
    id: "maxMulti",
    icon: "🔥",
    name: "Racha Legendaria",
    desc: "Tu racha puede llegar hasta un multiplicador ×5",
    price: 120,
    type: "permanent",
  },
  {
    id: "skipBonus",
    icon: "⏭️",
    name: "Skip Master",
    desc: "Empezás cada partida con 3 skips en vez de 2",
    price: 50,
    type: "permanent",
  },
  {
    id: "shield",
    icon: "🛡️",
    name: "Escudo",
    desc: "La próxima respuesta incorrecta no te quita vida (hasta ×3)",
    price: 40,
    type: "consumable",
    maxStack: 3,
  },
];
