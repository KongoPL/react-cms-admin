import React from 'react';
import PageEditor from "../../components/PageEditor";
import {Modal, ModalFooter, ModalHeader} from "../../components/Modal";
import {TextInput} from "../../components/Form";


export default class Index extends React.Component<{}, {modalOpened: boolean}>
{
	state = {
		modalOpened: true
	};

	render() {
		return (
			<>
				<header className="mb-2 pt-2 py-4 bg-gray-100 border-solid border-b-2 border-gray-400">
					<div className="container mx-auto">
						<div className="inline-block">
							<input value="Lorem ipsum subpage" /><br />
							<sub>Page has been saved at 17:35</sub>
						</div>
						<button className="button-blue float-right">Save</button>
					</div>
				</header>
				<PageEditor/>
				<Modal isOpened={this.state.modalOpened}>
					<ModalHeader>It's some header</ModalHeader>
					<div>
						<form>
							<TextInput label="Some label" />
						</form>
						<p>Lorem ipsum dolor sit amet</p>
					</div>
					<ModalFooter>
						<button onClick={() => this.openModal()}>Close</button>
					</ModalFooter>
				</Modal>

				<button onClick={() => this.openModal()}>Open</button>
			</>
		);
	}

	private openModal()
	{
		this.setState({
			modalOpened: !this.state.modalOpened
		})
	}
}
