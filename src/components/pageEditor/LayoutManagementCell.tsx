import React from "react";

export default class LayoutManagementCell extends React.Component<any, any>
{
	render()
	{
		return <div style={{ border: '2px dashed #cbd5e0'}}>
			{this.props.children}
		</div>
	}
}
