
exports.WebPageWithVariableSubstitution = class WebPageWithVariableSubstitution
{
	constructor(child)
	{
		this.child = child;
	}

	statusCode()
	{
		return this.child.statusCode();
	}

	toStringHtmlForWebServerAndRequest(webServer, webRequest)
	{
		var pageBeforeVariableSubstitution =
			this.child.toStringHtmlForWebServerAndRequest(webServer, webRequest);

		var pageAfterVariableSubstitution =
			pageBeforeVariableSubstitution;

		var variableNameValuePairs = webRequest.postVariableNameValuePairs();
		for (var i = 0; i < variableNameValuePairs.length; i++)
		{
			var variableNameValuePair = variableNameValuePairs[i];
			var variableName = variableNameValuePair[0];
			var variableValue = variableNameValuePair[1];

			var variableNameTagged = "{{" + variableName + "}}";

			pageAfterVariableSubstitution =
				pageAfterVariableSubstitution.split(variableNameTagged).join(variableValue);
		}

		return pageAfterVariableSubstitution;
	}
}
