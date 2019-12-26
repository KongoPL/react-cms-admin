import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default class Index extends React.Component
{
	static POS_HEADER = 'header';
	static POS_LEFT = 'left';
	static POS_RIGHT = 'right';

	public items;

	constructor(props) {
		super(props);

		this.items = [
			{
				location: Index.POS_HEADER,
				content: 'Header'
			}, {
				location: Index.POS_LEFT,
				content: 'Page content box',
				props: {mb: 5}
			}, {
				location: Index.POS_LEFT,
				content: 'Page content box',
				props: {mb: 5}
			}, {
				location: Index.POS_LEFT,
				content: 'Page content box',
				props: {mb: 5}
			}, {
				location: Index.POS_RIGHT,
				content: 'Right box #1'
			}, {
				location: Index.POS_RIGHT,
				content: 'Right box #1'
			}
		] ;
	}

	render()
	{
		return <></>;
		// return <>
		// 	<header>
		// 		<div>
		// 			<input value="Lorem ipsum subpage" />
		// 			<sub>Page has been saved at 17:35</sub>
		// 		</div>
		// 		<button>Save</button>
		// 	</header>
		// 	<div>
		// 		<div className="container mx-auto">
		// 			<DragDropContext onDragEnd={this.onDragEnd}>
		// 				<Droppable droppableId={Index.POS_HEADER}>
		// 					{(provided, snapshot) => (
		// 						<div ref={provided.innerRef}>
		// 							{this.getItems(Index.POS_HEADER, provided)}
		// 						</div>
		// 					)}
		// 				</Droppable>
		// 				<div className="flex">
		// 					<DropContainer className="w-7/12 xl:mr-64">
		//
		// 						{this.getItems(Index.POS_LEFT)}
		// 					</DropContainer>
		// 					<DropContainer className="w-3/12">
		// 						{this.getItems(Index.POS_RIGHT)}
		// 					</DropContainer>
		// 				</div>
		// 			</DragDropContext>
		// 		</div>
		// 	</div>
		// </>;
	}


	protected getItems(location: string, provided: any)
	{
		return this.items.filter((v) => v.location == location)
			.map((v, i) => <DraggableBox
				ref={provided.innerRef}
				style={provided.draggableProps.style}
				index={i}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				{...(v.props || {})}
			>{v.content}</DraggableBox>);
	}
}


function DraggableBox(props)
{
	let mb = (props.mb ? props.mb : 10);

	delete props.mb;

	if(!props.className)
		props.className = '';

	props.className += '`bg-gray-500 mb-${mb} h-20`';

	return <div {...props}>{props.children}</div>
}


function DropContainer({className, children})
{
	return <div className={className}>{children}</div>;
}
