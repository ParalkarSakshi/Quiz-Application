// document.addEventListener('DOMContentLoaded', () => {
    const quizResult = {
        participantName: "John Doe",
        totalTime: "110 seconds",
        totalQuestions: 10,
        attemptedQuestions: 10,
        correctQuestions: 7,
        wrongQuestions: 3
    };
    
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("participant-name").textContent = quizResult.participantName;
        document.getElementById("total-time").textContent = quizResult.totalTime;
        document.getElementById("total-questions").textContent = quizResult.totalQuestions;
        document.getElementById("attempted-questions").textContent = quizResult.attemptedQuestions;
        document.getElementById("correct-questions").textContent = quizResult.correctQuestions;
        document.getElementById("wrong-questions").textContent = quizResult.wrongQuestions;
    
        const scorePercentage = ((quizResult.correctQuestions / quizResult.totalQuestions) * 100).toFixed(2);
        document.getElementById("score-percentage").textContent = `${scorePercentage}%`;
    });

    // Display final score and time
    // document.getElementById('final-score').innerText = `Score: ${score}`;
    // const minutes = Math.floor(timeTaken / 60);
    // const seconds = timeTaken % 60;
    // document.getElementById('final-time').innerText = `Time: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;


    document.getElementById('start-again-btn').addEventListener('click', () => {
        window.location.href = 'quiz.html';// Redirect to quiz page
    });

    document.getElementById('home-btn').addEventListener('click', () => {
        window.location.href = 'home.html';// Redirect to home page
    });
// });
