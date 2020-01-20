import React from 'react';
import {Modal, ModalFooter, ModalHeader} from "./Modal";
import {Form, Formik} from "formik";
import {TextInput} from "./Form";
import * as Yup from "yup";
import {IEditorComponent} from "./PageEditor";
import ComponentsList from "../shared/ComponentsList";
import BaseModule from "../shared/BaseModule/BaseModule";

export class ComponentEditModal extends React.Component<IComponentEditModalProps>
{
	private submitModalForm;
	private componentObject: BaseModule | any;

	constructor(props)
	{
		super(props);

		this.createComponentObject();
	}

	componentDidUpdate(prevProps: Readonly<IComponentEditModalProps>, prevState: Readonly<{}>, snapshot?: any): void
	{
		console.warn(":)");

		this.createComponentObject();
	}

	private createComponentObject()
	{
		if(this.props.component === null)
			return;

		const className = ComponentsList[this.props.component.name];

		this.componentObject = new className;
	}

	render()
	{
		if(this.props.component === null)
			return <></>;

		if(this.componentObject == undefined)
		{
			this.createComponentObject();
		}

		const formSchema = Yup.object().shape({
			//label:
		});

		return <Modal isOpened={this.props.isOpened}>
			<ModalHeader>It's some header</ModalHeader>
			<div>
				<Formik
					initialValues={this.props.component.props}
					validationSchema={formSchema}
					onSubmit={(/*{label: headerPostfix }*/) => {}/*this.setState({headerPostfix})*/}
				>
					{({handleSubmit}) => (
						(this.submitModalForm = handleSubmit) && <Form>
							{this.renderFormInputs()}
						</Form>
					)}
				</Formik>
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


	private renderFormInputs()
	{
		let inputs: any[] = [];

		for(let property in this.componentObject.propsRules)
		{
			inputs.push(<TextInput name={property} label={property} />)
		}

		return inputs;
	}
}


interface IComponentEditModalProps
{
	isOpened: boolean;
	component: IEditorComponent | null

	// Events:
	onModalClose?: () => void;
}
