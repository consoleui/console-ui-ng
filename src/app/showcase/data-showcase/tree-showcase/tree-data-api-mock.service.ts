import { CuiTreeNode } from 'consoleui';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const nodes = [
    { "id": "1", "label": "Node1" },
    {
        "id": "2", "label": "Node2", "hasChildren": true, "children": [
            { "id": "2-1", "label": "Node2-1" },
            {
                "id": "2-2", "label": "Node2-2", "hasChildren": true, "children": [
                    { "id": "2-2-1", "label": "Node2-2-1" },
                    { "id": "2-2-2", "label": "Node2-2-2" },
                    { "id": "2-2-3", "label": "Node2-2-3" },
                    { "id": "2-2-4", "label": "Node2-2-4" }
                ]
            },
            { "id": "2-3", "label": "Node2-3" },
            { "id": "2-4", "label": "Node2-4" }
        ]
    },
    {
        "id": "3", "label": "Node3", "hasChildren": true, "children": [
            { "id": "3-1", "label": "Node3-1" },
            { "id": "3-2", "label": "Node3-2" },
            { "id": "3-3", "label": "Node3-3" },
            { "id": "3-4", "label": "Node3-4" }
        ]
    },
    { "id": "4", "label": "Node4" }
];

@Injectable()
export class TreeDataApiMockService {
    constructor() { }

    getNodes(): Observable<CuiTreeNode[]> {
        return Observable.of(nodes);
    }
}
