export const sendNotification = (message: string) => {
  console.log("called")
  const url =
    "https://discord.com/api/webhooks/1090899588883415152/Yv4P_AbsmB-sPTTkuryCadLVm9cFjdiRUGqvEA9qaKxOSp-Gp2n0-X_wPIHEXHp-l4lr"

  console.log("start sending webhook discord")
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: message,
      avatar_url: "https://www.kompad.app/favicon.png",
      username: "Kompad",
    }),
  })
}
