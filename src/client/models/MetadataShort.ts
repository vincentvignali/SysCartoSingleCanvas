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
 * This serializer activates the tracking of
 * serialized objects.
 * It adds the `_represented` (not to use), the `represented`
 * and `reset` methods.
 * Important: it overrides the `to_representation` common method
 * of `Serializer` objects.
 * @export
 * @interface MetadataShort
 */
export interface MetadataShort {
    /**
     * 
     * @type {number}
     * @memberof MetadataShort
     */
    readonly id: number;
    /**
     * 
     * @type {string}
     * @memberof MetadataShort
     */
    key: string;
    /**
     * 
     * @type {any}
     * @memberof MetadataShort
     */
    value: any | null;
}

/**
 * Check if a given object implements the MetadataShort interface.
 */
export function instanceOfMetadataShort(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "key" in value;
    isInstance = isInstance && "value" in value;

    return isInstance;
}

export function MetadataShortFromJSON(json: any): MetadataShort {
    return MetadataShortFromJSONTyped(json, false);
}

export function MetadataShortFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetadataShort {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'key': json['key'],
        'value': json['value'],
    };
}

export function MetadataShortToJSON(value?: MetadataShort | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'key': value.key,
        'value': value.value,
    };
}

