export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    pageCount: number;
    publishedDate: Date;
  };
}
