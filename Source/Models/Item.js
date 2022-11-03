
exports.Item = class Item
{
	constructor(name)
	{
		this.name = name;
	}

	toStringJson()
	{
		return JSON.stringify(this);
	}

	toStringHtml()
	{
		return this.toStringJson();
	}
}
