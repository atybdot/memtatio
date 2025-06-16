from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
import ai
import utils
import asyncio
app = FastAPI()

class model(BaseModel):
    id: list[str] | str

@app.get("/check")
def check():
    return "success"
@app.post("/check")
def check(videoId:model):
    return videoId

@app.post("/")
async def get_captions(videoId:model):
    if isinstance(videoId.id,str):
        caption = await utils.generate_captions(videoId.id)
        translated_text =ai.translate_to_hinglish(caption).parsed
        return translated_text
    if isinstance(videoId.id,list):
        captions = await asyncio.gather(*[utils.generate_captions(i) for i in videoId.id])
        translated_captions = [ai.translate_to_hinglish(cap).parsed for cap in captions]

        return translated_captions

@app.post("/get-captions")
async def get_captions(videoId:model):
    if isinstance(videoId.id,str):
        caption = await utils.generate_captions(videoId.id)
        return [caption]
    if isinstance(videoId.id,list):
        captions = await asyncio.gather(*[utils.generate_captions(i) for i in videoId.id])
        return captions
