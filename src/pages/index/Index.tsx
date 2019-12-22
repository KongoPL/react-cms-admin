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
		return <>
			<header>
				<div>
					<input value="Lorem ipsum subpage" />
					<sub>Page has been saved at 17:35</sub>
				</div>
				<button>Save</button>
			</header>
			<div>
				<div className="container mx-auto">
					{this.getItems(Index.POS_HEADER)}
					<div className="flex">
						<DropContainer className="w-7/12 xl:mr-64">
							{this.getItems(Index.POS_LEFT)}
						</DropContainer>
						<DropContainer className="w-3/12">
							{this.getItems(Index.POS_RIGHT)}
						</DropContainer>
					</div>
				</div>
			</div>
		</>;
	}


	protected getItems(location: string)
	{
		return this.items.filter((v) => v.location == location)
			.map((v) => <DraggableBox {...(v.props ?? {})}>{v.content}</DraggableBox>);
	}
}


function DraggableBox({mb = '10', children})
{
	return <div className={`bg-gray-500 mb-${mb} h-20`}>{children}</div>
}


function DropContainer({className, children})
{
	return <div className={className}>{children}</div>;
}
