/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @type AppEventEmitter
 */
import { AppEvents } from "./AppEvents";
import { EventEmitter } from "events";
import { StrictEventEmitter } from "nest-emitter";

export type AppEventEmitter = StrictEventEmitter<EventEmitter, AppEvents>;
