import TelegramBot from "node-telegram-bot-api";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  const token = process.env.NEXT_TELEGRAM_BOT_TOKEN || "";
  const chat_id = process.env.NEXT_TELEGRAM_CHAT_ID || "";

  const bot = new TelegramBot(token, { polling: true });

  try {
    await bot.sendMessage(
      chat_id,
      `Name: ${name}\nEmail/Telegram: ${email}\nMessage: ${message}`
    );
    return new Response(
      JSON.stringify({ success: true, data: { name, email, message } }),
      {
        status: 200,
      }
    );
  } catch (err) {
    bot.on("polling_error", (error: any) => {
      console.log(`Polling error: ${error}`);
      if (error.code == "EFATAL") {
        bot.stopPolling();
        console.log("Stopped polling due to fatal error.");
      }
    });

    return new Response(
      JSON.stringify({ success: false, data: [], errors: err }),
      {
        status: 500,
      }
    );
  }
}
