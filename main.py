from flask import Flask, render_template, jsonify, request

app = Flask(__name__)


questions = [{'image': '/static/images/mom.jpg', 
              'question': 'Кто пел песню на льдине?', 
              'answers': ['Слоненок', 'Мамонтёнок', 'Тигренок'],
              'right_answer': 1},

            {'image': '/static/images/ballet.jpg', 
              'question': 'Как называется известный рождественский балет?', 
              'answers': ['Щелкунчик', 'Буратино', 'Анаконда'],
              'right_answer': 0},

            {'image': '/static/images/square.jpg', 
              'question': 'Как называется геометрический музыкальный инструмент?', 
              'answers': ['Треугольник', 'Трамбон', 'Куб'],
              'right_answer': 0},
            
            {'image': '/static/images/tomato.jpg', 
              'question': 'Какого цвета помидор', 
              'answers': ['Синий', 'Черный', 'Красный'],
              'right_answer': 2},

            ]


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get/<question_id>', methods=['get'])
def get_question(question_id):
    return jsonify(questions[int(question_id)])


@app.route('/post/<question_id>', methods=['post'])
def post_question(question_id):
    data = request.json
    if int(data['button']) == questions[int(question_id)]['right_answer']:

        return jsonify({'answer': 1})
    return jsonify({'answer': 0})
    
    


if __name__ == '__main__':
    app.run(debug=True)