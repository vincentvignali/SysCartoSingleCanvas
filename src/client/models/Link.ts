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
import type { MetadataShort } from './MetadataShort';
import {
    MetadataShortFromJSON,
    MetadataShortFromJSONTyped,
    MetadataShortToJSON,
} from './MetadataShort';

/**
 * This serializer activates the tracking of
 * serialized objects.
 * It adds the `_represented` (not to use), the `represented`
 * and `reset` methods.
 * Important: it overrides the `to_representation` common method
 * of `Serializer` objects.
 * @export
 * @interface Link
 */
export interface Link {
    /**
     * 
     * @type {number}
     * @memberof Link
     */
    child: number;
    /**
     * 
     * @type {number}
     * @memberof Link
     */
    readonly id: number;
    /**
     * 
     * @type {Array<MetadataShort>}
     * @memberof Link
     */
    metadata?: Array<MetadataShort>;
    /**
     * 
     * @type {number}
     * @memberof Link
     */
    parent: number;
}

/**
 * Check if a given object implements the Link interface.
 */
export function instanceOfLink(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "child" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "parent" in value;

    return isInstance;
}

export function LinkFromJSON(json: any): Link {
    return LinkFromJSONTyped(json, false);
}

export function LinkFromJSONTyped(json: any, ignoreDiscriminator: boolean): Link {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'child': json['child'],
        'id': json['id'],
        'metadata': !exists(json, 'metadata') ? undefined : ((json['metadata'] as Array<any>).map(MetadataShortFromJSON)),
        'parent': json['parent'],
    };
}

export function LinkToJSON(value?: Link | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'child': value.child,
        'metadata': value.metadata === undefined ? undefined : ((value.metadata as Array<any>).map(MetadataShortToJSON)),
        'parent': value.parent,
    };
}

