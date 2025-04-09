import { EventObject } from "../types";

/**
 * EventService
 * @description A simple event service that extends EventTarget and provides a event to emitter and listeners for defined event objects. EventService is pre-constructed. The events are defined in object map in a "events.ts" like file and is used to trigger actions for events.
 * @extends EventTarget
 * @export EventService
 * @example
 * ```typescript
 * // recommend an enum for Event names to prevent typos and better type checking.
 * const events: EventObject[] = [
 *   {
 *    name: "AppLoaded",
 *    action: (e) => console.log("App loaded!"),
 *   },
 *   {
 *    name: "UpdateUser",
 *    action: (e) => console.log("Update User!"),
 *   }
 * ];
 *
 * const eventSrv = new EventService(events);
 * ```
 */
export class EventService extends EventTarget {
  _events: EventObject[] = [];

  constructor() {
    super();
    this._events = [];
  }

  /**
   * emit
   * @description Emit an event
   * @public
   * @param {string} event Event name to emit
   * @param {any} detail (Optional) Event detail to pass to listeners e.g. { message: "Hello World!" } or { data: { // some data to pass } }
   * @returns {void}
   * @example
   * ```typescript
   * const data = {
   *  date: new Date(),
   *  userId: "123456",
   * };
   * eventService.emit("appLoaded", { message: "App has loaded successfully!", data });
   * ```
   */
  public emit(event: string, detail?: any): void {
    this.dispatchEvent(new CustomEvent(event, { detail }));
  }

  /**
   * add
   * @description Add an array of events to the event service
   * @public
   * @param {EventObject[]} events Event objects to add
   * @returns {void}
   * @example
   * ```typescript
   * const events: EventObject[] = [
   *   {
   *    name: "appLoaded",
   *    callback: (e) => console.log("App loaded!"),
   *   }
   * ];
   *
   * eventService.add(events);
   */
  public add(events: EventObject[]): void {
    events.forEach((e) => {
      this._events.push(e);
      this.listen(e);
    });
  }

  /**
   * remove
   * @description Remove an event from the event service by it's name (event name)
   * @public
   * @param {EventType} name Name of the event to remove
   * @returns {void}
   * @example
   * ```typescript
   * eventService.remove(EventType.LOAD_DEFAULT_SCENE);
   * ```
   */
  public remove(name: string): void {
    const item = this._events.filter((item) => item.name === name);
    this.unlisten(item[0]);
    this._events.splice(this._events.indexOf(item[0]), 1);
  }

  /**
   * clear
   * @description Clear / Remove all events from the event service
   * @returns {void}
   * @example
   * ```typescript
   * eventService.clear();
   * ```
   */
  public clear(): void {
    this._events.forEach((event) => {
      this.unlisten(event);
    });
    this._events = [];
  }

  /**
   * listen
   * @description Listen for an event
   * @param {string} event Event name to listen for
   * @param {() => void} callback Callback function to execute when event is emitted
   * @returns {void}
   */
  private listen(event: EventObject): void {
    this.addEventListener(event.name, event.action);
  }

  /**
   * unlisten
   * @description Stop / remove event listener for an event
   * @param {string} event Event name to stop listening for
   * @returns {void}
   */
  private unlisten(event: EventObject): void {
    this.removeEventListener(event.name, event.action);
  }
}

export const eventService = new EventService();
