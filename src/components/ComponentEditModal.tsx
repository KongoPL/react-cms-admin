import React from 'react';
import {Modal, ModalFooter, ModalHeader} from "./Modal";
import {Form, Formik} from "formik";
import {TextInput} from "./Form";
import * as Yup from "yup";

export class ComponentEditModal extends React.Component<IComponentEditModalProps>
{
	private submitModalForm;

	constructor(props)
	{
		super(props);
	}

	render()
	{
		const formSchema = Yup.object().shape({
			label: Yup.string()
				.min(5, 'Minimum 5 characters long!')
				.required('Required')
		});

		return <Modal isOpened={this.props.isOpened}>
			<ModalHeader>It's some header</ModalHeader>
			<div>
				<Formik
					initialValues={{ label: 'test' }}
					validationSchema={formSchema}
					onSubmit={({label: headerPostfix }) => this.setState({headerPostfix})}
					render={({handleSubmit}) => (
						(this.submitModalForm = handleSubmit) && <Form>
							<TextInput name="label" label="Some label" />
						</Form>
					)}
				/>
			</div>
			<ModalFooter>
				<button className="button-blue" onClick={() => this.submitModalForm()}>Save changes</button>
				<button className="button" onClick={() => this.emitEvent('onModalClose')}>Close</button>
			</ModalFooter>
		</Modal>;
	}


	private emitEvent(eventName: string)
	{
		if(eventName in this.props && typeof this.props[eventName] === 'function')
		{
			this.props[eventName]();
		}
	}
}


interface IComponentEditModalProps
{
	isOpened: boolean;
	component: any | null

	// Events:
	onModalClose?: () => void;
}
