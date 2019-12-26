import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default class Index extends React.Component<{}, {items: any[]}>
{
	static POS_HEADER = 'header';
	static POS_LEFT = 'left';
	static POS_RIGHT = 'right';

	constructor(props) {
		super(props);

		this.state = {
			items: [
				{
					id: '1',
					location: Index.POS_HEADER,
					content: 'Header',
					index: 0
				}, {
					id: '2',
					location: Index.POS_LEFT,
					content: 'Page content box #1',
					index: 0
				}, {
					id: '3',
					location: Index.POS_LEFT,
					content: 'Page content box #2',
					index: 1
				}, {
					id: '4',
					location: Index.POS_LEFT,
					content: 'Page content box #3',
					index: 2
				}, {
					id: '5',
					location: Index.POS_RIGHT,
					content: 'Right box #1',
					index: 0
				}, {
					id: '6',
					location: Index.POS_RIGHT,
					content: 'Right box #2',
					index: 1,
				}
			]
		};
	}

	render() {
		return (
			<>
				<header>
					<div>
						<input value="Lorem ipsum subpage" />
						<sub>Page has been saved at 17:35</sub>
					</div>
					<button>Save</button>
				</header>
				<div>
					<div className="container mx-auto">
						<DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
							<div className="w-12/12">
								<Droppable droppableId={Index.POS_HEADER}>
									{this.dropArea.bind(this, this.getItemsToRender(Index.POS_HEADER))}
								</Droppable>
							</div>
							<div className="flex">
								<div className="w-7/12 mr-64">
									<Droppable droppableId={Index.POS_LEFT}>
										{this.dropArea.bind(this, this.getItemsToRender(Index.POS_LEFT))}
									</Droppable>
								</div>
								<div className="w-3/12">
									<Droppable droppableId={Index.POS_RIGHT}>
										{this.dropArea.bind(this, this.getItemsToRender(Index.POS_RIGHT))}
									</Droppable>
								</div>
							</div>
						</DragDropContext>
					</div>
				</div>
			</>
		);
	}

	private getItemsOfType(type)
	{
		return this.state.items.filter((v) => v.location === type).sort((a, b) => a.index - b.index);
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
						className="bg-gray-500 mb-10 h-20"
						style={provided.draggableProps.style}>
						{item.content}
					</div>
				)}
			</Draggable>
		));
	}

	private dropArea(items, provided, snapshot) {
		return <div ref={provided.innerRef}>
			{items}
			{provided.placeholder}
		</div>;
	}


	onDragEnd( result ) {
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
	move(
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
