
exports.WebPageFromHtmlFile = class WebPageFromHtmlFile
{
	constructor(fileHelper, statusCode, filePath)
	{
		this.fileHelper = fileHelper;
		this.statusCode = statusCode;
		this.filePath = filePath;
	}

	toStringHtml()
	{
		var pageAsHtml =
			this.fileHelper.fileAtPathContentsRead(this.filePath);

		return pageAsHtml;
	}
}
