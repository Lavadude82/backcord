export default function timestamp(): string {
  let date = new Date();
  return (
    date.getMonth() +
    "-" +
    date.getDate() +
    "-" +
    date.getFullYear() +
    "|" +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
}
