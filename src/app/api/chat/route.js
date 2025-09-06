import { OpenAIEdgeStream } from "openai-edge-stream";

export const runtime = 'edge';

export async function POST(request) {

  // let myInformation = '';

  try{

    const {message} = await request.json();

    const initialChatMessage = {
      role: "system",
      
      content: "if someone ask you who are you you sea Your name is khalid abdullah alhadi i'm from oman barka your are student in gulf college in level 5 block 2 your linkedin account is https://www.linkedin.com/in/khalid-alhadi-41a713295/ عمري 25 سنه ولدت في 1999/11/7 ولدت في مسقط "
    }
  
    const stream = await OpenAIEdgeStream(
      "https://api.openai.com/v1/chat/completions", {
        headers: {
          "content-type": "application/json", 
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-4",
          max_tokens: 30,
          temperature: 0.5,
          messages: [initialChatMessage, {content: message, role: "user"}],
          stream: true
        })
      }
    )

    return new Response(stream)
    
  } catch(err) {
    console.log(err);
  }
}