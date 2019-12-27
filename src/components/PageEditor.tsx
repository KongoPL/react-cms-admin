import React from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Api from "services/Api";
import ComponentsList from "modules/ComponentsList";

export default class PageEditor extends React.Component<{}, {items: any[]}>
{
    constructor(props) {
        super(props);

        Api.deletePageEditorItems();

        let items = Api.getPageEditorItems();

        if(!items)
        {
            Api.savePageEditorItems([
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
            ]);

            items = Api.getPageEditorItems();
        }

        this.state = { items };
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{ items: any[] }>, snapshot?: any): void {
        Api.savePageEditorItems(this.state.items);
    }
    
    
    render()
    {
        return <div className="page-editor">
            <div className="container mx-auto">
                <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                    <div className="w-12/12">
                        <Droppable droppableId={ItemPosition.HEADER}>
                            {this.dropArea.bind(this, this.getItemsToRender(ItemPosition.HEADER))}
                        </Droppable>
                    </div>
                    <div className="flex">
                        <div className="w-7/12 mr-64">
                            <Droppable droppableId={ItemPosition.LEFT}>
                                {this.dropArea.bind(this, this.getItemsToRender(ItemPosition.LEFT))}
                            </Droppable>
                        </div>
                        <div className="w-3/12">
                            <Droppable droppableId={ItemPosition.RIGHT}>
                                {this.dropArea.bind(this, this.getItemsToRender(ItemPosition.RIGHT))}
                            </Droppable>
                        </div>
                    </div>
                </DragDropContext>
            </div>
        </div>;
    }


    private dropArea(items, provided, snapshot) {
        return <div ref={provided.innerRef}>
            {items}
            {provided.placeholder}
        </div>;
    }

    private getItemsToRender(type)
    {
        return this.getItemsOfType(type).map((item, index) => (
            <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}>
                        {this.renderComponent(item.component)}
                    </div>
                )}
            </Draggable>
        ));
    }


    private getItemsOfType(type)
    {
        return this.state.items.filter((v) => v.location === type).sort((a, b) => a.index - b.index);
    }


    private renderComponent(component: {name: string, props: object}) {
        const {name, props} = component;

        if (!(name in ComponentsList))
            throw new Error(`Can't find component ${name}!`);

        let ReactComponent = ComponentsList[name];

        return <ReactComponent {...props} />;
    }



    private onDragEnd( result ) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        let items = this.move(
            this.state.items,
            result.draggableId,
            source,
            destination
        );

        this.setState({ items });
    };


    /**
     * Moves an item from one list to another list.
     */
    private move(
        list: any[],
        itemId,
        source: {droppableId: string, index: number},
        destination: {droppableId: string, index: number}
    ) {
        let movementDirection = destination.droppableId  == source.droppableId ? Math.sign(source.index - destination.index) : 1;

        // Move item to new list:
        for(let listItem of list) {
            if(listItem.location != destination.droppableId) {
                continue;
            }

            if(listItem.index >= destination.index) {
                listItem.index += movementDirection;
            }
        }

        // Move item itself:
        let item = list.find((v) => v.id == itemId);

        item.index = destination.index;
        item.location = destination.droppableId;

        // Re-order old list:
        let sourceListSorted = list.filter((v) => v.location === source.droppableId)
                .sort((a, b) => a.index - b.index),
            index = 0;

        for(let listItem of sourceListSorted) {
            listItem.index = index++;
        }


        return list;
    }
}

enum ItemPosition
{
    HEADER = 'header',
    LEFT = 'left',
    RIGHT = 'right',
}
