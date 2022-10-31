import notify from "devextreme/ui/notify";

export class Utils {

    public static tokenExpiredHandler() {
        notify({ message: "Re-login, please", type: "error", width: "auto"});
    }

    public static getAccessLevelData() {
        return [ "maximum", "medium", "default"]
    }
    
}