var WebPageFromHtmlFile =
	require("./WebPageFromHtmlFile").WebPageFromHtmlFile;
var WebPageWithVariableSubstitution =
	require("./WebPageWithVariableSubstitution").WebPageWithVariableSubstitution;
var WebPageStatusCodes =
	require("./Elements/WebPageStatusCodes").WebPageStatusCodes;

exports.WebRoute = class WebRoute
{
	constructor(path, pageGetForWebRequest)
	{
		this.path = path;
		this._pageGetForWebRequest = pageGetForWebRequest;
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
			new WebPageWithVariableSubstitution
			(
				new WebPageFromHtmlFile
				(
					WebPageStatusCodes.Instance().Ok,
					filePath
				)
			)
		);
	}

	static fromUrlPathAndPage(urlPath, page)
	{
		return new WebRoute
		(
			urlPath,
			(webRequestWithBody, contextForCallback, callback) =>
			{
				callback.call(contextForCallback, page);
			}
		);
	}

	pageGetForWebRequest(webRequestWithBody, contextForCallback, callback)
	{
		this._pageGetForWebRequest(webRequestWithBody, contextForCallback, callback);
	}
}
