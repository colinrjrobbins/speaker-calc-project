let selectSize = document.getElementById('size-option'),
    quizInfo = document.getElementById('quiz-info'),
    step1 = document.getElementById('step1'),
    step2 = document.getElementById('step2'),
    step3_1 = document.getElementById('step3-1'),
    step3_2 = document.getElementById('step3-2'),
    step3_3 = document.getElementById('step3-3'),
    step4 = document.getElementById('step4'),
    sizeOption = document.getElementById('size-option'),
    systemType = document.getElementById('system-type'),
    monoSplit = document.getElementById('mono-system'),
    stereoSplit = document.getElementById('stereo-system'),
    surroundSystem = document.getElementById('surround-system')

let startButton = document.getElementById('start')


startButton.addEventListener('click',e=>{
    startButton.style.display = 'none';
    step1.style.display = 'flex';
    quizInfo.style.display = 'none';
})

sizeOption.addEventListener('change',e=>{
    step2.style.display = 'flex';
})

systemType.addEventListener('change', e => {
    console.log(systemType.value)
    console.log(e.returnValue)
    if (systemType.value === 'mono'){
        step3_1.style.display = 'flex';
        step3_2.style.display = 'none';
        step3_3.style.display = 'none';
    }else if (systemType.value === 'dual-stereo'){
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

