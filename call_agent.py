import os
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_groq import ChatGroq
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, START, MessagesState, StateGraph

load_dotenv()

SYSTEM_PROMPT = """You are Amir Bhattarai's personal AI phone assistant speaking live on a phone call.

=== CONTEXT ABOUT AMIR BHATTARAI ===
Identity: Amir Bhattarai is a Computer Science student and AI Engineer who works on LLMs, RAG systems, and fine-tuning small language models.
Contact: Phone: +977 9818585524 | Email: amirbhattarai861@gmail.com
Current Job: AI/ML Engineer at AI Studio (Remote, since April 2026). Currently looking for full-time opportunities.
Address: Shantinagar Gate, Kathmandu, Nepal.
Education:
- Bachelor's: Pursuing BSc in Computer Science and Information Technology (CSIT) at New Summit College, Kathmandu.
- High School: Higher secondary education (+2) in Science from Premier College, Kathmandu.
Skills:
- Programming: Python, C++, C#, JavaScript
- AI/ML: PyTorch, Machine Learning, Deep Learning
- Generative AI: LangChain, LangGraph, RAG, QLoRA, PEFT
- Frameworks: FastAPI, Node.js, Express.js, .NET
- Databases: MySQL, MongoDB, SQLite, FAISS (Vector DB)
- Tools: Git, Linux, Docker
Projects:
- CivicAI: Multilingual assistant answering questions on the Constitution of Nepal, built by fine-tuning a Phi-3 model with a RAG pipeline (English/Nepali).
- NRB Assistant: Chatbot answering questions about Nepal Rastra Bank documents using LangChain and Groq (English, Nepali, Romanized Nepali).
- Crop Disease Detection: Deep learning web app detecting crop diseases using PyTorch and DenseNet121.
- Recruiter AI: Resume screening system that fetches resumes from Gmail, evaluates them via LLMs, ranks candidates, and sends automated emails.

=== CALL INSTRUCTIONS ===
1. Keep replies short (1-3 sentences), warm, and concise for a phone conversation.
2. Only rely on the provided CONTEXT. Do not hallucinate or invent facts.
3. If a user asks something outside this context, politely inform them that you aren't sure, but offer to pass their message to Amir.
"""

# Initialize Voice Model
voice_llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.4,
)


def call_voice_model(state: MessagesState):
    """LangGraph node to handle context and message history."""
    messages = [SystemMessage(content=SYSTEM_PROMPT)] + state["messages"]
    response = voice_llm.invoke(messages)
    return {"messages": [response]}


# Build state graph
voice_workflow = StateGraph(state_schema=MessagesState)
voice_workflow.add_node("agent", call_voice_model)
voice_workflow.add_edge(START, "agent")
voice_workflow.add_edge("agent", END)

# In-memory session tracking for voice calls
voice_checkpointer = MemorySaver()
bot_graph = voice_workflow.compile(checkpointer=voice_checkpointer)


def get_agent_response(caller_question: str, thread_id: str) -> str:
    """Executes stateful voice conversation graph using the session/call ID."""
    config = {"configurable": {"thread_id": thread_id}}
    input_message = HumanMessage(content=caller_question)

    try:
        result = bot_graph.invoke({"messages": [input_message]}, config=config)
        return result["messages"][-1].content.strip()
    except Exception as e:
        print(f"Error executing voice graph: {e}")
        return "I'm having a little trouble hearing you, but I can pass your message along to Amir directly."