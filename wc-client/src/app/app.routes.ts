import { RouterModule, Routes } from '@angular/router';

import { FileDisplayComponent } from './others/file-display/file-display.component';
import { FileDetailComponent } from './others/file-detail/file-detail.component';

const routes: Routes = [
    {
        path: "",
        redirectTo: "files",
        pathMatch: "full",
    },
    {
        path: "files",
        component: FileDisplayComponent,
    },
    {
        path: "files/:id",
        component: FileDetailComponent,
    },
    {
        path: "**",
        redirectTo: "files",
    }
];

export const routing = RouterModule.forRoot(routes);