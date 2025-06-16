from google import genai
from google.genai import types
from pydantic.main import BaseModel
import env
class Translated_text(BaseModel):
    text :str
    title:str

client = genai.Client(api_key=env.GOOGPE_GENAI_API)
def translate_to_hinglish(text:str):
    return client.models.generate_content(
        model="gemini-2.0-flash",
        config=types.GenerateContentConfig(
                system_instruction="""
                Your task is to first check weather a given text is in hindi letter or in hindi transcripts.
                if the given text is in hindi as in hindi letters then convert it into hinglish like
                if you find line breaks or escaping characters replace it with " "
                if the given text is not in hindi or urdu then dont do any thing just return it as it is.
                you also need to create a very brief title for it such that i can tell it like `where he is talking about <title>`.

                # input-example
                given-text=हां जी। अगर आपको लगता है.
                output:haan ji! agar appko lagta hai.

                # escaping-characters
                you-find:हां जी। अगर\n आपको लगता है
                replace it: हां जी। अगर आपको लगता है.

                # title-example
                <create-title>
                output: where he is taliking about <insert-title>
                """,
                response_mime_type= "application/json",
                response_schema=Translated_text
        ),
                contents=text,
    )
