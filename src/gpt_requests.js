import OpenAI from "openai";
import { Climbs, training } from "./prompt.js";

const openai = new OpenAI();

export async function gpt(msg, type) {
  let t
  if (type == 'boulder'){
    t = training(Climbs.Boulder);
  }else if (type == 'sport'){
    t = training(Climbs.Sport);
  }else if (type == 'trad'){
    t = training(Climbs.Trad);
  }
  console.log(type);
  let req = {
    "role": "user",
    "content": msg
  };
  t.push(req);

  const completion = await openai.chat.completions.create({
    messages: t,
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0];
}


