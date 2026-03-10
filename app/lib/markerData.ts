// ← Edit marker positions, labels, and links here

export type Marker = {
  id: string;
  x: string; // percentage of viewport width, e.g. "32%"
  y: string; // percentage of viewport height, e.g. "61%"
  label: string;
  href: string;
};

export const markers: Marker[] = [
  {
    id: "piece-1",
    x: "33%",
    y: "60%",
    label: "Clavicle Rex Sculpture",
    href: "https://www.portsideinteriors.com/clavicle-rex-sculpture.html",
  },
  {
    id: "piece-2",
    x: "34%",
    y: "78%",
    label: "Timeout Chair + Footstool in Cognac",
    href: "https://www.portsideinteriors.com/timeout-chair-high-footstool-leather-cognac-by-con.html",
  },
  {
    id: "piece-3",
    x: "58%",
    y: "55%",
    label: "Edward Sectional by Huppé",
    href: "https://www.portsideinteriors.com/edward-sectional-collection.html",
  },
  {
    id: "piece-4",
    x: "52%",
    y: "72%",
    label: "Carmello Beach Glass Rug",
    href: "https://www.portsideinteriors.com/carmello-beach-glass-12-x-15-stone-taupe-blue-rust.html",
  },
  {
    id: "piece-5",
    x: "47%",
    y: "30%",
    label: "Boxer 4-Door Display Bookshelf",
    href: "https://www.portsideinteriors.com/boxer-4-door-display-book-shelf.html",
  },
  {
    id: "piece-6",
    x: "52%",
    y: "18%",
    label: "Uplifting 19-Light Chandelier",
    href: "https://www.portsideinteriors.com/uplifting-19-light-chandelier-dark-brass.html",
  },
  {
    id: "piece-7",
    x: "64%",
    y: "19%",
    label: "Amani Wall Decor Wood",
    href: "https://www.portsideinteriors.com/amani-wall-decor-wood-set-9.html",
  },
  {
    id: "piece-8",
    x: "63%",
    y: "37%",
    label: "Mangan 4-Door Sideboard",
    href: "https://www.portsideinteriors.com/mangan-4-door-sideboard-black.html",
  },
];
