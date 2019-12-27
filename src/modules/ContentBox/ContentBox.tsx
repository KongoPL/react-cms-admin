import BaseModule from "../BaseModule/BaseModule";
import React from "react";

export default class ContentBox extends BaseModule
{
    props = {
        content: 'Lorem ipsum dolor sit amet',
    };

    render()
    {
        return <div className="bg-gray-500 mb-10 h-20">{this.props.content}</div>;
    }
}
