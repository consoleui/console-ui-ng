import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '', children: [
            {
                path: 'data-table',
                loadChildren: 'app/showcase/data-showcase/data-table-showcase/data-table-showcase.module#DataTableShowcaseModule'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
})
export class DataShowcaseModule { }
