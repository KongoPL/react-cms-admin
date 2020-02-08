import React from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import Api from "services/Api";
import ComponentsList from "shared/ComponentsList";
import Grid from "shared/Grid/Grid";
import {ComponentEditModal} from "./ComponentEditModal";
import {IEditorItem} from "./interfaces/IEditorItem";
import {IEditorComponent} from "./interfaces/IEditorComponent";
import {gridProps, ItemPosition, itemsData} from "./MockPageEditorData";

import 'scss/components/PageEditor.scss';
import LayoutManagementCell from "./LayoutManagementCell";

export default class PageEditor extends React.Component<{},  IPageEditorState>
{
	constructor(props) {
		super(props);

		Api.deletePageEditorItems(); // Used for development only

		let items = Api.getPageEditorItems();

		if(!items)
		{
			Api.savePageEditorItems(itemsData);

			items = Api.getPageEditorItems();
		}

		this.state = {
			items,
			modalComponent: null,
			modalOpened: false
		};
	}

	componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<IPageEditorState>, snapshot?: any): void {
		Api.savePageEditorItems(this.state.items);
	}
	
	
	render()
	{
		return <div className="page-editor">
			<DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
				<Grid {...gridProps} gridChildren={{
					[ItemPosition.HEADER]:
						<LayoutManagementCell location={ItemPosition.HEADER}>
							<Droppable droppableId={ItemPosition.HEADER}>
								{this.DropArea.bind(this, this.getItemsToRender(ItemPosition.HEADER))}
							</Droppable>
						</LayoutManagementCell>,

					[ItemPosition.LEFT]:
						<LayoutManagementCell location={ItemPosition.LEFT}>
							<Droppable droppableId={ItemPosition.LEFT}>
								{this.DropArea.bind(this, this.getItemsToRender(ItemPosition.LEFT))}
							</Droppable>
						</LayoutManagementCell>,

					[ItemPosition.RIGHT]:
						<LayoutManagementCell location={ItemPosition.RIGHT}>
							<Droppable droppableId={ItemPosition.RIGHT}>
								{this.DropArea.bind(this, this.getItemsToRender(ItemPosition.RIGHT))}
							</Droppable>
						</LayoutManagementCell>,
				}} />
			</DragDropContext>
			<ComponentEditModal
				isOpened={this.state.modalOpened}
				component={this.state.modalComponent}
				onModalSubmit={this.updateModalComponent.bind(this)}
				onModalClose={() => this.setState({modalOpened: false})}
			/>
		</div>;
	}


	private DropArea(items, provided, snapshot) {
		return <div ref={provided.innerRef}>
			{items}
			{provided.placeholder}
		</div>;
	}

	private getItemsToRender(type)
	{
		return this.getItemsOfType(type).map((item, index) => (
			<Draggable
				key={item.id}
				draggableId={item.id}
				index={index}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={provided.draggableProps.style}
						onClick={()=>this.setState({modalComponent: item.component, modalOpened: true})}
					>
						{this.renderComponent(item.component)}
					</div>
				)}
			</Draggable>
		));
	}


	private getItemsOfType(type)
	{
		return this.state.items.filter((v) => v.location === type)
			.sort((a, b) => a.index - b.index);
	}


	private renderComponent(component: {name: string, props: object}) {
		const {name, props} = component;

		if (!(name in ComponentsList))
			throw new Error(`Can't find component ${name}!`);

		let ReactComponent = ComponentsList[name];

		return <ReactComponent {...props} />;
	}


	private updateModalComponent(component: IEditorComponent)
	{
		if(this.state.modalComponent === null)
			return;

		this.state.modalComponent.props = component.props;
	}



	private onDragEnd( result ) {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		let items = this.move(
			this.state.items,
			result.draggableId,
			source,
			destination
		);

		this.setState({ items });
	};


	/**
	 * Moves an item from one list to another list.
	 */
	private move(
		list: any[],
		itemId,
		source: {droppableId: string, index: number},
		destination: {droppableId: string, index: number}
	) {
		let movementDirection = destination.droppableId  == source.droppableId ? Math.sign(source.index - destination.index) : 1;

		// Move item to new list:
		for(let listItem of list) {
			if(listItem.location != destination.droppableId) {
				continue;
			}

			if(listItem.index >= destination.index) {
				listItem.index += movementDirection;
			}
		}

		// Move item itself:
		let item = list.find((v) => v.id == itemId);

		item.index = destination.index;
		item.location = destination.droppableId;

		// Re-order old list:
		let sourceListSorted = list.filter((v) => v.location === source.droppableId)
				.sort((a, b) => a.index - b.index),
			index = 0;

		for(let listItem of sourceListSorted) {
			listItem.index = index++;
		}


		return list;
	}
}

interface IPageEditorState
{
	items: IEditorItem[],
	modalComponent: IEditorComponent | null,
	modalOpened: boolean
}
