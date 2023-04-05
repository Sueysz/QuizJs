(function () {
    const buildQuiz = () => {
    
        const output = [];

        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                const answers = [];

                for (letter in currentQuestion.answers) {

                    answers.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
                    );
                }

                output.push(
                    `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
                );
            }
        );

        quizContainer.innerHTML = output.join('');
    }

    const showResults =() => {

        const answerContainers = quizContainer.querySelectorAll('.answers');

        let numCorrect = 0;

        myQuestions.forEach((currentQuestion, questionNumber) => {

            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;

                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    const showSlide =(n) => {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        }
        else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    const showNextSlide =() => {
        showSlide(currentSlide + 1);
    }

    const showPreviousSlide =() => {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
            question: "Quelles sont les 3 couleurs du drapeau italien ?",
            answers: {
                a: "bleu, vert et rouge",
                b: "Vert, beige et mauve",
                c: "Blanc, vert et rouge"
            },
            correctAnswer: "c"
        },
        {
            question: "Quel est le nom de la première des crypto monnaies créée en 2009 ?",
            answers: {
                a: "Etherium",
                b: "Bitcoin",
                c: "Dogecoin",
                D: "Shiba inu"
            },
            correctAnswer: "b"
        },
        {
            question: "Sur les 3 exemple quel est la bonne manière de déclarer une function ?",
            answers: {
                a: "const x =() =>{}",
                b: "fonction x =() {}",
                c: "const x ={} () "
            },
            correctAnswer: "a"
        }
    ];

    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(currentSlide);

    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();
