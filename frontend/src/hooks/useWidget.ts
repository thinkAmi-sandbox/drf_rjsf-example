import {RegistryWidgetsType} from "@rjsf/utils";
import MyTextWidget from "../components/widgets/MyTextWidget";

export const useWidget = () => {
  const widgets: RegistryWidgetsType = {
    TextWidget: MyTextWidget
  }

  return {widgets}
}