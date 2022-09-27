var input_text = document.getElementById("paragraph_text_input").value;
let output_text = document.getElementById("paragraph_text_output").value;
let to_text = document.querySelector(".paragraph_text_output");
const translate_button = document.getElementById("translate");
const selectTag = document.querySelectorAll("select");
const switch_button = document.querySelector(".switch button");
const input_select_tag = document.getElementById("input_select");
const output_select_tag = document.getElementById("output_select");
const input_text_sound_button = document.getElementById("input_text_sound_button");
const output_text_sound_button = document.getElementById("output_text_sound_button");
const input_copy_button = document.getElementById("input_copy_button");
const output_copy_button = document.getElementById("output_copy_button");

var selected_output_tag;

function errorHandle(error) {   
    // In case error occurs the errorHandle
    // function will be called
    alert('Error occurred')
    console.log("error occurred", error);
}

selectTag.forEach((tag, id) => {
    // console.log(tag);
    // console.log(id);
    for (let country_code in countries) {
        let selected = 1; 
        if(id==0 && country_code == 'en-GB'){
            selected = "selected";
        }
        else if(id==1 && country_code == 'hi-IN'){
            selected = "selected";
        }
        let option = `<option ${selected} value="${country_code}">  ${countries[country_code]}  </option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

switch_button.addEventListener("click", ()=>{
    var selected_input_value = input_select_tag.value; // en=GB
    var selected_output_value = output_select_tag.value; // hi-IN

    input_select_tag.value = selected_output_value; // hi
    output_select_tag.value = selected_input_value;

    // now switchign the text inside the boxes as well. 
    
    let temp = document.getElementById("paragraph_text_input").value; 
    document.getElementById("paragraph_text_input").value = document.getElementById("paragraph_text_output").value; 
    document.getElementById("paragraph_text_output").value = temp; 
}); 

translate_button.addEventListener("click", ()=>{
    let text = document.getElementById("paragraph_text_input").value; 
    let from_language = document.getElementById("input_select").value;
    let to_language = document.getElementById("output_select").value;
    if(!text) return;
    let to_text = document.getElementById("paragraph_text_output"); 
    to_text.setAttribute("placeholder", "Translating...")
    let api_url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from_language}|${to_language}`;
    // console.log(text, from_language, to_language);
    fetch(api_url).then(res => res.json()).then(data =>{
        // console.log(data);
        to_text.setAttribute("placeholder", "Translation");
        document.getElementById("paragraph_text_output").value = data.responseData.translatedText;
    });
});

// now adding the text to speech thing. 
if('speechSynthesis' in window) {
    // Speech Synthesis is supported 🎉
    console.log("🎉🎉🎉");
}else{
    // Speech Synthesis is not Supported 😞 
    console.log("😞");
}

function getVoices() {
    let voices = speechSynthesis.getVoices();
    if(!voices.length){
      let utterance = new SpeechSynthesisUtterance("");
      speechSynthesis.speak(utterance);
      voices = speechSynthesis.getVoices();
    }
    return voices;
  }
console.log(speechSynthesis.getVoices());

// sound button for input
// input_text_sound_button.addEventListener("click", ()=>{
//     let lang = document.getElementById("input_select").value; 
//     let from_text = document.getElementById("paragraph_text_input").value;
//     let utterance = new SpeechSynthesisUtterance(from_text);
//     let speakData = new SpeechSynthesisUtterance();
//     speakData.volume = 1; // From 0 to 1
//     speakData.rate = 10;  // From 0.1 to 10
//     speakData.pitch = 0;  // From 0 to 2
//     speakData.text = from_text;
//     speakData.lang = lang;
//     speechSynthesis.speak(utterance);
// });

// sound button for output
// output_text_sound_button.addEventListener("click", ()=>{
//     let lang = document.getElementById("output_select").value;
//     let to_text = document.getElementById("paragraph_text_output").value;
//     let utterance = new SpeechSynthesisUtterance(to_text);
//     let speakData = new SpeechSynthesisUtterance();
//     speakData.volume = 1; // From 0 to 1
//     speakData.rate = 1;   // From 0.1 to 10
//     speakData.pitch = 2;  // From 0 to 2
//     speakData.text = to_text;
//     speakData.lang = lang;
//     speechSynthesis.speak(utterance);
// });

// copy button for input 
input_copy_button.addEventListener("click", ()=>{
    let from_text = document.getElementById("paragraph_text_input").value; 
    navigator.clipboard.writeText(from_text);
});

// copy button for output
output_copy_button.addEventListener("click", ()=>{
    let to_text = document.getElementById("paragraph_text_output").value;
    navigator.clipboard.writeText(to_text);
});

// sound button for input
input_text_sound_button.addEventListener("click", ()=>{
    let from_text = document.getElementById("paragraph_text_input").value;
    let utterance = new SpeechSynthesisUtterance(from_text);
    utterance.lang = document.getElementById("input_select").value;
    speechSynthesis.speak(utterance);
});

// sound button for output
output_text_sound_button.addEventListener("click", ()=>{
    let to_text = document.getElementById("paragraph_text_output").value;
    let utterance = new SpeechSynthesisUtterance(to_text);
    utterance.lang = document.getElementById("output_select").value;
    speechSynthesis.speak(utterance);
});     
