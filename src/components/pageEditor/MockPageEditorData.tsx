import React from "react";

export enum ItemPosition
{
	HEADER = 'header',
	LEFT = 'left',
	RIGHT = 'right',
}

export const itemsData = [
	{
		id: '1',
		location: ItemPosition.HEADER,
		index: 0,

		component: {
			name: 'ContentBox',
			props: {
				content: 'Header'
			}
		}
	}, {
		id: '2',
		location: ItemPosition.LEFT,
		index: 0,

		component: {
			name: 'ContentBox',
			props: {
				content: 'Page content box #1'
			}
		}
	}, {
		id: '3',
		location: ItemPosition.LEFT,
		index: 1,

		component: {
			name: 'ContentBox',
			props: {
				content: 'Page content box #2'
			}
		}
	}, {
		id: '4',
		location: ItemPosition.LEFT,
		index: 2,

		component: {
			name: 'ContentBox',
			props: {
				content: 'Page content box #3'
			}
		}
	}, {
		id: '5',
		location: ItemPosition.RIGHT,
		content: '',
		index: 0,

		component: {
			name: 'ContentBox',
			props: {
				content: 'Right box #1'
			}
		}
	}, {
		id: '6',
		location: ItemPosition.RIGHT,
		index: 1,

		component: {
			name: 'ContentBox',
			props: {
				content: 'Right box #2'
			}
		}
	}
];

export const gridProps = {
	gridStyle: {width: '960px', margin: '0px auto'},
	gridSize: {width: 12, height: 2},
	columnSizes: Array(12).fill('1fr'),
	rowSizes: Array(2).fill('auto'),
	areas: [
		{x: 0, y: 0, width: 12, height: 1, name: ItemPosition.HEADER},
		{x: 0, y: 1, width: 7, height: 1, name: ItemPosition.LEFT},
		{x: 9, y: 1, width: 3, height: 1, name: ItemPosition.RIGHT}
	],
};
