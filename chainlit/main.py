import chainlit as cl
from langchain import OpenAI, LLMChain 
from langchain.agents import Tool, AgentExecutor, LLMSingleActionAgent, AgentOutputParser
from langchain.memory import ConversationBufferWindowMemory 
from langchain.prompts import StringPromptTemplate
from langchain.tools import DuckDuckGoSearchRun
from typing import List, Union
from langchain.schema import AgentAction, AgentFinish
import re
import os
from credentials import OPENAI_API_KEY
from templates import template_for_has_cancer, template_for_does_not_have_cancer
from utils import cancer_category, get_prediction
from PIL import Image
import io
import time

os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

search = DuckDuckGoSearchRun()

def duck_wrapper(input_text):
    search_results = search.run(f"{input_text}")
    return search_results

tools = [
    Tool(
        name = "Search",
        func=duck_wrapper,
        description="useful for when you need to answer medical and pharmalogical questions"
    )
]


def call_detection_model(index):
    results = [
        {
            "has_cancer":False, 
            "chances_of_having_cancer":8.64
        },
        {
            "has_cancer":True, 
            "chances_of_having_cancer":97.89
        },
        {
            "has_cancer":False,
            "chances_of_having_cancer":2.78
        }
    ]
    return results[index]

class CustomPromptTemplate(StringPromptTemplate):
    # The template to use
    template: str
    # The list of tools available
    tools: List[Tool]
    
    def format(self, **kwargs) -> str:
        # Get the intermediate steps (AgentAction, Observation tuples)
        # Format them in a particular way
        intermediate_steps = kwargs.pop("intermediate_steps")
        thoughts = ""
        for action, observation in intermediate_steps:
            thoughts += action.log
            thoughts += f"\nObservation: {observation}\nThought: "
        # Set the agent_scratchpad variable to that value
        kwargs["agent_scratchpad"] = thoughts
        # Create a tools variable from the list of tools provided
        kwargs["tools"] = "\n".join([f"{tool.name}: {tool.description}" for tool in self.tools])
        # Create a list of tool names for the tools provided
        kwargs["tool_names"] = ", ".join([tool.name for tool in self.tools])
        return self.template.format(**kwargs)

class CustomOutputParser(AgentOutputParser):
    def parse(self, llm_output: str) -> Union[AgentAction, AgentFinish]:
        # Check if agent should finish
        if "Final Answer:" in llm_output:
            return AgentFinish(
                # Return values is generally always a dictionary with a single `output` key
                # It is not recommended to try anything else at the moment :)
                return_values={"output": llm_output.split("Final Answer:")[-1].strip()},
                log=llm_output,
            )
        # Parse out the action and action input
        regex = r"Action\s*\d*\s*:(.*?)\nAction\s*\d*\s*Input\s*\d*\s*:[\s]*(.*)"
        match = re.search(regex, llm_output, re.DOTALL)
        if not match:
            raise ValueError(f"Could not parse LLM output: `{llm_output}`")
        action = match.group(1).strip()
        action_input = match.group(2)
        # Return the action and action input
        return AgentAction(tool=action, tool_input=action_input.strip(" ").strip('"'), log=llm_output)

template = None
prompt_with_history = None
from contextlib import redirect_stdout


@cl.on_chat_start
async def main():
    file = None
    while file == None:
        file = await cl.AskFileMessage(content="Please upload a text file to begin", accept=["image/jpeg"]).send()
    file = file[0].content
    image_stream = io.BytesIO(file)
    image = Image.open(image_stream)
    image.save("image.jpg")
    image.close()
    results = get_prediction()
    cl.user_session.set("has_uploaded_image", False)
    cl.user_session.set("results", results)
    elements = [
        cl.Image(name="image", display="inline", path="./image.jpg")
    ]
    await cl.Message("Image has been uploaded and analyzing...\nUploaded image is:", elements=elements).send() 
    time.sleep(3)
    await cl.Message("Please ask further questions").send()


@cl.on_message
async def main(message : cl.Message):
    message = message.content
    has_uploaded_image = True
    results = cl.user_session.get("results")
    if has_uploaded_image == False:
        await cl.Message("Please upload a relevent image to proceed with this conversation").send()
        return
    if "result" in message or "results" in message:   
        time.sleep(4)  
        msg = f"These results are a good estimation but its not meant to replace human medical intervention and should be taken with a grain of salt. According to the image uploaded, your chances of having skin cancer are {results['chances_of_having_cancer']}% and your condition lies in the {cancer_category(results['chances_of_having_cancer'])} range. "
        if cancer_category(results["chances_of_having_cancer"]) != "Pre Benign":
            msg += "You should consider vising the doctor for a complete checkup."
        await cl.Message(msg).send()
        return
    agent_executor = cl.user_session.get("agent_executor")
    res = agent_executor.run(message)
    await cl.Message(res).send()


