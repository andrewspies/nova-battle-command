export interface EventObject {
  name: string;
  action: (e: T<Event | MouseEvent>) => void;
}
