
exports.WebLabel = class WebLabel
{
	constructor(text)
	{
		this.text = text;
	}

	toStringHtml()
	{
		return "<label>" + this.text + "</label>";
	}
}
