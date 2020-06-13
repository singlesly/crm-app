/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @interface AppEvents
 */
import { Stage } from "../entity/Stage";

export interface AppEvents {
    stageCreated: Stage;
}
