/* eslint-disable no-param-reassign */

function getRandomPicture() {
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const WilfredWarrior = [
    "https://i.imgur.com/PLmEHcI.jpeg",
    "https://i.imgur.com/zc2JfLO.jpeg",
    "https://i.imgur.com/KVh7cZc.jpeg",
    "https://i.imgur.com/HgTWamQ.jpeg",
    "https://i.imgur.com/1fzt4VB.jpeg",
    "https://i.imgur.com/APkG38E.jpeg",
  ];

  return WilfredWarrior[getRandomIntInclusive(0, WilfredWarrior.length)];
}

export default getRandomPicture;
