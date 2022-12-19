import { fetcher } from './fetch';

const token = process.env.NEXT_PUBLIC_BOT_TOKEN;
const chat_id = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

export async function sendMsg(msg, mode) {
  fetcher(
    `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${msg}&parse_mode=${
      mode || 'HTML'
    }`
  );
}
