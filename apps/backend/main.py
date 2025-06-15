from fastapi import FastAPI
from pydantic import BaseModel
import ai
import utils
import asyncio
app = FastAPI()

class model(BaseModel):
    id: str | list[str] = str

@app.post("/")
async def get_captions(videoId:model):
    if isinstance(videoId.id,str):
        caption = await utils.generate_captions(videoId.id)
        translated_text:ai.Translated_text =ai.translate_to_hinglish(caption).parsed
        return [translated_text]
    if isinstance(videoId.id,list):
        captions = await asyncio.gather(*[utils.generate_captions(i) for i in videoId.id])
        translated_captions = await asyncio.gather(*[ai.translate_to_hinglish(cap) for cap in captions])
        for i in range(len(translated_captions)):
            translated_captions[i] = translated_captions[i].parsed
        return translated_captions
