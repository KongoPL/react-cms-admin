import React from 'react';

export default class Index extends React.Component
{
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
					<DraggableBox location="top" index="9">Header</DraggableBox>
					<div className="flex">
						<DropContainer className="w-7/12 xl:mr-64">
							<DraggableBox mb="5" location="left" index="0">Page content box</DraggableBox>
							<DraggableBox mb="5" location="left" index="1">Page content box</DraggableBox>
							<DraggableBox mb="5" location="left" index="2">Page content box</DraggableBox>
						</DropContainer>
						<DropContainer className="w-3/12">
							<DraggableBox location="right" index="3">Right box #1</DraggableBox>
							<DraggableBox location="right" index="4">Right box #2</DraggableBox>
						</DropContainer>
					</div>
				</div>
			</div>
		</>;
	}
}


function DraggableBox({mb = '10', location, index, children})
{
	return <div className={`bg-gray-500 mb-${mb} h-20`}>{children}</div>
}


function DropContainer({className, children})
{
	return <div className={className}>{children}</div>;
}
