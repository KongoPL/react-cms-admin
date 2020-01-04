import React from 'react';

export class TextInput extends React.Component<IInputProps, any>
{
	render()
	{
		return <FormInput {...this.props} type="text" />;
	}
}

class FormInput extends React.Component<IFormInputProps, any>
{
	render()
	{
		return <div>
			{this.props.label && <label className="block text-sm">{this.props.label}</label>}
			<input type={this.props.type} className="pl-1 pr-1 border-b-2 border-blue-200 focus:border-blue-300 indent" />
		</div>;
	}
}


interface IInputProps
{
	label?: string
}

interface IFormInputProps extends IInputProps
{
	type: string
}
