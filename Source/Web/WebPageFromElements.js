
exports.WebPageFromElements = class WebPageFromElements
{
	constructor(statusCode, elementRoot)
	{
		this._statusCode = statusCode;
		this.elementRoot = elementRoot;
	}

	statusCode()
	{
		return this._statusCode;
	}

	toStringHtmlForWebServerAndRequest(webServer, webRequest)
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
