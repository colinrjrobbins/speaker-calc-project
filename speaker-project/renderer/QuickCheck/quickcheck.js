let selectSize = document.getElementById('size-option'),
    quizInfo = document.getElementById('quiz-info'),
    step1 = document.getElementById('step1'),
    step2 = document.getElementById('step2'),
    step3_1 = document.getElementById('step3-1'),
    step3_2 = document.getElementById('step3-2'),
    step3_3 = document.getElementById('step3-3'),
    step4 = document.getElementById('step4'),
    step5 = document.getElementById('step5'),
    sizeOption = document.getElementById('size-option'),
    systemType = document.getElementById('system-type'),
    monoSplit = document.getElementById('mono-split'),
    stereoSplit = document.getElementById('stereo-split'),
    surroundSystem = document.getElementById('surround-split')


let startButton = document.getElementById('start')


startButton.addEventListener('click',e=>{
    startButton.style.display = 'none';
    step1.style.display = 'flex';
    quizInfo.style.display = 'none';
})

sizeOption.addEventListener('change',e=>{
    if (sizeOption.value != ""){
        step2.style.display = 'flex';
    }
    else{
        step2.style.display = 'none';
    }
})

systemType.addEventListener('change', e => {
    if (systemType.value === 'mono'){
        step3_1.style.display = 'flex';
        step3_2.style.display = 'none';
        step3_3.style.display = 'none';
    }else if (systemType.value === 'dual'){
        step3_1.style.display = 'none';
        step3_2.style.display = 'flex';
        step3_3.style.display = 'none';
    }else if (systemType.value === 'surround'){
        step3_1.style.display = 'none';
        step3_2.style.display = 'none';
        step3_3.style.display = 'flex';
    }else{
        step3_1.style.display = 'none';
        step3_2.style.display = 'none';
        step3_3.style.display = 'none';
    }
})

monoSplit.addEventListener('change',e => {
    step4.style.display = 'flex';
})
stereoSplit.addEventListener('change',e => {
    step4.style.display = 'flex';
})
surroundSystem.addEventListener('change',e => {
    step4.style.display = 'flex';
})

let powerType = document.getElementById('powering');

if (document.getElementById('yes').checked === true){
    step5.style.display = 'flex';
}else if(document.getElementById('no').checked === true){
    step5.style.display = 'flex';
}else{
    step5.style.display = 'none';
}