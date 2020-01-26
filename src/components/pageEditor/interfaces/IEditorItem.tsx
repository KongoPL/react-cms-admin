import {IEditorComponent} from "./IEditorComponent";

export interface IEditorItem
{
	id: string,
	location: string,
	index: number,

	component: IEditorComponent
}
