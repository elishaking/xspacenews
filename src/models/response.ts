import { ArticleModelAttributes } from "./article";

interface Response {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface ArticleResponse extends Response {
  data: ArticleModelAttributes[] | ArticleModelAttributes;
}

export interface ErrorResponse extends Response {
  error: any;
}
