
exports.WebPageFromHtmlFile = class WebPageFromHtmlFile
{
	constructor(statusCode, filePath)
	{
		this.statusCode = statusCode;
		this.filePath = filePath;
	}

	toStringHtmlForWebServer(webServer)
	{
		var fileHelper = webServer.storageClient.fileHelper;

		var pageAsHtml =
			fileHelper.fileAtPathContentsRead(this.filePath);

		return pageAsHtml;
	}
}
