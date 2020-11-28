import List from "@material-ui/icons/List";
import FormatBold from "@material-ui/icons/FormatBold";
import FormatItalic from "@material-ui/icons/FormatItalic";
import Link from "@material-ui/icons/Link";
import FormatUnderlined from "@material-ui/icons/FormatUnderlined";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import SentimentVerySatisfied from "@material-ui/icons/SentimentVerySatisfied";

const icons: {
	[key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
} = {
	List,
	FormatBold,
	FormatItalic,
	FormatUnderlined,
	Link,
	SentimentVerySatisfied,
};

export const getIcon = (icon: string) => icons[icon];
