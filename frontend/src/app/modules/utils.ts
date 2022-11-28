import notify from "devextreme/ui/notify";
import { Task } from "../models/data-models";

export class Utils {

    public static tokenExpiredHandler() {
        notify({ message: "Re-login, please", type: "error", width: "auto"});
    }

    public static getAccessLevelData() {
        return [ "maximum", "medium", "default"]
    }

    public static createTaskParams(data: any, creatorId: string, dashboardId: string): any {
        return {
            name: data.name,
            theme: data.theme,
            description: data.description,
            status_id: data.status_id,
            executor_id: data.executor_id,
            creator_id: creatorId,
            dashboard_id: dashboardId,
            deadline: data.deadline,
        }
    }
    
}