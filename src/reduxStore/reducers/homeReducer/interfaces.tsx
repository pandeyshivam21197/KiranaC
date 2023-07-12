export interface IHeadline {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
}

export type IHeadlinesById = Record<string, IHeadline>;

export interface IHomeScreenState {
  headlinesById: IHeadlinesById;
  pinnedHeadlineIds: string[];
  displayedHealineIds: string[];
}
