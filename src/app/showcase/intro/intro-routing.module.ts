import { IntroConsoleuiComponent } from './intro-consoleui/intro-consoleui.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'consoleui', pathMatch: 'full' },
            { path: ':slug', component: IntroConsoleuiComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IntroRoutingModule { }

export const routedComponents = [
    IntroConsoleuiComponent,
];
