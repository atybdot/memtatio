from youtube_transcript_api._api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter
formatter = TextFormatter()
ytt_api = YouTubeTranscriptApi()
async def generate_captions(videoId):
    transcript= ytt_api.fetch(videoId,languages=["hi","en"])
    formatted_text = formatter.format_transcript(transcript)
    return formatted_text
