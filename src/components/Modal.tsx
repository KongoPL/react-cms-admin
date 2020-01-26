import React from 'react';

export class Modal extends React.Component<{isOpened: boolean}>
{
	render()
	{
		return <div className={`fixed top-0 left-0 w-full h-full ${this.props.isOpened ? 'block':'hidden'}`} style={{backgroundColor: 'rgba(255,255,255,0.65)'}}>
			<div className="w-1/3 p-3 m-auto bg-white shadow-lg">
				{this.props.children}
			</div>
		</div>;
	}
}

export function ModalHeader(props)
{
	return <header className="mb-2 pl-2 pr-2 text-2xl">{props.children}</header>;
}

export function ModalFooter(props)
{
	return <footer className="mt-2 pt-1 border-t-2 border-gray-200 text-right">{props.children}</footer>;
}
