export default class Api
{
	static savePageEditorItems(items)
	{
		window.localStorage.setItem('editor-items', JSON.stringify(items));
	}


	static getPageEditorItems()
	{
		let item = window.localStorage.getItem('editor-items');

		if(!item)
			return null;

		return JSON.parse(item);
	}

	static deletePageEditorItems()
	{
		window.localStorage.removeItem('editor-items');
	}
}
