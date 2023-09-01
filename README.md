# <center>MindMingle - A Quiz App!</center>

[**MindMingle**](https://mindmingle.netlify.app/) is an online quiz application where a user can answer 15 questions from any random topics round the globe and test their knowledge with fun!

## Overview
- MindMingle is a web-app built using NextJS 13.
- It has 2 pages:
	- / (home page)
	- /quiz?name={{{your-name}}} (to display quiz questions and your result)

## Challenges
- <ins>User Authentication</ins> - A user should not be able to access the quiz page without authentication. To solve this issue, I have used cookies. Whenever a user comes through home page we set a cookie to authenticate the user on the quiz page.

## Components
- `<Card />` - Card component displays a question along with the available possible answers.
- `<QuestionPanel />` - It displays all the question using their number for easy navigation along with the status (Attempted/Visited).
- `<Result />` - It displays the result of the quiz in a tabular format with Question number, Selected Answer, Correct Answer and Score.
- `<CountdownTimer />` - Component to keep the clock ticking from 30:00 to 00:00.
- `<RadioButton />` - Component to display possible option for a question.

Github repo - [MindMingle Github](https://github.com/iamyashkhandelwal/quiz-app-nextjs)
Made with ❤️ by [Yash Khandelwal](https://github.com/iamyashkhandelwal)