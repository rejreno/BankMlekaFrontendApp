export const SALE = [
  { id: "A", name: "Sala A", lozka: ["A1", "A2", "A3", "A4"] },
  { id: "B", name: "Sala B", lozka: ["B1", "B2", "B3", "B4"] },
  { id: "C", name: "Sala C", lozka: ["C1", "C2", "C3"] },
  { id: "D", name: "Sala D", lozka: ["D1", "D2", "D3", "D4"] },
];

export const LOZKA = [
  {
    id: "A1", sala: "A", numer: 1, zajete: true,
    strzykawkiZjedzone: 5, strzykawkiRazem: 6,
    pacjent: { imie: "Anna Kowalska", idPacjenta: "PAC-0012", imieNoworo: "Zuzanna", avatar: "Z" },
  },
  {
    id: "A2", sala: "A", numer: 2, zajete: true,
    strzykawkiZjedzone: 3, strzykawkiRazem: 6,
    pacjent: { imie: "Maria Nowak", idPacjenta: "PAC-0018", imieNoworo: "Piotrek", avatar: "P" },
  },
  {
    id: "A3", sala: "A", numer: 3, zajete: false,
    strzykawkiZjedzone: 0, strzykawkiRazem: 0,
  },
  {
    id: "A4", sala: "A", numer: 4, zajete: true,
    strzykawkiZjedzone: 6, strzykawkiRazem: 6,
    pacjent: { imie: "Ewa Wiśniewska", idPacjenta: "PAC-0021", imieNoworo: "Maja", avatar: "M" },
  },
  {
    id: "B1", sala: "B", numer: 1, zajete: true,
    strzykawkiZjedzone: 2, strzykawkiRazem: 6,
    pacjent: { imie: "Karolina Lewandowska", idPacjenta: "PAC-0007", imieNoworo: "Tomek", avatar: "T" },
  },
  {
    id: "B2", sala: "B", numer: 2, zajete: true, matkaObecna: false,
    strzykawkiZjedzone: 3, strzykawkiRazem: 6,
    pacjent: { imie: "Brak matki na sali", idPacjenta: "PAC-0027", imieNoworo: "Franek", avatar: "F" },
  },
  {
    id: "B3", sala: "B", numer: 3, zajete: true,
    strzykawkiZjedzone: 4, strzykawkiRazem: 6,
    pacjent: { imie: "Joanna Dąbrowska", idPacjenta: "PAC-0033", imieNoworo: "Kacper", avatar: "K" },
  },
  {
    id: "B4", sala: "B", numer: 4, zajete: true,
    strzykawkiZjedzone: 1, strzykawkiRazem: 6,
    pacjent: { imie: "Beata Kamińska", idPacjenta: "PAC-0041", imieNoworo: "Oliwia", avatar: "O" },
  },
  {
    id: "C1", sala: "C", numer: 1, zajete: true,
    strzykawkiZjedzone: 5, strzykawkiRazem: 6,
    pacjent: { imie: "Monika Zielińska", idPacjenta: "PAC-0055", imieNoworo: "Lena", avatar: "L" },
  },
  {
    id: "C2", sala: "C", numer: 2, zajete: false,
    strzykawkiZjedzone: 0, strzykawkiRazem: 0,
  },
  {
    id: "C3", sala: "C", numer: 3, zajete: true,
    strzykawkiZjedzone: 3, strzykawkiRazem: 6,
    pacjent: { imie: "Agata Szymańska", idPacjenta: "PAC-0062", imieNoworo: "Nikola", avatar: "N" },
  },
  {
    id: "D1", sala: "D", numer: 1, zajete: true,
    strzykawkiZjedzone: 6, strzykawkiRazem: 6,
    pacjent: { imie: "Paulina Woźniak", idPacjenta: "PAC-0073", imieNoworo: "Aleksander", avatar: "A" },
  },
  {
    id: "D2", sala: "D", numer: 2, zajete: false,
    strzykawkiZjedzone: 0, strzykawkiRazem: 0,
  },
  {
    id: "D3", sala: "D", numer: 3, zajete: true,
    strzykawkiZjedzone: 2, strzykawkiRazem: 6,
    pacjent: { imie: "Marta Kozłowska", idPacjenta: "PAC-0081", imieNoworo: "Wojtek", avatar: "W" },
  },
  {
    id: "D4", sala: "D", numer: 4, zajete: true,
    strzykawkiZjedzone: 4, strzykawkiRazem: 6,
    pacjent: { imie: "Dorota Jankowska", idPacjenta: "PAC-0090", imieNoworo: "Zosia", avatar: "Z" },
  },
];
