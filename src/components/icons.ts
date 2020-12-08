import List from "@material-ui/icons/List";
import FormatBold from "@material-ui/icons/FormatBold";
import FormatItalic from "@material-ui/icons/FormatItalic";
import Link from "@material-ui/icons/Link";
import FormatUnderlined from "@material-ui/icons/FormatUnderlined";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import SentimentVerySatisfied from "@material-ui/icons/SentimentVerySatisfied";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Info from "@material-ui/icons/Info";
import Warning from "@material-ui/icons/Warning";
import Error from "@material-ui/icons/Error";
import CheckCircle from "@material-ui/icons/CheckCircle";

const icons: {
	[key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
} = {
	List,
	FormatBold,
	FormatItalic,
	FormatUnderlined,
	Link,
	SentimentVerySatisfied,
	Close,
	Check,
	FormatListNumberedIcon,
	ExpandMore,
	Info,
	Warning,
	Error,
	CheckCircle,
};

export const getIcon = (icon: string) => icons[icon];
