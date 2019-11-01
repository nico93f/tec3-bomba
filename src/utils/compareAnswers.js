export default function(current, correct) {
    const partialAnswers = current.map((x, i) => x === correct[i]);

    console.log('partialAnswers', partialAnswers)

    if (partialAnswers.includes(false)) return 'INCORRECT';

    return current.length === correct.length ? 'CORRECT' : 'OK';
}