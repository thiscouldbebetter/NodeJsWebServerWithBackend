
exports.Item = class Item
{
	constructor(name)
	{
		this.name = name;
	}

	id()
	{
		return this.name;
	}

	toStringHtml()
	{
		return this.toStringJson();
	}

	// Json.

	static fromStringJson(itemAsJson)
	{
		var itemAsObject = JSON.parse(itemAsJson);
		Object.setPrototypeOf(itemAsObject, Item.prototype);
		return itemAsObject;
	}

	toStringJson()
	{
		return JSON.stringify(this);
	}
}
