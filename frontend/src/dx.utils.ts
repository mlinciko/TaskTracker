import { EmailRule, RequiredRule, StringLengthRule } from "devextreme/ui/validation_rules";

export class DxUtils {
    public static requiredRule(): RequiredRule {
        return {
          type: "required",
          message: "Field is required",
        };
    }

    public static emailRule(): EmailRule {
      return {
        type: "email",
        message: "Invalid email",
      };
    }

    public static passwordLengthRule(): StringLengthRule {
      return {
        type: "stringLength",
        min: 5,
        max: 30,
        message: "Invalid password range",
      };
    }
}