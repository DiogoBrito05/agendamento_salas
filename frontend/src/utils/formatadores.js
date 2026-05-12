export function formatarData(data) {
  if (!data) {
    return "";
  }
  if (data.includes("/")) {
    return data;
  }
  const partes = data.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
