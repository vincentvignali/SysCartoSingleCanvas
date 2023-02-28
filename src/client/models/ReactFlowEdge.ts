/* tslint:disable */
/* eslint-disable */
/**
 * Situation API
 * Information System Knowledges
 *
 * The version of the OpenAPI document: 0.15.2 (0.15.2)
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * There is a problem when the serializer field
 * name clashes with other attributes/methods/keywords
 * See https://github.com/encode/django-rest-framework/issues/967#issuecomment-409998604 # noqa: E501
 * @export
 * @interface ReactFlowEdge
 */
export interface ReactFlowEdge {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof ReactFlowEdge
     */
    data: { [key: string]: any; };
    /**
     * 
     * @type {string}
     * @memberof ReactFlowEdge
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ReactFlowEdge
     */
    source: string;
    /**
     * 
     * @type {string}
     * @memberof ReactFlowEdge
     */
    target: string;
}

/**
 * Check if a given object implements the ReactFlowEdge interface.
 */
export function instanceOfReactFlowEdge(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "source" in value;
    isInstance = isInstance && "target" in value;

    return isInstance;
}

export function ReactFlowEdgeFromJSON(json: any): ReactFlowEdge {
    return ReactFlowEdgeFromJSONTyped(json, false);
}

export function ReactFlowEdgeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactFlowEdge {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': json['data'],
        'id': json['id'],
        'source': json['source'],
        'target': json['target'],
    };
}

export function ReactFlowEdgeToJSON(value?: ReactFlowEdge | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': value.data,
        'id': value.id,
        'source': value.source,
        'target': value.target,
    };
}
