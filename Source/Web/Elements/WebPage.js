
exports.WebPage = class WebPage
{
	constructor(elementRoot)
	{
		this.elementRoot = elementRoot;
	}

	toStringHtml()
	{
		var elementRootAsHtml =
			this.elementRoot.toStringHtml();

		var pageAsHtml =
			"<html>\n<body>\n"
			+ elementRootAsHtml
			+ "\n</body>\n</html>\n";

		return pageAsHtml;
	}
}
