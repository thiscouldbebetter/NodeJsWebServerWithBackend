
exports.WebParagraph = class WebParagraph
{
	constructor(text)
	{
		this.text = text;
	}

	toStringHtml()
	{
		return "<p>" + this.text + "</p>";
	}
}
