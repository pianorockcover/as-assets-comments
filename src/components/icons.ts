import List from "@material-ui/icons/List";
import FormatBold from "@material-ui/icons/FormatBold";
import FormatItalic from "@material-ui/icons/FormatItalic";
import FormatUnderlined from "@material-ui/icons/FormatUnderlined";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

const icons: {
	[key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
} = {
	List,
	FormatBold,
	FormatItalic,
	FormatUnderlined,
};

export const getIcon = (icon: string) => icons[icon];
