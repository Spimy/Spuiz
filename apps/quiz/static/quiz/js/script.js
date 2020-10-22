const addAnswerBtn = document.querySelector('.btn_add_answer');
const addQuestionBtn = document.querySelector('#btn_add_question');

addAnswerBtn.addEventListener('click', () => {

    // Question number
    const question_ptr = addAnswerBtn.getAttribute('id').split('-')[1];

    // Answer number
    const total_question_answers = document.querySelector(`[name=ans_formset_${question_ptr}-TOTAL_FORMS]`);
    const question_answer_form_count = parseInt(total_question_answers.value);

    // Increment answer number for next answer
    total_question_answers.value = question_answer_form_count + 1;

    // HTML for new answer element
    const new_answer_form = (
        `<input type="text" name="ans_formset_${question_ptr}-${question_answer_form_count}-answer" maxlength="255" id="id_ans_formset_${question_ptr}-${question_answer_form_count}-answer">` +
        `<div title="Check the box if the answer you is meant to be correct">` +
        `<input type="checkbox" name="ans_formset_${question_ptr}-${question_answer_form_count}-correct" id="id_ans_formset_${question_ptr}-${question_answer_form_count}-correct" checked="" />` +
        `<label for="id_ans_formset_${question_ptr}-${question_answer_form_count}-correct"><i class="fas fa-check"></i></label>` +
        `<input type="hidden" name="ans_formset_${question_ptr}-${question_answer_form_count}-id" id="id_ans_formset_${question_ptr}-${question_answer_form_count}-id">` +
        `<input type="hidden" name="ans_formset_${question_ptr}-${question_answer_form_count}-question" id="id_ans_formset_${question_ptr}-${question_answer_form_count}-question">` +
        `</div>` +
        `<div title="Remove answer">` +
        `<input type="button" class="remove_answer" value="&#xf00d" id="question-${question_ptr}">` +
        `</div>`
    );

    // Append the new answer element in a fieldset after the previous answer element
    const wrapper = document.createElement('div');
    wrapper.className = 'answer';
    wrapper.innerHTML = new_answer_form;
    addAnswerBtn.parentElement.parentElement.querySelector('.answers').append(wrapper);

});

// This is for dynamically generated button events
document.addEventListener('click', (event) => {

    // Handles delete answer button
    if (event.target && event.target.className == 'remove_answer') {

        // Refer to addAnswerBtn event as this is similar
        const question_ptr = event.target.getAttribute('id').split('-')[1];
        const total_question_answers = document.querySelector(`[name=ans_formset_${question_ptr}-TOTAL_FORMS]`);
        const question_answer_form_count = parseInt(total_question_answers.value);

        // Decrement answer number to keep track of number of answers
        total_question_answers.value = question_answer_form_count - 1;

        const answers = event.target.parentElement.parentElement.parentElement;
        const contents = [];

        const answersNode = answers.querySelectorAll('.answer');
        for (let i = 0; i < answersNode.length; i++) {
            // Get the content of all answers and add them into an array
            contents.push(answersNode[i].querySelector('input').value);
        }
        // Always remove the last answer input
        answers.removeChild(answers.lastChild);

        // If there are more contents than number of answers present in frontend
        // it means that the answer field deleted was filled and that content should
        // be deleted as well so we find that content and delete it from the array
        if (contents.length > answersNode.length - 1) {
            const eventTargetIndex = contents.indexOf(event.target.parentElement.parentElement.querySelector('input').value);
            contents.splice(eventTargetIndex, 1);
        }

        // This shifts all the answers' values to their correct position
        for (let i = 0; i < answersNode.length; i++) {
            answersNode[i].querySelector('input').value = contents[i];
        }

    }

});