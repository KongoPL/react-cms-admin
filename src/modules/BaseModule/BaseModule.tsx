import React from 'react';

/**
 * Base class for all modules in page editor
 */
export default abstract class BaseModule extends React.Component<any, any>
{
    /**
     * Properties defined by parent module
     */
    public props = {};

    /**
     * Rules for all properties
     */
    protected propsRules: {[key: string]: IPropertyRule } = {};
}

export interface IPropertyRule
{
    required?: boolean,
    editable?: boolean,
}

export class DefaultPropertyRule implements IPropertyRule
{
    public required = false;
    public editable = true;
}
