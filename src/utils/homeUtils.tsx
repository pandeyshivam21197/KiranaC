import { headlinesToDisplay } from "../components/organisms/headlineCardList/constants";

export const getRandomHeadlineIds = (headlineIds: string[]): string[] => {
  const getRandomNumberFromArray = (array: string[]) => {
    var randromNumber = array[Math.floor(Math.random() * array.length)];

    return randromNumber;
  };
  const totalHeadlines = headlineIds.length;

  if (totalHeadlines < headlinesToDisplay) {
    return [];
  }

  const gap = totalHeadlines / headlinesToDisplay;

  const randomIds = [];

  for (let i = 0; i < headlinesToDisplay; i++) {
    const start = i * gap;
    const randomId = getRandomNumberFromArray(
      headlineIds.slice(start, start + gap)
    );

    randomIds.push(randomId);
  }

  return randomIds;
};
