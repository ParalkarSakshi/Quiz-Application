document.addEventListener('DOMContentLoaded', () => {

     // Get references to relevant DOM elements
    const quizPage = document.getElementById('quiz');
    const nextQuestionBtn = document.getElementById('next-question');
    const questionNumber = document.getElementById('question-number');
    const questionText = document.getElementById('question-text');
    const optionButtons = document.querySelectorAll('.option-btn');
    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score');

    // Retrieve current category from local storage and initialize variables
    let currentCategory = localStorage.getItem('currentCategory');
    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;
    let timeTaken = 0;

    // Define questions object with categories and their respective questions
    const questions = {
        Time_and_work: [
            { question: 'A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is :', options: ['1/4', '1/10', '7/15', '8/15'], answer: '8/15' },
            { question: 'A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?', options: ['12 days', '13 days', '18 days', '16 days'], answer: '15 days' },
            { question: 'A alone can do a piece of work in 6 days and B alone in 8 days. A and B undertook to do it for Rs. 3200. With the help of C, they completed the work in 3 days. How much is to be paid to C?', options: ['Rs. 375', 'Rs. 400', 'Rs. 600', 'Rs. 800'], answer: 'Rs. 400' },
            { question: 'If 6 men and 8 boys can do a piece of work in 10 days while 26 men and 48 boys can do the same in 2 days, the time taken by 15 men and 20 boys in doing the same type of work will be:', options: ['4 days', '7 days', '5 days', '6 days'], answer: '4 days' },
            { question: 'A can do a piece of work in 4 hours; B and C together can do it in 3 hours, while A and C together can do it in 2 hours. How long will B alone take to do it?', options: ['8 hours', '12 hours', '10 hours', '24 hours'], answer: '12 hours' },
            { question: 'A can do a certain work in the same time in which B and C together can do it. If A and B together could do it in 10 days and C alone in 50 days, then B alone could do it in:', options: ['15 days', '20 days', '25 days', '30 days'], answer: '25 days' },
            { question: 'A and B together can do a piece of work in 30 days. A having worked for 16 days, B finishes the remaining work alone in 44 days. In how many days shall B finish the whole work alone?', options: ['30 days', '40 days', '60 days', '70 days'], answer: '60 days' },
            { question: 'A machine P can print one lakh books in 8 hours, machine Q can print the same number of books in 10 hours while machine R can print them in 12 hours. All the machines are started at 9 A.M. while machine P is closed at 11 A.M. and the remaining two machines complete work. Approximately at what time will the work (to print one lakh books) be finished ?', options: ['11:30 A.M', '12 noon', '12:30 P.M', '1:00 P.M'], answer: '1:00 P.M' },
            { question: '4 men and 6 women can complete a work in 8 days, while 3 men and 7 women can complete it in 10 days. In how many days will 10 women complete it?', options: ['35', '50', '45', '40'], answer: '40' },
            { question: '10 women can complete a work in 7 days and 10 children take 14 days to complete the work. How many days will 5 women and 10 children take to complete the work?', options: ['3', '4', '7', 'cannot be determined'], answer: '7' },
        ],

        Height_and_Distance: [
            { question: 'A man standing at a point P is watching the top of a tower, which makes an angle of elevation of 30° with the mans eye. The man walks some distance towards the tower to watch its top and the angle of the elevation becomes 60°. What is the distance between the base of the tower and the point P?', options: ['8 units', '12 units', 'Data inadequate', 'None of these'], answer: 'Data inadequate' },
            { question: 'The angle of elevation of a ladder leaning against a wall is 60° and the foot of the ladder is 4.6 m away from the wall. The length of the ladder is:', options: ['2.3 m', '4.6 m', '7.8 m', '9.2 m'], answer: '9.2 m' },
            { question: 'From a point P on a level ground, the angle of elevation of the top tower is 30°. If the tower is 100 m high, the distance of point P from the foot of the tower is:', options: ['149 m', '453 m', '546 m', '173 m'], answer: '173 m' },
            { question: 'The angle of elevation of the sun, when the length of the shadow of a tree 3 times the height of the tree, is:', options: ['30°', '50°', '45°', '57°'], answer: '30°' },
            { question: 'Two ships are sailing in the sea on the two sides of a lighthouse. The angle of elevation of the top of the lighthouse is observed from the ships are 30° and 45° respectively. If the lighthouse is 100 m high, the distance between the two ships is:', options: ['173 m', '453 m', '853 m', '273 m'], answer: '273 m' },
            { question: 'An observer 1.6 m tall is 20V3 away from a tower. The angle of elevation from his eye to the top of the tower is 30°. The height of the tower is:', options: ['21.6 m', '54.6 m', '76.5 m', '53.2 m'], answer: '21.6 m' },
            { question: 'If sin x = 1 / 2, then what will be the value of x in degree?', options: ['30', '60', '45', '37'], answer: '30' },
            { question: 'Which of the following options is the correct relationship between a and b, if their measure add up to 90 degree?', options: ['Cos a = tan b', 'Sin a = tan b', 'Sec a = cosec b', 'Tan a = cos b'], answer: 'Sec a = cosec b' },
            { question: 'If triangle XYZ is right angled at Y, then the value of cos (X + Z) will be?', options: ['1 / 2', '1 / 3', '1', '0'], answer: '0' },
            { question: 'Which of the following options are the correct pair of complementary angles?', options: ['37, 53', '65, 15', '60, 120', '45, 55'], answer: '37, 53' },
        ],

        Simple_Interest: [
            { question: 'Mr. Thomas invested an amount of Rs. 13,900 divided in two different schemes A and B at the simple interest rate of 14% p.a. and 11% p.a. respectively. If the total amount of simple interest earned in 2 years be Rs. 3508, what was the amount invested in Scheme B?', options: ['Rs. 6400', 'Rs. 7200', 'Rs. 6700', 'Rs. 4300'], answer: 'Rs. 6400' },
            { question: 'A sum fetched a total simple interest of Rs. 4016.25 at the rate of 9 p.c.p.a. in 5 years. What is the sum?', options: ['Rs. 4725', 'Rs. 8925', 'Rs. 4655', 'Rs. 7462'], answer: 'Rs. 8925' },
            { question: 'Reena took a loan of Rs. 1200 with simple interest for as many years as the rate of interest. If she paid Rs. 432 as interest at the end of the loan period, what was the rate of interest?', options: ['3.6', '6', '4.5', '18'], answer: '6' },
            { question: 'How much time will it take for an amount of Rs. 450 to yield Rs. 81 as interest at 4.5% per annum of simple interest?', options: ['4 years', '4.5 years', '3 years', '3.5 years'], answer: '4 years' },
            { question: 'A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:', options: ['Rs. 658', 'Rs. 700', 'Rs. 560', 'Rs. 568'], answer: 'Rs. 698' },
            { question: 'At what rate percent per annum will a sum of money double in 8 years', options: ['45.6%', '12.5%', '17.8%', '78.7%'], answer: '12.5%' },
            { question: 'A man took loan from a bank at the rate of 12% p.a. simple interest. After 3 years he had to pay Rs. 5400 interest only for the period. The principal amount borrowed by him was:', options: ['Rs.67530', 'Rs.76200', 'Rs.15000', 'Rs.64000'], answer: 'Rs.15000' },
            { question: 'A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:', options: [' 463', ' 698', ' 235', ' 867'], answer: ' 698' },
            { question: 'How much time will take for an amount of Rs. 450 to yield Rs. 81 as interest at 4.5% per annum of simple interest  ?', options: ['4 years', '4.7 years', '2 years', '7.4 years'], answer: '4 years' },
            { question: 'A sum was put at simple interest at a certain rate for 3 years. Had it been put at 2% higher rate, it would have fetched Rs 360 more. Find the sum', options: [' Rs.4000', ' Rs.2000', ' Rs.8000', ' Rs.6000'], answer: ' Rs.6000' },
        ],

        Problems_on_Trains: [
            { question: 'A train 125 m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. The speed of the train is:', options: ['90 km/hr', '50 km/hr', '35 km/hr', '76 km/hr'], answer: '50 km/hr' },
            { question: 'The length of the bridge, which a train 130 metres long and travelling at 45 km/hr can cross in 30 seconds, is:', options: ['645 m', '754 m', '534 m', '245 m'], answer: '245 m' },
            { question: 'Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively and they cross each other in 23 seconds. The ratio of their speeds is:', options: ['1 : 8', '7 : 4', '3 : 2', '1 : 2'], answer: '3 : 2' },
            { question: 'A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?', options: ['532 m', '240 m', '263 m', '674 m'], answer: '240 m' },
            { question: 'A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?', options: ['150 metres', '120 metres', '520 metres', '530 metres'], answer: '150 metres' },
            { question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?', options: ['90 sec', '36 sec', '89 sec', '68 sec'], answer: '89 sec' },
            { question: 'A train 360 m long is running at a speed of 45 km/hr. In what time will it pass a bridge 140 m long?', options: ['36 sec', '40 sec', '67 sec', '79 sec'], answer: '40 sec' },
            { question: 'A jogger running at 9 kmph alongside a railway track in 240 metres ahead of the engine of a 120 metres long train running at 45 kmph in the same direction. In how much time will the train pass the jogger?', options: ['36 sec', '58 sec', '76 sec', '45 sec'], answer: '36 sec' },
            { question: 'A goods train runs at the speed of 72 kmph and crosses a 250 m long platform in 26 seconds. What is the length of the goods train?', options: ['768 m', '675 m', '560 m', '270 m'], answer: '270 m' },
            { question: 'Two trains, each 100 m long, moving in opposite directions, cross each other in 8 seconds. If one is moving twice as fast the other, then the speed of the faster train is', options: ['98 km/hr', '60 km/hr', '80 km/hr', '37 km/hr'], answer: '60 km/hr' },
        ],

        Profit_and_Loss: [
            { question: 'The cost price of 20 articles is the same as the selling price of x articles. If the profit is 25%, then the value of x is:', options: ['15', '18', '16', '25'], answer: '16' },
            { question: 'In a certain store, the profit is 320% of the cost. If the cost increases by 25% but the selling price remains constant, approximately what percentage of the selling price is the profit?', options: ['50%', '70%', '10%', '750%'], answer: '70%' },
            { question: 'If selling price is doubled, the profit triples. Find the profit percent.', options: ['524', '363', '100', '642'], answer: '100' },
            { question: 'A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?', options: ['2', '3', '5', '9'], answer: '5' },
            { question: 'Ravindra and Yash are employees of an IT firm in Bangalore, where Ravindra recently sold his Hyundai car worth Rs1, 50,000 was sold to Yash at 5% profit. At 2% loss Yash sold the car back to Ravindra. Find gain of  Ravindra (i.e. Difference between the price at which Ravindra sold the car to the price at which he finally bought it again.)', options: ['Rs. 8443', 'Rs. 7542', 'Rs. 3150', 'Rs. 3520'], answer: 'Rs. 3150' },
            { question: 'he aristo complex is a prominent residence in beautiful city of Jaipur where it had recently got a grocery shop opened where the profit is 320% of the cost in the shop. If the selling price remains constant while the cost increases by 25%, find out approximately what percentage of the selling price is the profit?', options: ['43%', '70%', '60%', '64%'], answer: '70%' },
            { question: 'Ricosta has a Pawn Shop and a visitor comes to his prominent shop in the busy city of Chennai where Ricosta buys a vintage scooter for Rs.4700 from him. On its repairs he spends Rs.800. If he sells the vintage scooter for Rs.5800 what is his profit%?', options: ['20%', '30%', '60/11%', '32%'], answer: '60/11%' },
            { question: 'The government had released a very good scheme for local vendors on the variety of rice and their prices .A local dealer purchased two varieties of rice, 100 kilogram at Rs.14.50 per kilogram and 110 kilogram at Rs.15 per kilogram. The shopkeeper being greedy, had combined the two varieties of rice and sold the mixture at a profit of 15 %. Calculate the S.P of the mixture per KG.', options: ['Rs 65.97', 'Rs 54.31', 'Rs 18.97', 'Rs 32.37'], answer: 'Rs 18.97' },
            { question: 'Raman lives in pune, he and his dad together opened a new Casio watch showroom on his birthday. Raman sold two watches at the same price, one at 10 % profit and other at 10 % loss. Find his overall gain or loss percent', options: ['1%', '3%', '6%', '8%'], answer: '1%' },
            { question: 'ayce is an independent woman who has not completed her education so she earns for her living by selling rice. She decided to get 15% profit by selling rice. She buys two varieties of rice. V1: 150 kg at Rs. 35/ Kg; V2: 190 kg at Rs. 50/ kg. At what price per kg she should sell the rice mix per kg?', options: ['Rs. 54.23', 'Rs. 34.53', 'Rs. 52.88', 'Rs. 49.88'], answer: 'Rs. 49.88' },
        ],

        Aligation_or_Mixture: [
            { question: 'A vessel is filled with liquid, 3 parts of which are water and 5 parts syrup. How much of the mixture must be drawn off and replaced with water so that the mixture may be half water and half syrup?', options: ['Rs. 541', 'Rs. 175.50', 'Rs. 365', 'Rs. 145.0'], answer: 'Rs. 175.50' },
            { question: 'Tea worth Rs. 126 per kg and Rs. 135 per kg are mixed with a third variety in the ratio 1 : 1 : 2. If the mixture is worth Rs. 153 per kg, the price of the third variety per kg will be:', options: ['A', 'B', 'C', 'D'], answer: 'B' },
            { question: 'A can contains a mixture of two liquids A and B is the ratio 7 : 5. When 9 litres of mixture are drawn off and the can is filled with B, the ratio of A and B becomes 7 : 9. How many litres of liquid A was contained by the can initially?', options: ['23', '96', '54', '21'], answer: '21' },
            { question: 'A milk vendor has 2 cans of milk. The first contains 25% water and the rest milk. The second contains 50% water. How much milk should he mix from each of the containers so as to get 12 litres of milk such that the ratio of water to milk is 3 : 5?', options: ['4 litres, 3 litres', '6 litres, 6 litres', '7 litres, 6 litres', '4 litres, 9 litres'], answer: '6 litres, 6 litres' },
            { question: 'In what ratio must a grocer mix two varieties of pulses costing Rs. 15 and Rs. 20 per kg respectively so as to get a mixture worth Rs. 16.50 kg?', options: ['6 : 3', '7 : 3', '8 : 4', '5 : 3'], answer: '7 : 3' },
            { question: 'How many kilogram of sugar costing Rs. 9 per kg must be mixed with 27 kg of sugar costing Rs. 7 per kg so that there may be a gain of 10% by selling the mixture at Rs. 9.24 per kg?', options: ['53 kg', '56 kg', '68 kg', '63 kg'], answer: '63 kg' },
            { question: 'A container contains 40 litres of milk. From this container 4 litres of milk was taken out and replaced by water. This process was repeated further two times. How much milk is now contained by the container?', options: ['24 litres', '29.16 litres', '47 litres', '63.56 litres'], answer: '29.16 litres' },
            { question: 'In what ratio must water be mixed with milk to gain 16% on selling the mixture at cost price?', options: ['7:5', '7:2', '1:7', '1:6'], answer: '1:6' },
            { question: 'The cost of Type 1 rice is Rs. 15 per kg and Type 2 rice is Rs. 20 per kg. If both Type 1 and Type 2 are mixed in the ratio of 2 : 3, then the price per kg of the mixed variety of rice is:', options: ['Rs. 13', 'Rs. 14.50', 'Rs. 18.50', 'Rs. 18'], answer: 'Rs. 18' },
            { question: '8 litres are drawn from a cask full of wine and is then filled with water. This operation is performed three more times. The ratio of the quantity of wine now left in cask to that of water is 16 : 65. How much wine did the cask hold originally?', options: ['56 litres', '21 litres', '24 litres', '43 litres'], answer: '24 litres' },
        ],
    };

    // Function to start the timer for each question
    function startTimer() {
        let timeLeft = 10;
        timerDisplay.textContent = `${timeLeft}`;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                showNextQuestion();
            }
        }, 1000);
    }

       // Function to display next question
    function showNextQuestion() {
        if (currentQuestionIndex < questions[currentCategory].length) {
            const currentQuestion = questions[currentCategory][currentQuestionIndex];
            questionNumber.textContent = `${currentQuestionIndex + 1}/10`;
            questionText.textContent = currentQuestion.question;
            optionButtons.forEach((button, index) => {
                button.textContent = currentQuestion.options[index];
                button.onclick = () => checkAnswer(currentQuestion.options[index], currentQuestion.answer);
            });
            currentQuestionIndex++;
            startTimer();
        } else {
            endQuiz();
        }
    }

    // Function to check selected answer against correct answer
    function checkAnswer(selectedOption, correctAnswer) {
        clearInterval(timerInterval);
        if (selectedOption === correctAnswer) {
            score += 1;
        }
        scoreDisplay.textContent = `SCORE: ${score}`;
        showNextQuestion();
    }

      // Function to end the quiz
    function endQuiz() {
        alert(`Quiz Over! Your score is ${score}`);
        localStorage.removeItem('currentCategory');
        window.location.href = 'result.html';
    }

    // Show the first question when the page loads
    showNextQuestion();

     // Add event listener for the next question button
    nextQuestionBtn.addEventListener('click', showNextQuestion);
});