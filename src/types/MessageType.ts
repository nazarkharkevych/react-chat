export type MessageType = {
  id: string,
  chatId: string,
  text: string,
  type: 'user' | 'response',
  time: number,
}
