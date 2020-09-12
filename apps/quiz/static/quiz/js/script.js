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
        '<legend>Answer</legend>' +
        '<p>' +
        `<input type="text" name="ans_formset_${question_ptr}-${question_answer_form_count}-answer" maxlength="255" id="id_ans_formset_${question_ptr}-${question_answer_form_count}-answer">` +
        '</p>' +
        '<p>' +
        `<label for="id_ans_formset_${question_ptr}-${question_answer_form_count}-correct">Correct:</label>` +
        `<input type="checkbox" name="ans_formset_${question_ptr}-${question_answer_form_count}-correct" id="id_ans_formset_${question_ptr}-${question_answer_form_count}-correct" checked="" />` +
        `<input type="hidden" name="ans_formset_${question_ptr}-${question_answer_form_count}-id" id="id_ans_formset_${question_ptr}-${question_answer_form_count}-id">` +
        `<input type="hidden" name="ans_formset_${question_ptr}-${question_answer_form_count}-question" id="id_ans_formset_${question_ptr}-${question_answer_form_count}-question">` +
        '</p>' +
        `<p><input type="button" class="btn_remove_answer" value="Remove answer" id="question-${question_ptr}"></p>`
    );

    // Append the new answer element in a fieldset after the previous answer element
    const wrapper = document.createElement('fieldset');
    wrapper.className = 'answer_form';
    wrapper.innerHTML = new_answer_form;
    addAnswerBtn.parentElement.parentElement.querySelector('.answers').append(wrapper);

});

// This is for dynamically generated button events
document.addEventListener('click', (event) => {

    // Handles delete answer button
    if (event.target && event.target.className == 'btn_remove_answer') {

        // Refer to addAnswerBtn event as this is similar
        const question_ptr = event.target.getAttribute('id').split('-')[1];
        const total_question_answers = document.querySelector(`[name=ans_formset_${question_ptr}-TOTAL_FORMS]`);
        const question_answer_form_count = parseInt(total_question_answers.value);

        // Decrement answer number to keep track of number of answers
        total_question_answers.value = question_answer_form_count - 1;
        event.target.parentElement.parentElement.remove();

    }

});