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
	private setModalFieldValue;

	private componentObject: BaseModule | any;

	componentDidUpdate(): void
	{
		if(this.props.component === null)
			return;

		for(let propertyName in this.props.component.props)
		{
			const propertyValue = this.props.component.props[propertyName];

			this.setModalFieldValue(propertyName, propertyValue);
		}
	}

	render()
	{
		if(this.props.component === null)
			return <></>;

		this.createComponentObject();



		return <Modal isOpened={this.props.isOpened}>
			<ModalHeader>It's some header</ModalHeader>
			<div>
				<Formik
					initialValues={this.props.component.props}
					validationSchema={this.getFormValidationSchema() }
					onSubmit={(/*{label: headerPostfix }*/) => {}/*this.setState({headerPostfix})*/}
				>
					{({handleSubmit, setFieldValue}) => (
						(this.submitModalForm = handleSubmit) && (this.setModalFieldValue = setFieldValue) && <Form>
							{this.renderFormInputs()}
						</Form>
					)}
				</Formik>
			</div>
			<ModalFooter>
				<button className="button-blue" type="submit" onClick={() => this.submitModalForm()}>Save changes</button>
				<button className="button" onClick={() => this.emitEvent('onModalClose')}>Close</button>
			</ModalFooter>
		</Modal>;
	}


	private createComponentObject()
	{
		if(this.props.component === null)
			return;

		const className = ComponentsList[this.props.component.name];

		this.componentObject = new className;
	}


	private emitEvent(eventName: string)
	{
		if(eventName in this.props && typeof this.props[eventName] === 'function')
			this.props[eventName]();
	}


	private renderFormInputs()
	{
		let inputs: any[] = [];

		for(let property in this.componentObject.propsRules)
			inputs.push(<TextInput key={property} name={property} label={property} />);

		return inputs;
	}

	private getFormValidationSchema()
	{
		const propsValidationRules = {};

		for(let property in this.componentObject.propsRules)
		{
			const propRules = this.componentObject.propsRules[property];

			if('validation' in propRules === false)
				continue;

			propsValidationRules[property] = propRules.validation;
		}

		return Yup.object().shape(propsValidationRules);
	}
}


interface IComponentEditModalProps
{
	isOpened: boolean;
	component: IEditorComponent | null

	// Events:
	onModalClose?: () => void;
}
