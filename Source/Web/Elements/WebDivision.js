
exports.WebDivision = class WebDivision
{
	constructor(children)
	{
		this.children = children;
	}

	toStringHtml()
	{
		var childrenAsHtml = this.children.map
		(
			x => x.toStringHtml()
		).join("\n");
		var divAsHtml =
			"<div>" + childrenAsHtml + "</div>";

		return divAsHtml;
	}
}
