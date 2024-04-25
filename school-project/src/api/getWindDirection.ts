function getWindDirection(deg: number): string {
  const windDirections = [
    "С",
    "ССВ",
    "В",
    "ВСВ",
    "ВЮВ",
    "Ю",
    "ЮЮВ",
    "З",
    "ЗСВ",
    "ЗЮВ",
  ];

  const index = Math.round(deg / 45) % 16;
  return windDirections[index];
}

export default getWindDirection;
