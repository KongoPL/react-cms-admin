import React from 'react';
import PageEditor from "../../components/pageEditor/PageEditor";

export default class Index extends React.Component<{}, any>
{
	state = {
		modalOpened: true,
	};

	render() {
		return (
			<>
				<header className="mb-2 pt-2 py-4 bg-gray-100 border-solid border-b-2 border-gray-400">
					<div className="container mx-auto">
						<div className="inline-block">
							<input defaultValue="Lorem ipsum subpage" /><br />
							<sub>Page has been saved at 17:35</sub>
						</div>
						<button className="button-blue float-right">Save</button>
					</div>
				</header>
				<PageEditor/>
			</>
		);
	}
}
