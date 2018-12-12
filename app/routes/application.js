import Route from '@ember/routing/route';
import fetch from 'fetch';
import environment from '../config/environment';
import RSVP from 'rsvp';
import d3 from 'd3';

const { nest } = d3;
const { hash } = RSVP;
const { host } = environment;

// css name map. TODO: refactor to be data-driven
export const MAP_STYLE_ID = [
  [5, 1, [125, 0, 46]],
  [4, 2, [213, 29, 82]],
  [8, 3, [0, 65, 107]],
  [13, 4, [51, 114, 169]],
  [14, 5, [241, 93, 42]],
  [6, 6, [223, 199, 35]],
  [10, 7, [0,  122,  102]],
  [7, 8, [77, 183, 72]],
  [9, 9, [105, 44, 122]],
  [12, 10, [220, 100, 156]],
].map(([id, classId, color]) => {
  return {
    classId,
    id,
    color,
  };
});

export default class ApplicationRoute extends Route {
  async model() {
    const surveys = await hash({
      questions: await fetch(`${host}/qcount/?format=json`)
        .then(blob => blob.json()),
      answers: await fetch(`${host}/qacount/?format=json`)
        .then(blob => blob.json()),
    });

    const { questions, answers: answerObjects } = surveys;

    return {
      ...surveys,
      proportions: nest()
        .key(d => d.q_id)
        .entries(answerObjects)
        .map(grouped => {
          const { key } = grouped;
          const { values: answers } = grouped;
          const [{ q_id, q_text }] = answers;
          const { total } = questions.find(({ q }) => q === q_id);

          return {
            q_id,
            q_text,
            label: q_text,
            question: q_text,
            total,
            classId: MAP_STYLE_ID.findBy('id', q_id).classId,
            color: MAP_STYLE_ID.findBy('id', q_id).color,
            answers: answers.map(({ a_id, a_text, id_list, total: count }) => {
              return {
                a_id,
                a_text,
                id_list,
                count,
              };
            })
          };
        })
    }
  }
}
