const electron = require('electron');
const path = require('path');
const fs = require('fs');

// Quiz Variables

let quizInfo = document.getElementById('quiz-info'),
step1 = document.getElementById('step1'),
step2 = document.getElementById('step2'),
step3_1 = document.getElementById('step3-1'),
step3_2 = document.getElementById('step3-2'),
step3_3 = document.getElementById('step3-3'),
step4 = document.getElementById('step4'),
step5 = document.getElementById('step5'),
step6 = document.getElementById('step6'),
summary = document.getElementById('summary'),
outputStep = document.getElementById('output'),
sizeOption = document.getElementById('size-option'),
systemType = document.getElementById('system-type'),
monoSplit = document.getElementById('mono-split'),
stereoSplit = document.getElementById('stereo-split'),
surroundSystem = document.getElementById('surround-split'),
powerType = document.getElementById('powering'),
subwoofer = document.getElementById('subwoofer'),
modules = document.getElementById('modules'),
sizeValue,
setupValue,
splitValue,
subwooferValue,
powerValue,
moduleValue,
outputText = document.getElementById('output-text'),
saveData = document.getElementById('save');
let startButton = document.getElementById('start')

// QUIZ CHECK SYSTEM

startButton.addEventListener('click',e=>{
startButton.style.display = 'none';
step1.style.display = 'flex';
quizInfo.style.display = 'none';
outputText.textContent = '';
})

sizeOption.addEventListener('change',e=>{
if (sizeOption.value != ""){
    step2.style.display = 'flex';
}
else{
    step2.style.display = 'none';
}
sizeValue = sizeOption.value;
})

systemType.addEventListener('change', e => {
if (systemType.value === 'Mono'){
    step3_1.style.display = 'flex';
    step3_2.style.display = 'none';
    step3_3.style.display = 'none';
    setupValue = systemType.value;
}else if (systemType.value === 'Dual'){
    step3_1.style.display = 'none';
    step3_2.style.display = 'flex';
    step3_3.style.display = 'none';
    setupValue = systemType.value;
}else if (systemType.value === 'Surround'){
    step3_1.style.display = 'none';
    step3_2.style.display = 'none';
    step3_3.style.display = 'flex';
    setupValue = systemType.value;
}else{
    step3_1.style.display = 'none';
    step3_2.style.display = 'none';
    step3_3.style.display = 'none';
}
})

monoSplit.addEventListener('change',e => {
step4.style.display = 'flex';
splitValue = monoSplit.value;
})
stereoSplit.addEventListener('change',e => {
step4.style.display = 'flex';
splitValue = stereoSplit.value;
})
surroundSystem.addEventListener('change',e => {
step4.style.display = 'flex';
splitValue = surroundSystem.value;
})

subwoofer.addEventListener('change', e =>{
step5.style.display = 'flex';
subwooferValue = subwoofer.value;
})

powerType.addEventListener('change', () =>{
step6.style.display = 'flex';
powerValue = powerType.value;
})

modules.addEventListener('change', e => {
summary.style.display = 'flex';
moduleValue = modules.value;
})

summary.addEventListener('click', e=>{
step1.style.display = 'none';
step2.style.display = 'none';
step3_1.style.display = 'none';
step3_2.style.display = 'none';
step3_3.style.display = 'none';
step4.style.display = 'none';
step5.style.display = 'none';
step6.style.display = 'none';
outputStep.style.display = 'flex';
summary.style.display = 'none';

if(setupValue === 'Mono' || setupValue === 'Dual'){
    let textToAdd = document.createTextNode('This ' + sizeValue + ' area designed speakers will be a ' + setupValue + ' Speaker build. ' + 
    splitValue + ' way internals, ' + subwooferValue + ' for a subwoofer. The power option will be ' + powerValue + 
    ' with options to connect audio devices by ' + moduleValue + '.')
    
    outputText.appendChild(textToAdd);
}else if(setupValue === 'Surround'){
    outputText.textContent +=
        'This ' + sizeValue + ' area designed speakers will be a ' + setupValue + ' Speaker build. ' + 
        splitValue + ' full build speakers, ' + subwooferValue + ' for a subwoofer. The power option will be ' + powerValue + 
        ' with options to connect audio devices by ' + moduleValue + '.'
}
})

saveData.addEventListener('click', e =>{
    let clientName = document.getElementById('client-name');
    let orderNumber = document.getElementById('order-number');
    let clientLabel = document.getElementById('client-label');
    let orderLabel = document.getElementById('order-label');
    let orderJSON = {
        client_name: clientName.value,
        order_number: orderNumber.value,
        environment: sizeValue,
        setup: setupValue,
        speaker_split: splitValue,
        subwoofer: subwooferValue,
        power_type: powerValue,
        modules_required: moduleValue 
    }
    console.log(orderJSON);
    clientLabel.style.display = 'none';
    orderLabel.style.display = 'none';
    clientName.style.display = 'none';
    orderNumber.style.display = 'none';
    saveData.style.display = 'none';

    fs.writeFile('../../assets/saveFiles/'+ orderNumber + '-' + clientName +'.json', orderJSON, (err) =>{
        if (err){
            outputText.textContent = 'Error Occured in Saving File. '
        }
    })
    outputText.textContent = 'Save file complete, please exit window to start crossover calculation.'
})
