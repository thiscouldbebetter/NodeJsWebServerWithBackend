
exports.WebRequestWithBody = class WebRequestWithBody
{
	constructor(request, body)
	{
		this.request = request;
		this.body = body;
	}

	postVariableNameValuePairs()
	{
		if (this._postVariableNameValuePairs == null)
		{
			var postVariablesAsStrings =
				this.body.split("&");
			this._postVariableNameValuePairs =
				postVariablesAsStrings.map(x => x.split("="));
		}

		return this._postVariableNameValuePairs;
	}

	postVariableValueByName(variableName)
	{
		return this.postVariableValuesByName().get(variableName);
	}

	postVariableValuesByName()
	{
		if (this._postVariableValuesByName == null)
		{
			new Map
			(
				this.postVariableNameValuePairs().map
				(
					x => [ x[0], x[1] ]
				)
			);
		}

		return this._postVariableValuesByName;
	}
}
