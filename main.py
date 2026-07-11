import os
from typing import TypedDict, Any
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_community.document_loaders import TextLoader
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver

load_dotenv()

loader = TextLoader("data.txt", encoding="utf-8")
docs = loader.load()
portfolio_text = "\n".join([doc.page_content for doc in docs])

retriever_llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0)
response_llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.7, streaming=True)


class AgentState(TypedDict):
    question: str
    retrieved_info: str
    final_response: Any


def retrieve_context(state: AgentState):
    retrieval_prompt = f"""
You are an information retrieval assistant.

Portfolio Data:
{portfolio_text}

User Question:
{state['question']}

Extract ONLY the information needed to answer the question.
If the information is completely missing or irrelevant to the portfolio data, reply EXACTLY with:
NOT_FOUND
"""
    response = retriever_llm.invoke(retrieval_prompt)
    return {"retrieved_info": response.content.strip()}


def generate_answer(state: AgentState):
    response_prompt = f"""
You are Amir Bhattarai's portfolio assistant.
Use ONLY the information below to answer the user's question.

Information:
{state['retrieved_info']}

Question:
{state['question']}

Write a friendly, professional answer. Do not invent details.
"""
    response = response_llm.invoke(response_prompt)
    return {"final_response": response.content}


def general_chat(state: AgentState):
    response_prompt = f"""
You are Amir Bhattarai's personal portfolio assistant.
The user is either greeting you or asking a casual/general question that doesn't rely on Amir's hard portfolio text data.

If they are greeting you, respond warmly with: "Namaste! I am Amir's assistant, how can I help you today?"
Otherwise, handle their casual question politely while steering back to how you can help them learn about Amir.

Question:
{state['question']}
"""
    response = response_llm.invoke(response_prompt)
    return {"final_response": response.content}


def route_based_on_context(state: AgentState):
    if "NOT_FOUND" in state["retrieved_info"]:
        return "general_chat"
    return "generate_answer"


workflow = StateGraph(AgentState)

workflow.add_node("retrieve_context", retrieve_context)
workflow.add_node("generate_answer", generate_answer)
workflow.add_node("general_chat", general_chat)

workflow.add_edge(START, "retrieve_context")

workflow.add_conditional_edges(
    "retrieve_context",
    route_based_on_context,
    {
        "generate_answer": "generate_answer",
        "general_chat": "general_chat",
    },
)

workflow.add_edge("generate_answer", END)
workflow.add_edge("general_chat", END)

memory = MemorySaver()

agent_graph = workflow.compile(checkpointer=memory)
