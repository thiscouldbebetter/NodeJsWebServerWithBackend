
exports.WebPageStatusCodes = class WebPageStatusCodes
{
	constructor()
	{
		this.Ok = 200;

		this.NotFound = 404;
	}

	static Instance()
	{
		if (WebPageStatusCodes._instance == null)
		{
			WebPageStatusCodes._instance = new WebPageStatusCodes();
		}
		return WebPageStatusCodes._instance;
	}
}