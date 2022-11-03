
exports.WebHeading = class WebHeading
{
	constructor(level, text)
	{
		this.level = level;
		this.text = text;
	}

	toStringHtml()
	{
		var headingAsHtml =
			"<h" + this.level + ">"
			+ this.text
			+ "</h" + this.level + ">";

		return headingAsHtml;
	}
}
