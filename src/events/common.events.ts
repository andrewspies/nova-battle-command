import { CommonEventType } from "../constants/common.constants";
import { eventService } from "../services/event.service";
import { EventObject } from "../types";

const commonEvemts: EventObject[] = [
  {
    name: CommonEventType.START,
    action: (e) => console.log("GAME START", e),
  },
];

eventService.add(commonEvemts);
