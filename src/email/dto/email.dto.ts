export class EmailDto {
  readonly to: string;
  readonly subject: string;
  readonly text?: string;
  readonly html?: string;
  readonly attachments?: Array<{ filename: string; content: any }>;
}
