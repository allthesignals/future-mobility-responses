import Route from '@ember/routing/route';
import fetch from 'fetch';

const dummyData = [
  {
    "q": 1,
    "q_text": "In 2040, the average citizen will...",
    "total": 17
  },
  {
    "q": 2,
    "q_text": "My preferred transport mode(s) in 2040 will be...",
    "total": 27
  },
  {
    "q": 3,
    "q_text": "In 2040, the average person will...",
    "total": 1503
  },
  {
    "q": 4,
    "q_text": "Responsibility for AV accidents belongs to...",
    "total": 3
  },
  {
    "q": 5,
    "q_text": "In 2040, commuting will take...",
    "total": 5
  },
  {
    "q": 6,
    "q_text": "In 2040, everyone will have access to...",
    "total": 1
  },
  {
    "q": 7,
    "q_text": "The future of mobility will make the world...",
    "total": 1
  },
  {
    "q": 8,
    "q_text": "In the future, my transportation costs will...",
    "total": 1
  },
  {
    "q": 9,
    "q_text": "Future mobility options will _____ carbon emissions.",
    "total": 1
  },
  {
    "q": 10,
    "q_text": "Future mobility options will have the greatest impact on...",
    "total": 1
  }
];

export default class ApplicationRoute extends Route {
  model() {
    // return fetch('http://18.85.45.120/qcount/?format=json')
    //   .then(blob => blob.json());
    return new Promise((resolve) => {
      resolve(dummyData);
    })
      // .then(data => {
      //   return data.map((({ total }) => total));
      // });
  }
}
