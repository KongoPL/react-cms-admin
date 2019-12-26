import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export class Appka extends Component {
    state = {
        items: getItems(10),
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                <Droppable droppableId="items">
                    {dropArea.bind(this, this.getItemsToRender('items'))}
                </Droppable>
                <Droppable droppableId="selected">
                    {dropArea.bind(this, this.getItemsToRender('selected'))}
                </Droppable>
            </DragDropContext>
        );
    }

    onDragEnd( result ) {
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
    move(
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
        let item = list.find((v) => v.id === itemId);

        item.index = destination.index;
        item.location = destination.droppableId;


        // Re-order old list:
        let sourceListSorted = list.filter((v) => v.location === source.droppableId).sort((a,b) => a.index - b.index),
            index = 0;

        for(let listItem of sourceListSorted) {
            listItem.index = index++;
        }

        return list;
    }

    private getItemsOfType(type)
    {
        return this.state.items.filter((v) => v.location === type).sort((a, b) => a.index - b.index);
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
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}>
                            {item.content}
                        </div>
                    )}
                </Draggable>
            ));
    }
}


const dropArea = (items, provided, snapshot) =>
    <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}>
        {items}
        {provided.placeholder}
    </div>


// fake data generator
const getItems = (count) => {
    let typeItems = {items: 0, selected: 0};

    return Array.from({length: count}, (v, k) => k).map(k => {
        let type = Math.round(Math.random()) == 1 ? 'items' : 'selected';

        return {
            id: `item-${k}`,
            content: `item ${k}`,
            location: type,
            index: typeItems[type]++
        };
    });
}

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250,
    display: 'inline-block',
    verticalAlign: 'top',
    margin: 10
});
