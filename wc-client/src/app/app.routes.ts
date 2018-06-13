import { RouterModule, Routes } from '@angular/router';

import { FileDisplayComponent } from './others/file-display/file-display.component';
import { FileDetailComponent } from './others/file-detail/file-detail.component';
import { FileCreateComponent } from './others/file-create/file-create.component';
import { ProfileComponent } from './others/profile/profile.component';
//import { UserAccessService } from './services/user-access.service';

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
        path: "profile",
        component: ProfileComponent,
        canActivate: ["userAccess"]
    },
    {
        path: "files/detail/:id",
        component: FileDetailComponent,
    },
    {
        path: "files/create",
        component: FileCreateComponent
    },
    {
        path: "**",
        redirectTo: "files",
    }
];

export const routing = RouterModule.forRoot(routes);