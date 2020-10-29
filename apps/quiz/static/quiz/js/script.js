const addQuestionBtn = document.querySelector('#btn_add_question');


const addAnswer = (addAnswerBtn) => {

    const answerForm = addAnswerBtn.parentElement.parentElement.querySelectorAll('.answer');
    const container = addAnswerBtn.parentElement.parentElement.querySelector('.answers');
    const questionInput = addAnswerBtn.parentElement.parentElement.getElementsByTagName('input')[0];

    const questionNum = questionInput.getAttribute('name').split('-')[1];
    let answerNum = answerForm.length - 1;

    const newAnswer = answerForm[0].cloneNode(true);

    const removeBtn = '<input type="button" class="remove_answer" value="&#xf00d">';
    const wrapper = document.createElement('div');
    wrapper.title = 'Remove answer'
    wrapper.innerHTML = removeBtn;
    newAnswer.appendChild(wrapper)

    const formRegex = RegExp('ans_formset_(\\d)-(\\d){1}-', 'g');

    answerNum++;
    newAnswer.innerHTML = newAnswer.innerHTML.replace(formRegex, `ans_formset_${questionNum}-${answerNum}-`);
    container.appendChild(newAnswer);

    const totalAnswers = document.querySelector(`#id_ans_formset_${questionNum}-TOTAL_FORMS`);
    totalAnswers.setAttribute('value', `${answerNum + 1}`);

}


addQuestionBtn.addEventListener('click', (event) => {

    const addQuestionBtn = event.target;
    const questionForm = addQuestionBtn.parentElement.parentElement.querySelectorAll('.question');
    const container = addQuestionBtn.parentElement.parentElement.querySelector('#questions');
    const totalQuestions = document.querySelector('#id_question_set-TOTAL_FORMS');

    let questionNum = questionForm.length - 1;
    questionNum++

    const newQuestion = (
        `<h3>Question</h3>` +
        `<input type="text" name="question_set-${questionNum}-question" maxlength="255" id="id_question_set-${questionNum}-question">` +
        `<div class="answers">` +
        `<input type="hidden" name="ans_formset_${questionNum}-TOTAL_FORMS" value="1" id="id_ans_formset_${questionNum}-TOTAL_FORMS">` +
        `<input type="hidden" name="ans_formset_${questionNum}-INITIAL_FORMS" value="0" id="id_ans_formset_${questionNum}-INITIAL_FORMS">` +
        `<input type="hidden" name="ans_formset_${questionNum}-MIN_NUM_FORMS" value="0" id="id_ans_formset_${questionNum}-MIN_NUM_FORMS">` +
        `<input type="hidden" name="ans_formset_${questionNum}-MAX_NUM_FORMS" value="1000" id="id_ans_formset_${questionNum}-MAX_NUM_FORMS">` +
        `<h3>Answers</h3>` +
        `<div class="answer">` +
        `<input type="text" name="ans_formset_${questionNum}-0-answer" id="id_ans_formset_${questionNum}-0-answer">` +
        `<div title="Check the box if the answer you is meant to be correct">` +
        `<input type="checkbox" name="ans_formset_${questionNum}-0-correct" id="id_ans_formset_${questionNum}-0-correct" checked="">` +
        `<label for="id_ans_formset_${questionNum}-0-correct"><i class="fas fa-check" aria-hidden="true"></i></label>` +
        `</div>` +
        `</div>` +
        `</div>` +
        `<p>` +
        `<input type="button" value="Add Answer" class="btn_add_answer" id="question-${questionNum}" onclick="addAnswer(this)">` +
        `</p>`
    );
    const wrapper = document.createElement('div');
    wrapper.className = 'question';
    wrapper.innerHTML = newQuestion;

    container.appendChild(wrapper);
    totalQuestions.setAttribute('value', `${questionNum + 1}`);

});


document.addEventListener('click', (event) => {

    // Handles delete answer button
    if (event.target && event.target.className == 'remove_answer') {

        const removeAnswerBtn = event.target;
        const answerForm = removeAnswerBtn.parentElement.parentElement.parentElement.querySelectorAll('.answer');
        const container = removeAnswerBtn.parentElement.parentElement.parentElement;
        const totalAnswers = document.querySelector('#id_ans_formset_0-TOTAL_FORMS');

        let answerNum = answerForm.length - 1;

        const contents = [];
        for (let i = 0; i < answerNum + 1; i++) {
            // Get the content of all answers and add them into an array
            contents.push(answerForm[i].querySelector('input').value);
        }
        // Always remove the last answer input
        container.removeChild(container.lastChild);

        // If there are more contents than number of answers present in frontend
        // it means that the answer field deleted was filled and that content should
        // be deleted as well so we find that content and delete it from the array
        if (contents.length > answerNum) {
            const eventTargetIndex = contents.indexOf(removeAnswerBtn.parentElement.parentElement.querySelector('input').value);
            contents.splice(eventTargetIndex, 1);
        }

        // This shifts all the answers' values to their correct position
        for (let i = 0; i < answerNum + 1; i++) {
            answerForm[i].querySelector('input').value = contents[i];
        }

        totalAnswers.setAttribute('value', `${answerNum}`);

    }

});
