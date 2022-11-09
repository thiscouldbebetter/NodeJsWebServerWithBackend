
exports.WebPageFromHtmlFile = class WebPageFromHtmlFile
{
	constructor(statusCode, filePath)
	{
		this._statusCode = statusCode;
		this.filePath = filePath;
	}

	statusCode()
	{
		return this._statusCode;
	}

	toStringHtmlForWebServerAndRequest(webServer, webRequest)
	{
		var fileHelper = webServer.storageClient.fileHelper;

		var pageAsHtml =
			fileHelper.fileAtPathContentsRead(this.filePath).toString();

		return pageAsHtml;
	}
}
