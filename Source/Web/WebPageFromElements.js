
exports.WebPageFromElements = class WebPageFromElements
{
	constructor(statusCode, elementRoot)
	{
		this.statusCode = statusCode;
		this.elementRoot = elementRoot;
	}

	toStringHtmlForWebServer(webServer)
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
