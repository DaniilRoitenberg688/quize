let current_score = 0
let current_question = 0
let time_left = 15

setInterval(updateTimeScore, 1000)

getData(current_question)

function parseAnswer(response) {
    return response.json();
}


function getData(id) {
    let link = '/get/' + id
    data = fetch(link).then(parseAnswer).then(showData)

}

function showData(data) {
    image = document.getElementById('image')
    image.src = data['image']


    question = document.getElementById('question')
    question.innerText = data['question']
    // question.value = data['question']

    for (let i = 0; i < data['answers'].length; i++) {
        id = 'answer' + i
        answer = document.getElementById(id)
        answer.innerText = data['answers'][i]
    }
}


function upScore(n) {
    a = parseInt(n['answer'])
    console.log(current_score)

    current_score = current_score + a

    console.log()
    score = document.getElementById('score')
    score.innerText = 'Очки: ' + current_score

    if (current_question == 3) {
        alert("Вопросы закончились! Ваш результат: " + current_score)
        location.reload()
    }
    current_question += 1

    getData(current_question)


    
    
}


function onClick(id) {
    link = '/post/' + current_question
    n = fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "button": id })
    }).then(parseAnswer).then(upScore)
    

}


function updateTimeScore() {
    time = document.getElementById('time')
    time.innerText = 'Время: ' + time_left
    time_left -= 1
    if (time_left == 0) {
        alert("Время вышло. Ваш результат: " + current_score)
        location.reload()
    }
}