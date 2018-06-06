import { RouterModule, Routes } from '@angular/router';

import { FileDisplayComponent } from './others/file-display/file-display.component';
import { FileDetailComponent } from './others/file-detail/file-detail.component';

const routes: Routes = [
    {
        path: "",
        redirectTo: "file",
        pathMatch: "full",
    },
    {
        path: "file",
        component: FileDisplayComponent,
    },
    {
        path: "file/:id",
        component: FileDetailComponent,
    },
    {
        path: "**",
        redirectTo: "file",
    }
];

export const routing = RouterModule.forRoot(routes);