
exports.WebRoute = class WebRoute
{
	constructor(path, pageGetForWebRequest)
	{
		this.path = path;
		this.pageGetForWebRequest = pageGetForWebRequest;
	}
}
