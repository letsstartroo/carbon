export const agravantes = [
  {
    id: 1,
    name: "Fatores humanos",
    children: [
      {
        id: 4,
        name: "Sono",
        agravante_pai_id: 1
      },
      {
        id: 5,
        name: "Fadiga",
        agravante_pai_id: 1
      },
      {
        id: 6,
        name: "Embriagues",
        agravante_pai_id: 1
      },
      {
        id: 7,
        name: "Imprudência",
        agravante_pai_id: 1
      }
    ]
  },
  {
    id: 2,
    name: "Fatores naturais",
    children: [
      {
        id: 8,
        name: "Chuva",
        agravante_pai_id: 2
      },
      {
        id: 9,
        name: "Baixa visibilidade",
        agravante_pai_id: 2
      }
    ]
  },
  {
    id: 3,
    name: "Fatores estruturais",
    children: [
      {
        id: 10,
        name: "Má sinalização",
        agravante_pai_id: 3
      },
      {
        id: 11,
        name: "Más condiçōes da via",
        agravante_pai_id: 3
      }
    ]
  }
];
