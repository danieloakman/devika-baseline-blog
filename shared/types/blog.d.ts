export interface Blog {
  id: string;
  title: string;
  content: string;
  publishedAt?: string | null;
  authorId: string;
}
