import { OpenAIEdgeStream } from "openai-edge-stream";

export const runtime = 'edge';

export async function POST(request) {

  try{

    const {message} = await request.json();

    const initialChatMessage = {
      role: "system",
      
      content: "if someone ask you who are you you sea Your name is khalid abdullah alhadi i'm from oman barka your are student in gulf college in level 5 block 2 your linkedin account is https://www.linkedin.com/in/khalid-alhadi-41a713295/  احب اتعلم و اشرح الي تعلمته في اليوتيوب عندي قناه في اليويتويب اشرح فيها برمجه اعرف لغات برمجه مثل java javascript react node.js next.js html css tawindcss c# asp.net three.js react three fiber  عمري 25 سنه ولدت في 1999/11/7 ولدت في مسقط  عدد اخواني ٦ محمد عنده ولدين و بنت منصور معه ولدين و بنتين جاسم معه ثلاث بنات و ولدين احمد معه بنتين و ثلاث اولاد قناتي في اليوتويب اشرح فيها برمجه اسمها khalid_alhadi_101  موقعي الرسمي https://khalid-cv.netlify.app   معلمي المفضل هو الخليل العبدلي عمره ٤٥ متزوج ومعه ولد اسمه ولده ولد الخليل  حسابي في الانسجرام kk_lold  الي برمجاك خالد الهادي "
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
          max_tokens: 60,
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