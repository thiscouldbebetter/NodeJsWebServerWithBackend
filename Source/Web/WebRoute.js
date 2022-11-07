var WebPageFromHtmlFile =
	require("./WebPageFromHtmlFile").WebPageFromHtmlFile;
var WebPageStatusCodes =
	require("./Elements/WebPageStatusCodes").WebPageStatusCodes;

exports.WebRoute = class WebRoute
{
	constructor(path, pageGetForWebRequest)
	{
		this.path = path;
		this.pageGetForWebRequest = pageGetForWebRequest;
	}

	static fromPageName(pageName)
	{
		return WebRoute.fromUrlAndFilePaths
		(
			"/" + pageName + ".html",
			"Pages/" + pageName + ".html" 
		);
	}

	static fromUrlAndFilePaths(urlPath, filePath)
	{
		return WebRoute.fromUrlPathAndPage
		(
			urlPath,
			new WebPageFromHtmlFile
			(
				WebPageStatusCodes.Instance().Ok,
				filePath
			)
		);
	}

	static fromUrlPathAndPage(urlPath, page)
	{
		return new WebRoute
		(
			urlPath,
			(webRequest, contextForCallback, callback) =>
			{
				callback.call(contextForCallback, page);
			}
		);
	}
}
