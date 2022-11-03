
exports.WebList = class WebList
{
	constructor(elements)
	{
		this.elements = elements;
	}

	toStringHtml()
	{
		var elementsAsStringHtml = this.elements.map
		(
			x => "\t<li>" + x.toStringHtml() + "</li>"
		).join("\n");
		
		var listAsHtml =
			"<ul>\n" + elementsAsStringHtml + "\n</ul>";

		return listAsHtml;
	}
}
