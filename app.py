import os
import json
import smtplib
from email.mime.text import MIMEText
from typing import AsyncGenerator
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from main import agent_graph
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

load_dotenv()

app = FastAPI(title="Amir's Portfolio AI Agent Backend")

app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    question: str
    thread_id: str = "default_user"


class HireRequest(BaseModel):
    name: str
    email: str
    message: str

@app.get("/")
async def serve_index():
    return FileResponse("index.html")

@app.post("/api/hire")
async def hire(request: HireRequest):
    gmail = os.getenv("GMAIL")
    password = os.getenv("GMAIL_PASSWORD")
    if not gmail or not password:
        return JSONResponse(status_code=500, content={"detail": "Email service is not configured."})

    subject = f"New Hire Inquiry from {request.name}"
    body = f"Name: {request.name}\nEmail: {request.email}\n\n{request.message}"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = gmail
    msg["To"] = gmail
    msg["Reply-To"] = request.email

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(gmail, password)
            server.send_message(msg)
    except Exception as e:
        return JSONResponse(status_code=500, content={"detail": f"Failed to send email: {str(e)}"})

    return {"detail": "Message sent successfully."}


async def stream_agent_updates(question: str, thread_id: str) -> AsyncGenerator[str, None]:
    config = {"configurable": {"thread_id": thread_id}}
    initial_state = {"question": question}
    try:
        async for chunk, metadata in agent_graph.astream(
            initial_state, config=config, stream_mode="messages"
        ):
            if metadata.get("langgraph_node") in ["generate_answer", "general_chat"]:
                token = getattr(chunk, "content", "")
                if token:
                    yield f"data: {json.dumps({'token': token})}\n\n"
    except Exception as e:
        yield f"data: {json.dumps({'error': str(e)})}\n\n"

    yield "data: [DONE]\n\n"


@app.post("/api/chat/stream")
async def chat_stream(request: ChatRequest):
    return StreamingResponse(
        stream_agent_updates(request.question, request.thread_id),
        media_type="text/event-stream",
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
