export interface IHeadline {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
}

export type IHeadinesById = Record<number, IHeadline>;

export interface IHomeScreenState {
  headinesById: IHeadinesById;
  pinnedHeadlineIds: number[];
  displayedHealineIds: number[];
}
