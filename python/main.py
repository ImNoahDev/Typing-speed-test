from flask import Flask, render_template, request, jsonify
import random
import time

app = Flask(__name__)

word_list = [
    "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", 
    "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", 
    "quince", "raspberry", "strawberry", "tangerine", "ugli", "vanilla", 
    "watermelon", "xigua", "yam", "zucchini"
]

def generate_random_words(n):
    return ' '.join(random.sample(word_list, n))

@app.route('/')
def index():
    sample_text = generate_random_words(5)
    return render_template('index.html', sample_text=sample_text)

@app.route('/result', methods=['POST'])
def result():
    data = request.json
    typed_text = data['typedText']
    start_time = data['startTime']
    end_time = time.time()
    
    time_taken = end_time - start_time
    words_per_minute = (len(typed_text.split()) / time_taken) * 60
    accuracy = sum(1 for a, b in zip(typed_text, sample_text) if a == b) / len(sample_text)
    
    return jsonify({
        'timeTaken': time_taken,
        'wordsPerMinute': words_per_minute,
        'accuracy': accuracy * 100
    })

if __name__ == '__main__':
    app.run(debug=True)
