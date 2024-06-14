/*
LOGICA DE AI
ELECCION DEL MODELO E IMPLEMENTACION
*/
import {CreateMLCEngine} from "https://esm.run/@mlc-ai/web-llm"

const SELECTED_MODEL = 'gemma-2b-it-q4f32_1-MLC';

const engine = await CreateMLCEngine(
    SELECTED_MODEL,
    {
        initProgressCallback:(info)=>{
            console.log('initProgressCallback',info);
        }
    }

)


const $ = (el)=>{
    return document.querySelector(el)
}

const $form = $("form");
const $input = $("input");
const $template =$("#message-template");
const $messages = $("ul");
const $container = $("main");
const $button = $("button");

$form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const messageText = $input.value.trim();
    if(messageText !== ''){
        $input.value = '';
    }

    addMessage(messageText,'user');
    $button.setAttribute('disable',true);


    setTimeout(()=>{
        addMessage("Como te sientes joshua ?",'bot');
        $button.removeAttribute('disable');
    },2000);

})

function addMessage(text,sender){
    const clonedTemplate = $template.content.cloneNode(true);
    const $newMessage = clonedTemplate.querySelector('.message');

    const $who = $newMessage.querySelector('.first-span');
    const $text = $newMessage.querySelector('.second-span');

    const LogoAi = document.createElement('img');
    LogoAi.src='https://img.icons8.com/nolan/64/chatgpt.png'
   
    $text.textContent = text;
    if(sender === 'bot' ){
        $who.appendChild(LogoAi);
    }else{
        $who.textContent = 'Tu'
    }
   // $who.textContent = sender === 'bot' ? 'GPT' : 'Tu';
    $newMessage.classList.add(sender);

    $messages.appendChild($newMessage);
    $container.scrollTop = $container.scrollHeight;
}
console.log($form);